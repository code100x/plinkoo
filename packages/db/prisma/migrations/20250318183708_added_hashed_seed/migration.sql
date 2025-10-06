/*
  Warnings:

  - Added the required column `hashedServerSeed` to the `provably_fair_states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "provably_fair_states" ADD COLUMN     "hashedServerSeed" TEXT NOT NULL;
