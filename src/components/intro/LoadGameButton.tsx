import React, { useState } from 'react';
import { Loader, Save } from 'lucide-react';
import { saveManager } from '../../utils/saves/saveManager';

interface LoadGameButtonProps {
  onLoad: (saveData: any) => void;
}

export const LoadGameButton: React.FC<LoadGameButtonProps> = ({ onLoad }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const saveData = await saveManager.loadGame();
      if (saveData) {
        onLoad(saveData);
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLoad}
      disabled={isLoading}
      className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-semibold transition-colors flex items-center gap-2"
    >
      {isLoading ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : (
        <Save className="w-5 h-5" />
      )}
      Load Game
    </button>
  );
};