-- Poop Tracker Supabase Schema
-- Run this in your Supabase SQL Editor at https://supabase.com/dashboard/project/vzwdzbulyfzzdjbiirlc/database/tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- WAITLIST TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    source TEXT DEFAULT 'website',
    referred_by TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'notified', 'invited')),
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);

-- ============================================
-- PAGE VIEWS / ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    country TEXT,
    device_type TEXT,
    browser TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_page ON public.page_views(page);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at);

-- ============================================
-- WAITLIST SIGNUPS METRICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.signup_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source TEXT NOT NULL,
    date DATE NOT NULL,
    signups INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(source, date)
);

-- ============================================
-- DAILY METRICS AGGREGATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.daily_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    total_visits INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    waitlist_signups INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0.00,
    top_pages JSONB DEFAULT '[]',
    top_referrers JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to tables
CREATE TRIGGER update_waitlist_updated_at
    BEFORE UPDATE ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_signup_metrics_updated_at
    BEFORE UPDATE ON public.signup_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_metrics_updated_at
    BEFORE UPDATE ON public.daily_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to get waitlist position
CREATE OR REPLACE FUNCTION get_waitlist_position(user_email TEXT)
RETURNS INTEGER AS $$
DECLARE
    position_count INTEGER;
    user_created_at TIMESTAMP WITH TIME ZONE;
BEGIN
    SELECT created_at INTO user_created_at
    FROM public.waitlist
    WHERE email = user_email;

    IF user_created_at IS NULL THEN
        RETURN 0;
    END IF;

    SELECT COUNT(*) + 1 INTO position_count
    FROM public.waitlist
    WHERE created_at < user_created_at;

    RETURN position_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on tables
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signup_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_metrics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads/writes (adjust as needed for production)
CREATE POLICY "Allow anonymous access to waitlist" ON public.waitlist
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous access to page_views" ON public.page_views
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous access to signup_metrics" ON public.signup_metrics
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous access to daily_metrics" ON public.daily_metrics
    FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- VIEWS FOR DASHBOARD
-- ============================================

-- Waitlist stats view
CREATE OR REPLACE VIEW public.waitlist_stats AS
SELECT
    COUNT(*) as total_signups,
    COUNT(CASE WHEN status = 'verified' THEN 1 END) as verified,
    COUNT(CASE WHEN status = 'notified' THEN 1 END) as notified,
    COUNT(CASE WHEN status = 'invited' THEN 1 END) as invited,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as last_24h,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as last_7d,
    MIN(created_at) as first_signup,
    MAX(created_at) as last_signup
FROM public.waitlist;

-- Daily signups view
CREATE OR REPLACE VIEW public.daily_signups AS
SELECT
    DATE(created_at) as date,
    COUNT(*) as signups,
    COUNT(DISTINCT email) as unique_emails
FROM public.waitlist
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- SEED DATA (Optional)
-- ============================================

-- Insert some sample signup metrics
INSERT INTO public.signup_metrics (source, date, signups, conversions)
VALUES 
    ('website', CURRENT_DATE, 0, 0),
    ('twitter', CURRENT_DATE, 0, 0),
    ('discord', CURRENT_DATE, 0, 0)
ON CONFLICT (source, date) DO NOTHING;

-- Insert today's daily metrics
INSERT INTO public.daily_metrics (date, total_visits, unique_visitors, waitlist_signups)
VALUES (CURRENT_DATE, 0, 0, 0)
ON CONFLICT (date) DO NOTHING;

-- Schema creation complete!
-- Tables: waitlist, page_views, signup_metrics, daily_metrics
-- Views: waitlist_stats, daily_signups
