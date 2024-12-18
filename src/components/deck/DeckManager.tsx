import React, { useState } from 'react';
import { DeckList } from './DeckList';
import { DeckStats } from './DeckStats';
import { CardFilters } from './CardFilters';
import { Card } from '../../types/cards';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, Filter, BarChart2, CreditCard } from 'lucide-react';

interface DeckManagerProps {
  deck: Card[];
  allCards: Card[];
  onUpdateDeck: (newDeck: Card[]) => void;
  credits: number;
  onPurchaseCard: (card: Card) => void;
}

const calculateCardCost = (card: Card): number => {
  switch (card.rarity) {
    case 'rare': return 500;
    case 'uncommon': return 300;
    case 'common': return 150;
    case 'starter': return 0;
    default: return 0;
  }
};

export const DeckManager: React.FC<DeckManagerProps> = ({
  deck,
  allCards,
  onUpdateDeck,
  credits,
  onPurchaseCard
}) => {
  const [view, setView] = useState<'list' | 'stats'>('list');
  const [filters, setFilters] = useState({
    type: 'all',
    faction: 'all',
    rarity: 'all',
    search: '',
  });

  const filteredCards = allCards.filter(card => {
    if (filters.type !== 'all' && card.type !== filters.type) return false;
    if (filters.faction !== 'all' && !card.effects.some(e => e.factionId === filters.faction)) return false;
    if (filters.rarity !== 'all' && card.rarity !== filters.rarity) return false;
    if (filters.search && !card.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-gray-900 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Library className="w-6 h-6" />
          Deck Manager
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-400">
            <CreditCard className="w-5 h-5" />
            <span>{credits} credits</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg ${
                view === 'list' ? 'bg-indigo-600' : 'bg-gray-700'
              }`}
            >
              <Filter className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setView('stats')}
              className={`p-2 rounded-lg ${
                view === 'stats' ? 'bg-indigo-600' : 'bg-gray-700'
              }`}
            >
              <BarChart2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <CardFilters filters={filters} onUpdateFilters={setFilters} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'list' ? (
            <DeckList
              deck={deck}
              availableCards={filteredCards}
              onUpdateDeck={onUpdateDeck}
              onPurchaseCard={onPurchaseCard}
              calculateCardCost={calculateCardCost}
              credits={credits}
            />
          ) : (
            <DeckStats deck={deck} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};