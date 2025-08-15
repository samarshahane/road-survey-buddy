import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Plus, 
  Send, 
  BarChart3, 
  Users, 
  MapPin,
  Clock,
  CheckCircle,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SurveyQuestionGenerator from "@/components/SurveyQuestionGenerator";
import LiveVisualization from "@/components/LiveVisualization";

const GovernmentDashboard = () => {
  const [surveyTopic, setSurveyTopic] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuestions = async () => {
    if (!surveyTopic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a survey topic to generate questions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI question generation
    setTimeout(() => {
      const questions = [
        "How would you rate the overall condition of roads in your area?",
        "Which type of road damage is most common in your locality?",
        "How frequently do you encounter potholes during your daily commute?",
        "What is the impact of poor road conditions on your daily life?",
        "Have you reported road issues to authorities before?",
        "How would you rate the government's response to road repair requests?",
        "What time of day do you mostly use these roads?",
        "Which areas need the most urgent attention for road repairs?"
      ];
      
      setGeneratedQuestions(questions);
      setIsGenerating(false);
      
      toast({
        title: "Questions Generated Successfully",
        description: `Generated ${questions.length} questions for your survey.`,
      });
    }, 2000);
  };

  const handleDeploySurvey = () => {
    toast({
      title: "Survey Deployed",
      description: "Survey has been deployed across all channels.",
    });
  };

  const stats = [
    { label: "Active Surveys", value: "3", icon: BarChart3, change: "+2 this week" },
    { label: "Total Responses", value: "1,247", icon: Users, change: "+156 today" },
    { label: "Coverage Areas", value: "12", icon: MapPin, change: "All districts" },
    { label: "Avg Response Time", value: "2.3m", icon: Clock, change: "-15% faster" }
  ];

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Government Dashboard</h1>
              <p className="text-muted-foreground">Manage surveys and monitor citizen feedback</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="create">Create Survey</TabsTrigger>
            <TabsTrigger value="monitor">Live Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Survey Creation */}
              <Card className="p-6 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Plus className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Create New Survey</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Survey Topic</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Road Conditions Assessment"
                      value={surveyTopic}
                      onChange={(e) => setSurveyTopic(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the purpose and scope of your survey..."
                      value={surveyDescription}
                      onChange={(e) => setSurveyDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleGenerateQuestions}
                    disabled={isGenerating}
                    className="w-full bg-gradient-primary border-0"
                  >
                    {isGenerating ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-pulse" />
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Generate AI Questions
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Generated Questions */}
              <Card className="p-6 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <h2 className="text-xl font-bold">Generated Questions</h2>
                  <Badge variant="secondary">{generatedQuestions.length}</Badge>
                </div>
                
                {generatedQuestions.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {generatedQuestions.map((question, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">Q{index + 1}:</p>
                          <p>{question}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={handleDeploySurvey}
                      className="w-full bg-gradient-secondary border-0"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Deploy Survey
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Brain className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">
                      Enter a topic above to generate AI-powered questions
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitor">
            <LiveVisualization />
          </TabsContent>

          <TabsContent value="analytics">
            <SurveyQuestionGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentDashboard;