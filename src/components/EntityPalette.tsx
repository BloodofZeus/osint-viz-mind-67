import { useState } from "react";
import { 
  User, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  CreditCard,
  FileText,
  Image,
  Link,
  Smartphone,
  Wifi,
  Car,
  Plane,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EntityType {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  category: string;
}

const entityTypes: EntityType[] = [
  // Person Entities
  { id: "person", name: "Person", icon: User, color: "primary", category: "Person" },
  { id: "email", name: "Email Address", icon: Mail, color: "secondary", category: "Person" },
  { id: "phone", name: "Phone Number", icon: Phone, color: "accent", category: "Person" },
  
  // Location Entities
  { id: "location", name: "Location", icon: MapPin, color: "warning", category: "Location" },
  { id: "address", name: "Physical Address", icon: Building, color: "primary", category: "Location" },
  
  // Online Entities
  { id: "website", name: "Website", icon: Globe, color: "secondary", category: "Online" },
  { id: "domain", name: "Domain", icon: Wifi, color: "accent", category: "Online" },
  { id: "url", name: "URL", icon: Link, color: "primary", category: "Online" },
  
  // Document Entities
  { id: "document", name: "Document", icon: FileText, color: "secondary", category: "Documents" },
  { id: "image", name: "Image", icon: Image, color: "accent", category: "Documents" },
  
  // Infrastructure
  { id: "device", name: "Device", icon: Smartphone, color: "warning", category: "Infrastructure" },
  { id: "vehicle", name: "Vehicle", icon: Car, color: "primary", category: "Infrastructure" },
  { id: "aircraft", name: "Aircraft", icon: Plane, color: "secondary", category: "Infrastructure" },
];

const categories = Array.from(new Set(entityTypes.map(entity => entity.category)));

interface EntityPaletteProps {
  onEntitySelect: (entity: EntityType) => void;
}

export const EntityPalette = ({ onEntitySelect }: EntityPaletteProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Person", "Online"]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "border-primary text-primary hover:bg-primary/10",
      secondary: "border-secondary text-secondary hover:bg-secondary/10",
      accent: "border-accent text-accent hover:bg-accent/10",
      warning: "border-warning text-warning hover:bg-warning/10",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Entity Palette
      </div>
      
      {categories.map(category => (
        <Card key={category} className="glass border-border/50">
          <Collapsible 
            open={expandedCategories.includes(category)}
            onOpenChange={() => toggleCategory(category)}
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-3 h-auto font-medium"
              >
                {category}
                {expandedCategories.includes(category) ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="px-3 pb-3">
              <div className="space-y-2">
                {entityTypes
                  .filter(entity => entity.category === category)
                  .map(entity => {
                    const Icon = entity.icon;
                    return (
                      <Button
                        key={entity.id}
                        variant="outline"
                        size="sm"
                        onClick={() => onEntitySelect(entity)}
                        className={`w-full justify-start text-xs ${getColorClasses(entity.color)}`}
                      >
                        <Icon className="w-3 h-3 mr-2" />
                        {entity.name}
                      </Button>
                    );
                  })
                }
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
};