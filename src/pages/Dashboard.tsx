
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ContactSubmissions from '@/components/ContactSubmissions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { user, signOut, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only redirect if we've confirmed there's no user after loading is complete
    if (!loading) {
      setIsInitialized(true);
      if (!user) {
        navigate('/auth');
      }
    }
  }, [user, navigate, loading]);

  // Don't render anything until we've checked auth status
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container px-4 py-8 md:px-6 mt-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-8">
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
            <p className="text-muted-foreground">
              This is your dashboard for Multi-Intent AI.
              {isAdmin ? ' As an admin, you can view and manage contact form submissions.' : ' Here you can access your personalized features.'}
            </p>
          </div>

          {isAdmin ? (
            <ContactSubmissions />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>User Dashboard</CardTitle>
                <CardDescription>Your personalized dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Welcome to your Multi-Intent AI dashboard. This area will show your personalized content and features.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
