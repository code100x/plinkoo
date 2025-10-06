import type { User } from '@prisma/client';
import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: User | undefined;
}
