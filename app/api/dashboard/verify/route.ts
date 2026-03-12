// app/api/dashboard/verify/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();
    
    if (!phone || !code) {
      return NextResponse.json({ error: 'Phone and code required' }, { status: 400 });
    }
    
    const normalizedPhone = normalizePhone(phone);
    
    // Verify code
    const { data: codeRecord } = await supabase
      .from('dashboard_codes')
      .select('*')
      .eq('phone', normalizedPhone)
      .eq('code', code)
      .single();
    
    if (!codeRecord) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
    }
    
    // Check expiration
    if (new Date(codeRecord.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Code expired' }, { status: 401 });
    }
    
    // Delete used code
    await supabase
      .from('dashboard_codes')
      .delete()
      .eq('phone', normalizedPhone);
    
    // Fetch user's commitments
    const { data: commitments } = await supabase
      .from('users')
      .select('*')
      .eq('phone', normalizedPhone)
      .order('created_at', { ascending: false });
    
    // Get all user IDs for this phone
    const userIds = commitments?.map(c => c.id) || [];
    
    // Fetch daily logs
    const { data: logs } = await supabase
      .from('daily_logs')
      .select('*')
      .in('user_id', userIds)
      .order('date', { ascending: false });
    
    // Fetch judges for these commitments
    const { data: judges } = await supabase
      .from('judges')
      .select('*, users(*)')
      .in('user_id', userIds);
    
    return NextResponse.json({
      success: true,
      commitments: commitments || [],
      logs: logs || [],
      judges: judges || []
    });
    
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}