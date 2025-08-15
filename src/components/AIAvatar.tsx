import { useState, useEffect } from "react";
import { Bot, Mic } from "lucide-react";

interface AIAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
}

const AIAvatar = ({ isListening = false, isSpeaking = false }: AIAvatarProps) => {
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (isSpeaking || isListening) {
      setPulseAnimation(true);
    } else {
      setPulseAnimation(false);
    }
  }, [isSpeaking, isListening]);

  return (
    <div className="relative">
      {/* Main Avatar Circle */}
      <div 
        className={`
          relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center
          shadow-elegant transition-all duration-300
          ${pulseAnimation ? 'animate-pulse-glow' : ''}
          ${isListening ? 'shadow-glow' : ''}
        `}
      >
        <Bot className="w-10 h-10 text-primary-foreground" />
        
        {/* Listening Indicator */}
        {isListening && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center animate-pulse">
            <Mic className="w-4 h-4 text-destructive-foreground" />
          </div>
        )}
      </div>

      {/* Speaking Animation Rings */}
      {isSpeaking && (
        <>
          <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-primary/30 animate-ping" />
          <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-primary/10 animate-ping" style={{ animationDelay: '0.4s' }} />
        </>
      )}

      {/* Status Indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
          ${isSpeaking 
            ? 'bg-primary text-primary-foreground' 
            : isListening 
            ? 'bg-destructive text-destructive-foreground' 
            : 'bg-muted text-muted-foreground'
          }
        `}>
          {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'AI Assistant'}
        </div>
      </div>
    </div>
  );
};

export default AIAvatar;