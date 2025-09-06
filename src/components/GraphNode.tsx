import { useState } from "react";
import { 
  User, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  FileText,
  Image,
  Link,
  Smartphone
} from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
  type: string;
  label: string;
  color: string;
}

interface GraphNodeProps {
  node: Node;
  onPositionChange: (x: number, y: number) => void;
}

const getNodeIcon = (type: string) => {
  const iconMap = {
    person: User,
    email: Mail,
    phone: Phone,
    website: Globe,
    location: MapPin,
    building: Building,
    document: FileText,
    image: Image,
    url: Link,
    device: Smartphone,
  };
  return iconMap[type as keyof typeof iconMap] || User;
};

const getColorClasses = (color: string) => {
  const colorMap = {
    primary: "node-primary bg-primary/10 text-primary",
    secondary: "node-secondary bg-secondary/10 text-secondary",
    accent: "node-accent bg-accent/10 text-accent",
    warning: "border-warning bg-warning/10 text-warning",
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.primary;
};

export const GraphNode = ({ node, onPositionChange }: GraphNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = getNodeIcon(node.type);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onPositionChange(newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 ${
        isHovered ? 'animate-pulse-glow scale-110' : ''
      }`}
      style={{
        left: node.x - 40,
        top: node.y - 40,
        transform: isDragging ? 'scale(1.1)' : 'scale(1)',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node Circle */}
      <div className={`node w-20 h-20 flex items-center justify-center ${getColorClasses(node.color)}`}>
        <Icon className="w-8 h-8" />
      </div>
      
      {/* Node Label */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 mt-2">
        <div className="glass px-2 py-1 rounded text-xs font-mono text-center whitespace-nowrap max-w-24 truncate">
          {node.label}
        </div>
      </div>
      
      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 glass px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap z-20">
          <div className="text-primary font-semibold">{node.type.toUpperCase()}</div>
          <div className="text-muted-foreground">{node.label}</div>
        </div>
      )}
    </div>
  );
};