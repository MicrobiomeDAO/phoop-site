import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';
import path from 'path';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client for server-side operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fallback file-based storage for development
const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
let fileWaitlist = new Map<string, { email: string; name?: string; createdAt: Date; source?: string }>();

// Load file-based waitlist on module initialization
async function loadFileWaitlist() {
  try {
    const dataDir = path.dirname(WAITLIST_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    
    try {
      const data = await fs.readFile(WAITLIST_FILE, 'utf-8');
      const entries = JSON.parse(data);
      entries.forEach((entry: { email: string; name?: string; createdAt: string; source?: string }) => {
        fileWaitlist.set(entry.email, {
          ...entry,
          createdAt: new Date(entry.createdAt),
        });
      });
      console.log(`[Waitlist] Loaded ${fileWaitlist.size} entries from file`);
    } catch {
      console.log('[Waitlist] No existing file, starting fresh');
    }
  } catch (error) {
    console.error('[Waitlist] Error loading file:', error);
  }
}

loadFileWaitlist();

// Helper to save to file
async function saveToFile() {
  try {
    const dataDir = path.dirname(WAITLIST_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    const entries = Array.from(fileWaitlist.values()).map(entry => ({
      ...entry,
      createdAt: entry.createdAt.toISOString(),
    }));
    await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2));
  } catch (error) {
    console.error('[Waitlist] Error saving to file:', error);
  }
}

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project') && supabaseUrl.includes('supabase');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source = 'website' } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    console.log(`[Waitlist] Processing signup: ${email} from ${source}`);

    // Try Supabase if configured
    if (isSupabaseConfigured) {
      try {
        console.log('[Waitlist] Attempting Supabase insert...');
        
        // Check if email already exists
        const { data: existing, error: checkError } = await supabase
          .from('waitlist')
          .select('id, position')
          .eq('email', email)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error('[Waitlist] Supabase check error:', checkError);
          throw checkError;
        }

        if (existing) {
          console.log(`[Waitlist] Email ${email} already exists at position ${existing.position}`);
          
          // Get total count
          const { count: totalCount } = await supabase
            .from('waitlist')
            .select('id', { count: 'exact', head: true });
          
          return NextResponse.json({
            position: existing.position,
            total: totalCount || 0,
            joinedToday: 0,
          });
        }

        // Get total count for position
        const { count, error: countError } = await supabase
          .from('waitlist')
          .select('id', { count: 'exact', head: true });

        if (countError) throw countError;

        const position = (count || 0) + 1;
        console.log(`[Waitlist] New position: ${position}`);

        // Insert new entry
        const { error: insertError } = await supabase
          .from('waitlist')
          .insert([{
            email,
            name,
            source,
            status: 'pending',
            position,
          }]);

        if (insertError) {
          console.error('[Waitlist] Supabase insert error:', insertError);
          throw insertError;
        }

        console.log(`[Waitlist] Successfully added ${email} to Supabase at position ${position}`);

        // Get updated total count
        const { count: finalCount } = await supabase
          .from('waitlist')
          .select('id', { count: 'exact', head: true });

        return NextResponse.json({
          position,
          total: finalCount || position,
          joinedToday: 1,
        });
      } catch (supabaseError: any) {
        console.error('[Waitlist] Supabase error, falling back to file:', supabaseError.message || supabaseError);
      }
    } else {
      console.log('[Waitlist] Supabase not configured, using file storage');
    }

    // Fallback to file storage
    if (fileWaitlist.has(email)) {
      const existingPos = getFilePosition(email);
      const total = fileWaitlist.size;
      console.log(`[Waitlist] Email ${email} already in file at position ${existingPos}`);
      return NextResponse.json({
        position: existingPos,
        total,
        joinedToday: 0,
      });
    }

    // Add to file-based waitlist
    fileWaitlist.set(email, { email, name, source, createdAt: new Date() });
    await saveToFile();

    const position = getFilePosition(email);
    const total = fileWaitlist.size;
    console.log(`[Waitlist] Added ${email} to file at position ${position}`);

    return NextResponse.json({
      position,
      total,
      joinedToday: 1,
    });
  } catch (error: any) {
    console.error('[Waitlist] Error:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (email) {
    const position = getFilePosition(email);
    return NextResponse.json({ position });
  }

  const total = fileWaitlist.size;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let joinedToday = 0;
  fileWaitlist.forEach((entry) => {
    if (entry.createdAt >= today) joinedToday++;
  });

  return NextResponse.json({ total, joinedToday });
}

function getFilePosition(email: string): number {
  let position = 0;
  const userEntry = fileWaitlist.get(email);
  if (!userEntry) return 0;

  fileWaitlist.forEach((entry, entryEmail) => {
    if (entryEmail !== email && entry.createdAt < userEntry.createdAt) position++;
  });
  return position + 1;
}
