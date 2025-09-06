import { useState } from "react";
import { 
  Globe, 
  Shield, 
  Search, 
  Radar, 
  Target, 
  Eye, 
  Lock,
  Server,
  Database,
  Wifi,
  AlertTriangle,
  Bug,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ReconToolbarProps {
  onScanStart: (target: string, scanType: string) => void;
  isScanning: boolean;
}

export const ReconToolbar = ({ onScanStart, isScanning }: ReconToolbarProps) => {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("passive");
  const [activeScans, setActiveScans] = useState<string[]>([]);

  const scanTypes = [
    { id: "passive", name: "Passive Recon", icon: Eye, color: "secondary" },
    { id: "subdomain", name: "Subdomain Enum", icon: Globe, color: "primary" },
    { id: "port", name: "Port Scanning", icon: Server, color: "accent" },
    { id: "vuln", name: "Vuln Assessment", icon: Bug, color: "destructive" },
    { id: "ssl", name: "SSL Analysis", icon: Lock, color: "warning" },
    { id: "directory", name: "Directory Bruteforce", icon: Search, color: "primary" },
  ];

  const handleScan = () => {
    if (target && scanType) {
      onScanStart(target, scanType);
      setActiveScans(prev => [...prev, `${scanType}-${Date.now()}`]);
    }
  };

  const getScanTypeInfo = (type: string) => {
    return scanTypes.find(t => t.id === type);
  };

  return (
    <div className="glass border-b border-border p-4 space-y-4">
      {/* Target Input Section */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <Input
            placeholder="Enter target domain (e.g., example.com)"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="bg-muted/50 border-primary/20 focus:border-primary"
          />
        </div>
        
        <Select value={scanType} onValueChange={setScanType}>
          <SelectTrigger className="w-48 bg-muted/50 border-primary/20">
            <SelectValue placeholder="Select scan type" />
          </SelectTrigger>
          <SelectContent className="glass border-primary/20">
            {scanTypes.map(type => {
              const Icon = type.icon;
              return (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{type.name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Button 
          onClick={handleScan}
          disabled={!target || !scanType || isScanning}
          className="bg-gradient-primary hover:opacity-90 glow-primary"
        >
          {isScanning ? "Scanning..." : "Launch Scan"}
        </Button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center space-x-2">
        <div className="text-sm text-muted-foreground font-medium">Quick Actions:</div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-secondary/20 hover:border-secondary hover:bg-secondary/10"
        >
          <Radar className="w-4 h-4 mr-2" />
          WHOIS
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-accent/20 hover:border-accent hover:bg-accent/10"
        >
          <Wifi className="w-4 h-4 mr-2" />
          DNS Lookup
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-warning/20 hover:border-warning hover:bg-warning/10"
        >
          <Shield className="w-4 h-4 mr-2" />
          Security Headers
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-destructive/20 hover:border-destructive hover:bg-destructive/10"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          CVE Check
        </Button>

        <Separator orientation="vertical" className="h-6" />
        
        <Badge variant="outline" className="text-xs">
          {activeScans.length} Active Scans
        </Badge>
      </div>

      {/* Scan Status */}
      {isScanning && scanType && (
        <div className="flex items-center space-x-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
          <span className="text-sm font-medium text-primary">
            Running {getScanTypeInfo(scanType)?.name} on {target}
          </span>
          <Zap className="w-4 h-4 text-primary animate-pulse" />
        </div>
      )}
    </div>
  );
};