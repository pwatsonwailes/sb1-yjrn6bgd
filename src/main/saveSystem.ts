import { ipcMain } from 'electron';
import { app } from 'electron';
import fs from 'fs/promises';
import path from 'path';

const SAVES_DIR = path.join(app.getPath('userData'), 'saves');

// Ensure saves directory exists
const initSaveSystem = async () => {
  try {
    await fs.mkdir(SAVES_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create saves directory:', error);
  }
};

export const setupSaveSystem = () => {
  initSaveSystem();

  ipcMain.handle('saveGame', async (_, saveData) => {
    const filename = `save_${saveData.turnNumber}_${saveData.timestamp}.json`;
    const savePath = path.join(SAVES_DIR, filename);
    
    try {
      await fs.writeFile(savePath, JSON.stringify(saveData, null, 2));
    } catch (error) {
      console.error('Failed to save game:', error);
      throw error;
    }
  });

  ipcMain.handle('loadGame', async () => {
    try {
      const files = await fs.readdir(SAVES_DIR);
      if (files.length === 0) return null;

      // Get most recent save
      const mostRecent = files
        .filter(f => f.endsWith('.json'))
        .sort()
        .pop();

      if (!mostRecent) return null;

      const saveContent = await fs.readFile(
        path.join(SAVES_DIR, mostRecent),
        'utf-8'
      );
      return JSON.parse(saveContent);
    } catch (error) {
      console.error('Failed to load game:', error);
      throw error;
    }
  });

  ipcMain.handle('getSaves', async () => {
    try {
      const files = await fs.readdir(SAVES_DIR);
      const saves = await Promise.all(
        files
          .filter(f => f.endsWith('.json'))
          .map(async file => {
            const content = await fs.readFile(
              path.join(SAVES_DIR, file),
              'utf-8'
            );
            return JSON.parse(content);
          })
      );
      return saves.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Failed to get saves:', error);
      throw error;
    }
  });
};