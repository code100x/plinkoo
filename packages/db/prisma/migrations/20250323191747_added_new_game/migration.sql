/*
  Warnings:

  - You are about to alter the column `betAmount` on the `bets` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `payoutAmount` on the `bets` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `balance` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterEnum
ALTER TYPE "Game" ADD VALUE 'roulette';

-- AlterTable
ALTER TABLE "bets" ALTER COLUMN "betAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "payoutAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "balance" SET DEFAULT 1000000,
ALTER COLUMN "balance" SET DATA TYPE INTEGER;
