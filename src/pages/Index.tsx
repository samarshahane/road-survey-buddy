import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Brain, Users, BarChart3, MessageSquare, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Survey Platform</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              Smart Survey
              <br />
              Intelligence
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Revolutionizing data collection with AI-driven surveys, real-time analytics, 
              and multi-channel deployment for better civic engagement.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card 
              className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-card hover:shadow-elegant"
              onClick={() => navigate('/government')}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Shield className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Government Portal</h3>
                    <p className="text-muted-foreground">Create and manage surveys</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Real-time analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <span>AI-powered question generation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Multi-channel deployment</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300">
                  Access Government Portal
                </Button>
              </div>
            </Card>

            <Card 
              className="group relative overflow-hidden border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 cursor-pointer shadow-card hover:shadow-elegant"
              onClick={() => navigate('/survey')}
            >
              <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <Users className="w-8 h-8 text-secondary group-hover:text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Citizen Survey</h3>
                    <p className="text-muted-foreground">Participate in surveys</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-secondary" />
                    <span>Interactive AI assistant</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-secondary" />
                    <span>Voice & text responses</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>Anonymous & secure</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-secondary border-0 hover:shadow-glow transition-all duration-300">
                  Take Survey
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for modern survey management and citizen engagement
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">AI Question Generation</h3>
              <p className="text-muted-foreground">
                Automatically generate contextual survey questions based on your objectives
              </p>
            </Card>
            
            <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-muted-foreground">
                Live visualization of responses with instant data quality insights
              </p>
            </Card>
            
            <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Multi-channel Deployment</h3>
              <p className="text-muted-foreground">
                Deploy via WhatsApp, QR codes, calls, and web interfaces
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;