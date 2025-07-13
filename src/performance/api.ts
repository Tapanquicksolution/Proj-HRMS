import { useState, useEffect } from 'react';

// Types for performance module
export interface PerformanceReview {
  id: number;
  type: string;
  status: string;
  dueDate: string;
  completionPercentage: number;
  reviewers: string[];
  description: string;
}

export interface KeyResult {
  id: number;
  title: string;
  progress: number;
}

export interface Goal {
  id: number;
  title: string;
  category: string;
  progress: number;
  dueDate: string;
  status: string;
  description: string;
  keyResults: KeyResult[];
}

export interface Feedback {
  id: number;
  from: string;
  avatar: string;
  avatarColor: string;
  message: string;
  date: string;
  type: string;
}

export interface FeedbackRequest {
  id: number;
  for: string;
  avatar: string;
  avatarColor: string;
  dueDate: string;
  project: string;
  status: string;
}

// Hook for fetching performance reviews
export function usePerformanceReviews() {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/performance-reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch performance reviews');
        }
        
        const data = await response.json();
        setReviews(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
}

// Hook for fetching goals
export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/goals');
        
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        
        const data = await response.json();
        setGoals(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return { goals, loading, error };
}

// Hook for fetching feedback
export function useFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/feedback');
        
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        
        const data = await response.json();
        setFeedback(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return { feedback, loading, error };
}

// Hook for fetching feedback requests
export function useFeedbackRequests() {
  const [feedbackRequests, setFeedbackRequests] = useState<FeedbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeedbackRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/feedback-requests');
        
        if (!response.ok) {
          throw new Error('Failed to fetch feedback requests');
        }
        
        const data = await response.json();
        setFeedbackRequests(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackRequests();
  }, []);

  return { feedbackRequests, loading, error };
}
