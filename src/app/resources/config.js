const baseURL = 'https://www.darideveloper.com'

// Enable localization
const i18n = true;

// Manage localized content in the messages folder
const i18nOptions = {
    locales: ['en', 'es'],            // A list of all locales that are supported, e.g. ['en','id']
    defaultLocale: 'es'         // Locale used by default and as a fallback
}

const routes = {
    '/':        true,
    '/about':   true,
    '/work':    true,
    '/blog':    true,
    '/gallery': false,
    '/quote':   true,
}

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
    '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true
}

const effects = {
    mask: 'cursor',             // none | cursor | topLeft | topRight | bottomLeft | bottomRight
    gradient: {
        display: true,
        opacity: 0.4            // 0 - 1
    },
    dots: {
        display: true,
        opacity: 0.2,           // 0 - 1
        size: '12'              // 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 634
    },
    lines: {
        display: true,
    },
}

const style = {
    theme:       'dark',         // dark | light
    neutral:     'gray',         // sand | gray | slate
    brand:       'cyan',      // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent:      'aqua',       // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid:       'contrast',     // color | contrast
    solidStyle:  'plastic',         // flat | plastic
    border:      'rounded',      // rounded | playful | conservative
    surface:     'translucent',  // filled | translucent
    transition:  'all'           // all | micro | macro
}

const display = {
    location: true,
    time:     true
}

const mailchimp = {
    action: 'https://url/subscribe/post?parameters',
    effects: {
        mask: 'topRight',           // none | cursor | topLeft | topRight | bottomLeft | bottomRight
        gradient: {
            display: true,
            opacity: 0.6            // 0 - 1
        },
        dots: {
            display: false,
        },
        lines: {
            display: false,
        },
    }
}

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, i18n, i18nOptions };