import { StoryNode } from '../../types/story';

export const checkNodeRequirements = (
  node: StoryNode,
  choices: Record<string, number>
): boolean => {
  if (!node.requirements || node.requirements.length === 0) return true;

  return node.requirements.every(req => {
    if (!req || !req.choiceId) return true;

    switch (req.type) {
      case 'choice':
        const userChoice = choices[req.choiceId];
        return userChoice === req.optionId;
      default:
        return true;
    }
  });
};

export const findNextValidNode = (
  nodes: StoryNode[],
  startIndex: number,
  choices: Record<string, number>
): { node: StoryNode; index: number } | null => {
  for (let i = startIndex; i < nodes.length; i++) {
    if (checkNodeRequirements(nodes[i], choices)) {
      return { node: nodes[i], index: i };
    }
  }
  return null;
};