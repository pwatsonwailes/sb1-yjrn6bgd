import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { EventItem } from './events/EventItem';
import { GameEvent } from '../types/events';

interface EventLogProps {
  events: GameEvent[];
}

export const EventLog: React.FC<EventLogProps> = ({ events }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full space-y-2 z-50">
      <AnimatePresence>
        {events.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </AnimatePresence>
    </div>
  );
};