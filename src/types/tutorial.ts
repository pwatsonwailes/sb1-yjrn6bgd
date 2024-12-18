export type TutorialStep = {
  id: string;
  title: string;
  description: string;
  highlight?: string; // CSS selector for highlighting UI elements
  action?: {
    type: 'select-card' | 'end-turn' | 'view-factions' | 'view-deck';
    cardId?: string;
  };
  position?: 'top' | 'bottom' | 'left' | 'right';
};

export interface TutorialState {
  isActive: boolean;
  currentStepIndex: number;
  completedSteps: Set<string>;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Cyber Syndicate',
    description: 'Let\'s learn how to play the game. We\'ll start with the basics of card gameplay.',
    position: 'top'
  },
  {
    id: 'energy-points',
    title: 'Energy Points',
    description: 'You have 5 energy points each turn. Each card costs energy to play. Watch your energy meter in the bottom left.',
    highlight: '.energy-counter',
    position: 'bottom'
  },
  {
    id: 'select-card',
    title: 'Playing Cards',
    description: 'Click on a card to select it. Selected cards will be played when you end your turn.',
    action: {
      type: 'select-card'
    },
    position: 'bottom'
  },
  {
    id: 'end-turn',
    title: 'Ending Your Turn',
    description: 'Click "End Turn" to play your selected cards and draw new ones.',
    action: {
      type: 'end-turn'
    },
    highlight: '.end-turn-button',
    position: 'bottom'
  },
  {
    id: 'factions',
    title: 'Factions',
    description: 'Different factions offer unique cards and bonuses. Build reputation with them to unlock better rewards.',
    action: {
      type: 'view-factions'
    },
    position: 'right'
  },
  {
    id: 'deck-building',
    title: 'Deck Building',
    description: 'Visit the Deck Manager to customize your deck with new cards.',
    action: {
      type: 'view-deck'
    },
    position: 'right'
  }
];