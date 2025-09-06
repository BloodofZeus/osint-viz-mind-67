import { useState, useRef, useEffect } from "react";
import { Plus, Minus, RotateCcw, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GraphNode } from "./GraphNode";

interface Node {
  id: string;
  x: number;
  y: number;
  type: string;
  label: string;
  color: string;
}

interface Link {
  source: string;
  target: string;
  label?: string;
}

interface GraphCanvasProps {
  selectedEntity: any;
}

export const GraphCanvas = ({ selectedEntity }: GraphCanvasProps) => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", x: 400, y: 300, type: "person", label: "John Doe", color: "primary" },
    { id: "2", x: 600, y: 200, type: "email", label: "john@example.com", color: "secondary" },
    { id: "3", x: 600, y: 400, type: "phone", label: "+1234567890", color: "accent" },
  ]);
  
  const [links, setLinks] = useState<Link[]>([
    { source: "1", target: "2", label: "owns" },
    { source: "1", target: "3", label: "uses" },
  ]);
  
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (selectedEntity && e.target === canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      
      const newNode: Node = {
        id: `node-${Date.now()}`,
        x,
        y,
        type: selectedEntity.id,
        label: selectedEntity.name,
        color: selectedEntity.color,
      };
      
      setNodes(prev => [...prev, newNode]);
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={zoomIn}
          className="glass border-primary/20 hover:border-primary"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={zoomOut}
          className="glass border-primary/20 hover:border-primary"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetView}
          className="glass border-primary/20 hover:border-primary"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Canvas Instructions */}
      {nodes.length === 3 && (
        <div className="absolute top-4 left-4 z-10 glass p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground">
            Select an entity from the palette and click on the canvas to add nodes
          </p>
        </div>
      )}

      {/* Graph Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-move cyber-grid"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Links */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {links.map((link, index) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            
            if (!sourceNode || !targetNode) return null;
            
            return (
              <g key={index}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
                {link.label && (
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2}
                    fill="hsl(var(--primary))"
                    fontSize="12"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {link.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <GraphNode
            key={node.id}
            node={node}
            onPositionChange={(newX, newY) => {
              setNodes(prev => prev.map(n => 
                n.id === node.id ? { ...n, x: newX, y: newY } : n
              ));
            }}
          />
        ))}
      </div>
    </div>
  );
};