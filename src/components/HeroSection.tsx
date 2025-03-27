
import React from 'react';
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            <span className="mr-1 h-2 w-2 animate-pulse rounded-full bg-primary"></span>
            <span className="text-muted-foreground">AI-Powered Multi-Intent Detection</span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Understand Customer Queries <br className="hidden md:inline" />
            <span className="text-gradient">With Remarkable Precision</span>
          </h1>
          
          <p className="max-w-[700px] text-muted-foreground md:text-xl animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Our AI solution detects multiple intents in customer support queries, 
            enabling more accurate responses and improved customer satisfaction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-slide-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <a 
              href="#demo" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Try It Now
            </a>
            <a 
              href="#features" 
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Stylized Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
