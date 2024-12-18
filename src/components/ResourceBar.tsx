import React from 'react';
import { CreditCard, Heart, Brain, Coins } from 'lucide-react';
import { ResourceItem } from './ResourceItem';

interface ResourceBarProps {
  credits: number;
  condition: number;
  stress: number;
  energyPoints: number;
  debt: number;
}

export const ResourceBar: React.FC<ResourceBarProps> = ({
  credits,
  condition,
  stress,
  debt,
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