import React from 'react';
import { CreditCard, Heart, Zap, Brain, Coins } from 'lucide-react';
import { ResourceItem } from './ResourceItem';
import { ReputationDropdown } from './ReputationDropdown';
import { Corporation } from '../types/game';

interface ResourceBarProps {
  credits: number;
  condition: number;
  corporations: Corporation[];
  stress: number;
  energyPoints: number;
  debt: number;
}

export const ResourceBar: React.FC<ResourceBarProps> = ({
  credits,
  condition,
  corporations,
  stress,
  energyPoints,
  debt,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <ResourceItem
        Icon={CreditCard}
        value={credits}
        color="text-yellow-400"
        tooltip="Credits - Your available money for purchases and payments"
      />
      
      <ResourceItem
        Icon={Heart}
        value={condition}
        color="text-red-400"
        tooltip="Condition - Health status of your body mods"
        suffix="%"
      />
      
      <div className="flex items-center gap-2">
        <ReputationDropdown corporations={corporations} />
      </div>
      
      <ResourceItem
        Icon={Brain}
        value={stress}
        color="text-purple-400"
        tooltip="Stress - Mental strain from debt and dangerous actions"
      />
      
      <ResourceItem
        Icon={Zap}
        value={energyPoints}
        color="text-yellow-400"
        tooltip="Energy Points - Available actions for this turn"
      />

      <ResourceItem
        Icon={Coins}
        value={debt}
        color="text-red-500"
        tooltip="Debt - Outstanding loans and payments due"
      />
    </div>
  );
};