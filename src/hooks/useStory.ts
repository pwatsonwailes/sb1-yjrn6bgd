import { useState, useCallback } from 'react';
import { StoryState, StoryChapter } from '../types/story';
import { checkNodeRequirements } from '../utils/story';

export const useStory = (chapters: StoryChapter[]) => {
  const [storyState, setStoryState] = useState<StoryState>({
    currentChapter: 0,
    currentNode: 0,
    choices: {},
    isPlaying: true
  });

  const getCurrentChapter = useCallback(() => {
    const chapter = chapters[storyState.currentChapter];
    if (!chapter) return null;

    // Filter nodes based on requirements
    const validNodes = chapter.nodes.filter(node => 
      checkNodeRequirements(node, storyState.choices)
    );

    return {
      ...chapter,
      nodes: validNodes
    };
  }, [chapters, storyState.currentChapter, storyState.choices]);

  const handleChoice = useCallback((choiceId: string, picked: number) => {
    setStoryState(prev => ({
      ...prev,
      choices: {
        ...prev.choices,
        [choiceId]: picked
      }
    }));
  }, []);

  const handleComplete = useCallback(() => {
    setStoryState(prev => ({
      ...prev,
      isPlaying: false
    }));
  }, []);

  return {
    storyState,
    getCurrentChapter,
    handleChoice,
    handleComplete
  };
};