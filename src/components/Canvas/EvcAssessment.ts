import { Node, Edge } from 'reactflow';

// Constants
const idealSequence = [
  'AC Outlet',
  'Active Front-End Rectifier',
  'Internal Battery',
  'Vehicle'
];

// Optimized sequence building function
const buildSequence = (nodes: Node[], edges: Edge[]): string[] => {
  // Create maps for O(1) lookups
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  const edgeMap = new Map(edges.map(edge => [edge.source, edge]));
  
  const sequence: string[] = [];
  // Find starting node (the one that's only a source, not a target)
  let currentNode = nodes.find(node => !edges.some(edge => edge.target === node.id));
  
  while (currentNode) {
    sequence.push(currentNode.data.label);
    const nextEdge = edgeMap.get(currentNode.id);
    if (!nextEdge) break;
    currentNode = nodeMap.get(nextEdge.target);
  }
  
  return sequence;
};

// Scoring function
export function scoreEVCAssessment(nodes: Node[], edges: Edge[]) {
  // Get the actual sequence using optimized function
  const actualSequence = buildSequence(nodes, edges);

  // Count how many components are in the correct position
  let correctComponents = 0;
  actualSequence.forEach((component, index) => {
    if (component === idealSequence[index]) {
      correctComponents++;
    }
  });

  // Calculate the score as a percentage
  const score = correctComponents / idealSequence.length;

  return {
    isCorrect: score === 1,
    score,
    details: {
      correctComponents,
      totalComponents: idealSequence.length,
      actualSequence,
    }
  };
} 