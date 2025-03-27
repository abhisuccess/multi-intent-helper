
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { analyzeQuery, getRandomSampleQuery, Intent } from '@/utils/intentDetection';
import IntentDisplay from './IntentDisplay';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const QueryAnalyzer = () => {
  const [query, setQuery] = useState('');
  const [detectedIntents, setDetectedIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (analyzed) {
      setAnalyzed(false);
    }
  };

  const handleAnalyze = () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a customer support query to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalyzed(false);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = analyzeQuery(query);
      setDetectedIntents(results);
      setLoading(false);
      setAnalyzed(true);
      
      if (results.length > 1) {
        toast({
          title: "Multiple Intents Detected",
          description: `Identified ${results.length} intents in the customer query.`,
        });
      } else {
        toast({
          title: "Intent Detected",
          description: "Identified the primary intent in the customer query.",
        });
      }
    }, 1500);
  };

  const handleRandomQuery = () => {
    const randomQuery = getRandomSampleQuery();
    setQuery(randomQuery);
    setAnalyzed(false);
  };

  return (
    <section id="demo" className="py-16 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex h-6 items-center rounded-full bg-primary/10 px-3 text-sm font-medium text-primary mb-2">
            Live Demo
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Try Our Intent Analyzer
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Enter a customer support query below to see our AI detect multiple intents.
          </p>
        </div>

        <Card className="w-full max-w-3xl mx-auto relative overflow-hidden border bg-card">
          <div className="absolute h-full w-full -z-10 overflow-hidden opacity-50">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>
          
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="query" className="block text-sm font-medium">
                    Customer Query
                  </label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRandomQuery}
                    className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                  >
                    Load Example
                  </Button>
                </div>
                <Textarea
                  id="query"
                  placeholder="Enter a customer support query, e.g., 'I'm having trouble logging in and I need to update my payment method'"
                  className="min-h-[100px] resize-none"
                  value={query}
                  onChange={handleQueryChange}
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={loading || !query.trim()}
                  className={cn(
                    "relative overflow-hidden",
                    loading && "cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <>
                      <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                      Analyzing...
                    </>
                  ) : "Analyze Query"}
                </Button>
              </div>
              
              <div className={cn(
                "transition-all duration-500",
                analyzed || loading ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"
              )}>
                <h3 className="text-lg font-medium mb-4">Detected Intents</h3>
                <IntentDisplay intents={detectedIntents} loading={loading} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QueryAnalyzer;
