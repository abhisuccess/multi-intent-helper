
import React from 'react';
import { Intent } from '@/utils/intentDetection';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

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
      <div className="p-8 text-center border rounded-xl shadow-sm bg-card/50 backdrop-blur-sm">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-muted-foreground" size={28} />
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
          className="p-6 rounded-xl border shadow-sm bg-card/60 backdrop-blur-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", intent.color)}></div>
              <h3 className="font-medium">{intent.name}</h3>
              <Badge variant={intent.confidence > 0.7 ? "default" : "outline"} className="ml-2 text-xs">
                {Math.round(intent.confidence * 100)}%
              </Badge>
            </div>
            {intent.confidence > 0.8 && (
              <CheckCircle2 size={16} className="text-green-500" />
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 ml-5">{intent.description}</p>
          
          <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${intent.confidence * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn("h-2.5 rounded-full", intent.color)}
            ></motion.div>
          </div>
          
          <div className="flex justify-end mt-3">
            <button className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <span>Learn more</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default IntentDisplay;
