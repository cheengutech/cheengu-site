// app/api/dashboard/send-code/route.ts

import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    
    if (!phone) {
      return NextResponse.json({ error: 'Phone required' }, { status: 400 });
    }
    
    const normalizedPhone = normalizePhone(phone);
    
    // Check if user exists
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('phone', normalizedPhone)
      .limit(1)
      .single();
    
    if (!user) {
      return NextResponse.json({ error: 'No account found for this phone' }, { status: 404 });
    }
    
    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Store code in database (expires in 10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    
    await supabase
      .from('dashboard_codes')
      .upsert({
        phone: normalizedPhone,
        code,
        expires_at: expiresAt
      }, { onConflict: 'phone' });
    
    // Send SMS
    await twilioClient.messages.create({
      body: `Your Cheengu dashboard code: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: normalizedPhone
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Send code error:', error);
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
  }
}