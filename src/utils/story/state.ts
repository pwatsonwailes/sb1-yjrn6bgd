import { StoryState, StoryChapter } from '../../types/story';
import { findNextValidNode } from './nodes';

export const getNextState = (
  prevState: StoryState,
  chapters: StoryChapter[],
  action: 'choice' | 'complete'
): StoryState => {
  const chapter = chapters[prevState.currentChapter];
  if (!chapter) return { ...prevState, isPlaying: false };

  // Find the next valid node
  const nextValid = findNextValidNode(
    chapter.nodes,
    prevState.currentNode + 1,
    prevState.choices
  );

  // If no valid next node is found
  if (!nextValid) {
    // Check if there are more chapters
    if (prevState.currentChapter < chapters.length - 1) {
      return {
        ...prevState,
        currentChapter: prevState.currentChapter + 1,
        currentNode: 0
      };
    }
    // If no more chapters, end the story
    return { ...prevState, isPlaying: false };
  }

  // Move to the next valid node
  return {
    ...prevState,
    currentNode: nextValid.index
  };
};