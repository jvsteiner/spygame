"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import { LocationListKey, locationLists } from "@/app/utils/gameLogic";

const Switch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
      </div>
      <span className="ms-3 text-sm font-medium">{label}</span>
    </label>
  );
};

export default function GameSetup() {
  const [playerCount, setPlayerCount] = useState(3);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [useExtended, setUseExtended] = useState(false);
  const [selectedList, setSelectedList] = useState<LocationListKey>("default");
  const router = useRouter();

  useEffect(() => {
    const storedCount = localStorage.getItem("playerCount");
    const storedNames = localStorage.getItem("playerNames");
    const storedUseExtended = localStorage.getItem("useExtended");
    const storedSelectedList = localStorage.getItem("selectedList") as LocationListKey | null;

    const count = storedCount ? parseInt(storedCount) : 3;
    const names = storedNames ? JSON.parse(storedNames) : Array.from({ length: count }, (_, i) => `Player ${i + 1}`);

    setPlayerCount(count);
    setPlayerNames(names);
    setUseExtended(storedUseExtended === "true");
    if (storedSelectedList && storedSelectedList in locationLists) {
      setSelectedList(storedSelectedList);
    }
  }, []);

  const handlePlayerCountChange = (newCount: number) => {
    const count = Math.max(3, Math.min(10, newCount));
    setPlayerCount(count);
    localStorage.setItem("playerCount", count.toString());

    setPlayerNames((prevNames) => {
      const newNames = [...prevNames];
      if (count > prevNames.length) {
        for (let i = prevNames.length + 1; i <= count; i++) {
          newNames.push(`Player ${i}`);
        }
      } else {
        newNames.splice(count);
      }
      localStorage.setItem("playerNames", JSON.stringify(newNames));
      return newNames;
    });
  };

  const handleNameChange = (index: number, name: string) => {
    setPlayerNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = name;
      localStorage.setItem("playerNames", JSON.stringify(newNames));
      return newNames;
    });
  };

  const handleStartGame = () => {
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
    localStorage.setItem("useExtended", useExtended.toString());
    localStorage.setItem("selectedList", selectedList);
    router.push("/game");
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleExtendedToggle = (checked: boolean) => {
    setUseExtended(checked);
    if (!checked) {
      setSelectedList("default");
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="playerCount" className="text-lg font-medium">
          Number of Players
        </label>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => handlePlayerCountChange(playerCount - 1)}
            className="text-2xl p-2 h-12 w-12"
            variant="outline"
            aria-label="Decrease player count"
          >
            <ChevronDown size={24} />
          </Button>
          <div className="text-3xl font-bold w-16 text-center">{playerCount}</div>
          <Button
            onClick={() => handlePlayerCountChange(playerCount + 1)}
            className="text-2xl p-2 h-12 w-12"
            variant="outline"
            aria-label="Increase player count"
          >
            <ChevronUp size={24} />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {playerNames.map((name, index) => (
          <Input
            key={index}
            value={name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            onFocus={handleInputFocus}
            placeholder={`Player ${index + 1}`}
            className="text-lg bg-white"
          />
        ))}
      </div>
      <div className="flex flex-col space-y-4 items-center">
        <Switch checked={useExtended} onChange={handleExtendedToggle} label="Use Extended" />
        {useExtended && (
          <select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value as LocationListKey)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-lg shadow-sm focus:border-black focus:ring-black transition-colors"
          >
            <option value="default">Default</option>
            <option value="difficult">Difficult</option>
            <option value="fantasy">Fantasy</option>
          </select>
        )}
      </div>
      <Button onClick={handleStartGame} className="w-full text-lg py-6 bg-black text-white hover:bg-black/90">
        Start Game
      </Button>
    </div>
  );
}
