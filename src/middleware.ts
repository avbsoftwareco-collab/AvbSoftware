import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Skip middleware for these routes
  if (
    url.pathname.startsWith('/admin') || 
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/site') ||
    url.pathname.startsWith('/test-supabase') ||
    url.pathname === '/favicon.ico' ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Extract subdomain
  const subdomain = hostname.split('.')[0];
  
  // Skip main domain and localhost
  if (
    subdomain === 'www' || 
    subdomain === 'avbsoftware' || 
    hostname.startsWith('localhost') ||
    hostname.startsWith('127.0.0.1') ||
    !hostname.includes('.') ||
    hostname === 'avbsoftware.com'
  ) {
    return NextResponse.next();
  }

  // Rewrite subdomain to /site/[subdomain]
  url.pathname = `/site/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};