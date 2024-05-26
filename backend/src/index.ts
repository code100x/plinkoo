
import express from "express";
import { outcomes } from "./outcomes";
import cors from "cors";
import { getObstacles } from "./utils/game";
import { pad, unpad } from "./constants/padding";
import { WIDTH, ballRadius, horizontalFriction, verticalFriction } from "./constants";

const app = express();
app.use(cors())

const TOTAL_DROPS = 16;

const MULTIPLIERS: { [key: number]: number } = {
    0: 5,
    1: 3,
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
    15: 3,
    16: 5
}
app.post("/stake", (req, res) => {

})
app.post("/game", (req, res) => {
    let outcome = 0;
    const pattern: Array<'L' | 'R'> = []
    const obstacles = getObstacles()

    let possiblieOutcomes = outcomes[outcome];
    const startX = possiblieOutcomes[Math.floor(Math.random() * possiblieOutcomes.length)] || pad(WIDTH / 2 + 13)
    const startY = pad(50)
    let x = startX
    let y = startY
    let vx = 0
    let vy = 0
    // Collision with obstacles
    obstacles.forEach(obstacle => {
        const dist = Math.hypot(x - obstacle.x, y - obstacle.y);
        if (dist < pad(ballRadius + obstacle.radius)) {
            // Calculate collision angle
            const angle = Math.atan2(y - obstacle.y, x - obstacle.x);
            // Reflect velocity
            const speed = Math.sqrt(vx * vx + vy * vy);
            vx = (Math.cos(angle) * speed * horizontalFriction);
            vy = Math.sin(angle) * speed * verticalFriction;

            // Adjust position to prevent sticking
            const overlap = ballRadius + obstacle.radius - unpad(dist);
            x += pad(Math.cos(angle) * overlap);
            y += pad(Math.sin(angle) * overlap);
            if (pad(Math.cos(angle) * overlap) > 0) {
                pattern.push('R');
                outcome++
            } else {
                pattern.push('L')
                outcome--;
            }
        }
    });
    console.log("Outcomes : ", outcome)
    const multiplier = MULTIPLIERS[outcome];



    res.send({
        point: startX,
        multiplier,
        pattern
    });
});

app.listen(3000)

// for (let i = 0; i < TOTAL_DROPS; i++) {
//     if (Math.random() > 0.5) {
//         pattern.push("R")
//         outcome++;
//     } else {
//         pattern.push("L")
//     }
// }