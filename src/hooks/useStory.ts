import { StoryState, StoryChapter } from '../types/story';

export const useStory = (chapters: StoryChapter[]) => {
  const [storyState, setStoryState] = useState<StoryState>({
    currentChapter: 0,
    currentNode: 0,
    choices: {},
    isPlaying: true
  });

  const getCurrentChapter = () => chapters[storyState.currentChapter];

  const handleChoice = (choiceId: string, picked: number) => {
    setStoryState(prev => ({
      ...prev,
      choices: {
        ...prev.choices,
        [choiceId]: picked
      }
    }));
  };

  const handleComplete = () => {
    setStoryState(prev => ({
      ...prev,
      isPlaying: false
    }));
  };

  return {
    storyState,
    getCurrentChapter,
    handleChoice,
    handleComplete
  };
};