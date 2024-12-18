import { useEffect, useRef } from 'react';

class AudioManager {
  private tracks: Map<string, HTMLAudioElement> = new Map();
  private currentTrack: string | null = null;
  private isInitialized: boolean = false;

  async playTrack(trackName: string, volume: number = 100) {
    try {
      // Stop current track if different
      if (this.currentTrack && this.currentTrack !== trackName) {
        await this.stopTrack(this.currentTrack);
      }

      let track = this.tracks.get(trackName);
      
      if (!track) {
        track = new Audio(`/audio/${trackName}.mp3`);
        track.preload = 'auto';
        this.tracks.set(trackName, track);
      }

      track.volume = volume / 100;
      track.loop = true;

      if (!this.isInitialized) {
        // Wait for user interaction before playing
        return;
      }

      try {
        await track.play();
        this.currentTrack = trackName;
      } catch (error) {
        console.warn('Audio playback failed:', error);
      }
    } catch (error) {
      console.warn('Error in playTrack:', error);
    }
  }

  async stopTrack(trackName: string) {
    try {
      const track = this.tracks.get(trackName);
      if (track) {
        await track.pause();
        track.currentTime = 0;
      }
      if (this.currentTrack === trackName) {
        this.currentTrack = null;
      }
    } catch (error) {
      console.warn('Error in stopTrack:', error);
    }
  }

  initialize() {
    this.isInitialized = true;
    // Try to play current track if one is queued
    if (this.currentTrack) {
      this.playTrack(this.currentTrack);
    }
  }

  async stopAll() {
    try {
      for (const [trackName] of this.tracks) {
        await this.stopTrack(trackName);
      }
    } catch (error) {
      console.warn('Error in stopAll:', error);
    }
  }

  setVolume(trackName: string, volume: number) {
    const track = this.tracks.get(trackName);
    if (track) {
      track.volume = volume / 100;
    }
  }
}

export const audioManager = new AudioManager();

export const useAudio = (trackName: string | undefined, volume: number = 100) => {
  const prevTrack = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (trackName) {
      audioManager.playTrack(trackName, volume);
      prevTrack.current = trackName;
    }

    return () => {
      if (prevTrack.current) {
        audioManager.stopTrack(prevTrack.current);
      }
    };
  }, [trackName, volume]);
};