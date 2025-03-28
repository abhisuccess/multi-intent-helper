
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '@/contexts/AuthContext';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) return; // Only fetch if user is admin

    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubmissions(data || []);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSubmissions(prev => [payload.new as ContactSubmission, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setSubmissions(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  if (!isAdmin) {
    return null; // Don't render anything if not admin
  }

  if (loading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!submissions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
          <CardDescription>No submissions yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            When users submit the contact form, their inquiries will appear here in real-time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recent Contact Submissions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {submissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{submission.name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(submission.created_at).toLocaleString()}
                </span>
              </CardTitle>
              <CardDescription>
                <a href={`mailto:${submission.email}`} className="hover:underline">
                  {submission.email}
                </a>
                {submission.company && (
                  <span className="ml-2">• {submission.company}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{submission.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactSubmissions;
