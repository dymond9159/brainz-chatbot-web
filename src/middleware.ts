// Additional configuration for the middleware
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(req) {
  try {
    if (!req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
});

export const config = {
  // Defining a matcher to specify routes where the middleware should be applied
  matcher: ['/onboard', '/chat', '/dashboard', '/explore', '/home', '/test'],
};
// "/((?!api|_next/static|_next/image|.*\\.png$).*)"
