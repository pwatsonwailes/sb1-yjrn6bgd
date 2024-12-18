import { StoryNode } from '../../types/story';

export const checkNodeRequirements = (
  node: StoryNode,
  choices: Record<string, number>
): boolean => {
  if (!node.requirements || node.requirements.length === 0)
    return true

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

export const findNextValidNode = (
  nodes: StoryNode[],
  startIndex: number,
  choices: Record<string, number>
): { node: StoryNode; index: number } | null => {
  for (let i = startIndex; i < nodes.length; i++) {
    const node = nodes[i]
    console.log('checking', node, choices)

    if (checkNodeRequirements(node, choices)) {
      console.log('checked - valid', node)
      return { node, index: i };
    }
    else 
      console.log('checked - invalid', node)
  }
  return null;
};