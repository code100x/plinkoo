import type { Request, Response } from 'express';
import type { User } from '@prisma/client';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

// NOTE: Using the default in-memory store from `express-rate-limit`.
// This is intended for single-instance or development environments only.
// For production with multiple instances, replace with a shared store (Redis).

/**
 * Rate limiting middleware for betting
 */
export const rateLimitBets = (options: {
  maxBetsPerMinute?: number;
  maxBetsPerHour?: number;
}) => {
  const max = options.maxBetsPerMinute || 100;

  const limiter = rateLimit({
    // Rate limiter configuration
    windowMs: 15 * 60 * 1000, // 15 minutes
    max,
    keyGenerator: (req: Request) =>
      String((req.user as User)?.id || ipKeyGenerator(req.ip || '')),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    // Using default in-memory store (suitable for single-instance / dev only).

    handler: (req: Request, res: Response) => {
      res.status(429).json({
        message: 'Too many requests - bets limit exceeded',
      });
    },
  });

  return limiter;
};

/**
 * General purpose rate limiter factory for non-bet endpoints.
 * Defaults to 15 minute window with 100 requests per window.
 */
export const rateLimitRequests = (options?: {
  windowMs?: number;
  max?: number;
  message?: string;
}) => {
  const windowMs = options?.windowMs ?? 15 * 60 * 1000;
  const max = options?.max ?? 100;
  const message = options?.message ?? 'Too many requests';

  return rateLimit({
    windowMs,
    max,
    keyGenerator: (req: Request) =>
      String((req.user as User)?.id || ipKeyGenerator(req.ip || '')),
    standardHeaders: true,
    legacyHeaders: false,
    // Using default in-memory store (suitable for single-instance / dev only).
    handler: (_req: Request, res: Response) => {
      res.status(429).json({ message });
    },
  });
};
