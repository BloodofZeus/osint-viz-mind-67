import { useState } from "react";
import { 
  Network, 
  Save, 
  Upload, 
  Download, 
  Settings, 
  Zap, 
  Target, 
  Shield,
  Eye,
  Database,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/enhanced-tooltip";

export const TopToolbar = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <TooltipProvider>
      <div className="h-16 glass border-b border-border px-6 flex items-center justify-between">
      {/* Left Section - Logo & Title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
            <Network className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              OSINT Matrix
            </h1>
            <p className="text-xs text-muted-foreground">Intelligence Analysis Platform</p>
          </div>
        </div>
      </div>

      {/* Center Section - Analysis Tools */}
      <div className="flex items-center space-x-2">
        <Button 
          variant="cyber" 
          size="sm" 
          onClick={handleScan}
          disabled={isScanning}
          className="animate-pulse-glow"
        >
          {isScanning ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Target className="w-4 h-4 mr-2" />
          )}
          {isScanning ? "Scanning..." : "Deep Scan"}
        </Button>
        
        <Button 
          variant="matrix" 
          size="sm"
          className="transition-all duration-300 hover:scale-105"
        >
          <Zap className="w-4 h-4 mr-2" />
          Transform
        </Button>
        
        <Button 
          variant="accent" 
          size="sm"
          className="transition-all duration-300 hover:scale-105"
        >
          <Eye className="w-4 h-4 mr-2" />
          AI Analyze
        </Button>
      </div>

      {/* Right Section - File Operations */}
      <div className="flex items-center space-x-2">
        <Button variant="glass" size="sm" className="hover:glow-primary">
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>
        
        <Button variant="glass" size="sm" className="hover:glow-secondary">
          <Save className="w-4 h-4 mr-2" />
          Save Graph
        </Button>
        
        <Button variant="glass" size="sm" className="hover:glow-accent">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button variant="glass" size="sm" className="hover:glow-primary">
              <Settings className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="cyber">
            Application Settings
          </TooltipContent>
        </TooltipRoot>
      </div>
      </div>
    </TooltipProvider>
  );
};