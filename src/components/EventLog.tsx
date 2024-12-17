import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, CreditCard, Shield } from 'lucide-react';
import { GameEvent } from '../types/events';

interface EventLogProps {
  events: GameEvent[];
}

const getEventIcon = (type: GameEvent['type']) => {
  switch (type) {
    case 'market':
      return <TrendingUp className="w-5 h-5" />;
    case 'debt':
      return <CreditCard className="w-5 h-5" />;
    case 'reputation':
      return <Shield className="w-5 h-5" />;
    case 'danger':
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return null;
  }
};

const getEventColor = (type: GameEvent['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-600';
    case 'warning':
      return 'bg-yellow-600';
    case 'danger':
      return 'bg-red-600';
    case 'market':
      return 'bg-blue-600';
    case 'debt':
      return 'bg-purple-600';
    case 'reputation':
      return 'bg-indigo-600';
    default:
      return 'bg-blue-600';
  }
};

export const EventLog: React.FC<EventLogProps> = ({ events }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full space-y-2 z-50">
      <AnimatePresence>
        {events.map(event => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`
              p-4 rounded-lg shadow-lg flex items-center gap-3
              ${getEventColor(event.type)}
              text-white
            `}
          >
            {getEventIcon(event.type)}
            <div className="flex-1">
              <p className="font-medium">{event.message}</p>
              {event.details && event.type === 'market' && (
                <p className="text-sm opacity-90">
                  New price: {event.details.newPrice} credits
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};