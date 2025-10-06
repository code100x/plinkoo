/*
  Warnings:

  - A unique constraint covering the columns `[betId]` on the table `bets` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bets" ADD COLUMN     "betId" BIGSERIAL NOT NULL;
ALTER SEQUENCE "bets_betId_seq" RESTART WITH 100000000000;

-- CreateIndex
CREATE UNIQUE INDEX "bets_betId_key" ON "bets"("betId");
