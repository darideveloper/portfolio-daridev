// Website sections configuration for quote form

export const WEBSITE_SECTIONS = {
    // Core sections
    header: {
        id: 'header',
        name: 'Header',
        icon: 'home',
        description: 'Website header with navigation menu and logo',
        category: 'core',
        required: true
    },
    footer: {
        id: 'footer',
        name: 'Footer',
        icon: 'home',
        description: 'Website footer with links and contact information',
        category: 'core',
        required: true
    },
    
    // Content sections
    hero: {
        id: 'hero',
        name: 'Hero Section',
        icon: 'checkCircle',
        description: 'Main banner section with call-to-action',
        category: 'content'
    },
    about: {
        id: 'about',
        name: 'About Us',
        icon: 'person',
        description: 'About section with company information',
        category: 'content'
    },
    services: {
        id: 'services',
        name: 'Services',
        icon: 'checkCircle',
        description: 'Services showcase section',
        category: 'content'
    },
    portfolio: {
        id: 'portfolio',
        name: 'Portfolio',
        icon: 'gallery',
        description: 'Portfolio or work showcase section',
        category: 'content'
    },
    gallery: {
        id: 'gallery',
        name: 'Gallery',
        icon: 'gallery',
        description: 'Image gallery section',
        category: 'content'
    },
    testimonials: {
        id: 'testimonials',
        name: 'Testimonials',
        icon: 'quote',
        description: 'Customer testimonials section',
        category: 'content'
    },
    team: {
        id: 'team',
        name: 'Our Team',
        icon: 'person',
        description: 'Team members section',
        category: 'content'
    },
    pricing: {
        id: 'pricing',
        name: 'Pricing',
        icon: 'quote',
        description: 'Pricing plans section',
        category: 'content'
    },
    features: {
        id: 'features',
        name: 'Features',
        icon: 'checkCircle',
        description: 'Features list section',
        category: 'content'
    },
    stats: {
        id: 'stats',
        name: 'Statistics',
        icon: 'grid',
        description: 'Statistics and numbers section',
        category: 'content'
    },
    faq: {
        id: 'faq',
        name: 'FAQ',
        icon: 'helpCircle',
        description: 'Frequently asked questions section',
        category: 'content'
    },
    blog: {
        id: 'blog',
        name: 'Blog',
        icon: 'book',
        description: 'Blog posts section',
        category: 'content'
    },
    news: {
        id: 'news',
        name: 'News',
        icon: 'book',
        description: 'News and updates section',
        category: 'content'
    },
    
    // Contact sections
    contact: {
        id: 'contact',
        name: 'Contact Form',
        icon: 'email',
        description: 'Contact form section',
        category: 'contact'
    },
    location: {
        id: 'location',
        name: 'Location',
        icon: 'globe',
        description: 'Location and map section',
        category: 'contact'
    },
    social: {
        id: 'social',
        name: 'Social Media',
        icon: 'openLink',
        description: 'Social media links section',
        category: 'contact'
    },
    whatsapp: {
        id: 'whatsapp',
        name: 'WhatsApp Button',
        icon: 'whatsapp',
        description: 'WhatsApp contact button section',
        category: 'contact'
    },
    
    
    // Special sections
};

export const SECTION_CATEGORIES = {
    core: {
        name: 'Core Sections',
        description: 'Essential sections for every website',
        sections: ['header', 'footer']
    },
    content: {
        name: 'Content Sections',
        description: 'Main content sections for your website',
        sections: ['hero', 'about', 'services', 'portfolio', 'gallery', 'testimonials', 'team', 'pricing', 'features', 'stats', 'faq', 'blog', 'news']
    },
    contact: {
        name: 'Contact Sections',
        description: 'Contact and communication sections',
        sections: ['contact', 'location', 'social', 'whatsapp']
    },
};

// Helper functions
export const getSectionsByCategory = (category) => {
    return SECTION_CATEGORIES[category]?.sections.map(sectionId => ({
        ...WEBSITE_SECTIONS[sectionId],
        id: sectionId
    })) || [];
};

export const getAllSections = () => {
    return Object.keys(WEBSITE_SECTIONS).map(sectionId => ({
        ...WEBSITE_SECTIONS[sectionId],
        id: sectionId
    }));
};

export const getRequiredSections = () => {
    return Object.keys(WEBSITE_SECTIONS)
        .filter(sectionId => WEBSITE_SECTIONS[sectionId].required)
        .map(sectionId => ({
            ...WEBSITE_SECTIONS[sectionId],
            id: sectionId
        }));
};

export const getOptionalSections = () => {
    return Object.keys(WEBSITE_SECTIONS)
        .filter(sectionId => !WEBSITE_SECTIONS[sectionId].required)
        .map(sectionId => ({
            ...WEBSITE_SECTIONS[sectionId],
            id: sectionId
        }));
};
