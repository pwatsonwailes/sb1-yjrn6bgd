export type StoryNodeType = 'gallery' | 'paragraph' | 'choice' | 'button';

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
  options?: { picked: number; text: string }[];
  mode?: 'cards';
  id?: string;
}

export interface StoryChapter {
  id: number;
  title: string;
  nodes: StoryNode[];
}

export interface StoryState {
  currentChapter: number;
  currentNode: number;
  choices: Record<string, number>;
  isPlaying: boolean;
}