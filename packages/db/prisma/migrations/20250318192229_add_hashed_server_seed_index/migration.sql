-- CreateIndex
CREATE INDEX "provably_fair_states_hashedServerSeed_revealed_userId_idx" ON "provably_fair_states"("hashedServerSeed", "revealed", "userId");
