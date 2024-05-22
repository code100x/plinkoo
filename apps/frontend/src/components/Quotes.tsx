import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";

export const Quotes = () => {
  const navigate = useNavigate();
  return (
    <div className="flex mx-16 flex-col justify-center pb-10 ">
      <h1 className="text-6xl font-bold">Play Plinko, Earn More!</h1>
      <h3 className="mt-4 text-xl mb-4">
        Plinko lets players drop a ball from the top of our triangular pin
        pyramid to find the winning route down to a corresponding multiplier.
        Inspired by the Japanese mechanical game known as Pachinko, Plinko
        provides players with the ability to customise your risk factor and
        multipliers ensuring this Stake Original game is suited for everyone at
        our online casino !
      </h3>
      <Button className="hover:bg-green-600" onClick={() => navigate("/game")}>
        Play Plinko
      </Button>
    </div>
  );
};
