import { Suspense } from "react";
import GameSetup from "@/components/GameSetup";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Spyfall</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <GameSetup />
      </Suspense>
    </main>
  );
}
