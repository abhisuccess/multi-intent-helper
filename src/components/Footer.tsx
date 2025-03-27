
import React from 'react';
import { cn } from "@/lib/utils";
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-medium">MI</span>
              </div>
              <span className="text-xl font-medium">Multi-Intent AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced AI solution for detecting multiple intents in customer support queries.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2023 Multi-Intent AI. All rights reserved.
            </p>
            <div className="flex flex-col items-center text-sm text-muted-foreground md:flex-row md:gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" />
              <span>by <span className="font-medium text-foreground">Abhi Success</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
