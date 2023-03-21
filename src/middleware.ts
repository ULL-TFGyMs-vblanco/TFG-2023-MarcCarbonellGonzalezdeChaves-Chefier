import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: '/auth/login',
};
