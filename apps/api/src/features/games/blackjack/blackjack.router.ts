import { Router } from 'express';
import { isAuthenticated } from '../../../middlewares/auth.middleware';
import { blackjackNext, getActiveGame, placeBet } from './blackjack.controller';
import { rateLimitBets } from '../../../middlewares/rateLimit.middleware';

const blackjackRouter: Router = Router();

blackjackRouter.post(
  '/bet',
  isAuthenticated,
  rateLimitBets({ maxBetsPerMinute: 30 }),
  placeBet
);
blackjackRouter.post('/next', isAuthenticated, blackjackNext);
blackjackRouter.get('/active', isAuthenticated, getActiveGame);

export default blackjackRouter;
