import React from 'react';
import { CreditCard, Heart, Zap, Brain, Coins, Users } from 'lucide-react';
import { ResourceItem } from './ResourceItem';
import { Faction } from '../types/game';

interface ResourceBarProps {
  credits: number;
  condition: number;
  factions: Faction[];
  stress: number;
  energyPoints: number;
  debt: number;
  onFactionClick: () => void;
}

export const ResourceBar: React.FC<ResourceBarProps> = ({
  credits,
  condition,
  factions,
  stress,
  energyPoints,
  debt,
  onFactionClick,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
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
      
      <button
        onClick={onFactionClick}
        className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition-colors"
      >
        <Users className="w-5 h-5 text-blue-400" />
        <span>Factions</span>
      </button>
      
      <ResourceItem
        Icon={Brain}
        value={stress}
        color="text-purple-400"
        tooltip="Stress - Mental strain from debt and dangerous actions"
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