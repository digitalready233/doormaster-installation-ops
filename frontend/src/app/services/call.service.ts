import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { InstallationStore } from './installation.store';
import { AlertService } from './alert.service';
import { ChatCallLog, MessagesService } from './messages.service';

export type CallMediaType = 'audio' | 'video';
export type CallState = 'idle' | 'outgoing' | 'incoming' | 'connecting' | 'connected';

export interface CallPeer {
  id: string;
  name: string;
  role: string;
  roleLabel?: string;
}

interface IncomingSignal {
  id: string;
  callId: string;
  type: 'invite' | 'accept' | 'reject' | 'cancel' | 'hangup' | 'busy' | 'upgrade_video' | 'offer' | 'answer' | 'ice';
  mediaType: CallMediaType;
  fromUserId: string;
  fromName: string;
  fromRole: string;
  toUserId: string;
  payload?: any;
  createdAt: number;
}

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private readonly store = inject(InstallationStore);
  private readonly alert = inject(AlertService);
  private readonly messagesSvc = inject(MessagesService);

  readonly callState = signal<CallState>('idle');
  readonly callType = signal<CallMediaType>('audio');
  readonly peer = signal<CallPeer | null>(null);
  readonly callId = signal<string | null>(null);
  readonly isMuted = signal<boolean>(false);
  readonly isCameraOff = signal<boolean>(false);
  readonly isMinimized = signal<boolean>(false);
  readonly callDurationSec = signal<number>(0);
  readonly localStream = signal<MediaStream | null>(null);
  readonly remoteStream = signal<MediaStream | null>(null);
  readonly hasRemoteVideo = signal<boolean>(false);

  readonly isActive = computed(() => this.callState() !== 'idle');

  private pc: RTCPeerConnection | null = null;
  private pendingIceCandidates: RTCIceCandidateInit[] = [];
  private pendingOffer: RTCSessionDescriptionInit | null = null;
  private pollTimer: ReturnType<typeof setTimeout> | null = null;
  private durationTimer: ReturnType<typeof setInterval> | null = null;
  private ringTimeoutTimer: ReturnType<typeof setTimeout> | null = null;
  private ringAudioCtx: AudioContext | null = null;
  private ringInterval: ReturnType<typeof setInterval> | null = null;
  private isPolling = false;
  private isOutgoingCall = false;
  private wasConnected = false;
  private readonly loggedCallIds = new Set<string>();

  constructor() {
    effect(() => {
      const userId = this.actorId();
      if (userId) {
        this.schedulePoll(300);
      } else {
        this.stopPoll();
      }
    });
  }

  private actorId(): string {
    return this.store.currentUser()?.id || this.store.apiUser()?.id || '';
  }

  private actorName(): string {
    return this.store.currentUser()?.name || this.store.apiUser()?.name || 'User';
  }

  private actorRole(): string {
    return this.store.currentRole() || 'user';
  }

  private schedulePoll(delayMs?: number) {
    this.stopPoll();
    if (typeof window === 'undefined' || !this.actorId()) return;
    const ms = delayMs ?? (this.callState() === 'idle' ? 1800 : 600);
    this.pollTimer = setTimeout(() => {
      void this.pollSignals();
    }, ms);
  }

  private stopPoll() {
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private async apiRequest(path: string, init: RequestInit = {}): Promise<Response> {
    const token = this.store.apiToken();
    const actorId = this.actorId();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(actorId ? { 'x-actor-user-id': actorId } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((init.headers as Record<string, string>) || {})
    };
    return fetch(path, { ...init, headers });
  }

  private async sendSignal(
    type: IncomingSignal['type'],
    toUserId: string,
    callId: string,
    mediaType: CallMediaType,
    payload?: unknown
  ): Promise<void> {
    if (!this.actorId() || !toUserId || !this.store.isNetworkOnline()) return;
    try {
      await this.apiRequest('/api/calls/signal', {
        method: 'POST',
        body: JSON.stringify({
          callId,
          type,
          mediaType,
          toUserId,
          fromName: this.actorName(),
          fromRole: this.actorRole(),
          payload
        })
      });
    } catch {
      // Ignore transient signaling errors
    }
  }

  private async pollSignals(): Promise<void> {
    if (this.isPolling || !this.actorId() || !this.store.isNetworkOnline()) {
      this.schedulePoll();
      return;
    }
    this.isPolling = true;
    try {
      const res = await this.apiRequest('/api/calls/signals');
      if (res.ok) {
        const data = await res.json();
        const signals: IncomingSignal[] = Array.isArray(data?.signals) ? data.signals : [];
        for (const sig of signals) {
          await this.handleIncomingSignal(sig);
        }
      }
    } catch {
      // Ignore polling failure
    } finally {
      this.isPolling = false;
      this.schedulePoll();
    }
  }

  async startCall(target: CallPeer, mediaType: CallMediaType): Promise<void> {
    const me = this.actorId();
    if (!me) {
      this.alert.error('Not Signed In', 'Please sign in before starting a call.');
      return;
    }
    if (target.id === me) {
      this.alert.info('Cannot Call Self', 'Select another team member to start a call.');
      return;
    }
    if (this.callState() !== 'idle') {
      this.alert.info('Call In Progress', 'Finish your current call before starting a new one.');
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      this.alert.error('Unsupported Browser', 'Your browser does not support in-app audio/video calls.');
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: mediaType === 'video' ? { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } : false
      });
    } catch (err) {
      this.alert.error(
        'Microphone / Camera Blocked',
        'Please allow microphone' + (mediaType === 'video' ? ' and camera' : '') + ' access in your browser to place a call.'
      );
      return;
    }

    const id = `call_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    this.isOutgoingCall = true;
    this.wasConnected = false;
    this.callId.set(id);
    this.peer.set(target);
    this.callType.set(mediaType);
    this.callState.set('outgoing');
    this.isMuted.set(false);
    this.isCameraOff.set(false);
    this.isMinimized.set(false);
    this.callDurationSec.set(0);
    this.hasRemoteVideo.set(false);
    this.localStream.set(stream);
    this.pendingIceCandidates = [];
    this.pendingOffer = null;

    this.createPeerConnection(target.id, id, mediaType, stream);
    this.startRingTone('outgoing');
    this.startRingTimeout();

    await this.sendSignal('invite', target.id, id, mediaType);
    this.schedulePoll(400);
  }

  async acceptIncomingCall(): Promise<void> {
    const currentPeer = this.peer();
    const id = this.callId();
    const mediaType = this.callType();
    if (this.callState() !== 'incoming' || !currentPeer || !id) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      this.alert.error('Unsupported Browser', 'Your browser does not support in-app audio/video calls.');
      await this.rejectIncomingCall();
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: mediaType === 'video' ? { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } : false
      });
    } catch {
      this.alert.error(
        'Permission Denied',
        'Allow microphone' + (mediaType === 'video' ? ' and camera' : '') + ' permissions to answer this call.'
      );
      await this.rejectIncomingCall();
      return;
    }

    this.stopRingTone();
    this.clearRingTimeout();
    this.localStream.set(stream);
    this.callState.set('connecting');
    this.isMuted.set(false);
    this.isCameraOff.set(false);

    this.createPeerConnection(currentPeer.id, id, mediaType, stream);

    await this.sendSignal('accept', currentPeer.id, id, mediaType);

    if (this.pendingOffer) {
      await this.processOfferAndSendAnswer(this.pendingOffer, currentPeer.id, id, mediaType);
      this.pendingOffer = null;
    }
    this.schedulePoll(400);
  }

  async rejectIncomingCall(): Promise<void> {
    const currentPeer = this.peer();
    const id = this.callId();
    const mediaType = this.callType();
    this.logCallOutcome('declined');
    if (currentPeer && id) {
      await this.sendSignal('reject', currentPeer.id, id, mediaType);
    }
    this.cleanupCall();
  }

  async hangUp(): Promise<void> {
    const currentPeer = this.peer();
    const id = this.callId();
    const mediaType = this.callType();
    const state = this.callState();
    this.logCallOutcome(this.wasConnected ? 'answered' : (this.isOutgoingCall ? 'cancelled' : 'missed'));
    if (currentPeer && id) {
      const sigType = state === 'outgoing' ? 'cancel' : 'hangup';
      await this.sendSignal(sigType, currentPeer.id, id, mediaType);
    }
    this.cleanupCall();
  }

  toggleMute(): void {
    const stream = this.localStream();
    if (!stream) return;
    const nextMuted = !this.isMuted();
    for (const track of stream.getAudioTracks()) {
      track.enabled = !nextMuted;
    }
    this.isMuted.set(nextMuted);
  }

  toggleCamera(): void {
    const stream = this.localStream();
    if (!stream || this.callType() !== 'video') return;
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length === 0) {
      void this.enableLocalVideoTrack();
      return;
    }
    const nextOff = !this.isCameraOff();
    for (const track of videoTracks) {
      track.enabled = !nextOff;
    }
    this.isCameraOff.set(nextOff);
  }

  async switchToVideo(): Promise<void> {
    const currentPeer = this.peer();
    const id = this.callId();
    if (!currentPeer || !id || this.callType() === 'video') return;
    if (this.callState() !== 'connected' && this.callState() !== 'connecting' && this.callState() !== 'outgoing') {
      return;
    }
    this.callType.set('video');
    await this.sendSignal('upgrade_video', currentPeer.id, id, 'video');
    await this.enableLocalVideoTrack();
  }

  private async enableLocalVideoTrack(): Promise<void> {
    const stream = this.localStream();
    const currentPeer = this.peer();
    const id = this.callId();
    if (!stream || !currentPeer || !id || !navigator.mediaDevices?.getUserMedia) return;

    try {
      const camStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      const videoTrack = camStream.getVideoTracks()[0];
      if (!videoTrack) return;

      stream.addTrack(videoTrack);
      this.localStream.set(new MediaStream(stream.getTracks()));
      this.isCameraOff.set(false);

      if (this.pc) {
        this.pc.addTrack(videoTrack, stream);
        if (this.callState() === 'connected' || this.callState() === 'connecting') {
          const offer = await this.pc.createOffer();
          await this.pc.setLocalDescription(offer);
          await this.sendSignal('offer', currentPeer.id, id, 'video', offer);
        }
      }
    } catch {
      this.alert.error('Camera Blocked', 'Please allow camera access in your browser to switch to video.');
    }
  }

  toggleMinimize(): void {
    this.isMinimized.update(v => !v);
  }

  private createPeerConnection(
    peerId: string,
    callId: string,
    mediaType: CallMediaType,
    localStream: MediaStream
  ) {
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }

    const pc = new RTCPeerConnection(RTC_CONFIG);
    this.pc = pc;

    for (const track of localStream.getTracks()) {
      pc.addTrack(track, localStream);
    }

    const remote = new MediaStream();
    this.remoteStream.set(remote);

    pc.ontrack = (event) => {
      for (const track of event.streams[0]?.getTracks() || [event.track]) {
        if (!remote.getTracks().some(t => t.id === track.id)) {
          remote.addTrack(track);
        }
        if (track.kind === 'video') {
          this.hasRemoteVideo.set(true);
        }
      }
      // Trigger signal update so video elements re-bind if needed
      this.remoteStream.set(new MediaStream(remote.getTracks()));
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        void this.sendSignal('ice', peerId, callId, mediaType, event.candidate.toJSON());
      }
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      if (state === 'connected') {
        this.wasConnected = true;
        this.stopRingTone();
        this.clearRingTimeout();
        this.callState.set('connected');
        this.startDurationTimer();
      } else if (state === 'failed' || state === 'closed') {
        this.logCallOutcome(this.wasConnected ? 'answered' : 'missed');
        this.alert.info('Call Ended', 'The call connection was closed.');
        this.cleanupCall();
      }
    };
  }

  private async processOfferAndSendAnswer(
    offer: RTCSessionDescriptionInit,
    peerId: string,
    callId: string,
    mediaType: CallMediaType
  ): Promise<void> {
    if (!this.pc) return;
    await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
    await this.flushIceCandidates();
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    await this.sendSignal('answer', peerId, callId, mediaType, answer);
  }

  private async flushIceCandidates(): Promise<void> {
    if (!this.pc || !this.pc.remoteDescription) return;
    const queued = [...this.pendingIceCandidates];
    this.pendingIceCandidates = [];
    for (const candidate of queued) {
      try {
        await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch {
        // Ignore stale ICE candidate
      }
    }
  }

  private async handleIncomingSignal(sig: IncomingSignal): Promise<void> {
    if (sig.type === 'invite') {
      if (this.callState() !== 'idle') {
        await this.sendSignal('busy', sig.fromUserId, sig.callId, sig.mediaType);
        return;
      }
      this.isOutgoingCall = false;
      this.wasConnected = false;
      this.callId.set(sig.callId);
      this.peer.set({
        id: sig.fromUserId,
        name: sig.fromName || 'Team Member',
        role: sig.fromRole || 'user'
      });
      this.callType.set(sig.mediaType || 'audio');
      this.callState.set('incoming');
      this.isMinimized.set(false);
      this.callDurationSec.set(0);
      this.hasRemoteVideo.set(false);
      this.pendingIceCandidates = [];
      this.pendingOffer = null;
      this.startRingTone('incoming');
      this.startRingTimeout();
      return;
    }

    // All other signals must match the active callId
    if (!this.callId() || sig.callId !== this.callId()) return;

    if (sig.type === 'accept') {
      if (this.callState() !== 'outgoing' || !this.pc) return;
      this.stopRingTone();
      this.clearRingTimeout();
      this.callState.set('connecting');
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      await this.sendSignal('offer', sig.fromUserId, sig.callId, this.callType(), offer);
      return;
    }

    if (sig.type === 'upgrade_video') {
      this.callType.set('video');
      if (this.localStream() && this.localStream()!.getVideoTracks().length === 0) {
        this.isCameraOff.set(true);
      }
      return;
    }

    if (sig.type === 'offer') {
      if (!sig.payload) return;
      if (this.pc && (this.callState() === 'connecting' || this.callState() === 'connected')) {
        await this.processOfferAndSendAnswer(sig.payload, sig.fromUserId, sig.callId, this.callType());
      } else {
        this.pendingOffer = sig.payload;
      }
      return;
    }

    if (sig.type === 'answer') {
      if (!this.pc || !sig.payload) return;
      await this.pc.setRemoteDescription(new RTCSessionDescription(sig.payload));
      await this.flushIceCandidates();
      return;
    }

    if (sig.type === 'ice') {
      if (!sig.payload) return;
      if (this.pc && this.pc.remoteDescription) {
        try {
          await this.pc.addIceCandidate(new RTCIceCandidate(sig.payload));
        } catch {
          // Ignore invalid candidate
        }
      } else {
        this.pendingIceCandidates.push(sig.payload);
      }
      return;
    }

    if (sig.type === 'reject') {
      this.logCallOutcome('declined');
      this.alert.info('Call Declined', `${this.peer()?.name || 'User'} declined the call.`);
      this.cleanupCall();
      return;
    }

    if (sig.type === 'busy') {
      this.logCallOutcome('busy');
      this.alert.info('User Busy', `${this.peer()?.name || 'User'} is currently on another call.`);
      this.cleanupCall();
      return;
    }

    if (sig.type === 'cancel' || sig.type === 'hangup') {
      this.logCallOutcome(this.wasConnected ? 'answered' : 'missed');
      this.alert.info('Call Ended', `${this.peer()?.name || 'User'} ended the call.`);
      this.cleanupCall();
    }
  }

  private startDurationTimer() {
    this.stopDurationTimer();
    this.callDurationSec.set(0);
    this.durationTimer = setInterval(() => {
      this.callDurationSec.update(s => s + 1);
    }, 1000);
  }

  private stopDurationTimer() {
    if (this.durationTimer) {
      clearInterval(this.durationTimer);
      this.durationTimer = null;
    }
  }

  private startRingTimeout() {
    this.clearRingTimeout();
    this.ringTimeoutTimer = setTimeout(() => {
      if (this.callState() === 'outgoing' || this.callState() === 'incoming') {
        this.logCallOutcome('missed');
        this.alert.info('No Answer', 'The call was not answered.');
        const currentPeer = this.peer();
        const id = this.callId();
        const mediaType = this.callType();
        if (currentPeer && id && this.isOutgoingCall) {
          void this.sendSignal('cancel', currentPeer.id, id, mediaType);
        }
        this.cleanupCall();
      }
    }, 45_000);
  }

  private logCallOutcome(status: ChatCallLog['status']) {
    const id = this.callId();
    const currentPeer = this.peer();
    const me = this.actorId();
    if (!id || !currentPeer || !me || this.loggedCallIds.has(id)) return;
    this.loggedCallIds.add(id);

    const myName = this.actorName();
    const log: ChatCallLog = {
      callId: id,
      mediaType: this.callType(),
      status,
      durationSec: status === 'answered' ? this.callDurationSec() : undefined,
      callerId: this.isOutgoingCall ? me : currentPeer.id,
      callerName: this.isOutgoingCall ? myName : currentPeer.name,
      calleeId: this.isOutgoingCall ? currentPeer.id : me,
      calleeName: this.isOutgoingCall ? currentPeer.name : myName
    };

    void this.messagesSvc.recordCallLog(log, currentPeer.role || 'staff');
  }

  private clearRingTimeout() {
    if (this.ringTimeoutTimer) {
      clearTimeout(this.ringTimeoutTimer);
      this.ringTimeoutTimer = null;
    }
  }

  private startRingTone(mode: 'incoming' | 'outgoing') {
    this.stopRingTone();
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      this.ringAudioCtx = ctx;

      const playBurst = () => {
        if (!this.ringAudioCtx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(mode === 'incoming' ? 587.33 : 440, now);
        if (mode === 'incoming') {
          osc.frequency.setValueAtTime(783.99, now + 0.16);
        }
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.38);
      };

      playBurst();
      this.ringInterval = setInterval(playBurst, mode === 'incoming' ? 1800 : 2400);
    } catch {
      // Ignore autoplay restrictions
    }
  }

  private stopRingTone() {
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
    if (this.ringAudioCtx) {
      void this.ringAudioCtx.close().catch(() => {});
      this.ringAudioCtx = null;
    }
  }

  private cleanupCall() {
    this.stopRingTone();
    this.clearRingTimeout();
    this.stopDurationTimer();

    if (this.pc) {
      this.pc.ontrack = null;
      this.pc.onicecandidate = null;
      this.pc.onconnectionstatechange = null;
      this.pc.close();
      this.pc = null;
    }

    const local = this.localStream();
    if (local) {
      for (const track of local.getTracks()) track.stop();
    }

    this.localStream.set(null);
    this.remoteStream.set(null);
    this.hasRemoteVideo.set(false);
    this.pendingIceCandidates = [];
    this.pendingOffer = null;
    this.callId.set(null);
    this.peer.set(null);
    this.callState.set('idle');
    this.isOutgoingCall = false;
    this.wasConnected = false;
    this.isMuted.set(false);
    this.isCameraOff.set(false);
    this.isMinimized.set(false);
    this.callDurationSec.set(0);
  }
}
