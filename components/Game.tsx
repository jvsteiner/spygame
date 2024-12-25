"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { generateGame, LocationListKey } from "../app/utils/gameLogic";
import PlayerView from "./PlayerView";
import Timer from "./Timer";
import { useRouter } from "next/navigation";

export default function Game({ playerNames }: { playerNames: string[] }) {
  const [gameState, setGameState] = useState(() => {
    const selectedList = (localStorage.getItem("selectedList") as LocationListKey) || "default";
    return generateGame(playerNames.length, selectedList);
  });
  const [showRoles, setShowRoles] = useState(playerNames.map(() => false));
  const router = useRouter();

  const handleToggleRole = (index: number) => {
    setShowRoles((prev) => {
      const newShowRoles = [...prev];
      newShowRoles[index] = !newShowRoles[index];
      return newShowRoles;
    });
  };

  const handleRestartGame = () => {
    router.push("/");
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <Timer initialTime={300} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {playerNames.map((name, index) => (
          <PlayerView
            key={index}
            playerName={name}
            role={gameState.roles[index]}
            showRole={showRoles[index]}
            onToggleRole={() => handleToggleRole(index)}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={handleRestartGame} variant="outline" className="bg-black text-white hover:bg-black/90">
          New Game
        </Button>
      </div>
    </div>
  );
}
