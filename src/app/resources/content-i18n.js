import { InlineCode } from "@/once-ui/components"

/**
 * Returns a Jsx ul list from string separated by ;
 * 
 * @param {string} text - The string to be converted into a list.
 * @returns {JSX.Element} - A JSX ul list.
 */
function getJsxList(text) {
  const items = text.split(";").map((item, index) => {
    return <li key={index}>{item}</li>
  })
  return <ul>{items}</ul>
}

const createI18nContent = (t) => {
  const person = {
    firstName: 'Dari',
    lastName: 'Dev',
    get name() {
      return `${this.firstName} ${this.lastName}`
    },
    role: t("person.role"),
    avatar: '/images/avatar.png',
    location: 'America/Mexico_City',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['Español', "English"]  // optional: Leave the array empty if you don't want to display languages
  }

  const contact = {
    display: true,
    title: <>{t("contact.title")}</>,
    description: <>{t("contact.description")}</>
  }

  const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
      name: 'GitHub',
      icon: 'github',
      link: 'https://github.com/darideveloper?tab=repositories',
    },
    {
      name: 'Email',
      icon: 'email',
      link: 'mailto:darideveloper@gmail.com',
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      link: 'https://api.whatsapp.com/send?phone=5214493402622',
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      link: 'https://t.me/darideveloper',
    },
    {
      name: 'Fiverr',
      icon: 'fiverr',
      link: 'https://www.fiverr.com/s/AyKKV6Q',
    },
  ]

  const home = {
    label: t("home.label"),
    title: t("home.title", { name: person.name }),
    description: t("home.description", { role: person.role }),
    headline: <>{t("home.headline")}</>,
    subline: <>{t("home.subline")}</>
  }

  const about = {
    label: t("about.label"),
    title: t("about.title"),
    description: t("about.description", { name: person.name, role: person.role, location: person.location }),
    tableOfContent: {
      display: true,
      subItems: true
    },
    avatar: {
      display: true
    },
    calendar: {
      display: true,
      link: 'https://cal.com'
    },
    quote: {
      display: true,
      link: "/quote",
      text: t("about.quote.text"),
    },
    intro: {
      display: true,
      title: t("about.intro.title"),
      description: <>{t("about.intro.description")}</>
    },
    work: {
      display: true, // set to false to hide this section
      title: t("about.work.title"),
      experiences: [
        {
          company: t("about.work.experiences.daridevsTeam.company"),
          timeframe: t("about.work.experiences.daridevsTeam.timeframe"),
          role: t("about.work.experiences.daridevsTeam.role"),
          achievements: t("about.work.experiences.daridevsTeam.achievements").split(";"),
          images: [
            {
              src: '/images/about/team.svg',
              alt: t("about.work.experiences.daridevsTeam.imgAlt"),
              width: 26,
              height: 18
            }
          ]
        },
        {
          company: t("about.work.experiences.fullStack.company"),
          timeframe: t("about.work.experiences.fullStack.timeframe"),
          role: t("about.work.experiences.fullStack.role"),
          achievements: t("about.work.experiences.fullStack.achievements").split(";"),
          images: [
            {
              src: '/images/about/fullstack.svg',
              alt: t("about.work.experiences.fullStack.imgAlt"),
              width: 24,
              height: 25
            }
          ]
        },
        {
          company: t("about.work.experiences.automation.company"),
          timeframe: t("about.work.experiences.automation.timeframe"),
          role: t("about.work.experiences.automation.role"),
          achievements: t("about.work.experiences.automation.achievements").split(";"),
          images: [
            {
              src: '/images/about/automation.svg',
              alt: t("about.work.experiences.automation.imgAlt"),
              width: 24,
              height: 24
            }
          ]
        }
      ]
    },
    studies: {
      display: false, // set to false to hide this section
      title: t("about.studies.title"),
      institutions: [
        {
          name: 'University of Jakarta',
          description: <>{t(`about.studies.institutions.University of Jakarta.description`)}</>,
        },
        {
          name: 'Build the Future',
          description: <>{t("about.studies.institutions.Build the Future.description")}</>,
        }
      ]
    },
    technical: {
      display: true, // set to false to hide this section
      title: t("about.technical.title"),
      description: t("about.technical.description"),
      skills: [
        {
          title: t("about.technical.skills.frontend.title"),
          description: getJsxList(t("about.technical.skills.frontend.description")),
        },
        {
          title: t("about.technical.skills.backend.title"),
          description: getJsxList(t("about.technical.skills.backend.description")),
        },
        {
          title: t("about.technical.skills.database.title"),
          description: getJsxList(t("about.technical.skills.database.description")),
        },
        {
          title: t("about.technical.skills.automation.title"),
          description: getJsxList(t("about.technical.skills.automation.description")),
        },
        {
          title: t("about.technical.skills.devops.title"),
          description: getJsxList(t("about.technical.skills.devops.description")),
        },
        {
          title: t("about.technical.skills.integrations.title"),
          description: getJsxList(t("about.technical.skills.integrations.description")),
        }
      ]
    }
  }

  const blog = {
    label: t("blog.label"),
    title: t("blog.title"),
    description: t("blog.description", { name: person.name })
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
  }

  const work = {
    label: t("work.label"),
    title: t("work.title"),
    description: t("work.description", { name: person.name })
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
  }

  const gallery = {
    label: t("gallery.label"),
    title: t("gallery.title"),
    description: t("gallery.description", { name: person.name }),
    // Images from https://pexels.com
    images: [
      {
        src: '/images/gallery/img-01.jpg',
        alt: 'image',
        orientation: 'vertical'
      },
      {
        src: '/images/gallery/img-02.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-03.jpg',
        alt: 'image',
        orientation: 'vertical'
      },
      {
        src: '/images/gallery/img-04.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-05.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-06.jpg',
        alt: 'image',
        orientation: 'vertical'
      },
      {
        src: '/images/gallery/img-07.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-08.jpg',
        alt: 'image',
        orientation: 'vertical'
      },
      {
        src: '/images/gallery/img-09.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-10.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-11.jpg',
        alt: 'image',
        orientation: 'vertical'
      },
      {
        src: '/images/gallery/img-12.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-13.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
      {
        src: '/images/gallery/img-14.jpg',
        alt: 'image',
        orientation: 'horizontal'
      },
    ]
  }
  return {
    person,
    social,
    contact,
    home,
    about,
    blog,
    work,
    gallery
  }
}

export { createI18nContent }
