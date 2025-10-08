import { person, contact, social, home, about, blog, work, gallery } from './content';
import { createI18nContent } from './content-i18n';
import { i18n } from './config';
import { getBrandFromEnv } from '@/utils/getBrand.client';

const renderContent = (t, brand) => {
    // If brand not provided, fallback to env (for backward compatibility)
    const finalBrand = brand || getBrandFromEnv();
    
    if ( i18n ) {
        return createI18nContent(t, finalBrand);
    } else {
        return {
            person,
            social,
            contact,
            home,
            about,
            blog,
            work,
            gallery,
            company: {
                name: person.firstName + ' ' + person.lastName,
                email: 'example@gmail.com',
                website: 'https://example.com'
            }
        }
    }
};

export { renderContent };