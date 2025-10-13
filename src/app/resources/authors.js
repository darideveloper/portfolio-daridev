export const authors = {
  daridev: {
    name: "Dari Dev",
    fullName: "Dari Developer",
    role: "Full Stack Developer & Team Leader",
    avatar: "/images/avatars/daridev.webp",
    bio: "Web developer and founder of DariDeveloper, passionate about helping local businesses thrive in the digital world.",
    social: {
      facebook: "https://www.facebook.com/daridevofficial",
      whatsapp: "https://api.whatsapp.com/send?phone=5214493402622",
      github: "https://github.com/darideveloper",
      twitter: "@DeveloperDari"
    }
  },
  marco: {
    name: "Marco",
    fullName: "Marco Developer",
    role: "Backend Developer",
    avatar: "/images/avatars/marco.webp",
    bio: "Backend specialist focused on scalable solutions.",
    social: {
      github: "https://github.com/marco",
      twitter: "@MarcoDevs"
    }
  },
  nielsbored: {
    name: "Niels",
    fullName: "Niels Bored",
    role: "Frontend Developer",
    avatar: "/images/avatars/nielsbored.webp",
    bio: "Frontend enthusiast creating beautiful user experiences.",
    social: {}
  },
  sagdev: {
    name: "Sag Dev",
    fullName: "Sag Developer",
    role: "DevOps Engineer",
    avatar: "/images/avatars/sagdev.webp",
    bio: "DevOps engineer ensuring smooth deployments.",
    social: {}
  },
  silvia: {
    name: "Silvia",
    fullName: "Silvia Developer",
    role: "UX/UI Designer",
    avatar: "/images/avatars/silvia.webp",
    bio: "Designer crafting intuitive interfaces.",
    social: {}
  }
};

export function getAuthor(authorId) {
  return authors[authorId] || authors.daridev; // Default to daridev
}

