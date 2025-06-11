import { Node, Edge } from 'reactflow';

// Constants
const idealSequence = [
  'AC Outlet',
  'Active Front-End Rectifier',
  'Internal Battery',
  'Vehicle'
];

// Scoring function
export function scoreEVCAssessment(nodes: Node[], edges: Edge[]) {
  // Get the actual sequence of components based on the connections
  const actualSequence: string[] = [];
  
  // Find the starting node (the one that's only a source, not a target)
  const startNode = nodes.find(node => 
    !edges.some(edge => edge.target === node.id)
  );
  
  if (startNode) {
    actualSequence.push(startNode.data.label);
    
    // Follow the connections to build the sequence
    let currentNode = startNode;
    while (true) {
      const nextEdge = edges.find(edge => edge.source === currentNode.id);
      if (!nextEdge) break;
      
      const nextNode = nodes.find(node => node.id === nextEdge.target);
      if (!nextNode) break;
      
      actualSequence.push(nextNode.data.label);
      currentNode = nextNode;
    }
  }

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