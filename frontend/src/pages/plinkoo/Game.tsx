import { useEffect, useRef, useState } from "react";
import { BallManager } from "../../game/classes/BallManager.ts";
import axios from "axios";
import { Navbar } from "../../components";
import { useUser } from "../../../store/hooks/useUser.ts";

export function Game() {
    const [ballManager, setBallManager] = useState<BallManager>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const user = useUser();
    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';
    const [balance, setBalance] = useState(user.balance);
    const [betAmount, setBetAmount] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [rows, setRows] = useState<number>(16);

    useEffect(() => {
        if (canvasRef.current) {
            const ballManager = new BallManager(canvasRef.current);
            setBallManager(ballManager);
        }
    }, [canvasRef]);

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);

    const handleBet = async () => {
        if(betAmount > balance){
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/plinkoo/game`, {
                    userId: user.id,
                    userBalance: balance,
                    betAmount,
                    difficulty,
                    rows

            });
            if (response.status==200 &&  ballManager) {
                setBalance(balance - betAmount);
                ballManager.addBall(response.data.point);
                await new Promise(resolve => {
                    ballManager.onFinish = () => {
                        setBalance(response.data.newBalance); // Update balance to final balance after ball hits sink
                        resolve();
                    };
                });
            }
        } catch (error) {
            console.error("Error placing bet:", error);
        }
    }

    const handleAddMoney = () => {
        console.log(user)
    }

    if(!user){
        return (
            <>
                Loading....
            </>
        )
    }

    return (
        <div className="bg-[#1a2c38] min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-4">
                <div className="flex items-center justify-center mb-4 gap-8">
                    <div className="bg-gray-800 text-white text-2xl font-bold py-4 px-8 rounded-lg shadow-md flex items-center justify-center">
                        <span className="mr-2">🇮🇳</span> ₹{balance}
                    </div>
                    <button
                        className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-gray-900 text-white py-4 px-8 font-semibold rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:skew-x-12"
                        onClick={handleAddMoney}
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-gray-700"></span>
                        <span className="relative z-10">ADD MONEY</span>
                    </button>

                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                    <div className="bg-[#0e212e] rounded-lg shadow-lg overflow-hidden">
                        <canvas ref={canvasRef} width="750" height="650" className="w-full h-full"></canvas>
                    </div>
                    <div className="bg-[#213743] h-[650px] w-[400px] p-4 rounded-lg shadow-lg flex flex-col items-center">
                        <label className="text-white mb-2 -ml-72">Amount:</label>
                        <input
                            id="betAmount"
                            type="number"
                            value={betAmount}
                            onChange={(e) => setBetAmount(parseInt(e.target.value))}
                            placeholder="Enter Bet Amount"
                            className="bg-[#0e212e] mb-4 w-full px-4 py-2 rounded border-none focus:outline-none focus:bg-gray-600 text-white"
                        />
                        <label className="text-white mb-2 -ml-72">Difficulty:</label>
                        <select
                            id="difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="bg-[#0e212e] mb-4 w-full px-4 py-2 rounded border-none focus:outline-none focus:bg-gray-600 text-white"
                        >
                            <option value="easy">Easy</option>
                        </select>
                        <label className="text-white mb-2 -ml-72">Rows:</label>
                        <select
                            id="rows"
                            value={rows}
                            onChange={(e) => setRows(parseInt(e.target.value))}
                            className="bg-[#0e212e] mb-4 w-full px-4 py-2 rounded border-none focus:outline-none focus:bg-gray-600 text-white"
                        >
                            <option value={16}>16</option>
                        </select>
                        <button className="w-full h-12 font-bold text-2xl mt-4 text-black relative px-8 py-2 rounded-md bg-lime-600 isolation-auto z-10 border-2 border-lime-500
                        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                                onClick={handleBet}
                        >
                            BET
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
