// Pricing configuration for quote form
// All prices are in USD, MXN prices are calculated using exchange rate

import { WEBSITE_SECTIONS } from './sections';

const EXCHANGE_RATE = 16.0; // USD to MXN (approximate rate)

const FEATURES = {
    blog: {
        id: 'blog',
        name: 'blog',
        icon: 'book',
        category: 'content',
        usdPrice: 25,
        description: 'blog.description'
    },
    domain: {
        id: 'domain',
        name: 'domain',
        icon: 'globe',
        category: 'basic',
        usdPrice: 25,
        description: 'domain.description'
    },
    social: {
        id: 'social',
        name: 'social',
        icon: 'openLink',
        category: 'content',
        usdPrice: 30,
        description: 'social.description'
    },
    contact: {
        id: 'contact',
        name: 'contact',
        icon: 'email',
        category: 'basic',
        usdPrice: 15,
        description: 'contact.description'
    },
    hosting: {
        id: 'hosting',
        name: 'hosting',
        icon: 'grid',
        category: 'basic',
        usdPrice: 10,
        description: 'hosting.description'
    },
    newsletter: {
        id: 'newsletter',
        name: 'newsletter',
        icon: 'book',
        category: 'content',
        usdPrice: 15,
        description: 'newsletter.description'
    },
    ecommerce: {
        id: 'ecommerce',
        name: 'ecommerce',
        icon: 'grid',
        category: 'advanced',
        usdPrice: 120,
        description: 'ecommerce.description'
    },
    whatsapp: {
        id: 'whatsapp',
        name: 'whatsapp',
        icon: 'whatsapp',
        category: 'basic',
        usdPrice: 15,
        description: 'whatsapp.description'
    },
    multilang: {
        id: 'multilang',
        name: 'multilang',
        icon: 'globe',
        category: 'services',
        usdPrice: 5,
        description: 'multilang.description',
        isPerSection: true // This feature is priced per section
    },
    backups: {
        id: 'backups',
        name: 'backups',
        icon: 'checkCircle',
        category: 'services',
        usdPrice: 5,
        description: 'backups.description'
    },
    payments: {
        id: 'payments',
        name: 'payments',
        icon: 'quote',
        category: 'advanced',
        usdPrice: 35,
        description: 'payments.description'
    },
    email: {
        id: 'email',
        name: 'email',
        icon: 'email',
        category: 'basic',
        usdPrice: 15,
        description: 'email.description'
    },
    booking: {
        id: 'booking',
        name: 'booking',
        icon: 'calendar',
        category: 'advanced',
        usdPrice: 35,
        description: 'booking.description'
    },
    events: {
        id: 'events',
        name: 'events',
        icon: 'calendar',
        category: 'advanced',
        usdPrice: 25,
        description: 'events.description'
    },
    search: {
        id: 'search',
        name: 'search',
        icon: 'openLink',
        category: 'advanced',
        usdPrice: 20,
        description: 'search.description'
    }
};

const FEATURE_CATEGORIES = {
    basic: {
        title: 'quote.steps.basic',
        features: ['domain', 'hosting', 'contact', 'whatsapp', 'email']
    },
    content: {
        title: 'quote.steps.content',
        features: ['blog', 'social', 'newsletter']
    },
    advanced: {
        title: 'quote.steps.advanced',
        features: ['ecommerce', 'payments', 'booking', 'events', 'search']
    },
    services: {
        title: 'quote.steps.services',
        features: ['multilang', 'backups']
    }
};

// Helper functions
const getFeaturePrice = (featureId, currency = 'USD', sectionCount = 1, selectedSections = [], extraSections = 0) => {
    const feature = FEATURES[featureId];
    if (!feature) return 0;
    
    let basePrice = feature.usdPrice;
    
    // Handle per-section pricing (like sections and multilang)
    if (feature.isPerSection) {
        if (featureId === 'sections') {
            // For sections, count selected sections + extra sections
            basePrice = basePrice * (selectedSections.length + extraSections);
        } else {
            // For other per-section features (like multilang), use selected sections + extra sections
            basePrice = basePrice * (selectedSections.length + extraSections);
        }
    }
    
    if (currency === 'MXN') {
        return Math.round(basePrice * EXCHANGE_RATE);
    }
    
    return basePrice;
};

const calculateTotalPrice = (selectedFeatures, currency = 'USD', sectionCount = 1, selectedSections = [], extraSections = 0) => {
    // Calculate features price
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
        return total + getFeaturePrice(featureId, currency, sectionCount, selectedSections, extraSections);
    }, 0);
    
    // Calculate sections price ($20 USD per section)
    const sectionsPrice = (selectedSections.length + extraSections) * 20;
    
    // Convert to MXN if needed
    if (currency === 'MXN') {
        return featuresPrice + Math.round(sectionsPrice * EXCHANGE_RATE);
    }
    
    return featuresPrice + sectionsPrice;
};

const getFeaturesByCategory = (category) => {
    return FEATURE_CATEGORIES[category]?.features.map(featureId => ({
        ...FEATURES[featureId],
        id: featureId
    })) || [];
};

const getAllFeatures = () => {
    return Object.keys(FEATURES).map(featureId => ({
        ...FEATURES[featureId],
        id: featureId
    }));
};

export {
    FEATURES,
    FEATURE_CATEGORIES,
    EXCHANGE_RATE,
    getFeaturePrice,
    calculateTotalPrice,
    getFeaturesByCategory,
    getAllFeatures
};
