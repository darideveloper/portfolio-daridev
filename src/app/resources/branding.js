// get brand
const brand = process.env.NEXT_PUBLIC_BRAND || 'daridev'

// Centralized branding configuration

const brandingDariDev = {
  // Company/Person Information
  company: {
    name: "Dari Dev",
    fullName: "Dari Dev",
    legalName: "Dari Dev",
    tagline: "Full Stack Team",
    description: "Full stack web developer and leader of my own development team"
  },
  
  // Contact Information
  contact: {
    email: "darideveloper@gmail.com",
    website: "https://www.darideveloper.com",
    phone: "5214493402622", // WhatsApp number
    location: "America/Mexico_City",
    languages: ["Español", "English"]
  },
  
  // Social Media
  social: {
    twitter: "@DeveloperDari",
    github: "darideveloper",
    telegram: "darideveloper",
    fiverr: "https://www.fiverr.com/s/AyKKV6Q"
  },
  
  // Assets
  assets: {
    avatar: "/images/avatar.png",
    logo: "/images/logo.png" // if exists
  },
  
  // SEO Keywords
  seo: {
    keywords: "privacy, policy, data protection, GDPR, personal information, cookies, Dari Dev"
  }
}


const branding3s = {
  // Company/Person Information
  company: {
    name: "3S",
    fullName: "Smooth Software Solutions",
    legalName: "Smooth Software Solutions",
    tagline: "Full Stack Team",
    description: "Software development and consulting services"
  },
  
  // Contact Information
  contact: {
    email: "contact@software3s.com",
    website: "https://www.software3s.com",
    phone: "5214493402622", // WhatsApp number
    location: "America/Mexico_City",
    languages: ["Español", "English"]
  },
  
  // Social Media
  social: {
    twitter: "@DeveloperDari",
    github: "darideveloper",
    telegram: "darideveloper",
    fiverr: "https://www.fiverr.com/s/AyKKV6Q"
  },
  
  // Assets
  assets: {
    avatar: "/images/3s-logo.webp",
    logo: "/images/3s-logo.webp" // if exists
  },
  
  // SEO Keywords
  seo: {
    keywords: "privacy, policy, data protection, GDPR, personal information, cookies, Dari Dev"
  }
}

const brandings = {
  daridev: brandingDariDev,
  "3s": branding3s
}
export const branding = brandings[brand]
