import { Router } from 'express';
import {
  validateBet,
  validateGameConstraints,
} from '../../../middlewares/bet.middleware';
import { placeBet } from './dice.controller';
import { isAuthenticated } from '../../../middlewares/auth.middleware';
import { rateLimitBets } from '../../../middlewares/rateLimit.middleware';

const diceRouter: Router = Router();

diceRouter.post(
  '/place-bet',
  isAuthenticated,
  rateLimitBets({ maxBetsPerMinute: 30 }),
  validateBet,
  validateGameConstraints({ minBetAmount: 0.01 }),
  placeBet
);

export default diceRouter;
