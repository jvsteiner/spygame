import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface PlayerViewProps {
  playerName: string;
  role: string;
  showRole: boolean;
  onToggleRole: () => void;
}

export default function PlayerView({ playerName, role, showRole, onToggleRole }: PlayerViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReveal = () => {
    setIsModalOpen(true);
    onToggleRole();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onToggleRole();
  };

  return (
    <>
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="text-center">{playerName}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleReveal} className="bg-black text-white hover:bg-black/90">
            Reveal
          </Button>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">{playerName}</h2>
            {role === "Spy" ? (
              <p className="text-xl mb-6">You are the Spy!</p>
            ) : (
              <Text className="text-xl mb-6 whitespace-pre-line">{role}</Text>
            )}
            <Button onClick={handleCloseModal} className="w-full bg-black text-white hover:bg-black/90">
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
