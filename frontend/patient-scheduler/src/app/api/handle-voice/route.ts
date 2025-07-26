import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    // Call your Flask backend (Claude + Zocdoc logic)
    const response = await fetch('http://localhost:5000/agent/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error handling voice input:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
