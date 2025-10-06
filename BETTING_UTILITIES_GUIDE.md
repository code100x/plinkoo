# Betting Middleware and Utilities Integration Guide

This document explains how to use the new centralized betting validation middleware and utilities across all game controllers.

## Overview

We've created centralized utilities to eliminate code duplication and standardize betting operations:

1. **bet.utils.ts** - Core betting validation and transaction utilities
2. **bet.middleware.ts** - Express middleware for request validation
3. **game.utils.ts** - Game-specific utilities and base classes

## Key Benefits

- ✅ Eliminates duplicate validation logic across game controllers
- ✅ Standardized error handling and response formats
- ✅ Centralized bet amount and balance validation
- ✅ Consistent transaction handling with proper error rollback
- ✅ Type-safe game constraints validation

## Implementation Pattern

### 1. Router Setup

```typescript
import { Router } from 'express';
import {
  validateBet,
  validateGameConstraints,
  requireAuth,
} from '../../../middlewares/bet.middleware';

const gameRouter: Router = Router();

gameRouter.post(
  '/place-bet',
  requireAuth,
  validateBet({
    game: 'dice', // or 'keno', 'roulette', etc.
    minBet: 0.01,
    maxBet: 1000,
  }),
  validateGameConstraints({
    minBetAmount: 0.01,
    maxBetAmount: 1000,
    // Game-specific constraints:
    allowedRiskLevels: ['low', 'medium', 'high'], // for keno
    maxSelections: 10, // for keno/mines
    minSelections: 1,
  }),
  placeBet
);
```

### 2. Controller Implementation

```typescript
import { validateAndCreateBet } from '../../../utils/bet.utils';
import {
  formatGameResponse,
  validateGameInput,
} from '../../../utils/game.utils';

export const placeBet = async (req: Request, res: Response) => {
  const { betAmount /* game-specific params */ } = req.body;

  // Get validated data from middleware
  const validatedBet = req.validatedBet!;
  const userInstance = validatedBet.userInstance;

  // Validate game-specific input
  validateGameInput('dice', { target, condition });

  // Generate game result (game-specific logic)
  const result = getGameResult({ userInstance /* params */ });

  // Calculate payout
  const payoutInCents =
    result.payoutMultiplier > 0
      ? Math.round(validatedBet.betAmountInCents * result.payoutMultiplier)
      : 0;

  // Create bet transaction
  const transaction = await validateAndCreateBet({
    betAmount,
    userId: (req.user as User).id,
    game: 'dice',
    gameState: result.state,
    payoutAmount: payoutInCents / 100,
    active: false,
  });

  // Format and send response
  const response = formatGameResponse(
    {
      gameState: result.state,
      payout: payoutInCents / 100,
      payoutMultiplier: result.payoutMultiplier,
      won: result.payoutMultiplier > 0,
    },
    transaction,
    betAmount
  );

  res.status(StatusCodes.OK).json(
    new ApiResponse(StatusCodes.OK, {
      ...result,
      balance: response.balance,
      id: response.id,
      payout: response.payout,
    })
  );
};
```

## Available Utilities

### bet.utils.ts

- `validateBetAmount()` - Validates bet amount and user balance
- `createBetTransaction()` - Creates bet record and updates balance in transaction
- `validateAndCreateBet()` - Combined validation and transaction creation

### bet.middleware.ts

- `requireAuth` - Ensures user authentication
- `validateBet(options)` - Validates bet amount and balance
- `validateGameConstraints(constraints)` - Validates game-specific constraints
- `validateSchema(schema)` - Validates request body against Zod schema

### game.utils.ts

- `BaseGameService` - Abstract base class for game services
- `createGameConstraints(game)` - Factory for game-specific constraints
- `validateGameInput(game, input)` - Game-specific input validation
- `formatGameResponse()` - Standardized response formatting

## Game-Specific Constraints

### Dice

```typescript
{
  minBetAmount: 0.01,
  maxBetAmount: 1000,
}
```

### Keno

```typescript
{
  minBetAmount: 0.01,
  maxBetAmount: 1000,
  allowedRiskLevels: ['low', 'medium', 'high'],
  maxSelections: 10,
  minSelections: 1,
}
```

### Mines

```typescript
{
  minBetAmount: 0.01,
  maxBetAmount: 1000,
  maxSelections: 24,
  minSelections: 1,
}
```

### Roulette

```typescript
{
  minBetAmount: 0.01,
  maxBetAmount: 500,
}
```

### Blackjack

```typescript
{
  minBetAmount: 0.01,
  maxBetAmount: 1000,
}
```

## Migration Steps

### For Each Game Controller:

1. **Update Router**

   - Add middleware imports
   - Apply `requireAuth`, `validateBet`, `validateGameConstraints`
   - Remove manual authentication checks

2. **Refactor Controller**

   - Remove manual bet validation logic
   - Use `req.validatedBet` for validated data
   - Replace transaction logic with `validateAndCreateBet()`
   - Use `formatGameResponse()` for consistent responses

3. **Remove Duplicate Code**
   - Delete manual balance checks
   - Remove duplicate transaction logic
   - Remove manual error handling for common cases

## Error Handling

All utilities throw standardized errors:

- `BadRequestError` - For validation failures
- `UnAuthenticatedError` - For authentication issues
- Database errors are properly rolled back in transactions

## Type Safety

All utilities are fully typed with TypeScript:

- Request/Response types
- Game enums from Prisma
- Validated bet data structures
- Error response formats

## Testing

Each utility function can be tested independently:

```typescript
// Example test
const result = await validateBetAmount({
  betAmount: 10,
  userId: 'user-id',
  minBet: 1,
  maxBet: 100,
});

expect(result.betAmountInCents).toBe(1000);
```

## Performance Benefits

- Reduced database queries through optimized transactions
- Cached user instances in middleware
- Single validation pass for all bet constraints
- Efficient balance calculations in cents (avoiding floating point issues)

---

This refactoring significantly improves code maintainability, reduces bugs, and makes adding new games much easier.
