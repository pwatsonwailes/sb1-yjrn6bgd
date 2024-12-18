import { StoryNode, StoryRequirement } from '../types/story';

export const checkNodeRequirements = (
  node: StoryNode,
  choices: Record<string, number>
): boolean => {
  if (!node.requirements) return true;

  return node.requirements.every(req => {
    if (!req || !req.choiceId) return true;

    switch (req.type) {
      case 'choice':
        return choices[req.choiceId] === req.optionId;
      default:
        return true;
    }
  });
};