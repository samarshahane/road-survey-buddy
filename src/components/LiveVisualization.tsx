import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Activity, 
  Users, 
  MapPin, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";

const LiveVisualization = () => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data for road conditions survey
  const responseData = [
    { condition: 'Excellent', count: 45, percentage: 8 },
    { condition: 'Good', count: 120, percentage: 21 },
    { condition: 'Fair', count: 180, percentage: 32 },
    { condition: 'Poor', count: 145, percentage: 25 },
    { condition: 'Very Poor', count: 82, percentage: 14 }
  ];

  const timeSeriesData = [
    { time: '00:00', responses: 12 },
    { time: '04:00', responses: 8 },
    { time: '08:00', responses: 45 },
    { time: '12:00', responses: 78 },
    { time: '16:00', responses: 89 },
    { time: '20:00', responses: 67 }
  ];

  const issueTypeData = [
    { name: 'Potholes', value: 234, color: '#ef4444' },
    { name: 'Cracks', value: 156, color: '#f97316' },
    { name: 'Poor Drainage', value: 98, color: '#eab308' },
    { name: 'Missing Signage', value: 67, color: '#22c55e' },
    { name: 'Uneven Surface', value: 145, color: '#3b82f6' }
  ];

  const locationData = [
    { area: 'Central District', responses: 234, avgRating: 2.3, status: 'critical' },
    { area: 'North Zone', responses: 189, avgRating: 3.1, status: 'moderate' },
    { area: 'South Zone', responses: 156, avgRating: 3.8, status: 'good' },
    { area: 'East District', responses: 198, avgRating: 2.7, status: 'poor' },
    { area: 'West District', responses: 167, avgRating: 3.2, status: 'moderate' }
  ];

  const qualityMetrics = [
    { label: 'Response Rate', value: '87%', status: 'good', icon: TrendingUp },
    { label: 'Completion Rate', value: '93%', status: 'excellent', icon: CheckCircle },
    { label: 'Avg Response Time', value: '2.3m', status: 'good', icon: Clock },
    { label: 'Data Quality Score', value: '91%', status: 'excellent', icon: Activity }
  ];

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10';
      case 'good': return 'text-primary bg-primary/10';
      case 'moderate': return 'text-warning bg-warning/10';
      case 'poor': return 'text-destructive bg-destructive/10';
      case 'critical': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Live Survey Monitoring</h2>
          <p className="text-muted-foreground">Real-time visualization of survey responses</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge 
            variant={isLive ? "default" : "secondary"}
            className={isLive ? "bg-success text-success-foreground animate-pulse" : ""}
          >
            <Activity className="w-3 h-3 mr-1" />
            {isLive ? 'Live' : 'Paused'}
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLive ? 'animate-spin' : ''}`} />
            {isLive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {qualityMetrics.map((metric, index) => (
          <Card key={index} className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                <metric.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Response Distribution */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <BarChart className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Road Condition Ratings</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="condition" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} responses`, 'Count']}
                labelFormatter={(label) => `Condition: ${label}`}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Issue Types */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-bold">Common Issues</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={issueTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {issueTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} reports`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Response Timeline */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-bold">Response Timeline</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} responses`, 'Count']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="responses" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--secondary))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Geographic Distribution */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-bold">Geographic Distribution</h3>
          </div>
          
          <div className="space-y-3">
            {locationData.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{location.area}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(location.status)}`}
                    >
                      {location.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {location.responses} responses • Avg: {location.avgRating}/5.0
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        location.status === 'excellent' ? 'bg-success' :
                        location.status === 'good' ? 'bg-primary' :
                        location.status === 'moderate' ? 'bg-warning' :
                        'bg-destructive'
                      }`}
                      style={{ width: `${(location.avgRating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Live Feed */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">Live Response Feed</h3>
          <Badge variant="outline" className="text-xs">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {[
            { time: '14:32', area: 'Central District', rating: 'Poor', issue: 'Potholes' },
            { time: '14:31', area: 'North Zone', rating: 'Fair', issue: 'Cracks' },
            { time: '14:30', area: 'South Zone', rating: 'Good', issue: 'None' },
            { time: '14:29', area: 'East District', rating: 'Very Poor', issue: 'Multiple issues' },
            { time: '14:28', area: 'West District', rating: 'Fair', issue: 'Poor drainage' }
          ].map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-xs">{entry.time}</Badge>
                <span className="font-medium">{entry.area}</span>
                <span className="text-muted-foreground">{entry.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">{entry.issue}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LiveVisualization;