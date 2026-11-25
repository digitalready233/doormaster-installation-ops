import type { NextFunction, Request, Response } from 'express';

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimiterOptions {
  windowMs: number;
  max: number;
  message: string;
  key?: (req: Request) => string;
}

export interface RateLimiter {
  (req: Request, res: Response, next: NextFunction): void;
  reset(key: string): void;
}

function clientIp(req: Request): string {
  return req.ip || req.socket?.remoteAddress || 'unknown';
}

/**
 * Small in-memory fixed-window rate limiter for auth endpoints.
 * Suitable for a single API process; use a shared store (Redis) when
 * running multiple backend instances.
 */
export function createRateLimiter(options: RateLimiterOptions): RateLimiter {
  const buckets = new Map<string, Bucket>();
  const getKey = options.key || ((req: Request) => clientIp(req));

  const limiter = ((req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = getKey(req);
    let bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + options.windowMs };
      buckets.set(key, bucket);
    }

    bucket.count += 1;

    // Opportunistic cleanup so the map cannot grow without bound.
    if (buckets.size > 10_000) {
      for (const [entryKey, entry] of buckets) {
        if (entry.resetAt <= now) buckets.delete(entryKey);
      }
    }

    if (bucket.count > options.max) {
      const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      res.setHeader('Retry-After', String(retryAfterSeconds));
      res.status(429).json({
        success: false,
        message: `${options.message} Try again in ${retryAfterSeconds} second(s).`,
      });
      return;
    }

    next();
  }) as RateLimiter;

  limiter.reset = (key: string) => {
    buckets.delete(key);
  };

  return limiter;
}

export function loginRateLimitKey(req: Request): string {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  return `${clientIp(req)}:${email}`;
}
