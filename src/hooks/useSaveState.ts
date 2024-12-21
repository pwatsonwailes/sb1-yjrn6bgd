import { useCallback } from 'react';
import { GameState } from '../types/game';
import { StoryState } from '../types/story';
import { saveManager } from '../utils/saves/saveManager';

export const useSaveState = () => {
  const saveState = useCallback(async (gameState: GameState, storyState: StoryState) => {
    try {
      await saveManager.saveGame(gameState, storyState);
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  }, []);

  return { saveState };
};