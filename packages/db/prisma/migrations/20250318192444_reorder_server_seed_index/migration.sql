-- DropIndex
DROP INDEX "provably_fair_states_hashedServerSeed_revealed_userId_idx";

-- CreateIndex
CREATE INDEX "provably_fair_states_userId_revealed_hashedServerSeed_idx" ON "provably_fair_states"("userId", "revealed", "hashedServerSeed");
