import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, firstname, lastname } = body;

  // 1. Mock User Creation
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    username,
    email,
    name: { firstname, lastname },
    // IMPORTANT: New users get TODAY'S date
    joinedAt: new Date().toISOString() 
  };

  // 2. Log them in immediately (Create Session)
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ user: newUser, expires });

  const cookieStore = await cookies();
  cookieStore.set('session', session, { 
    expires, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ success: true, user: newUser });
}