import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// get brand
const brand = process.env.NEXT_PUBLIC_BRAND || 'daridev'
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`../../messages/${brand}/${locale}.json`)).default
  };
});