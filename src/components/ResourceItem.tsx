import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface ResourceItemProps {
  Icon: LucideIcon;
  value: number;
  color: string;
  tooltip: string;
  suffix?: string;
}

export const ResourceItem: React.FC<ResourceItemProps> = ({
  Icon,
  value,
  color,
  tooltip,
  suffix = '',
}) => {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content={tooltip}>
        <div className="cursor-help">
          <Icon size={20} className={color} />
        </div>
      </Tooltip>
      <span>{value}{suffix}</span>
    </div>
  );
};