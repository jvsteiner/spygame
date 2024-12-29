"use client";

import { Suspense, useEffect } from "react";
import GameSetup from "@/components/GameSetup";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful");
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Spyfall</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <GameSetup />
      </Suspense>
    </main>
  );
}
