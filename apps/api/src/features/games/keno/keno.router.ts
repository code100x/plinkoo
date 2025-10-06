import { Router } from 'express';
import { isAuthenticated } from '../../../middlewares/auth.middleware';
import { placeBet } from './keno.controller';
import { validateBet } from '../../../middlewares/bet.middleware';
import { rateLimitBets } from '../../../middlewares/rateLimit.middleware';

const kenoRouter: Router = Router();

kenoRouter.post(
  '/place-bet',
  isAuthenticated,
  rateLimitBets({ maxBetsPerMinute: 30 }),
  validateBet,
  placeBet
);

export default kenoRouter;
