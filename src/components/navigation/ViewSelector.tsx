import React from 'react';
import { LayoutGrid, Users, Library, Target } from 'lucide-react';

export type ViewType = 'board' | 'factions' | 'deck' | 'goals';

interface ViewSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  currentView,
  onViewChange,
}) => {
  const views = [
    { id: 'board', label: 'Board', icon: LayoutGrid },
    { id: 'factions', label: 'Factions', icon: Users },
    { id: 'deck', label: 'Deck', icon: Library },
    { id: 'goals', label: 'Goals', icon: Target },
  ] as const;

  return (
    <div className="flex gap-2">
      {views.map(view => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id as ViewType)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${currentView === view.id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }
          `}
        >
          <view.icon className="w-5 h-5" />
          {view.label}
        </button>
      ))}
    </div>
  );
};