import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for waitlist
export interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  source: string;
  referred_by?: string;
  status: 'pending' | 'verified' | 'notified' | 'invited';
  position: number;
  created_at: string;
  updated_at: string;
}

export interface WaitlistStats {
  total: number;
  joinedToday: number;
  position: number;
}

// Page view analytics
export interface PageView {
  id: string;
  page: string;
  referrer?: string;
  user_agent?: string;
  country?: string;
  device_type?: string;
  browser?: string;
  session_id?: string;
  created_at: string;
}

// API functions
export async function joinWaitlist(email: string, name?: string, source = 'website'): Promise<WaitlistStats | null> {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, source }),
    });

    if (!response.ok) {
      throw new Error('Failed to join waitlist');
    }

    return await response.json();
  } catch (error) {
    console.error('Error joining waitlist:', error);
    return null;
  }
}

export async function getWaitlistPosition(email: string): Promise<number | null> {
  try {
    const response = await fetch(`/api/waitlist/position?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.position;
  } catch (error) {
    console.error('Error getting waitlist position:', error);
    return null;
  }
}

export async function getWaitlistStats(): Promise<{ total: number; joinedToday: number } | null> {
  try {
    const response = await fetch('/api/waitlist/stats');
    
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting waitlist stats:', error);
    return null;
  }
}

// ============================================
// Analytics Functions (Direct Database)
// ============================================

// Track page view
export async function trackPageView(data: Omit<PageView, 'id' | 'created_at'>): Promise<void> {
  try {
    await supabase.from('page_views').insert([data]);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Get page views count
export async function getPageViewsCount(page?: string): Promise<number> {
  try {
    let query = supabase.from('page_views').select('id', { count: 'exact', head: true });
    
    if (page) {
      query = query.eq('page', page);
    }

    const { count } = await query;
    return count || 0;
  } catch (error) {
    console.error('Error getting page views count:', error);
    return 0;
  }
}

// Get daily metrics
export async function getDailyMetrics(date?: string): Promise<any> {
  try {
    let query = supabase.from('daily_metrics').select('*');
    
    if (date) {
      query = query.eq('date', date);
    } else {
      query = query.eq('date', new Date().toISOString().split('T')[0]);
    }

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting daily metrics:', error);
    return null;
  }
}

// Update daily metrics
export async function updateDailyMetrics(date: string, updates: Partial<{ total_visits: number; unique_visitors: number; waitlist_signups: number }>): Promise<void> {
  try {
    await supabase.from('daily_metrics').upsert({
      date,
      ...updates,
      updated_at: new Date().toISOString()
    }, { onConflict: 'date' });
  } catch (error) {
    console.error('Error updating daily metrics:', error);
  }
}

// Get waitlist stats from database
export async function getWaitlistStatsFromDB(): Promise<WaitlistStats | null> {
  try {
    const { data: waitlist, error } = await supabase
      .from('waitlist')
      .select('id, created_at')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const today = new Date().toISOString().split('T')[0];
    const total = waitlist?.length || 0;
    const joinedToday = waitlist?.filter(w => 
      w.created_at.split('T')[0] === today
    ).length || 0;

    return { total, joinedToday, position: total + 1 };
  } catch (error) {
    console.error('Error getting waitlist stats from DB:', error);
    return null;
  }
}
