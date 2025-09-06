import { useState } from "react";
import { 
  Globe, 
  Server, 
  Lock, 
  Eye, 
  Search,
  Wifi,
  Database,
  Shield,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ReconResultsProps {
  target: string;
  scanType: string;
  isScanning: boolean;
}

interface ReconData {
  subdomains: string[];
  ports: { port: number; service: string; status: string; version?: string }[];
  technologies: { name: string; version?: string; category: string }[];
  ssl: { issuer: string; validFrom: string; validTo: string; grade: string };
  directories: { path: string; status: number; size: number }[];
  dns: { type: string; value: string }[];
}

const mockReconData: ReconData = {
  subdomains: [
    "www.example.com",
    "mail.example.com", 
    "ftp.example.com",
    "api.example.com",
    "admin.example.com",
    "dev.example.com",
    "staging.example.com",
    "test.example.com"
  ],
  ports: [
    { port: 80, service: "HTTP", status: "open", version: "Apache 2.4.41" },
    { port: 443, service: "HTTPS", status: "open", version: "Apache 2.4.41" },
    { port: 22, service: "SSH", status: "open", version: "OpenSSH 8.2" },
    { port: 3306, service: "MySQL", status: "filtered" },
    { port: 21, service: "FTP", status: "closed" },
    { port: 25, service: "SMTP", status: "open", version: "Postfix 3.4.13" }
  ],
  technologies: [
    { name: "Apache", version: "2.4.41", category: "Web Server" },
    { name: "PHP", version: "7.4.3", category: "Programming Language" },
    { name: "MySQL", version: "8.0.25", category: "Database" },
    { name: "jQuery", version: "3.6.0", category: "JavaScript Library" },
    { name: "Bootstrap", version: "4.6.0", category: "CSS Framework" }
  ],
  ssl: {
    issuer: "Let's Encrypt Authority X3",
    validFrom: "2024-01-01",
    validTo: "2024-04-01",
    grade: "A+"
  },
  directories: [
    { path: "/admin", status: 200, size: 1024 },
    { path: "/wp-admin", status: 403, size: 512 },
    { path: "/api", status: 200, size: 2048 },
    { path: "/backup", status: 404, size: 0 },
    { path: "/config", status: 403, size: 256 },
    { path: "/uploads", status: 200, size: 4096 }
  ],
  dns: [
    { type: "A", value: "192.168.1.100" },
    { type: "AAAA", value: "2001:db8::1" },
    { type: "MX", value: "mail.example.com (10)" },
    { type: "NS", value: "ns1.example.com" },
    { type: "TXT", value: "v=spf1 include:_spf.google.com ~all" }
  ]
};

export const ReconResults = ({ target, scanType, isScanning }: ReconResultsProps) => {
  const [activeTab, setActiveTab] = useState("subdomains");

  const getStatusColor = (status: string | number) => {
    if (typeof status === 'string') {
      switch (status.toLowerCase()) {
        case 'open': return 'secondary';
        case 'closed': return 'destructive';
        case 'filtered': return 'outline';
        default: return 'secondary';
      }
    } else {
      if (status >= 200 && status < 300) return 'secondary';
      if (status >= 300 && status < 400) return 'outline';
      if (status >= 400) return 'destructive';
      return 'secondary';
    }
  };

  const getScanIcon = (type: string) => {
    switch (type) {
      case 'subdomain': return <Globe className="w-4 h-4" />;
      case 'port': return <Server className="w-4 h-4" />;
      case 'ssl': return <Lock className="w-4 h-4" />;
      case 'directory': return <Search className="w-4 h-4" />;
      case 'passive': return <Eye className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  if (!target) {
    return (
      <div className="h-full flex items-center justify-center text-center">
        <div className="space-y-4">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-medium mb-2">Ready for Reconnaissance</h3>
            <p className="text-sm text-muted-foreground">
              Enter a target domain and select a scan type to begin analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full space-y-4">
      {/* Scan Header */}
      <div className="glass border border-primary/20 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {getScanIcon(scanType)}
            <div>
              <h3 className="font-semibold text-primary">Reconnaissance Results</h3>
              <p className="text-sm text-muted-foreground">Target: {target}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {scanType.charAt(0).toUpperCase() + scanType.slice(1)} Scan
          </Badge>
        </div>
        
        {isScanning && (
          <div className="space-y-2">
            <Progress value={65} className="h-2" />
            <p className="text-xs text-muted-foreground">Scanning in progress... 65% complete</p>
          </div>
        )}
      </div>

      {/* Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-6 glass">
          <TabsTrigger value="subdomains" className="text-xs">Subdomains</TabsTrigger>
          <TabsTrigger value="ports" className="text-xs">Ports</TabsTrigger>
          <TabsTrigger value="tech" className="text-xs">Tech Stack</TabsTrigger>
          <TabsTrigger value="ssl" className="text-xs">SSL/TLS</TabsTrigger>
          <TabsTrigger value="directories" className="text-xs">Directories</TabsTrigger>
          <TabsTrigger value="dns" className="text-xs">DNS</TabsTrigger>
        </TabsList>

        <TabsContent value="subdomains" className="space-y-3">
          <Card className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Discovered Subdomains ({mockReconData.subdomains.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-64 overflow-y-auto">
              {mockReconData.subdomains.map((subdomain, index) => (
                <div key={index} className="flex items-center justify-between p-2 glass rounded border border-border/30">
                  <span className="font-mono text-sm">{subdomain}</span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ports" className="space-y-3">
          <Card className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Server className="w-4 h-4 mr-2" />
                Port Scan Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-64 overflow-y-auto">
              {mockReconData.ports.map((port, index) => (
                <div key={index} className="flex items-center justify-between p-3 glass rounded border border-border/30">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-bold">{port.port}</span>
                    <span className="text-sm">{port.service}</span>
                    {port.version && (
                      <span className="text-xs text-muted-foreground">({port.version})</span>
                    )}
                  </div>
                  <Badge variant={getStatusColor(port.status) as any} className="text-xs">
                    {port.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tech" className="space-y-3">
          <Card className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-64 overflow-y-auto">
              {mockReconData.technologies.map((tech, index) => (
                <div key={index} className="flex items-center justify-between p-3 glass rounded border border-border/30">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{tech.name}</span>
                      {tech.version && (
                        <Badge variant="outline" className="text-xs">{tech.version}</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{tech.category}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ssl" className="space-y-3">
          <Card className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                SSL/TLS Certificate Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Security Grade</span>
                <Badge variant="secondary" className="text-sm font-bold bg-secondary text-secondary-foreground">
                  {mockReconData.ssl.grade}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issuer:</span>
                  <span className="font-mono">{mockReconData.ssl.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid From:</span>
                  <span className="font-mono">{mockReconData.ssl.validFrom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid To:</span>
                  <span className="font-mono">{mockReconData.ssl.validTo}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="directories" className="space-y-3">
          <Card className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Directory Enumeration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-64 overflow-y-auto">
              {mockReconData.directories.map((dir, index) => (
                <div key={index} className="flex items-center justify-between p-2 glass rounded border border-border/30">
                  <span className="font-mono text-sm">{dir.path}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{dir.size} bytes</span>
                    <Badge variant={getStatusColor(dir.status) as any} className="text-xs">
                      {dir.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns" className="space-y-3">
          <Card className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Wifi className="w-4 h-4 mr-2" />
                DNS Records
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-64 overflow-y-auto">
              {mockReconData.dns.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 glass rounded border border-border/30">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs font-mono">
                      {record.type}
                    </Badge>
                    <span className="font-mono text-sm">{record.value}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};