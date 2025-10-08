import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';

// Domain to brand mapping
const DOMAIN_BRAND_MAP: Record<string, string> = {
  'software3s.com': '3s',
  'www.software3s.com': '3s',
  'darideveloper.com': 'daridev',
  'www.darideveloper.com': 'daridev',
};

export default function middleware(request: NextRequest) {
  // Get the hostname
  const hostname = request.headers.get('host') || '';
  
  // Determine brand from domain (with fallback)
  let brand = process.env.NEXT_PUBLIC_BRAND || 'daridev';
  
  for (const [domain, domainBrand] of Object.entries(DOMAIN_BRAND_MAP)) {
    if (hostname.includes(domain)) {
      brand = domainBrand;
      break;
    }
  }
  
  // Run next-intl middleware
  const intlMiddleware = createMiddleware(routing);
  const response = intlMiddleware(request);
  
  // Add brand to headers for server components
  response.headers.set('x-brand', brand);
  
  return response;
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
      '/',
      '/((?!api|_next|_vercel|.*\\..*).*)',
      '/(en|id)/:path*'
    ]
};