
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check if user email is admin
  const checkAdminStatus = (email: string | undefined) => {
    // This is a simple example - in production, you should use a proper role system
    // For this example, we'll check if the email contains "admin" or is one of the predefined admin emails
    const adminEmails = ['admin@example.com', 'abhisuccess499@gmail.com', 'piyushkumar2122002@gmail.com'];
    return email ? (email.includes('admin') || adminEmails.includes(email.toLowerCase())) : false;
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAdmin(checkAdminStatus(session?.user?.email));
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAdmin(checkAdminStatus(session?.user?.email));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back to MultiIntent AI!",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Something went wrong during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Create the new user
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      // If auto-confirm is disabled in Supabase
      if (data.user && !data.user.confirmed_at) {
        toast({
          title: "Registration Successful",
          description: "Please check your email to confirm your account",
        });
        navigate('/auth');
      } else {
        toast({
          title: "Registration Successful",
          description: "Welcome to MultiIntent AI!",
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message || "Something went wrong during logout",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
