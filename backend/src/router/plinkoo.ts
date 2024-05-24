import { outcomes } from "../outcomes";
import { Router } from "express";
import { db } from "../db";

const router = Router();

const TOTAL_DROPS = 16;

const MULTIPLIERS: { [key: number]: number } = {
    0: 16,
    1: 9,
    2: 2,
    3: 1.4,
    4: 1.4,
    5: 1.2,
    6: 1.1,
    7: 1,
    8: 0.5,
    9: 1,
    10: 1.1,
    11: 1.2,
    12: 1.4,
    13: 1.4,
    14: 2,
    15: 9,
    16: 16
}

router.post("/game", async (req, res) => {
    const { userId, userBalance, betAmount, difficulty, rows } = req.body;
    let outcome = 0;
    const pattern = []
    for (let i = 0; i < TOTAL_DROPS; i++) {
        if (Math.random() > 0.5) {
            pattern.push("R")
            outcome++;
        } else {
            pattern.push("L")
        }
    }

    const multiplier = MULTIPLIERS[outcome];
    const possibleOutcomes = outcomes[outcome];

    const newBalance = (userBalance - betAmount) + (betAmount * multiplier);

    try {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { balance: newBalance }
        });

        res.status(200).json({
            point: possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length || 0)],
            multiplier,
            pattern,
            newBalance
        });
    } catch (error) {
        console.error("Error updating user balance:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

export default router;
