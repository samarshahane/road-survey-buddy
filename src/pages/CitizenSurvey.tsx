import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  RotateCcw, 
  CheckCircle,
  ArrowRight,
  User,
  Bot
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIAvatar from "@/components/AIAvatar";

interface Question {
  id: number;
  text: string;
  options: string[];
  type: 'multiple-choice' | 'rating' | 'text';
}

const CitizenSurvey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [isListening, setIsListening] = useState(false);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const { toast } = useToast();

  // Sample questions for road conditions survey
  const questions: Question[] = [
    {
      id: 1,
      text: "How would you rate the overall condition of roads in your area?",
      options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"],
      type: "multiple-choice"
    },
    {
      id: 2,
      text: "Which type of road damage is most common in your locality?",
      options: ["Potholes", "Cracks", "Uneven Surface", "Poor Drainage", "Missing Signage"],
      type: "multiple-choice"
    },
    {
      id: 3,
      text: "How frequently do you encounter potholes during your daily commute?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      type: "multiple-choice"
    },
    {
      id: 4,
      text: "What is the impact of poor road conditions on your daily life?",
      options: ["No Impact", "Minor Inconvenience", "Moderate Delays", "Major Disruption", "Severe Problems"],
      type: "multiple-choice"
    },
    {
      id: 5,
      text: "Have you reported road issues to authorities before?",
      options: ["Yes, multiple times", "Yes, once", "No, but plan to", "No, don't know how", "No, don't think it helps"],
      type: "multiple-choice"
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    // Speak the current question when it changes
    if (questions[currentQuestion] && !surveyComplete) {
      speakText(questions[currentQuestion].text);
    }
  }, [currentQuestion]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsAvatarSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.onend = () => setIsAvatarSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleOptionSelect = (option: string) => {
    setResponses(prev => ({
      ...prev,
      [questions[currentQuestion].id]: option
    }));

    // Move to next question or complete survey
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setSurveyComplete(true);
        speakText("Thank you for completing the survey! Your responses have been recorded.");
        toast({
          title: "Survey Complete!",
          description: "Thank you for your valuable feedback.",
        });
      }
    }, 500);
  };

  const toggleListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      
      if (!isListening) {
        setIsListening(true);
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          
          // Match spoken response to options
          const currentQ = questions[currentQuestion];
          const matchedOption = currentQ.options.find(option => 
            transcript.includes(option.toLowerCase()) ||
            (option.toLowerCase().includes('excellent') && transcript.includes('excellent')) ||
            (option.toLowerCase().includes('good') && transcript.includes('good')) ||
            (option.toLowerCase().includes('fair') && transcript.includes('fair')) ||
            (option.toLowerCase().includes('poor') && transcript.includes('poor'))
          );
          
          if (matchedOption) {
            handleOptionSelect(matchedOption);
            toast({
              title: "Voice Response Recorded",
              description: `Selected: ${matchedOption}`,
            });
          } else {
            toast({
              title: "Voice Not Recognized",
              description: "Please try again or tap an option.",
              variant: "destructive",
            });
          }
          
          setIsListening(false);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Please try again or use touch input.",
            variant: "destructive",
          });
        };
        
        recognition.start();
      } else {
        setIsListening(false);
      }
    }
  };

  const restartSurvey = () => {
    setCurrentQuestion(0);
    setResponses({});
    setSurveyComplete(false);
  };

  if (surveyComplete) {
    return (
      <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center shadow-elegant">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Survey Complete!</h2>
            <p className="text-muted-foreground">
              Thank you for participating in the road conditions survey. 
              Your feedback helps improve infrastructure in your area.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg">
              <p className="text-sm font-medium text-success">
                Responses Recorded: {Object.keys(responses).length}/{questions.length}
              </p>
            </div>
            
            <Button 
              onClick={restartSurvey}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Survey
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Road Conditions Survey
          </Badge>
          <h1 className="text-2xl font-bold mb-2">Share Your Experience</h1>
          <p className="text-muted-foreground">
            Help us understand and improve road conditions in your area
          </p>
        </div>

        {/* Progress */}
        <Card className="p-4 mb-6 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        {/* AI Avatar */}
        <div className="flex justify-center mb-6">
          <AIAvatar isListening={isListening} isSpeaking={isAvatarSpeaking} />
        </div>

        {/* Question Card */}
        <Card className="p-6 mb-6 shadow-elegant">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-full bg-primary/10 mt-1">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-lg leading-relaxed">
                {questions[currentQuestion]?.text}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleOptionSelect(option)}
                className="w-full justify-start text-left h-auto p-4 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
              >
                <span className="flex-1">{option}</span>
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            ))}
          </div>
        </Card>

        {/* Voice Controls */}
        <Card className="p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Voice Response</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleListening}
              className={`transition-all duration-300 ${
                isListening ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'hover:bg-primary/5'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Speak Answer
                </>
              )}
            </Button>
          </div>
          
          {isListening && (
            <div className="mt-3 p-3 bg-primary/5 rounded-lg">
              <p className="text-sm text-primary animate-pulse">
                🎤 Listening for your response...
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CitizenSurvey;