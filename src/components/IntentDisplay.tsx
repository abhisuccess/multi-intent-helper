
import React from 'react';
import { Intent } from '@/utils/intentDetection';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface IntentDisplayProps {
  intents: Intent[];
  loading: boolean;
}

const IntentDisplay: React.FC<IntentDisplayProps> = ({ intents, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border shadow-sm animate-pulse bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="h-5 w-1/3 bg-muted rounded mb-3"></div>
            <div className="h-4 w-3/4 bg-muted rounded opacity-70 mb-4"></div>
            <div className="h-2 w-full bg-muted rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (intents.length === 0) {
    return (
      <div className="p-8 text-center border rounded-xl shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="text-muted-foreground">No intents detected. Try entering a customer query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {intents.map((intent, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-6 rounded-xl border shadow-sm glassmorphism hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", intent.color)}></div>
              <h3 className="font-medium">{intent.name}</h3>
              <Badge variant="outline" className="ml-2 text-xs">
                {Math.round(intent.confidence * 100)}%
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{intent.description}</p>
          
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${intent.confidence * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn("h-2 rounded-full", intent.color)}
            ></motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default IntentDisplay;
