import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'app-call-overlay',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (callSvc.callState() === 'incoming' && callSvc.peer(); as peer) {
      <!-- Incoming Call Modal -->
      <div class="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
        <div class="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 text-center text-white space-y-5">
          <div class="relative mx-auto w-20 h-20 flex items-center justify-center">
            <span class="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></span>
            <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-black shadow-lg">
              {{ getInitials(peer.name) }}
            </div>
          </div>

          <div class="space-y-1">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ callSvc.callType() === 'video' ? 'videocam' : 'call' }}</mat-icon>
              <span>Incoming {{ callSvc.callType() === 'video' ? 'Video' : 'Voice' }} Call</span>
            </span>
            <h3 class="text-xl font-black tracking-tight pt-1">{{ peer.name }}</h3>
            <p class="text-xs text-slate-400 uppercase font-mono">{{ peer.roleLabel || peer.role }}</p>
          </div>

          <div class="flex items-center justify-center gap-6 pt-2">
            <button
              type="button"
              (click)="callSvc.rejectIncomingCall()"
              class="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-lg flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              title="Decline call"
              aria-label="Decline call"
            >
              <mat-icon class="!text-2xl">call_end</mat-icon>
            </button>

            <button
              type="button"
              (click)="callSvc.acceptIncomingCall()"
              class="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg flex items-center justify-center transition-transform active:scale-90 cursor-pointer animate-bounce"
              title="Accept call"
              aria-label="Accept call"
            >
              <mat-icon class="!text-2xl">{{ callSvc.callType() === 'video' ? 'videocam' : 'call' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>
    } @else if (callSvc.isActive() && callSvc.peer(); as peer) {
      <!-- Always-mounted remote audio element for both voice & video calls -->
      <audio #remoteAudio autoplay playsinline class="hidden"></audio>

      @if (callSvc.isMinimized()) {
        <!-- Minimized Floating Call Pill -->
        <div class="fixed bottom-20 lg:bottom-14 right-4 z-[100] rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-2xl px-3.5 py-2.5 flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <div class="min-w-0">
            <p class="text-xs font-black truncate max-w-[140px]">{{ peer.name }}</p>
            <p class="text-[10px] font-mono text-emerald-400">{{ statusText() }}</p>
          </div>
          <button
            type="button"
            (click)="callSvc.toggleMute()"
            class="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            [class]="callSvc.isMuted() ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white'"
            title="Mute / Unmute"
          >
            <mat-icon class="!text-sm">{{ callSvc.isMuted() ? 'mic_off' : 'mic' }}</mat-icon>
          </button>
          <button
            type="button"
            (click)="callSvc.toggleMinimize()"
            class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
            title="Expand call"
          >
            <mat-icon class="!text-sm">open_in_full</mat-icon>
          </button>
          <button
            type="button"
            (click)="callSvc.hangUp()"
            class="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer"
            title="Cancel / End call"
          >
            <mat-icon class="!text-sm">call_end</mat-icon>
          </button>
        </div>
      } @else {
        <!-- Active / Outgoing / Connecting Voice or Video Call Modal -->
        <div class="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div
            class="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col text-white max-h-[90dvh]"
            [class.h-[540px]]="callSvc.callType() === 'video'"
          >
            <!-- Top Bar -->
            <div class="px-4 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div class="flex items-center gap-2.5 min-w-0">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0"
                  [class]="callSvc.callState() === 'connected' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'"
                ></span>
                <div class="min-w-0">
                  <p class="text-sm font-black truncate">{{ peer.name }}</p>
                  <p class="text-[11px] font-mono text-slate-400">
                    {{ callSvc.callType() === 'video' ? 'Video Call' : 'Voice Call' }} · {{ statusText() }}
                  </p>
                </div>
              </div>
              <button
                type="button"
                (click)="callSvc.toggleMinimize()"
                class="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Minimize call"
              >
                <mat-icon class="!text-lg">close_fullscreen</mat-icon>
              </button>
            </div>

            <!-- Stage Area -->
            <div
              #videoStage
              class="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[260px] select-none"
            >
              @if (callSvc.callType() === 'video') {
                <!-- Main Large Video (Receiver by default; Local when swapped) -->
                <video
                  #mainVideo
                  autoplay
                  playsinline
                  muted
                  class="w-full h-full object-cover"
                  [class.-scale-x-100]="isSwapped()"
                  [class.hidden]="!showMainVideo()"
                ></video>

                @if (!showMainVideo()) {
                  <div class="flex flex-col items-center gap-3 text-center p-6">
                    <div class="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-black shadow-xl">
                      {{ isSwapped() ? 'YOU' : getInitials(peer.name) }}
                    </div>
                    <p class="text-sm font-bold text-slate-300">
                      {{ isSwapped() ? 'Your camera is off' : statusText() }}
                    </p>
                  </div>
                }

                <!-- Main Video Name Tag -->
                <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/65 backdrop-blur-xs border border-white/10 text-[11px] font-bold text-white pointer-events-none">
                  {{ isSwapped() ? 'You' : peer.name }}
                </div>

                <!-- Movable & Click-to-Swap Smaller Video Rectangle (PiP) -->
                <div
                  #pipBox
                  (pointerdown)="onPipPointerDown($event)"
                  (pointermove)="onPipPointerMove($event)"
                  (pointerup)="onPipPointerUp($event)"
                  (pointercancel)="onPipPointerCancel()"
                  [style.left.px]="pipPos() ? pipPos()!.x : null"
                  [style.top.px]="pipPos() ? pipPos()!.y : null"
                  [class.right-3]="!pipPos()"
                  [class.bottom-3]="!pipPos()"
                  [class.cursor-grabbing]="isDraggingPip()"
                  [class.cursor-grab]="!isDraggingPip()"
                  class="absolute z-20 w-32 sm:w-40 aspect-video rounded-2xl overflow-hidden border-2 border-slate-600/90 hover:border-emerald-400 bg-slate-900 shadow-2xl touch-none group transition-colors"
                  title="Drag to move · Click to swap video"
                >
                  <video
                    #pipVideo
                    autoplay
                    playsinline
                    muted
                    class="w-full h-full object-cover pointer-events-none"
                    [class.-scale-x-100]="!isSwapped()"
                    [class.hidden]="!showPipVideo()"
                  ></video>

                  @if (!showPipVideo()) {
                    <div class="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold gap-1 pointer-events-none">
                      <mat-icon class="!text-base">videocam_off</mat-icon>
                      <span>{{ isSwapped() ? peer.name : 'Camera Off' }}</span>
                    </div>
                  }

                  <div class="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-slate-950/70 text-[9px] font-bold text-white pointer-events-none">
                    {{ isSwapped() ? peer.name : 'You' }}
                  </div>
                  <div class="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-950/70 text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <mat-icon class="!text-xs !w-3.5 !h-3.5">swap_horiz</mat-icon>
                  </div>
                </div>
              } @else {
                <!-- Voice Call Stage -->
                <div class="flex flex-col items-center gap-4 p-8 text-center">
                  <div class="relative w-24 h-24 flex items-center justify-center">
                    @if (callSvc.callState() !== 'connected') {
                      <span class="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping"></span>
                    }
                    <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl font-black shadow-xl">
                      {{ getInitials(peer.name) }}
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-black">{{ peer.name }}</h3>
                    <p class="text-xs font-mono text-emerald-400 mt-1">{{ statusText() }}</p>
                  </div>
                </div>
              }
            </div>

            <!-- Bottom Controls Bar -->
            <div class="px-4 sm:px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-3 sm:gap-4 shrink-0 flex-wrap">
              <button
                type="button"
                (click)="callSvc.toggleMute()"
                class="h-11 px-4 rounded-full flex items-center gap-2 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                [class]="callSvc.isMuted() ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white'"
                [title]="callSvc.isMuted() ? 'Unmute microphone' : 'Mute microphone'"
              >
                <mat-icon class="!text-lg">{{ callSvc.isMuted() ? 'mic_off' : 'mic' }}</mat-icon>
                <span class="hidden sm:inline">{{ callSvc.isMuted() ? 'Unmute' : 'Mute' }}</span>
              </button>

              @if (callSvc.callType() === 'audio') {
                <!-- Switch to Video Button in Voice Call Modal -->
                <button
                  type="button"
                  (click)="callSvc.switchToVideo()"
                  class="h-11 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  title="Switch to Video Call"
                >
                  <mat-icon class="!text-lg">videocam</mat-icon>
                  <span>Switch to Video</span>
                </button>
              } @else {
                <button
                  type="button"
                  (click)="callSvc.toggleCamera()"
                  class="h-11 px-4 rounded-full flex items-center gap-2 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  [class]="callSvc.isCameraOff() ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white'"
                  [title]="callSvc.isCameraOff() ? 'Turn camera on' : 'Turn camera off'"
                >
                  <mat-icon class="!text-lg">{{ callSvc.isCameraOff() ? 'videocam_off' : 'videocam' }}</mat-icon>
                  <span class="hidden sm:inline">{{ callSvc.isCameraOff() ? 'Camera Off' : 'Camera On' }}</span>
                </button>
              }

              <!-- Cancel / End Call Button -->
              <button
                type="button"
                (click)="callSvc.hangUp()"
                class="h-11 px-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                [title]="callSvc.callState() === 'connected' ? 'End call' : 'Cancel call'"
              >
                <mat-icon class="!text-lg">call_end</mat-icon>
                <span>{{ callSvc.callState() === 'connected' ? 'End Call' : 'Cancel' }}</span>
              </button>
            </div>
          </div>
        </div>
      }
    }
  `
})
export class CallOverlay {
  readonly callSvc = inject(CallService);

  private readonly mainVideoEl = viewChild<ElementRef<HTMLVideoElement>>('mainVideo');
  private readonly pipVideoEl = viewChild<ElementRef<HTMLVideoElement>>('pipVideo');
  private readonly remoteAudioEl = viewChild<ElementRef<HTMLAudioElement>>('remoteAudio');
  private readonly videoStageEl = viewChild<ElementRef<HTMLDivElement>>('videoStage');
  private readonly pipBoxEl = viewChild<ElementRef<HTMLDivElement>>('pipBox');

  readonly isSwapped = signal(false);
  readonly pipPos = signal<{ x: number; y: number } | null>(null);
  readonly isDraggingPip = signal(false);

  private dragStartClientX = 0;
  private dragStartClientY = 0;
  private dragOriginX = 0;
  private dragOriginY = 0;
  private dragMoved = false;
  private activePointerId: number | null = null;

  constructor() {
    effect(() => {
      if (!this.callSvc.isActive()) {
        this.isSwapped.set(false);
        this.pipPos.set(null);
        this.isDraggingPip.set(false);
      }
    });

    effect(() => {
      const local = this.callSvc.localStream();
      const remote = this.callSvc.remoteStream();
      const swapped = this.isSwapped();

      const mainEl = this.mainVideoEl()?.nativeElement;
      if (mainEl) {
        mainEl.srcObject = swapped ? local : remote;
      }

      const pipEl = this.pipVideoEl()?.nativeElement;
      if (pipEl) {
        pipEl.srcObject = swapped ? remote : local;
      }

      const audioEl = this.remoteAudioEl()?.nativeElement;
      if (audioEl) {
        audioEl.srcObject = remote;
      }
    });
  }

  showMainVideo(): boolean {
    if (this.isSwapped()) {
      const local = this.callSvc.localStream();
      return !this.callSvc.isCameraOff() && !!local && local.getVideoTracks().length > 0;
    }
    return this.callSvc.hasRemoteVideo();
  }

  showPipVideo(): boolean {
    if (this.isSwapped()) {
      return this.callSvc.hasRemoteVideo();
    }
    const local = this.callSvc.localStream();
    return !this.callSvc.isCameraOff() && !!local && local.getVideoTracks().length > 0;
  }

  onPipPointerDown(event: PointerEvent) {
    const stage = this.videoStageEl()?.nativeElement;
    const pip = this.pipBoxEl()?.nativeElement;
    if (!stage || !pip) return;

    const stageRect = stage.getBoundingClientRect();
    const pipRect = pip.getBoundingClientRect();
    const currentX = this.pipPos()?.x ?? (pipRect.left - stageRect.left);
    const currentY = this.pipPos()?.y ?? (pipRect.top - stageRect.top);

    this.activePointerId = event.pointerId;
    this.dragStartClientX = event.clientX;
    this.dragStartClientY = event.clientY;
    this.dragOriginX = currentX;
    this.dragOriginY = currentY;
    this.dragMoved = false;
    this.isDraggingPip.set(true);
    pip.setPointerCapture(event.pointerId);
  }

  onPipPointerMove(event: PointerEvent) {
    if (this.activePointerId !== event.pointerId) return;
    const stage = this.videoStageEl()?.nativeElement;
    const pip = this.pipBoxEl()?.nativeElement;
    if (!stage || !pip) return;

    const dx = event.clientX - this.dragStartClientX;
    const dy = event.clientY - this.dragStartClientY;
    if (!this.dragMoved && Math.hypot(dx, dy) > 6) {
      this.dragMoved = true;
    }

    if (this.dragMoved) {
      const maxX = Math.max(8, stage.clientWidth - pip.offsetWidth - 8);
      const maxY = Math.max(8, stage.clientHeight - pip.offsetHeight - 8);
      const nextX = Math.min(maxX, Math.max(8, this.dragOriginX + dx));
      const nextY = Math.min(maxY, Math.max(8, this.dragOriginY + dy));
      this.pipPos.set({ x: nextX, y: nextY });
    }
  }

  onPipPointerUp(event: PointerEvent) {
    if (this.activePointerId !== event.pointerId) return;
    const pip = this.pipBoxEl()?.nativeElement;
    if (pip && pip.hasPointerCapture(event.pointerId)) {
      pip.releasePointerCapture(event.pointerId);
    }
    const wasMoved = this.dragMoved;
    this.activePointerId = null;
    this.isDraggingPip.set(false);
    this.dragMoved = false;

    // Click without dragging swaps the main video and the smaller rectangle video
    if (!wasMoved) {
      this.isSwapped.update(v => !v);
    }
  }

  onPipPointerCancel() {
    this.activePointerId = null;
    this.isDraggingPip.set(false);
    this.dragMoved = false;
  }

  getInitials(name: string): string {
    const parts = (name || 'U').trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  statusText(): string {
    switch (this.callSvc.callState()) {
      case 'outgoing': return 'Ringing...';
      case 'incoming': return 'Incoming call...';
      case 'connecting': return 'Connecting...';
      case 'connected': {
        const sec = this.callSvc.callDurationSec();
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
      default: return '';
    }
  }
}
