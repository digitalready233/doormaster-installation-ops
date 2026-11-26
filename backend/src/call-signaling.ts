export type CallMediaType = 'audio' | 'video';

export type CallSignalType =
  | 'invite'
  | 'accept'
  | 'reject'
  | 'cancel'
  | 'hangup'
  | 'busy'
  | 'upgrade_video'
  | 'offer'
  | 'answer'
  | 'ice';

export interface CallSignal {
  id: string;
  callId: string;
  type: CallSignalType;
  mediaType: CallMediaType;
  fromUserId: string;
  fromName: string;
  fromRole: string;
  toUserId: string;
  payload?: unknown;
  createdAt: number;
}

const SIGNAL_TTL_MS = 60_000;
const queues = new Map<string, CallSignal[]>();

function pruneExpired(list: CallSignal[], now: number): CallSignal[] {
  return list.filter((s) => now - s.createdAt <= SIGNAL_TTL_MS);
}

export function enqueueCallSignal(input: Omit<CallSignal, 'id' | 'createdAt'>): CallSignal {
  const now = Date.now();
  const signal: CallSignal = {
    ...input,
    id: `sig_${now}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
  };
  const existing = pruneExpired(queues.get(input.toUserId) || [], now);
  existing.push(signal);
  // Cap per-user queue to avoid unbounded growth
  if (existing.length > 200) {
    existing.splice(0, existing.length - 200);
  }
  queues.set(input.toUserId, existing);
  return signal;
}

export function consumeCallSignals(userId: string): CallSignal[] {
  const now = Date.now();
  const existing = queues.get(userId);
  if (!existing || existing.length === 0) return [];
  queues.delete(userId);
  return pruneExpired(existing, now);
}
