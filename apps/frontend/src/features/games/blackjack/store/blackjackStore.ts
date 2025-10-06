import type { BlackjackPlayRoundResponse } from '@repo/common/game-utils/blackjack/types.js';
import { create } from 'zustand';
import { FACE_DOWN_HIDDEN_DEALER_CARD } from '../const';

interface BlackjackStore {
  betAmount: number;
  setBetAmount: (betAmount: number) => void;

  gameState: BlackjackPlayRoundResponse | null;
  setGameState: (
    gameState: BlackjackPlayRoundResponse | null,
    _flipped?: boolean
  ) => void;

  // Animation state management
  cardInDeck: string | null;
  dealingQueue: string[];

  flippedCards: Set<string>;
  incomingCards: Set<string>;

  gameOver: boolean;

  // Actions
  initializeGame: (backendState: BlackjackPlayRoundResponse) => Promise<void>;
  dealNextCard: () => Promise<void>;
  clearTransientCards: () => void;
  playNextRoundHandler: (data: BlackjackPlayRoundResponse) => Promise<void>;
  setActiveGame: (activeGame: BlackjackPlayRoundResponse) => void;
}

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const useBlackjackStore = create<BlackjackStore>((set, get) => ({
  betAmount: 0,
  setBetAmount: betAmount => {
    set({ betAmount });
  },
  gameState: null,

  gameOver: false,

  // Animation state
  dealingQueue: [],
  cardInDeck: null,

  flippedCards: new Set(),
  incomingCards: new Set(),

  setGameState: gameState => {
    set({
      gameState,
    });
  },

  initializeGame: async (backendState: BlackjackPlayRoundResponse) => {
    // Clear existing cards
    set({
      gameOver: false,
      cardInDeck: null,
      flippedCards: new Set(),
      incomingCards: new Set(),
    });

    const { player, dealer } = backendState.state;

    const dealingQueue = [
      player[0].cards[0].id,
      dealer.cards[0].id,
      player[0].cards[1].id,
      'cards' in dealer && dealer.cards.length > 1
        ? dealer.cards[1].id
        : FACE_DOWN_HIDDEN_DEALER_CARD,
    ];

    set({ dealingQueue });
    // Call dealNextCard but don't return the promise
    await get().dealNextCard();

    if (!backendState.active) {
      set({ gameOver: true });
    }
  },

  dealNextCard: async () => {
    const state = get();

    if (state.dealingQueue.length === 0) {
      return;
    }

    // Step 1: Place card in deck
    const nextCard = state.dealingQueue[0];
    const remainingQueue = state.dealingQueue.slice(1);

    set({
      cardInDeck: nextCard,
      dealingQueue: remainingQueue,
    });

    await delay(200); // Wait for the card to be placed in deck

    set(currentState => ({
      incomingCards: new Set(currentState.incomingCards).add(nextCard),
      cardInDeck: null,
    }));

    await delay(400); // Wait for the card to be visible

    set(currentState => ({
      flippedCards: new Set(currentState.flippedCards).add(nextCard),
    }));

    // Step 4: Deal the next card
    await get().dealNextCard();
  },

  playNextRoundHandler: async (data: BlackjackPlayRoundResponse) => {
    const { player, dealer } = data.state;
    const { active } = data;

    const playerRoundCards = player.flatMap(hand =>
      hand.cards.map(card => card.id)
    );

    const dealerRoundCards = dealer.cards.map(card => card.id);

    const newPlayerCards = playerRoundCards.filter(
      cardId => !get().incomingCards.has(cardId)
    );
    const newDealerCards = dealerRoundCards.filter(
      cardId => !get().incomingCards.has(cardId)
    );

    // If game is over (not active) and dealer has a hidden card that needs to be revealed
    if (
      !active &&
      get().incomingCards.has(FACE_DOWN_HIDDEN_DEALER_CARD) &&
      dealer.cards.length > 1
    ) {
      set({ dealingQueue: newPlayerCards });
      await get().dealNextCard();
      const secondDealerCard = dealer.cards[1];

      // Remove the face-down hidden card and add the actual second dealer card
      set(currentState => {
        const newIncomingCards = new Set(currentState.incomingCards);

        // Add the actual second dealer card (but don't flip it yet)
        newIncomingCards.add(secondDealerCard.id);

        return {
          incomingCards: newIncomingCards,
        };
      });

      // Add a delay before flipping the card to create the animation
      await delay(200);

      set(currentState => ({
        flippedCards: new Set(currentState.flippedCards).add(
          secondDealerCard.id
        ),
      }));

      // Filter out the second dealer card from new cards since we just handled it
      const filteredNewDealerCards = newDealerCards.filter(
        cardId => cardId !== secondDealerCard.id
      );
      set({ dealingQueue: filteredNewDealerCards });
    } else {
      const dealingQueue = [...newPlayerCards, ...newDealerCards];
      set({ dealingQueue });
    }

    await get().dealNextCard();

    if (!data.active) {
      set({ gameOver: true });
    }
  },

  clearTransientCards: () => {
    set({
      dealingQueue: [],
      cardInDeck: null,
    });
  },

  setActiveGame: (gameState: BlackjackPlayRoundResponse) => {
    const cardIds = new Set([
      ...gameState.state.dealer.cards.map(card => card.id),
      ...gameState.state.player.flatMap(hand =>
        hand.cards.map(card => card.id)
      ),
      FACE_DOWN_HIDDEN_DEALER_CARD,
    ]);
    set({
      flippedCards: new Set(cardIds),
      incomingCards: new Set(cardIds),
      gameState,
      gameOver: false,
    });
  },
}));

export default useBlackjackStore;
