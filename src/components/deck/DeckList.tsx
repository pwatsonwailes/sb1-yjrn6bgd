import React from 'react';
import { Card } from '../../types/cards';
import { DeckCard } from './DeckCard';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface DeckListProps {
  deck: Card[];
  availableCards: Card[];
  onUpdateDeck: (newDeck: Card[]) => void;
}

export const DeckList: React.FC<DeckListProps> = ({
  deck,
  availableCards,
  onUpdateDeck,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(deck);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onUpdateDeck(items);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Current Deck ({deck.length})</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="deck">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {deck.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DeckCard
                          card={card}
                          onRemove={() => {
                            const newDeck = deck.filter(c => c.id !== card.id);
                            onUpdateDeck(newDeck);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Available Cards</h3>
        <div className="space-y-2">
          {availableCards.map(card => (
            <DeckCard
              key={card.id}
              card={card}
              onAdd={() => {
                if (deck.length < 30) {
                  onUpdateDeck([...deck, card]);
                }
              }}
              disabled={deck.length >= 30}
            />
          ))}
        </div>
      </div>
    </div>
  );
};