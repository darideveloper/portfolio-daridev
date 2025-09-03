// Pricing configuration for quote form
// All prices are in USD, MXN prices are calculated using exchange rate

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
    sections: {
        id: 'sections',
        name: 'sections',
        icon: 'layers',
        category: 'content',
        usdPrice: 20,
        description: 'sections.description'
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
        icon: 'share',
        category: 'content',
        usdPrice: 30,
        description: 'social.description'
    },
    contact: {
        id: 'contact',
        name: 'contact',
        icon: 'mail',
        category: 'basic',
        usdPrice: 15,
        description: 'contact.description'
    },
    hosting: {
        id: 'hosting',
        name: 'hosting',
        icon: 'server',
        category: 'basic',
        usdPrice: 10,
        description: 'hosting.description'
    },
    newsletter: {
        id: 'newsletter',
        name: 'newsletter',
        icon: 'newspaper',
        category: 'content',
        usdPrice: 15,
        description: 'newsletter.description'
    },
    ecommerce: {
        id: 'ecommerce',
        name: 'ecommerce',
        icon: 'shopping-cart',
        category: 'advanced',
        usdPrice: 120,
        description: 'ecommerce.description'
    },
    whatsapp: {
        id: 'whatsapp',
        name: 'whatsapp',
        icon: 'message-circle',
        category: 'basic',
        usdPrice: 15,
        description: 'whatsapp.description'
    },
    reservations: {
        id: 'reservations',
        name: 'reservations',
        icon: 'calendar',
        category: 'advanced',
        usdPrice: 35,
        description: 'reservations.description'
    },
    multilang: {
        id: 'multilang',
        name: 'multilang',
        icon: 'globe-2',
        category: 'services',
        usdPrice: 5,
        description: 'multilang.description',
        isPerSection: true // This feature is priced per section
    },
    backups: {
        id: 'backups',
        name: 'backups',
        icon: 'save',
        category: 'services',
        usdPrice: 5,
        description: 'backups.description'
    },
    payments: {
        id: 'payments',
        name: 'payments',
        icon: 'credit-card',
        category: 'advanced',
        usdPrice: 35,
        description: 'payments.description'
    },
    email: {
        id: 'email',
        name: 'email',
        icon: 'at-sign',
        category: 'basic',
        usdPrice: 15,
        description: 'email.description'
    }
};

const FEATURE_CATEGORIES = {
    basic: {
        title: 'quote.steps.basic',
        features: ['domain', 'hosting', 'contact', 'whatsapp', 'email']
    },
    content: {
        title: 'quote.steps.content',
        features: ['blog', 'sections', 'social', 'newsletter']
    },
    advanced: {
        title: 'quote.steps.advanced',
        features: ['ecommerce', 'reservations', 'payments']
    },
    services: {
        title: 'quote.steps.services',
        features: ['multilang', 'backups']
    }
};

// Helper functions
const getFeaturePrice = (featureId, currency = 'USD', sectionCount = 1) => {
    const feature = FEATURES[featureId];
    if (!feature) return 0;
    
    let basePrice = feature.usdPrice;
    
    // Handle per-section pricing (like multilang)
    if (feature.isPerSection) {
        basePrice = basePrice * sectionCount;
    }
    
    if (currency === 'MXN') {
        return Math.round(basePrice * EXCHANGE_RATE);
    }
    
    return basePrice;
};

const calculateTotalPrice = (selectedFeatures, currency = 'USD', sectionCount = 1) => {
    return selectedFeatures.reduce((total, featureId) => {
        return total + getFeaturePrice(featureId, currency, sectionCount);
    }, 0);
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
