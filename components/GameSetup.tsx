"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  LocationListKey,
  locationLists,
  getAllLocationLists,
  saveCustomList,
  deleteCustomList,
  isCustomList,
  getCustomLists,
} from "@/app/utils/gameLogic";

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

interface CustomListModalProps {
  onClose: () => void;
  onSave: (name: string, locations: string[]) => void;
  editingList?: { name: string; locations: string[] };
}

function CustomListModal({ onClose, onSave, editingList }: CustomListModalProps) {
  const [name, setName] = useState(editingList?.name || "");
  const [locationText, setLocationText] = useState(editingList?.locations.join("\n") || "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setError("Please enter a name for your list");
      return;
    }

    const locations = locationText
      .split("\n")
      .map((loc) => loc.trim())
      .filter((loc) => loc.length > 0);

    if (locations.length < 3) {
      setError("Please enter at least 3 locations");
      return;
    }

    onSave(name, locations);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold">{editingList ? "Edit" : "Add"} Custom Location List</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">List Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter list name"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Locations (one per line)</label>
            <textarea
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="Enter locations, one per line"
              className="w-full h-48 p-2 border rounded-md"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="flex-1 bg-black text-white hover:bg-black/90">
              Save
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GameSetup() {
  const [playerCount, setPlayerCount] = useState(3);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [useExtended, setUseExtended] = useState(false);
  const [selectedList, setSelectedList] = useState<LocationListKey>("default");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [availableLists, setAvailableLists] = useState<Record<string, string[]>>({});
  const router = useRouter();
  const [editingList, setEditingList] = useState<{ name: string; locations: string[] } | null>(null);

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
    if (storedSelectedList) {
      setSelectedList(storedSelectedList);
    }

    // Load available lists
    setAvailableLists(getAllLocationLists());
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

  const handleDeleteList = () => {
    if (selectedList && isCustomList(selectedList)) {
      deleteCustomList(selectedList);
      setAvailableLists(getAllLocationLists());
      setSelectedList("default");
      setUseExtended(false);
    }
  };

  const handleEditList = () => {
    if (selectedList && isCustomList(selectedList)) {
      const list = getCustomLists().find((l) => l.name === selectedList);
      if (list) {
        setEditingList(list);
        setShowCustomModal(true);
      }
    }
  };

  const handleSaveCustomList = (name: string, locations: string[]) => {
    saveCustomList(name, locations, editingList?.name);
    setAvailableLists(getAllLocationLists());
    setSelectedList(name);
    setUseExtended(true);
    setEditingList(null);
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
            className="text-2xl p-2 h-12 w-12 bg-white"
            variant="outline"
            aria-label="Decrease player count"
          >
            <ChevronDown size={24} />
          </Button>
          <div className="text-3xl font-bold w-16 text-center">{playerCount}</div>
          <Button
            onClick={() => handlePlayerCountChange(playerCount + 1)}
            className="text-2xl p-2 h-12 w-12 bg-white"
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
          <>
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value as LocationListKey)}
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-lg shadow-sm focus:border-black focus:ring-black transition-colors"
            >
              {Object.entries(availableLists).map(([key, list]) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
            {isCustomList(selectedList) && (
              <div className="flex w-full space-x-2">
                <Button onClick={handleEditList} variant="outline" className="flex-1">
                  Edit List
                </Button>
                <Button onClick={handleDeleteList} variant="outline" className="flex-1">
                  Delete List
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="space-y-2">
        <Button onClick={handleStartGame} className="w-full text-lg py-6 bg-black text-white hover:bg-black/90">
          Start Game
        </Button>
        <Button onClick={() => setShowCustomModal(true)} variant="outline" className="w-full text-lg py-6">
          Add Custom
        </Button>
      </div>

      {showCustomModal && (
        <CustomListModal
          onClose={() => {
            setShowCustomModal(false);
            setEditingList(null);
          }}
          onSave={handleSaveCustomList}
          editingList={editingList || undefined}
        />
      )}
    </div>
  );
}
