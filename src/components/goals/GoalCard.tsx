import React from 'react';
import { Goal } from '../../types/goals';
import { Target, Clock, CreditCard, Zap, Award } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onActivate: () => void;
  onInvest: (type: 'credits' | 'energy', amount: number) => void;
  disabled?: boolean;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onActivate,
  onInvest,
  disabled
}) => {
  const getDifficultyColor = () => {
    switch (goal.difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = () => {
    switch (goal.status) {
      case 'available': return 'text-blue-400';
      case 'active': return 'text-green-400';
      case 'completed': return 'text-purple-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
          <p className="text-sm text-gray-400">{goal.description}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor()}`}>
          {goal.difficulty}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-gray-300">
            {goal.progress.turnsRemaining} turns remaining
          </span>
        </div>

        {goal.requirements.map((req, index) => (
          <div key={index} className="flex items-center justify-between">
            {req.type === 'credits' ? (
              <CreditCard className="w-4 h-4 text-yellow-400" />
            ) : (
              <Zap className="w-4 h-4 text-blue-400" />
            )}
            <div className="flex-1 mx-2">
              <div className="h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${Math.min(
                      (goal.progress[`${req.type}Invested`] / req.amount) * 100,
                      100
                    )}%`
                  }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-400">
              {goal.progress[`${req.type}Invested`]}/{req.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-300">Rewards:</h4>
        <div className="flex flex-wrap gap-2">
          {goal.rewards.credits && (
            <div className="flex items-center gap-1 text-sm">
              <CreditCard className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300">{goal.rewards.credits}</span>
            </div>
          )}
          {goal.rewards.reputation && (
            <div className="flex items-center gap-1 text-sm">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">{goal.rewards.reputation}</span>
            </div>
          )}
        </div>
      </div>

      {goal.status === 'available' && (
        <button
          onClick={onActivate}
          disabled={disabled}
          className={`
            w-full px-4 py-2 rounded-lg
            ${disabled
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            }
            text-white font-medium transition-colors
          `}
        >
          Accept Goal
        </button>
      )}

      {goal.status === 'active' && (
        <div className="flex gap-2">
          {goal.requirements.map((req, index) => (
            <button
              key={index}
              onClick={() => onInvest(req.type, Math.min(req.amount, 100))}
              disabled={disabled}
              className={`
                flex-1 px-4 py-2 rounded-lg
                ${disabled
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                }
                text-white font-medium transition-colors
              `}
            >
              Invest {req.type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};