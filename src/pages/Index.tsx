
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import QueryAnalyzer from '@/components/QueryAnalyzer';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <HeroSection />
        
        <FeatureSection />
        
        <QueryAnalyzer />
        
        <section id="about" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-flex h-6 items-center rounded-full bg-primary/10 px-3 text-sm font-medium text-primary">
                  About The Project
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Transforming Customer Support Through AI
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Our AI-powered multi-intent detection system is designed to revolutionize customer support by identifying 
                  the multiple needs and questions that customers often express in a single message.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  Traditional intent classification systems only identify a single primary intent, missing additional 
                  customer needs and resulting in incomplete responses. By accurately detecting multiple intents, 
                  our system enables support teams to address all customer needs at once, improving satisfaction 
                  and reducing follow-up messages.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#demo" 
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Try The Demo
                  </a>
                </div>
              </div>
              
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-500/30 opacity-20"></div>
                <div className="flex h-full items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">AI-Powered Vision</h3>
                    <p className="text-muted-foreground">
                      Our system uses advanced NLP techniques to understand the full context and multiple intents 
                      in customer messages, just as a human support agent would.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Ready to Enhance Your Customer Support?
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg mb-8">
              Join the growing number of companies using our AI-powered multi-intent detection to improve response accuracy and customer satisfaction.
            </p>
            <a 
              href="#demo" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Started Today
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
