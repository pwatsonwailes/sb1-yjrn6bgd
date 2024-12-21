import { GameState } from '../../types/game';
import { StoryState } from '../../types/story';

interface SaveData {
  gameState: GameState;
  storyState: StoryState;
  timestamp: number;
  turnNumber: number;
}

export const saveManager = {
  async saveGame(gameState: GameState, storyState: StoryState): Promise<void> {
    const saveData: SaveData = {
      gameState,
      storyState,
      timestamp: Date.now(),
      turnNumber: gameState.turn
    };
    
    try {
      await window.electron.invoke('saveGame', saveData);
    } catch (error) {
      console.error('Failed to save game:', error);
      throw error;
    }
  },

  async loadGame(): Promise<SaveData | null> {
    try {
      const saveData = await window.electron.invoke('loadGame');
      return saveData;
    } catch (error) {
      console.error('Failed to load game:', error);
      throw error;
    }
  },

  async getSaves(): Promise<SaveData[]> {
    try {
      const saves = await window.electron.invoke('getSaves');
      return saves;
    } catch (error) {
      console.error('Failed to get saves:', error);
      throw error;
    }
  }
};