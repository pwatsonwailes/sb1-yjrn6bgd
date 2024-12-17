import React from 'react';
import { Card } from '../../types/cards';
import { BarChart2, Zap } from 'lucide-react';

interface DeckStatsProps {
  deck: Card[];
}

export const DeckStats: React.FC<DeckStatsProps> = ({ deck }) => {
  const energyCurve = deck.reduce((acc, card) => {
    acc[card.cost.energy] = (acc[card.cost.energy] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const typeDistribution = deck.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxCount = Math.max(...Object.values(energyCurve));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" />
          Energy Curve
        </h3>
        <div className="grid grid-cols-6 gap-2 h-48">
          {[0, 1, 2, 3, 4, 5].map(cost => (
            <div key={cost} className="flex flex-col items-center">
              <div className="flex-grow w-full flex items-end">
                <div
                  className="w-full bg-indigo-600 rounded-t"
                  style={{
                    height: `${((energyCurve[cost] || 0) / maxCount) * 100}%`
                  }}
                />
              </div>
              <div className="text-white mt-2">{cost}</div>
              <div className="text-gray-400 text-sm">
                {energyCurve[cost] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <BarChart2 className="w-5 h-5" />
          Card Types
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(typeDistribution).map(([type, count]) => (
            <div
              key={type}
              className="bg-gray-800 rounded-lg p-3 flex justify-between items-center"
            >
              <span className="text-white capitalize">{type}</span>
              <span className="text-indigo-400 font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};