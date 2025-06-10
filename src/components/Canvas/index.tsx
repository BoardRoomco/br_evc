'use client';

import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  addEdge,
  NodeChange,
  EdgeChange,
  ConnectionMode,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export const Canvas = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      // Get the canvas element's bounding rectangle
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type: 'default',
        position,
        data: { label: type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes]
  );

  return (
    <div className="w-full h-[calc(100vh-2rem)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[15, 15]}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}; 