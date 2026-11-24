import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

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
  reactions?: ChatReaction[];
  createdAt: string;
  editedAt?: string | null;
  readAt?: string | null;
  deletedForEveryone?: boolean;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

let messagesCache: ChatMessage[] | null = null;
let writeQueue: Promise<void> = Promise.resolve();

// Ephemeral typing status: `${senderId}::${recipientId}` -> expiresAtMs
const typingMap = new Map<string, number>();

async function ensureLoaded(): Promise<ChatMessage[]> {
  if (messagesCache !== null) return messagesCache;
  try {
    const raw = await fs.readFile(MESSAGES_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    messagesCache = Array.isArray(parsed) ? parsed : [];
  } catch {
    messagesCache = [];
  }
  return messagesCache;
}

function persistMessages(list: ChatMessage[]): Promise<void> {
  messagesCache = list;
  const payload = JSON.stringify(list, null, 2);
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(MESSAGES_FILE, payload, 'utf8');
  }).catch(err => {
    console.error('[Messages] Persist failed:', err);
  });
  return writeQueue;
}

export async function getUserThreadsAndMessages(userId: string): Promise<{
  messages: ChatMessage[];
  typingFromIds: string[];
}> {
  const all = await ensureLoaded();
  const mine = all.filter(m => m.senderId === userId || m.recipientId === userId);
  const now = Date.now();
  const typingFromIds: string[] = [];
  for (const [key, expiresAt] of typingMap.entries()) {
    if (expiresAt <= now) {
      typingMap.delete(key);
      continue;
    }
    const [fromId, toId] = key.split('::');
    if (toId === userId && fromId) {
      typingFromIds.push(fromId);
    }
  }
  return { messages: mine, typingFromIds };
}

export async function getConversationMessages(userId: string, peerId: string): Promise<ChatMessage[]> {
  const all = await ensureLoaded();
  return all.filter(
    m =>
      (m.senderId === userId && m.recipientId === peerId) ||
      (m.senderId === peerId && m.recipientId === userId)
  );
}

export async function createChatMessage(input: {
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
}): Promise<ChatMessage> {
  const all = await ensureLoaded();
  const msg: ChatMessage = {
    id: `msg-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
    senderId: input.senderId,
    senderName: input.senderName,
    senderRole: input.senderRole,
    recipientId: input.recipientId,
    recipientName: input.recipientName,
    recipientRole: input.recipientRole,
    text: (input.text || '').trim(),
    replyToId: input.replyToId || null,
    jobId: input.jobId || null,
    attachments: Array.isArray(input.attachments) ? input.attachments : [],
    location: input.location || null,
    reactions: [],
    createdAt: new Date().toISOString(),
    editedAt: null,
    readAt: null,
    deletedForEveryone: false
  };
  const next = [...all, msg];
  await persistMessages(next);
  typingMap.delete(`${input.senderId}::${input.recipientId}`);
  return msg;
}

export async function editChatMessage(id: string, userId: string, text: string): Promise<ChatMessage | null> {
  const all = await ensureLoaded();
  let updated: ChatMessage | null = null;
  const next = all.map(m => {
    if (m.id === id && m.senderId === userId && !m.deletedForEveryone) {
      updated = {
        ...m,
        text: text.trim(),
        editedAt: new Date().toISOString()
      };
      return updated;
    }
    return m;
  });
  if (updated) {
    await persistMessages(next);
  }
  return updated;
}

export async function deleteChatMessage(id: string, userId: string): Promise<ChatMessage | null> {
  const all = await ensureLoaded();
  let updated: ChatMessage | null = null;
  const next = all.map(m => {
    if (m.id === id && m.senderId === userId) {
      updated = {
        ...m,
        text: 'This message was deleted',
        attachments: [],
        location: null,
        deletedForEveryone: true,
        editedAt: new Date().toISOString()
      };
      return updated;
    }
    return m;
  });
  if (updated) {
    await persistMessages(next);
  }
  return updated;
}

export async function toggleMessageReaction(
  id: string,
  userId: string,
  userName: string,
  emoji: string
): Promise<ChatMessage | null> {
  const all = await ensureLoaded();
  let updated: ChatMessage | null = null;
  const next = all.map(m => {
    if (m.id !== id) return m;
    const reactions = [...(m.reactions || [])];
    const existingIdx = reactions.findIndex(r => r.userId === userId && r.emoji === emoji);
    if (existingIdx >= 0) {
      reactions.splice(existingIdx, 1);
    } else {
      // One reaction per user per message (like WhatsApp)
      const userIdx = reactions.findIndex(r => r.userId === userId);
      if (userIdx >= 0) {
        reactions[userIdx] = { emoji, userId, userName };
      } else {
        reactions.push({ emoji, userId, userName });
      }
    }
    updated = { ...m, reactions };
    return updated;
  });
  if (updated) {
    await persistMessages(next);
  }
  return updated;
}

export async function markConversationRead(userId: string, peerId: string): Promise<number> {
  const all = await ensureLoaded();
  const nowIso = new Date().toISOString();
  let count = 0;
  const next = all.map(m => {
    if (m.senderId === peerId && m.recipientId === userId && !m.readAt) {
      count++;
      return { ...m, readAt: nowIso };
    }
    return m;
  });
  if (count > 0) {
    await persistMessages(next);
  }
  return count;
}

export function setTypingStatus(senderId: string, recipientId: string, isTyping: boolean): void {
  const key = `${senderId}::${recipientId}`;
  if (isTyping) {
    typingMap.set(key, Date.now() + 6000);
  } else {
    typingMap.delete(key);
  }
}
