"use client";

import { useEffect, useState } from "react";
import Game from "@/components/Game";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedNames = localStorage.getItem("playerNames");
    if (!storedNames) {
      router.push("/");
      return;
    }
    setPlayerNames(JSON.parse(storedNames));
  }, [router]);

  if (playerNames.length === 0) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Spy Game</h1>
      <Game playerNames={playerNames} />
    </main>
  );
}

export const dynamic = "force-dynamic";
