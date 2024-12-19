import { StoryState, StoryChapter } from '../../types/story';
import { findNextValidNode } from './nodes';

export const getNextState = (
  prevState: StoryState,
  chapters: StoryChapter[],
  action: 'choice' | 'complete' | 'next'
): StoryState => {
  const chapter = chapters[prevState.currentChapterIndex];
  if (!chapter) return { ...prevState, isPlaying: false };

  // Find the next valid node
  const nextValid = findNextValidNode(
    chapter.nodes,
    prevState.currentNodeIndex + 1,
    prevState.choices
  );

  // If no valid next node is found
  if (!nextValid) {
    // Check if there are more chapters
    if (prevState.currentChapterIndex < chapters.length - 1) {
      return {
        ...prevState,
        currentChapterIndex: prevState.currentChapterIndex + 1,
        currentNodeIndex: 0
      };
    }

    // If no more chapters, end the story
    return { ...prevState, isPlaying: false };
  }

  // Move to the next valid node
  return {
    ...prevState,
    currentNodeIndex: nextValid.index
  };
};