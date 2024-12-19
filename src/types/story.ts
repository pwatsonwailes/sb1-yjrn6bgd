export type StoryNodeType = 'gallery' | 'paragraph' | 'choice' | 'button';

export interface StoryRequirement {
  type: 'choice';
  choiceId: string; // Standardize to camelCase
  optionId: number;
}

export interface StoryMedia {
  images?: {
    src: string;
    caption?: string;
    displayDuration?: number;
    transitionDuration?: number;
  }[];
  image?: {
    src: string;
  };
  music?: {
    track: string;
    volume: number;
  };
  character?: {
    cast: string;
    name: string;
    src: string;
  };
}

export interface StoryNode {
  type: StoryNodeType;
  text?: string;
  duration?: number;
  media?: StoryMedia;
  options?: { text: string }[];
  mode?: 'cards';
  id?: string;
  requirements?: StoryRequirement[];
}

export interface StoryChapter {
  id: number;
  title: string;
  nodes: StoryNode[];
  nodeIndex?: number;
}

export interface StoryState {
  currentChapterIndex: number;
  currentNodeIndex: number;
  choices: Record<string, number>;
  isPlaying: boolean;
}