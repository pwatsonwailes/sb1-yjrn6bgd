import { useState, useCallback } from 'react';
import { StoryState, StoryChapter } from '../types/story';
import { findNextValidNode } from '../utils/story/nodes';
import { getNextState } from '../utils/story/state';

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

    // Find the current valid node
    const currentValid = findNextValidNode(
      chapter.nodes,
      storyState.currentNode,
      storyState.choices
    );

    if (!currentValid) return null;

    // Return chapter with only the current valid node index
    return {
      ...chapter,
      nodeIndex: currentValid.index
    };
  }, [chapters, storyState.currentChapter, storyState.currentNode, storyState.choices]);

  const handleNext = () => {
    const chapter = chapters[storyState.currentChapter];

    for (let index = storyState.currentNode; index < chapter.nodes.length - 1; index++) {
      if (findNextValidNode(chapter.nodes, index, storyState.choices)) {
        setStoryState(prev => getNextState(prev, chapters, 'next'));
        return
      }
    }

    return false
  };

  const handleChoice = useCallback((choiceId: string, picked: number) => {
    setStoryState(prev => {
      // First update choices
      const newState = {
        ...prev,
        choices: {
          ...prev.choices,
          [choiceId]: picked
        }
      };

      // Then calculate the next state based on the new choices
      return getNextState(newState, chapters, 'choice');
    });
  }, [chapters]);

  const handleComplete = useCallback(() => {
    setStoryState(prev => getNextState(prev, chapters, 'complete'));
  }, [chapters]);

  return {
    storyState,
    getCurrentChapter,
    handleChoice,
    handleNext,
    handleComplete
  };
};