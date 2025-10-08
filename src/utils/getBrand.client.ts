/**
 * Gets the brand from environment variable (SAFE for client & server)
 * Use this in Client Components or shared utilities
 * @returns The current brand identifier ('daridev' or '3s')
 */
export function getBrandFromEnv(): '3s' | 'daridev' {
  return (process.env.NEXT_PUBLIC_BRAND as '3s' | 'daridev') || 'daridev';
}

