import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { InstallationStore } from './installation.store';
import { AppUser, RoleType } from '../models/installation.model';

export interface ChatAttachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  dataUrl: string;
  kind: 'image' | 'audio' | 'file';
  durationSec?: number;
}

export interface ChatLocationShare {
  latitude: number;
  longitude: number;
  label?: string;
}

export interface ChatReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface ChatCallLog {
  callId: string;
  mediaType: 'audio' | 'video';
  status: 'answered' | 'missed' | 'declined' | 'cancelled' | 'busy';
  durationSec?: number;
  callerId: string;
  callerName: string;
  calleeId: string;
  calleeName: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string;
  recipientName: string;
  recipientRole: string;
  text: string;
  replyToId?: string | null;
  jobId?: string | null;
  attachments?: ChatAttachment[];
  location?: ChatLocationShare | null;
  callLog?: ChatCallLog | null;
  reactions?: ChatReaction[];
  createdAt: string;
  editedAt?: string | null;
  readAt?: string | null;
  deletedForEveryone?: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  role: RoleType;
  roleLabel: string;
  phone?: string;
  branchId?: string | null;
  branchName?: string;
  isOnline: boolean;
  isTyping: boolean;
  unreadCount: number;
  lastMessage?: ChatMessage | null;
}

const STORAGE_KEY = 'dm_chat_messages_v1';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly store = inject(InstallationStore);

  readonly messages = signal<ChatMessage[]>(this.readLocal());
  readonly typingFromIds = signal<string[]>([]);
  readonly activePeerId = signal<string | null>(null);
  readonly isSyncing = signal<boolean>(false);

  private pollTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const userId = this.currentActorId();
      if (userId) {
        void this.syncThreads();
      }
    });

    if (typeof window !== 'undefined') {
      this.pollTimer = setInterval(() => {
        if (this.currentActorId() && this.store.isNetworkOnline()) {
          void this.syncThreads();
        }
      }, 3500);
    }
  }

  readonly currentActorId = computed<string>(() => {
    return this.store.currentUser()?.id || this.store.apiUser()?.id || '';
  });

  readonly currentActorName = computed<string>(() => {
    return this.store.currentUser()?.name || this.store.apiUser()?.name || 'User';
  });

  readonly currentActorRole = computed<RoleType>(() => {
    return this.store.currentRole();
  });

  readonly totalUnreadCount = computed<number>(() => {
    const me = this.currentActorId();
    if (!me) return 0;
    const allowedIds = new Set(this.eligibleContacts().map(c => c.id));
    return this.messages().filter(
      m => m.recipientId === me && !m.readAt && !m.deletedForEveryone && allowedIds.has(m.senderId)
    ).length;
  });

  /**
   * Resolves all branch IDs associated with a user (explicit branchId + branches of assigned jobs).
   */
  private getUserBranchKeys(userId: string, user?: Partial<AppUser>): Set<string> {
    const keys = new Set<string>();
    if (user?.shopId) keys.add(String(user.shopId));

    for (const job of this.store.jobs()) {
      const assignedToUser =
        job.assignedInstallerId === userId ||
        (Array.isArray(job.assignedInstallerIds) && job.assignedInstallerIds.includes(userId)) ||
        job.dispatcherId === userId ||
        job.shopBooking?.bookedByShopManager === user?.name;
      if (assignedToUser) {
        const b = this.store.getJobBranch(job);
        if (b?.id !== undefined && b?.id !== null) keys.add(String(b.id));
        if (b?.shopName) keys.add(b.shopName.trim().toLowerCase());
        if (job.shopBranch) keys.add(job.shopBranch.trim().toLowerCase());
      }
    }
    return keys;
  }

  private sharesBranch(aKeys: Set<string>, bKeys: Set<string>): boolean {
    if (aKeys.size === 0 || bKeys.size === 0) return false;
    for (const k of aKeys) {
      if (bKeys.has(k)) return true;
    }
    return false;
  }

  private formatRoleLabel(role: RoleType): string {
    switch (role) {
      case 'shop_manager':
        return 'Shop Attendant';
      case 'account_officer':
        return 'Finance Officer';
      case 'manager':
        return 'Manager';
      case 'admin':
        return 'Admin';
      case 'dispatcher':
        return 'Driver';
      case 'installer':
        return 'Installer';
      default:
        return String(role || 'Staff');
    }
  }

  /**
   * Eligible chat contacts scoped by role and branch:
   * - Drivers & Installers <-> Branch Shop Attendant, Finance Officer, Manager (and Admin)
   * - Shop Attendants <-> Their Branch Drivers & Installers, Finance Officer, Manager
   * - Finance Officer / Manager / Admin <-> Drivers, Installers, Shop Attendants, Finance, Managers
   */
  readonly eligibleContacts = computed<ChatContact[]>(() => {
    const meId = this.currentActorId();
    const myRole = this.currentActorRole();
    const allUsers = this.store.users().filter(u => u.id !== meId && (u.status || 'active') === 'active');
    const meUser = this.store.users().find(u => u.id === meId) || (this.store.currentUser() as unknown as AppUser);
    const myBranches = this.getUserBranchKeys(meId, meUser);
    const lives = this.store.liveLocations();
    const typingSet = new Set(this.typingFromIds());
    const allMessages = this.messages();
    const branches = this.store.branches();

    const isFieldCrew = myRole === 'installer' || myRole === 'dispatcher';
    const isShop = myRole === 'shop_manager';
    const isOversight = myRole === 'account_officer' || myRole === 'manager' || myRole === 'admin';

    const branchShopManagers = allUsers.filter(u => {
      if (u.role !== 'shop_manager') return false;
      const uBranches = this.getUserBranchKeys(u.id, u);
      return this.sharesBranch(myBranches, uBranches);
    });

    const branchFieldCrew = allUsers.filter(u => {
      if (u.role !== 'installer' && u.role !== 'dispatcher') return false;
      const uBranches = this.getUserBranchKeys(u.id, u);
      return this.sharesBranch(myBranches, uBranches);
    });

    const filteredUsers = allUsers.filter(u => {
      if (u.role === 'client') return false;
      if (isFieldCrew) {
        if (u.role === 'account_officer' || u.role === 'manager' || u.role === 'admin') return true;
        if (u.role === 'shop_manager') {
          if (branchShopManagers.length > 0) {
            return branchShopManagers.some(b => b.id === u.id);
          }
          return true;
        }
        return false;
      }
      if (isShop) {
        if (u.role === 'account_officer' || u.role === 'manager' || u.role === 'admin') return true;
        if (u.role === 'installer' || u.role === 'dispatcher') {
          if (branchFieldCrew.length > 0) {
            return branchFieldCrew.some(c => c.id === u.id);
          }
          return true;
        }
        return u.role === 'shop_manager';
      }
      if (isOversight) {
        return ['installer', 'dispatcher', 'shop_manager', 'account_officer', 'manager', 'admin'].includes(u.role);
      }
      return true;
    });

    const contacts: ChatContact[] = filteredUsers.map(u => {
      const threadMsgs = allMessages.filter(
        m => (m.senderId === meId && m.recipientId === u.id) || (m.senderId === u.id && m.recipientId === meId)
      );
      const lastMessage = threadMsgs.length > 0 ? threadMsgs[threadMsgs.length - 1] : null;
      const unreadCount = threadMsgs.filter(
        m => m.senderId === u.id && m.recipientId === meId && !m.readAt && !m.deletedForEveryone
      ).length;
      const liveMatch = lives.find(l => l.userId === u.id || (l.userName || '').trim().toLowerCase() === u.name.trim().toLowerCase());
      const branchObj = u.shopId ? branches.find(b => String(b.id) === String(u.shopId)) : undefined;
      const branchName = branchObj?.shopName || '';

      return {
        id: u.id,
        name: u.name,
        role: u.role,
        roleLabel: this.formatRoleLabel(u.role),
        phone: u.phone,
        branchId: u.shopId ?? null,
        branchName,
        isOnline: liveMatch ? liveMatch.status !== 'offline' : false,
        isTyping: typingSet.has(u.id),
        unreadCount,
        lastMessage
      };
    });

    // Sort by latest message timestamp desc, then unread desc, then role priority & name
    return contacts.sort((a, b) => {
      const aTime = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const bTime = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
      if (aTime !== bTime) return bTime - aTime;
      if (a.unreadCount !== b.unreadCount) return b.unreadCount - a.unreadCount;
      return a.name.localeCompare(b.name);
    });
  });

  readonly activeThreadMessages = computed<ChatMessage[]>(() => {
    const me = this.currentActorId();
    const peer = this.activePeerId();
    if (!me || !peer) return [];
    return this.messages()
      .filter(m => (m.senderId === me && m.recipientId === peer) || (m.senderId === peer && m.recipientId === me))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });

  private readLocal(): ChatMessage[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private saveLocal(list: ChatMessage[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // Ignore storage quota warnings on large attachments
    }
  }

  private mergeMessages(serverList: ChatMessage[]) {
    const localList = this.messages();
    const map = new Map<string, ChatMessage>();
    for (const m of localList) {
      if (!m.id.startsWith('tmp-')) map.set(m.id, m);
    }
    for (const m of serverList) {
      map.set(m.id, m);
    }
    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    this.messages.set(merged);
    this.saveLocal(merged);
  }

  private actorHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const actorId = this.currentActorId();
    if (actorId) headers['x-actor-user-id'] = actorId;
    return headers;
  }

  private apiBase(): string {
    return '';
  }

  private async safeJson(res: Response): Promise<any | null> {
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) return null;
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  private async apiRequest(path: string, init: RequestInit = {}): Promise<Response> {
    const token = this.store.apiToken();
    const headers: Record<string, string> = {
      ...this.actorHeaders(),
      ...((init.headers as Record<string, string>) || {})
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return fetch(`${this.apiBase()}${path}`, { ...init, headers });
  }

  async syncThreads(): Promise<void> {
    const actorId = this.currentActorId();
    if (!actorId || !this.store.isNetworkOnline()) return;
    try {
      const res = await this.apiRequest(`/api/messages/threads?actorId=${encodeURIComponent(actorId)}`);
      if (res.ok) {
        const data = await this.safeJson(res);
        if (data?.success && Array.isArray(data.messages)) {
          this.mergeMessages(data.messages);
          this.typingFromIds.set(Array.isArray(data.typingFromIds) ? data.typingFromIds : []);
        }
      }
    } catch {
      // Offline / local mode resilience
    }
  }

  async openConversation(peerId: string): Promise<void> {
    this.activePeerId.set(peerId);
    await this.markThreadRead(peerId);
  }

  async markThreadRead(peerId: string): Promise<void> {
    const me = this.currentActorId();
    if (!me || !peerId) return;
    const nowIso = new Date().toISOString();
    let changed = false;
    this.messages.update(list =>
      list.map(m => {
        if (m.senderId === peerId && m.recipientId === me && !m.readAt) {
          changed = true;
          return { ...m, readAt: nowIso };
        }
        return m;
      })
    );
    if (changed) {
      this.saveLocal(this.messages());
      if (this.store.isNetworkOnline()) {
        try {
          await this.apiRequest('/api/messages/read', {
            method: 'POST',
            body: JSON.stringify({ actorId: me, peerId })
          });
        } catch {
          // Ignore network error
        }
      }
    }
  }

  async sendMessage(payload: {
    peer: ChatContact;
    text: string;
    replyToId?: string | null;
    jobId?: string | null;
    attachments?: ChatAttachment[];
    location?: ChatLocationShare | null;
  }): Promise<void> {
    const me = this.currentActorId();
    if (!me) return;
    const trimmed = payload.text.trim();
    if (!trimmed && (!payload.attachments || payload.attachments.length === 0) && !payload.location) {
      return;
    }

    const tempId = `tmp-${Date.now()}`;
    const optimistic: ChatMessage = {
      id: tempId,
      senderId: me,
      senderName: this.currentActorName(),
      senderRole: this.currentActorRole(),
      recipientId: payload.peer.id,
      recipientName: payload.peer.name,
      recipientRole: payload.peer.role,
      text: trimmed,
      replyToId: payload.replyToId || null,
      jobId: payload.jobId || null,
      attachments: payload.attachments || [],
      location: payload.location || null,
      reactions: [],
      createdAt: new Date().toISOString(),
      editedAt: null,
      readAt: null
    };

    this.messages.update(list => [...list, optimistic]);
    this.saveLocal(this.messages());

    if (!this.store.isNetworkOnline()) return;

    try {
      const res = await this.apiRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify({
          senderId: me,
          senderName: this.currentActorName(),
          senderRole: this.currentActorRole(),
          recipientId: payload.peer.id,
          recipientName: payload.peer.name,
          recipientRole: payload.peer.role,
          text: trimmed,
          replyToId: payload.replyToId || null,
          jobId: payload.jobId || null,
          attachments: payload.attachments || [],
          location: payload.location || null
        })
      });
      if (res.ok) {
        const data = await this.safeJson(res);
        if (data?.success && data.message) {
          this.messages.update(list => list.map(m => (m.id === tempId ? data.message : m)));
          this.saveLocal(this.messages());
        }
      }
    } catch {
      // Keep optimistic message locally
    }
  }

  async editMessage(messageId: string, newText: string): Promise<void> {
    const me = this.currentActorId();
    const trimmed = newText.trim();
    if (!me || !trimmed) return;
    const nowIso = new Date().toISOString();
    this.messages.update(list =>
      list.map(m => (m.id === messageId && m.senderId === me ? { ...m, text: trimmed, editedAt: nowIso } : m))
    );
    this.saveLocal(this.messages());

    if (this.store.isNetworkOnline() && !messageId.startsWith('tmp-')) {
      try {
        await this.apiRequest(`/api/messages/${encodeURIComponent(messageId)}`, {
          method: 'PATCH',
          body: JSON.stringify({ actorId: me, text: trimmed })
        });
      } catch {
        // Ignore
      }
    }
  }

  async deleteMessage(messageId: string): Promise<void> {
    const me = this.currentActorId();
    if (!me) return;
    const nowIso = new Date().toISOString();
    this.messages.update(list =>
      list.map(m =>
        m.id === messageId && m.senderId === me
          ? { ...m, text: 'This message was deleted', attachments: [], location: null, deletedForEveryone: true, editedAt: nowIso }
          : m
      )
    );
    this.saveLocal(this.messages());

    if (this.store.isNetworkOnline() && !messageId.startsWith('tmp-')) {
      try {
        await this.apiRequest(`/api/messages/${encodeURIComponent(messageId)}?actorId=${encodeURIComponent(me)}`, {
          method: 'DELETE'
        });
      } catch {
        // Ignore
      }
    }
  }

  async toggleReaction(messageId: string, emoji: string): Promise<void> {
    const me = this.currentActorId();
    const myName = this.currentActorName();
    if (!me) return;
    this.messages.update(list =>
      list.map(m => {
        if (m.id !== messageId) return m;
        const reactions = [...(m.reactions || [])];
        const existingIdx = reactions.findIndex(r => r.userId === me && r.emoji === emoji);
        if (existingIdx >= 0) {
          reactions.splice(existingIdx, 1);
        } else {
          const userIdx = reactions.findIndex(r => r.userId === me);
          if (userIdx >= 0) {
            reactions[userIdx] = { emoji, userId: me, userName: myName };
          } else {
            reactions.push({ emoji, userId: me, userName: myName });
          }
        }
        return { ...m, reactions };
      })
    );
    this.saveLocal(this.messages());

    if (this.store.isNetworkOnline() && !messageId.startsWith('tmp-')) {
      try {
        await this.apiRequest(`/api/messages/${encodeURIComponent(messageId)}/react`, {
          method: 'POST',
          body: JSON.stringify({ actorId: me, actorName: myName, emoji })
        });
      } catch {
        // Ignore
      }
    }
  }

  async notifyTyping(peerId: string, isTyping: boolean): Promise<void> {
    const me = this.currentActorId();
    if (!me || !peerId || !this.store.isNetworkOnline()) return;
    try {
      await this.apiRequest('/api/messages/typing', {
        method: 'POST',
        body: JSON.stringify({ actorId: me, peerId, isTyping })
      });
    } catch {
      // Ignore
    }
  }

  async recordCallLog(callLog: ChatCallLog, peerRole = 'staff'): Promise<void> {
    const me = this.currentActorId();
    if (!me || !callLog.callId) return;

    // Deduplicate locally by callId
    if (this.messages().some(m => m.callLog?.callId === callLog.callId)) {
      return;
    }

    const otherId = callLog.callerId === me ? callLog.calleeId : callLog.callerId;
    const otherName = callLog.callerId === me ? callLog.calleeName : callLog.callerName;
    const myName = this.currentActorName();
    const myRole = this.currentActorRole();

    const tempId = `tmp-call-${callLog.callId}`;
    const optimistic: ChatMessage = {
      id: tempId,
      senderId: callLog.callerId,
      senderName: callLog.callerName,
      senderRole: callLog.callerId === me ? myRole : peerRole,
      recipientId: callLog.calleeId,
      recipientName: callLog.calleeName,
      recipientRole: callLog.calleeId === me ? myRole : peerRole,
      text: '',
      callLog,
      reactions: [],
      createdAt: new Date().toISOString(),
      readAt: null
    };

    this.messages.update(list => [...list, optimistic]);
    this.saveLocal(this.messages());

    if (this.store.isNetworkOnline()) {
      try {
        const res = await this.apiRequest('/api/messages', {
          method: 'POST',
          body: JSON.stringify({
            actorId: me,
            actorName: myName,
            actorRole: myRole,
            recipientId: otherId,
            recipientName: otherName,
            recipientRole: peerRole,
            text: '',
            callLog
          })
        });
        const data = await this.safeJson(res);
        if (res.ok && data?.message) {
          this.messages.update(list => {
            const withoutTemp = list.filter(m => m.id !== tempId && m.callLog?.callId !== callLog.callId);
            return [...withoutTemp, data.message as ChatMessage].sort(
              (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          });
          this.saveLocal(this.messages());
        }
      } catch {
        // Keep optimistic local record if offline
      }
    }
  }
}
