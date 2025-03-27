
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import QueryAnalyzer from '@/components/QueryAnalyzer';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  React.useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please login to access the dashboard",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [navigate, user, loading]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // This will be handled by the useEffect redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">MultiIntent AI</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm mr-4">
              Welcome, {user.user_metadata?.full_name || user.email}
            </div>
            <Button 
              variant="ghost" 
              onClick={signOut}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <section className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to your Dashboard</h1>
            <p className="text-muted-foreground">Analyze customer queries and discover multiple intents</p>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border shadow-sm">
              <CardHeader>
                <CardTitle>Recent Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Queries Analyzed</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Multi-Intent Detected</span>
                    <span className="font-medium">78</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy Rate</span>
                    <span className="font-medium">94.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border shadow-sm">
              <CardHeader>
                <CardTitle>Top Intents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Account Access</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing Inquiries</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical Support</span>
                    <span className="font-medium">24%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <QueryAnalyzer />
        </motion.div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Made by Abhi Success © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
