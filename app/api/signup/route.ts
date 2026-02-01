import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Normalize phone number
    const normalizedPhone = normalizePhone(phone);

    if (!isValidPhone(normalizedPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid US phone number' },
        { status: 400 }
      );
    }

    // Send START SMS via backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-render-backend.onrender.com';
    
    const response = await fetch(`${backendUrl}/api/trigger-start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_API_KEY}` // Add this to your .env
      },
      body: JSON.stringify({ phone: normalizedPhone }),
    });

    if (!response.ok) {
      throw new Error('Failed to send SMS');
    }

    return NextResponse.json({ 
      success: true,
      message: 'Check your phone for a text from Cheengu!'
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to send text. Please try again.' },
      { status: 500 }
    );
  }
}

function normalizePhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Add +1 if it's a 10-digit US number
  if (digits.length === 10) {
    return '+1' + digits;
  }
  
  // Add + if missing
  if (!phone.startsWith('+')) {
    return '+' + digits;
  }
  
  return phone;
}

function isValidPhone(phone: string): boolean {
  // Check if it's a valid US phone number (+1 followed by 10 digits)
  const usPhoneRegex = /^\+1\d{10}$/;
  return usPhoneRegex.test(phone);
}