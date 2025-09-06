import { useState } from "react";
import { 
  Info, 
  Search, 
  ExternalLink, 
  Copy, 
  Eye, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyPanelProps {
  selectedEntity: any;
}

export const PropertyPanel = ({ selectedEntity }: PropertyPanelProps) => {
  const [activeTab, setActiveTab] = useState("properties");

  // Mock data for demonstration
  const mockEntityData = {
    person: {
      name: "John Doe",
      type: "Person",
      properties: {
        "Full Name": "John Michael Doe",
        "Age": "34",
        "Location": "New York, NY",
        "Occupation": "Software Engineer",
        "Company": "TechCorp Inc.",
      },
      intelligence: [
        { type: "email", value: "john.doe@techcorp.com", confidence: "High", source: "WHOIS" },
        { type: "phone", value: "+1 (555) 123-4567", confidence: "Medium", source: "Social Media" },
        { type: "linkedin", value: "linkedin.com/in/johndoe", confidence: "High", source: "Public Profile" },
      ],
      risk: "Low",
      lastUpdated: "2 minutes ago"
    }
  };

  const entity = mockEntityData.person;

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Entity Inspector</h2>
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {selectedEntity || true ? (
        <div className="space-y-4">
          {/* Entity Overview */}
          <Card className="glass border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-primary">{entity.name}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {entity.type}
                </Badge>
              </div>
              <CardDescription className="flex items-center text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Updated {entity.lastUpdated}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Risk Level:</span>
                  <span className={`text-sm font-medium ${getRiskColor(entity.risk)}`}>
                    {entity.risk}
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 glass">
              <TabsTrigger value="properties" className="text-xs">Properties</TabsTrigger>
              <TabsTrigger value="intelligence" className="text-xs">Intel</TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-3">
              <Card className="glass border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Basic Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(entity.properties).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{key}:</span>
                      <span className="text-xs font-mono">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="intelligence" className="space-y-3">
              {entity.intelligence.map((intel, index) => (
                <Card key={index} className="glass border-border/50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {intel.type.toUpperCase()}
                      </Badge>
                      <Badge 
                        variant={getConfidenceColor(intel.confidence) as any}
                        className="text-xs"
                      >
                        {intel.confidence}
                      </Badge>
                    </div>
                    <div className="text-xs font-mono mb-2">{intel.value}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Source: {intel.source}</span>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-3">
              <Card className="glass border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Data Exposure:</span>
                      <Badge variant="secondary" className="text-xs">Low</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Social Footprint:</span>
                      <Badge variant="outline" className="text-xs">Medium</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Breach History:</span>
                      <Badge variant="secondary" className="text-xs">None</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-success" />
                    Data Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Completeness:</span>
                      <span className="text-xs font-mono">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Accuracy:</span>
                      <span className="text-xs font-mono">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Freshness:</span>
                      <span className="text-xs font-mono">2m ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Search className="w-3 h-3 mr-2" />
                Deep Search
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <ExternalLink className="w-3 h-3 mr-2" />
                External Lookup
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Copy className="w-3 h-3 mr-2" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Info className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Entity Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a node from the graph to view its properties and intelligence data.
          </p>
        </div>
      )}
    </div>
  );
};