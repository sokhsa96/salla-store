import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  // 1. Mock Validation (In real life, check DB)
  // We allow the fake store user OR any user for testing purposes
  const isValid = (username === 'mor_2314' && password === '83r5^_') || username.length > 3;

  if (isValid) {
    // 2. Create User Object
    const user = {
      id: 1,
      username: username,
      email: 'user@salla.sa',
      name: { firstname: 'Sohaib', lastname: 'Sayed' },
      // Mocking the date logic we discussed
      joinedAt: new Date('2023-01-15').toISOString() 
    };

    // 3. Create Session
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await encrypt({ user, expires });

    // 4. Set Cookie
    const cookieStore = await cookies();
    cookieStore.set('session', session, { 
      expires, 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ success: true, user });
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}