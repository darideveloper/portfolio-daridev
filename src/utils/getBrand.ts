import { headers } from 'next/headers';
import { getBrandFromEnv } from './getBrand.client';

/**
 * Gets the current brand from middleware headers (SERVER ONLY)
 * Use this ONLY in Server Components, Server Actions, or Route Handlers
 * @returns The current brand identifier ('daridev' or '3s')
 */
export function getBrandFromHeaders(): '3s' | 'daridev' {
  const headersList = headers();
  const brand = headersList.get('x-brand');
  return (brand as '3s' | 'daridev') || getBrandFromEnv();
}

// Re-export for convenience
export { getBrandFromEnv };

