
import React from 'react';
import { Intent } from '@/utils/intentDetection';
import { cn } from '@/lib/utils';

interface IntentDisplayProps {
  intents: Intent[];
  loading: boolean;
}

const IntentDisplay: React.FC<IntentDisplayProps> = ({ intents, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border animate-pulse">
            <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-muted rounded opacity-70"></div>
            <div className="mt-3 h-2 w-full bg-muted rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (intents.length === 0) {
    return (
      <div className="p-6 text-center border rounded-lg">
        <p className="text-muted-foreground">No intents detected. Try entering a customer query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {intents.map((intent, index) => (
        <div 
          key={index}
          className="p-4 rounded-lg border glassmorphism animate-slide-up opacity-0"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", intent.color)}></div>
              <h3 className="font-medium">{intent.name}</h3>
            </div>
            <span className="text-sm font-medium">
              {Math.round(intent.confidence * 100)}% confidence
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">{intent.description}</p>
          
          <div className="mt-3 w-full bg-secondary rounded-full h-1.5">
            <div 
              className={cn("h-1.5 rounded-full transition-all duration-1000", intent.color)}
              style={{ width: `${intent.confidence * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntentDisplay;
