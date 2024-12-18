import React, { useState } from 'react';
import { Shield, History, CreditCard, TrendingUp, Building2, ArrowLeft } from 'lucide-react';
import { Faction } from '../../types/factions';
import { FactionDetails } from '../factions/FactionDetails';
import { FactionCards } from '../factions/FactionCards';
import { FactionHistory } from '../factions/FactionHistory';
import { FactionRelations } from '../factions/FactionRelations';
import { ResourceBar } from '../ResourceBar';
import { Card } from '../../types/cards';

interface FactionsViewProps {
  factions: Faction[];
  credits: number;
  onPurchaseCard: (card: Card, cost: number) => void;
  onBack: () => void;
  gameState: {
    credits: number;
    condition: number;
    factions: Faction[];
    stress: number;
    energyPoints: number;
    debt: number;
  };
}

type TabType = 'details' | 'cards' | 'history' | 'relations';

export const FactionsView: React.FC<FactionsViewProps> = ({
  factions,
  credits,
  onPurchaseCard,
  onBack,
  gameState,
}) => {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(factions[0]);
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const tabs = [
    { id: 'details', label: 'Details', icon: Building2 },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'history', label: 'History', icon: History },
    { id: 'relations', label: 'Relations', icon: TrendingUp },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Faction List */}
          <div className="space-y-2">
            {factions.map(faction => (
              <button
                key={faction.id}
                onClick={() => setSelectedFaction(faction)}
                className={`
                  w-full p-4 rounded-lg text-left transition-colors
                  ${selectedFaction?.id === faction.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }
                `}
              >
                <div className="font-medium">{faction.name}</div>
                <div className="text-sm opacity-75">{faction.description}</div>
              </button>
            ))}
          </div>

          {/* Faction Details */}
          {selectedFaction && (
            <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6">
              <div className="border-b border-gray-700 mb-6">
                <div className="flex gap-4">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 -mb-px
                        ${activeTab === tab.id
                          ? 'text-indigo-400 border-b-2 border-indigo-400'
                          : 'text-gray-400 hover:text-gray-300'
                        }
                      `}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-white">
                {activeTab === 'details' && (
                  <FactionDetails faction={selectedFaction} />
                )}
                {activeTab === 'cards' && (
                  <FactionCards
                    faction={selectedFaction}
                    credits={credits}
                    onPurchaseCard={onPurchaseCard}
                  />
                )}
                {activeTab === 'history' && (
                  <FactionHistory faction={selectedFaction} />
                )}
                {activeTab === 'relations' && (
                  <FactionRelations
                    faction={selectedFaction}
                    factions={factions}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};