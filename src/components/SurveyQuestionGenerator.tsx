import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'rating' | 'text' | 'boolean';
  options?: string[];
  category: string;
}

const SurveyQuestionGenerator = () => {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [questionType, setQuestionType] = useState("mixed");
  const [targetAudience, setTargetAudience] = useState("general");
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Sample question templates for different topics
  const questionTemplates = {
    'road-conditions': [
      {
        text: "How would you rate the overall condition of roads in your area?",
        type: "rating" as const,
        options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"],
        category: "General Assessment"
      },
      {
        text: "Which specific road issues do you encounter most frequently?",
        type: "multiple-choice" as const,
        options: ["Potholes", "Cracks", "Poor drainage", "Missing signage", "Uneven surface"],
        category: "Specific Issues"
      },
      {
        text: "How do poor road conditions impact your daily commute?",
        type: "multiple-choice" as const,
        options: ["Increased travel time", "Vehicle damage", "Safety concerns", "Route changes", "No significant impact"],
        category: "Impact Assessment"
      },
      {
        text: "Have you reported road maintenance issues to local authorities?",
        type: "boolean" as const,
        options: ["Yes", "No"],
        category: "Civic Engagement"
      },
      {
        text: "What would you consider the most urgent area for road improvement?",
        type: "text" as const,
        category: "Priority Areas"
      },
      {
        text: "How satisfied are you with the government's response to road issues?",
        type: "rating" as const,
        options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
        category: "Government Response"
      }
    ]
  };

  const handleGenerateQuestions = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a survey topic to generate questions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation with realistic delay
    setTimeout(() => {
      // Use road conditions template for demonstration
      const baseQuestions = questionTemplates['road-conditions'];
      
      // Add contextual variations based on input
      const contextualQuestions: GeneratedQuestion[] = baseQuestions.map((q, index) => ({
        id: `q-${index + 1}`,
        text: q.text,
        type: q.type,
        options: q.options,
        category: q.category
      }));

      // Add some dynamic questions based on context
      if (context.toLowerCase().includes('safety')) {
        contextualQuestions.push({
          id: 'q-safety',
          text: "How concerned are you about safety while using roads in poor condition?",
          type: "rating",
          options: ["Not concerned", "Slightly concerned", "Moderately concerned", "Very concerned", "Extremely concerned"],
          category: "Safety"
        });
      }

      if (context.toLowerCase().includes('cost')) {
        contextualQuestions.push({
          id: 'q-cost',
          text: "Approximately how much extra do you spend annually on vehicle maintenance due to poor roads?",
          type: "multiple-choice",
          options: ["Less than ₹5,000", "₹5,000-₹10,000", "₹10,000-₹20,000", "₹20,000-₹50,000", "More than ₹50,000"],
          category: "Economic Impact"
        });
      }

      setGeneratedQuestions(contextualQuestions);
      setIsGenerating(false);

      toast({
        title: "Questions Generated Successfully",
        description: `Generated ${contextualQuestions.length} AI-powered questions.`,
      });
    }, 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Question text has been copied to clipboard.",
    });
  };

  const exportQuestions = () => {
    const exportData = {
      topic,
      context,
      targetAudience,
      questions: generatedQuestions,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-questions-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Questions Exported",
      description: "Survey questions have been downloaded as JSON file.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Question Generator</h2>
            <p className="text-sm text-muted-foreground">
              Create intelligent survey questions tailored to your objectives
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="survey-topic">Survey Topic</Label>
              <Input
                id="survey-topic"
                placeholder="e.g., Road Conditions Assessment"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="context">Additional Context</Label>
              <Textarea
                id="context"
                placeholder="Provide specific details about what you want to learn..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="question-type">Question Types</Label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select question types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed (Recommended)</SelectItem>
                  <SelectItem value="multiple-choice">Multiple Choice Only</SelectItem>
                  <SelectItem value="rating">Rating Scales Only</SelectItem>
                  <SelectItem value="text">Open Text Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Public</SelectItem>
                  <SelectItem value="residents">Local Residents</SelectItem>
                  <SelectItem value="commuters">Daily Commuters</SelectItem>
                  <SelectItem value="businesses">Business Owners</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex gap-3">
          <Button 
            onClick={handleGenerateQuestions}
            disabled={isGenerating || !topic.trim()}
            className="bg-gradient-primary border-0 flex-1"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate AI Questions
              </>
            )}
          </Button>

          {generatedQuestions.length > 0 && (
            <Button variant="outline" onClick={exportQuestions}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </Card>

      {/* Generated Questions */}
      {generatedQuestions.length > 0 && (
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="text-lg font-bold">Generated Questions</h3>
              <Badge variant="secondary">{generatedQuestions.length} Questions</Badge>
            </div>
          </div>

          <div className="space-y-4">
            {generatedQuestions.map((question, index) => (
              <Card key={question.id} className="p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Q{index + 1}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {question.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {question.category}
                      </Badge>
                    </div>
                    <p className="font-medium mb-2">{question.text}</p>
                    
                    {question.options && (
                      <div className="flex flex-wrap gap-2">
                        {question.options.map((option, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {option}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(question.text)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary mb-1">AI Generation Tips</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific in your topic and context for better results</li>
                  <li>• Mix question types for comprehensive data collection</li>
                  <li>• Consider your target audience when reviewing questions</li>
                  <li>• Edit generated questions to match your exact needs</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SurveyQuestionGenerator;