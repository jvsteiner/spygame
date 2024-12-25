"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TimerProps {
  initialTime: number;
}

export default function Timer({ initialTime }: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsTimeUp(true);
            setIsFlashing(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    let flashInterval: NodeJS.Timeout;
    if (isFlashing) {
      flashInterval = setInterval(() => {
        setIsTimeUp((prev) => !prev);
      }, 500);
    }
    return () => clearInterval(flashInterval);
  }, [isFlashing]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    setIsTimeUp(false);
    setIsFlashing(false);
    setTime(initialTime);
  };

  const incrementTime = () => {
    setTime((prevTime) => prevTime + 30);
    setIsTimeUp(false);
    setIsFlashing(false);
  };

  const decrementTime = () => {
    setTime((prevTime) => Math.max(0, prevTime - 30));
    setIsTimeUp(false);
    setIsFlashing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex flex-col items-center space-y-4 p-4 rounded-lg ${
        isTimeUp ? "bg-red-500" : "bg-white"
      } transition-colors duration-300`}
    >
      <div className="flex items-center space-x-4">
        <Button onClick={decrementTime} className="text-4xl p-2 h-16 w-16" variant="outline">
          <ChevronDown size={32} />
        </Button>
        <div className="text-4xl font-bold w-32 text-center">{formatTime(time)}</div>
        <Button onClick={incrementTime} className="text-4xl p-2 h-16 w-16" variant="outline">
          <ChevronUp size={32} />
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
