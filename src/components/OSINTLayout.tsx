import { useState } from "react";
import { Search, Settings, Database, Network, Target, Shield, Eye, Zap, Globe, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EntityPalette } from "./EntityPalette";
import { GraphCanvas } from "./GraphCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { VulnerabilityPanel } from "./VulnerabilityPanel";
import { ReconResults } from "./ReconResults";
import { ReconToolbar } from "./ReconToolbar";
import { TopToolbar } from "./TopToolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const OSINTLayout = () => {
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTarget, setCurrentTarget] = useState("");
  const [currentScanType, setCurrentScanType] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [activeMode, setActiveMode] = useState<"graph" | "recon">("graph");

  const handleScanStart = (target: string, scanType: string) => {
    setCurrentTarget(target);
    setCurrentScanType(scanType);
    setIsScanning(true);
    
    // Simulate scan completion
    setTimeout(() => {
      setIsScanning(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Toolbar */}
      <TopToolbar />
      
      {/* Recon Toolbar - Only show in recon mode */}
      {activeMode === "recon" && (
        <ReconToolbar 
          onScanStart={handleScanStart}
          isScanning={isScanning}
        />
      )}
      
      {/* Mode Toggle */}
      <div className="px-6 py-2 border-b border-border">
        <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as "graph" | "recon")}>
          <TabsList className="glass">
            <TabsTrigger value="graph" className="flex items-center space-x-2">
              <Network className="w-4 h-4" />
              <span>Graph Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="recon" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Penetration Testing</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar - Conditional based on mode */}
        {activeMode === "graph" ? (
          <div className="w-64 glass border-r border-border p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              
              {/* Entity Categories */}
              <EntityPalette onEntitySelect={setSelectedEntity} />
            </div>
          </div>
        ) : (
          <div className="w-80 glass border-r border-border overflow-y-auto">
            <ReconResults 
              target={currentTarget}
              scanType={currentScanType}
              isScanning={isScanning}
            />
          </div>
        )}

        {/* Center - Main Workspace */}
        <div className="flex-1 relative bg-gradient-to-br from-background via-background to-muted/20">
          {activeMode === "graph" ? (
            <GraphCanvas selectedEntity={selectedEntity} />
          ) : (
            <div className="h-full p-6">
              <Tabs defaultValue="overview" className="h-full">
                <TabsList className="glass mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                  <TabsTrigger value="network">Network Map</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="h-full">
                  <div className="grid grid-cols-2 gap-6 h-full">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Target Intelligence</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass p-4 rounded-lg border border-primary/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Subdomains</p>
                              <p className="text-2xl font-bold text-primary">8</p>
                            </div>
                            <Globe className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <div className="glass p-4 rounded-lg border border-secondary/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Open Ports</p>
                              <p className="text-2xl font-bold text-secondary">3</p>
                            </div>
                            <Server className="w-8 h-8 text-secondary" />
                          </div>
                        </div>
                        <div className="glass p-4 rounded-lg border border-accent/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Technologies</p>
                              <p className="text-2xl font-bold text-accent">5</p>
                            </div>
                            <Database className="w-8 h-8 text-accent" />
                          </div>
                        </div>
                        <div className="glass p-4 rounded-lg border border-warning/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">SSL Grade</p>
                              <p className="text-2xl font-bold text-warning">A+</p>
                            </div>
                            <Shield className="w-8 h-8 text-warning" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="glass p-4 rounded-lg border border-border/50">
                      <h4 className="text-sm font-semibold mb-4">Recent Scan Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <span className="text-sm">Subdomain enumeration completed</span>
                          <span className="text-xs text-muted-foreground">2m ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <span className="text-sm">Port scan finished</span>
                          <span className="text-xs text-muted-foreground">5m ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <span className="text-sm">SSL analysis complete</span>
                          <span className="text-xs text-muted-foreground">8m ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="vulnerabilities" className="h-full">
                  <VulnerabilityPanel target={currentTarget} />
                </TabsContent>
                
                <TabsContent value="network" className="h-full">
                  <div className="glass p-6 rounded-lg border border-border/50 h-full flex items-center justify-center">
                    <div className="text-center">
                      <Network className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Network Topology</h3>
                      <p className="text-sm text-muted-foreground">
                        Network mapping visualization will appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {/* Right Sidebar - Conditional based on mode */}
        {activeMode === "graph" && (
          <div className="w-80 glass border-l border-border overflow-y-auto">
            <PropertyPanel selectedEntity={selectedEntity} />
          </div>
        )}
      </div>
    </div>
  );
};