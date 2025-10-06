import type { Bet } from '@prisma/client';
import db from '@repo/db';
import {
  convertFloatsToGameEvents,
  determineWinner,
  isActionValid,
  getIsPlayerTurnOver,
  playRoundAndUpdateState,
  createInitialGameState,
  getSafeGameState,
} from '@repo/common/game-utils/blackjack/utils.js';
import type {
  BlackjackActions,
  BlackjackGameState,
  BlackjackPlayRoundResponse,
} from '@repo/common/game-utils/blackjack/types.js';
import type { UserInstance } from '../../user/user.service';
import { userManager } from '../../user/user.service';
import { InputJsonObject } from '@prisma/client/runtime/library';

interface GameCreationParams {
  userId: string;
  betAmount: number;
}

class BlackjackManager {
  private static instance: BlackjackManager | undefined;
  private games = new Map<string, BlackjackGame>();

  private constructor() {
    // Initialize any necessary state
  }

  static getInstance() {
    if (!BlackjackManager.instance) {
      BlackjackManager.instance = new BlackjackManager();
    }
    return BlackjackManager.instance;
  }

  async getGame(userId: string): Promise<BlackjackGame | null> {
    if (this.games.has(userId)) {
      return this.games.get(userId) || null;
    }

    const bet = await this.findActiveBet(userId);
    if (!bet) return null;

    const game = await this.createGameFromBet(bet);
    this.games.set(userId, game);
    return game;
  }

  async createGame({ betAmount, userId }: GameCreationParams) {
    const userInstance = await userManager.getUser(userId);
    const gameEvents = this.generateGameEvents(userInstance);

    const bet = await this.createBetTransaction(userInstance, betAmount);
    const game = new BlackjackGame({ bet, gameEvents, isNew: true });

    this.games.set(bet.userId, game);
    return game;
  }

  private async findActiveBet(userId: string): Promise<Bet | null> {
    return db.bet.findFirst({
      where: { userId, active: true, game: 'blackjack' },
    });
  }

  private async createGameFromBet(bet: Bet): Promise<BlackjackGame> {
    const userInstance = await userManager.getUser(bet.userId);
    const gameEvents = this.generateGameEvents(userInstance);
    return new BlackjackGame({ bet, gameEvents, isNew: false });
  }

  private generateGameEvents(userInstance: UserInstance): number[] {
    const floats = userInstance.generateFloats(52);
    return convertFloatsToGameEvents(floats);
  }

  private async createBetTransaction(
    userInstance: UserInstance,
    betAmount: number
  ): Promise<Bet> {
    return db.$transaction(async tx => {
      const bet = await tx.bet.create({
        data: {
          active: true,
          betAmount,
          betNonce: userInstance.getNonce(),
          game: 'blackjack',
          provablyFairStateId: userInstance.getProvablyFairStateId(),
          state: { actions: [['deal']] },
          userId: userInstance.getUser().id,
          payoutAmount: 0,
        },
      });
      await userInstance.updateNonce(tx);
      return bet;
    });
  }

  deleteGame(userId: string) {
    this.games.delete(userId);
  }
}

class BlackjackGame {
  private bet: Bet;
  readonly gameEvents: number[];
  private amountMultiplier = 1;
  private drawIndex = 4; // Start after initial deal
  private gameState: BlackjackGameState;
  private payout = 0;
  private active = false;

  constructor({
    bet,
    gameEvents,
    isNew,
  }: {
    bet: Bet;
    gameEvents: number[];
    isNew: boolean;
  }) {
    this.bet = bet;
    this.gameEvents = gameEvents;
    if (isNew) {
      this.gameState = createInitialGameState(gameEvents);
    } else {
      this.gameState = bet.state as unknown as BlackjackGameState;
    }
    this.active = true;
    if (this.isPlayerTurnComplete()) {
      this.resolveGame();
    }
  }

  getGameState() {
    return this.gameState;
  }

  getSafeGameState() {
    return getSafeGameState(this.gameState);
  }

  getBet() {
    return this.bet;
  }

  getAmountMultiplier(): number {
    return this.amountMultiplier;
  }

  playRound(action: BlackjackActions) {
    this.validateAction(action);
    const moneySpent = this.executeAction(action);
    if (this.isPlayerTurnComplete()) {
      this.resolveGame();
      return this.payout - moneySpent;
    }
    return -moneySpent;
  }

  getDbUpdateObject(isGameCreate = false): null | {
    where: { id: string };
    data:
      | {
          state: InputJsonObject;
        }
      | {
          active: false;
          payoutAmount: number;
          state: InputJsonObject;
        };
  } {
    const playerActions = this.gameState.player.map(hand => hand.actions);

    if (isGameCreate && this.active) {
      return null;
    }

    if (this.active) {
      return {
        where: { id: this.bet.id },
        data: {
          state: this.gameState as unknown as InputJsonObject,
        },
      };
    }
    return {
      where: { id: this.bet.id },
      data: {
        active: false,
        payoutAmount: this.payout,
        state: this.gameState as unknown as InputJsonObject,
      },
    };
  }

  private validateAction(action: BlackjackActions): void {
    if (
      !isActionValid({ gameState: this.gameState, action, active: this.active })
    ) {
      throw new Error(`Invalid action: ${action}`);
    }
  }

  private executeAction(action: BlackjackActions): number {
    const amountMultiplier = this.amountMultiplier;
    const result = playRoundAndUpdateState({
      gameEvents: this.gameEvents,
      drawIndex: this.drawIndex,
      gameState: this.gameState,
      action,
      amountMultiplier,
    });

    this.drawIndex = result.drawIndex;
    this.amountMultiplier = result.amountMultiplier || amountMultiplier;

    return this.bet.betAmount * (this.amountMultiplier - amountMultiplier);
  }

  private isPlayerTurnComplete(): boolean {
    return getIsPlayerTurnOver(
      this.gameState.player.map(({ actions }) => actions)
    );
  }

  getPlayRoundResponse(balance: string) {
    if (!this.active) {
      return this.constructGameOverResponse(balance);
    }
    return this.constructPlayRoundResponse(balance);
  }

  private constructPlayRoundResponse(
    balance: string
  ): BlackjackPlayRoundResponse {
    return {
      id: this.bet.id,
      active: this.active,
      state: getSafeGameState(this.gameState),
      betAmount: this.bet.betAmount / 100, // Convert back to dollars
      amountMultiplier: this.amountMultiplier,
      balance: Number(balance) / 100,
    };
  }

  private constructGameOverResponse(
    balance: string
  ): BlackjackPlayRoundResponse {
    return {
      id: this.bet.id,
      active: this.active,
      state: this.gameState,
      betAmount: this.bet.betAmount / 100, // Convert back to dollars
      amountMultiplier: this.amountMultiplier,
      payout: this.payout / 100, // Convert back to dollars
      payoutMultiplier:
        this.payout / (this.bet.betAmount * this.amountMultiplier),
      balance: Number(balance) / 100,
    };
  }

  private resolveGame(): void {
    const payout = determineWinner(this.gameState, this.bet.betAmount);

    const finalAmount = this.bet.betAmount * this.amountMultiplier + payout;
    this.payout = finalAmount;
    this.active = false;
  }
}

export const blackjackManager = BlackjackManager.getInstance();
