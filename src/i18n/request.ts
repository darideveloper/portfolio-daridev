import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {getBrandFromHeaders} from '@/utils/getBrand';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();
  
  // Get brand dynamically from headers (server context)
  const brand = getBrandFromHeaders();
 
  return {
    messages: (await import(`../../messages/${brand}/${locale}.json`)).default
  };
});