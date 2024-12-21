import { useState, useCallback } from 'react';
import { StoryState, StoryChapter } from '../types/story';
import { findNextValidNode } from '../utils/story/nodes';
import { getNextState } from '../utils/story/state';

export const useStory = (
  chapters: StoryChapter[],
  saveState: (gameState: GameState, storyState: StoryState) => Promise<void>
) => {
  const [storyState, setStoryState] = useState<StoryState>({
    currentChapterIndex: 0,
    currentNodeIndex: 0,
    choices: {},
    isPlaying: true
  });

  const getCurrentChapter = useCallback(() => {
    const chapter = chapters[storyState.currentChapterIndex];

    if (!chapter) return null;

    // Find the current valid node
    const currentValid = findNextValidNode(
      chapter.nodes,
      storyState.currentNodeIndex,
      storyState.choices
    );

    if (!currentValid) return null;

    // Return chapter with only the current valid node index
    return {
      ...chapter,
      nodeIndex: currentValid.index
    };
  }, [chapters, storyState.currentChapterIndex, storyState.currentNodeIndex, storyState.choices]);

  const getCurrentNode = useCallback(() => {
    const chapter = chapters[storyState.currentChapterIndex];

    if (!chapter) return null;

    // Find the current valid node
    const currentValid = findNextValidNode(
      chapter.nodes,
      storyState.currentNodeIndex,
      storyState.choices
    );

    return currentValid ? currentValid.node : null;
  }, [chapters, storyState.currentChapterIndex, storyState.currentNodeIndex, storyState.choices]);

  const handleNext = () => {
    console.log('handling progression')
    setStoryState(prev => getNextState(prev, chapters, 'next'));
  };

  const handleChoice = useCallback((choiceId: string, picked: number) => {
    setStoryState(prev => {
      const newState = {
        ...prev,
        choices: {
          ...prev.choices,
          [choiceId]: picked
        }
      };
      
      return getNextState(newState, chapters, 'choice');
    });
  }, [chapters]);

  const handleComplete = useCallback(() => {
    setStoryState(prev => getNextState(prev, chapters, 'complete'));
  }, [chapters]);

  useEffect(() => {
    saveState(gameState, storyState);
  }, [storyState, saveState]);

  return {
    storyState,
    getCurrentChapter,
    getCurrentNode,
    handleChoice,
    handleNext,
    handleComplete,
  };
};