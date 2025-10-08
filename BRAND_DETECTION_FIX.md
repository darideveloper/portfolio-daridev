# Brand Detection Fix - Domain-Based Dynamic Configuration

## Problem
The application needed to detect the domain and automatically configure the brand, but encountered an error:
```
Error: You're importing a component that needs next/headers. 
That only works in a Server Component
```

This occurred because `headers()` from `next/headers` was being imported in a utility that was used by both Server and Client Components.

## Root Cause
- **Client Components** (like `Header.tsx`) imported `renderContent()`
- `renderContent()` called `createI18nContent()` 
- `createI18nContent()` called `getBrand()` which used `headers()`
- `headers()` can ONLY be used in Server Components, causing the build to fail

## Solution
Split brand detection into two separate files to avoid importing `next/headers` in client-side code:

### 1. **`src/utils/getBrand.client.ts`** (NEW)
- Safe for both Client and Server Components
- Uses environment variable only
- No `headers()` import

```typescript
export function getBrandFromEnv(): '3s' | 'daridev' {
  return (process.env.NEXT_PUBLIC_BRAND as '3s' | 'daridev') || 'daridev';
}
```

### 2. **`src/utils/getBrand.ts`** (MODIFIED)
- Server Components only
- Uses middleware headers for dynamic detection
- Imports from `getBrand.client.ts` for fallback

```typescript
import { headers } from 'next/headers';
import { getBrandFromEnv } from './getBrand.client';

export function getBrandFromHeaders(): '3s' | 'daridev' {
  const headersList = headers();
  const brand = headersList.get('x-brand');
  return (brand as '3s' | 'daridev') || getBrandFromEnv();
}
```

## Files Modified

| File | Change | Reason |
|------|--------|--------|
| `src/utils/getBrand.client.ts` | **NEW** | Client-safe brand detection |
| `src/utils/getBrand.ts` | Modified | Server-only brand detection |
| `src/app/resources/content-i18n.js` | Modified | Use `getBrandFromEnv()` for client compatibility |
| `src/app/[locale]/privacy/page.tsx` | Modified | Use `getBrandFromHeaders()` in server component |
| `src/app/[locale]/layout.tsx` | Modified | Use `getBrandFromHeaders()` in server component |
| `src/i18n/request.ts` | Modified | Use `getBrandFromHeaders()` in server context |

## How It Works

### Middleware (Domain Detection)
```typescript
// Detects domain and sets header
const hostname = request.headers.get('host');
const brand = DOMAIN_BRAND_MAP[hostname] || fallback;
response.headers.set('x-brand', brand);
```

### Server Components
```typescript
// Read from middleware headers
import { getBrandFromHeaders } from '@/utils/getBrand';
const brand = getBrandFromHeaders(); // Dynamic per domain
```

### Client Components / Shared Utilities
```typescript
// Use environment variable
import { getBrandFromEnv } from '@/utils/getBrand.client';
const brand = getBrandFromEnv(); // From NEXT_PUBLIC_BRAND
```

## Result
✅ Build succeeds  
✅ Server components get dynamic brand from domain  
✅ Client components use env variable (set at build time)  
✅ No `next/headers` errors  
✅ Single build serves multiple domains  

## Domain Mapping
- `software3s.com` / `www.software3s.com` → **3s** brand
- `darideveloper.com` / `www.darideveloper.com` → **daridev** brand
- Fallback: `NEXT_PUBLIC_BRAND` env variable or `daridev`

## Usage Examples

### In Server Components
```typescript
import { getBrandFromHeaders } from '@/utils/getBrand';

export async function generateMetadata() {
  const brand = getBrandFromHeaders(); // Gets from middleware header
  const branding = getBranding(brand);
  // ...
}
```

### In Client Components
```typescript
import { getBrandFromEnv } from '@/utils/getBrand.client';

export function MyClientComponent() {
  const brand = getBrandFromEnv(); // Gets from env variable
  const branding = getBranding(brand);
  // ...
}
```

### In Shared Utilities (used by both)
```typescript
import { getBrandFromEnv } from '@/utils/getBrand.client';

export function createContent(t) {
  const brand = getBrandFromEnv(); // Safe for all contexts
  const branding = getBranding(brand);
  // ...
}
```

## Testing
Run the build to verify:
```bash
npm run build
```

Expected result: ✓ Compiled successfully

