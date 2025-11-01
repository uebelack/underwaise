import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if locale cookie exists
  const locale = request.cookies.get('NEXT_LOCALE')?.value;

  // If no locale is set, set default to German
  if (!locale) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'de', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)']
};
