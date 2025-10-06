import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import {
  getBalance,
  rotateSeed,
  getProvablyFairState,
  getRevealedServerSeed,
  getUserBetHistory,
} from './user.controller';

const router: Router = Router();

router.get('/balance', isAuthenticated, getBalance);
router.post('/rotate-seeds', isAuthenticated, rotateSeed);
router.get('/provably-fair-state', isAuthenticated, getProvablyFairState);
router.get(
  '/unhash-server-seed/:hashedServerSeed',
  isAuthenticated,
  getRevealedServerSeed
);
router.get('/bets', isAuthenticated, getUserBetHistory);

export default router;
