import { person, contact, social, home, about, blog, work, gallery, newsletter } from './content';
import { createI18nContent } from './content-i18n';
import { i18n } from './config';

const renderContent = (t) => {
    if ( i18n ) {
        return createI18nContent(t);
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
            newsletter,
            company: {
                name: person.firstName + ' ' + person.lastName,
                email: 'example@gmail.com',
                website: 'https://example.com'
            }
        }
    }
};

export { renderContent };