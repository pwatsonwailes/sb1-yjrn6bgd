import React, { useState } from 'react';
import { Goal } from '../../types/goals';
import { GoalCard } from './GoalCard';
import { Target, Filter } from 'lucide-react';

interface GoalsViewProps {
  goals: Goal[];
  onActivateGoal: (goalId: string) => void;
  onInvestInGoal: (goalId: string, type: 'credits' | 'energy', amount: number) => void;
  credits: number;
  energy: number;
  factions: { id: string; name: string }[];
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  onActivateGoal,
  onInvestInGoal,
  credits,
  energy,
  factions
}) => {
  const [selectedFaction, setSelectedFaction] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredGoals = goals.filter(goal => {
    if (selectedFaction !== 'all' && goal.factionId !== selectedFaction) return false;
    if (selectedStatus !== 'all' && goal.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="bg-gray-900 p-4 rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="w-6 h-6" />
          Organization Goals
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedFaction}
            onChange={(e) => setSelectedFaction(e.target.value)}
            className="bg-gray-800 text-white rounded-lg p-2"
          >
            <option value="all">All Organizations</option>
            {factions.map(faction => (
              <option key={faction.id} value={faction.id}>
                {faction.name}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-800 text-white rounded-lg p-2"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onActivate={() => onActivateGoal(goal.id)}
            onInvest={(type, amount) => onInvestInGoal(goal.id, type, amount)}
            disabled={
              goal.status === 'available'
                ? goals.filter(g => g.status === 'active').length >= 3
                : false
            }
          />
        ))}
      </div>
    </div>
  );
};