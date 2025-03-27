
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => (
  <div 
    className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up opacity-0" 
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeatureSection = () => {
  return (
    <section id="features" className="py-16 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex h-6 items-center rounded-full bg-primary/10 px-3 text-sm font-medium text-primary mb-2">
            Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Advanced Intent Recognition
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg mt-4">
            Our AI system goes beyond single intent classification to detect multiple customer needs in a single message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Multi-Intent Detection"
            description="Identify multiple customer needs within a single query, enabling more comprehensive responses."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path><path d="M8 6h.01"></path><path d="M12 6h.01"></path><path d="M16 6h.01"></path><path d="M12 2v2"></path><path d="M12 8v8"></path><path d="M3 10h18"></path><path d="M3 14h18"></path><path d="M19 22v-8.3a1 1 0 0 0-.5-.7l-7-4.2a1 1 0 0 0-1 0l-7 4.2a1 1 0 0 0-.5.7V22"></path></svg>}
            delay={100}
          />
          <FeatureCard
            title="Confidence Scoring"
            description="Each detected intent includes a confidence score, allowing for more nuanced response prioritization."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}
            delay={200}
          />
          <FeatureCard
            title="Intent Classification"
            description="Categorize customer queries into specific intent types for better routing and response automation."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9Z"></path><path d="M9 3v3"></path><path d="M15 3v3"></path><path d="M9 18v3"></path><path d="M15 18v3"></path><path d="M3 9h3"></path><path d="M3 15h3"></path><path d="M18 9h3"></path><path d="M18 15h3"></path></svg>}
            delay={300}
          />
          <FeatureCard
            title="Semantic Understanding"
            description="Go beyond keyword matching with contextual understanding of customer language and intent."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>}
            delay={400}
          />
          <FeatureCard
            title="API Integration"
            description="Easily integrate our intent detection capabilities into your existing customer support workflow."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12H3"></path><path d="M16 6H3"></path><path d="M12 18H3"></path><path d="M16 12h5a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5"></path><path d="M21 18h-5"></path><path d="M16 6l4 0"></path></svg>}
            delay={500}
          />
          <FeatureCard
            title="Real-time Analysis"
            description="Process and analyze customer queries in real-time for immediate response generation."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9"></path><path d="M18 14v4"></path><path d="M18 22v.01"></path><path d="m2 12 6-6-6-6"></path></svg>}
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
