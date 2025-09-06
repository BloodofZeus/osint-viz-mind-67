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

export const TopToolbar = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
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
          variant="outline" 
          size="sm" 
          onClick={handleScan}
          disabled={isScanning}
          className="border-primary/20 hover:border-primary hover:bg-primary/10"
        >
          {isScanning ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Target className="w-4 h-4 mr-2" />
          )}
          {isScanning ? "Scanning..." : "Scan"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-secondary/20 hover:border-secondary hover:bg-secondary/10"
        >
          <Zap className="w-4 h-4 mr-2" />
          Transform
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-accent/20 hover:border-accent hover:bg-accent/10"
        >
          <Eye className="w-4 h-4 mr-2" />
          Analyze
        </Button>
      </div>

      {/* Right Section - File Operations */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Load
        </Button>
        
        <Button variant="ghost" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};