import type { Request } from 'express';
import type { User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: User;
}
