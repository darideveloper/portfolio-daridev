import {
  Flex,
  Heading,
  Text,
} from '@/once-ui/components'
import { baseURL, renderContent } from '@/app/resources'
import { getBranding } from '@/app/resources/branding'
import { getBrandFromHeaders } from '@/utils/getBrand'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations()
  const brand = getBrandFromHeaders()
  const branding = getBranding(brand)
  const { person, privacy, company } = renderContent(t, brand)
  const title = t(privacy.title)
  const description = t(privacy.introduction.content)

  return {
    title,
    description,
    keywords: branding.seo.keywords,
    author: person.name,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/${locale}/privacy`,
      siteName: `${person.firstName}'s Portfolio`,
      locale: 'en_US',
      images: [
        {
          url: `${baseURL}${person.avatar}`,
          alt: `${person.name} - ${person.role}`,
          width: 400,
          height: 400,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: branding.social.twitter,
      creator: branding.social.twitter,
      title,
      description,
      images: [`${baseURL}${person.avatar}`],
    },
    alternates: {
      canonical: `https://${baseURL}/${locale}/privacy`,
      languages: {
        'en': `https://${baseURL}/en/privacy`,
        'es': `https://${baseURL}/es/privacy`,
      },
    },
  }
}

export default function Privacy({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()
  const brand = getBrandFromHeaders()
  const { person, privacy, company } = renderContent(t, brand)

  const privacySections = [
    {
      key: 'introduction',
      title: t(privacy.introduction.title),
      content: t(privacy.introduction.content),
    },
    {
      key: 'dataCollection',
      title: t(privacy.dataCollection.title),
      content: t(privacy.dataCollection.content),
      items: privacy.dataCollection.items.map(item => t(item)),
    },
    {
      key: 'dataUsage',
      title: t(privacy.dataUsage.title),
      content: t(privacy.dataUsage.content),
      items: privacy.dataUsage.items.map(item => t(item)),
    },
    {
      key: 'dataStorage',
      title: t(privacy.dataStorage.title),
      content: t(privacy.dataStorage.content),
    },
    {
      key: 'dataSharing',
      title: t(privacy.dataSharing.title),
      content: t(privacy.dataSharing.content),
      items: privacy.dataSharing.items.map(item => t(item)),
    },
    {
      key: 'cookies',
      title: t(privacy.cookies.title),
      content: t(privacy.cookies.content),
    },
    {
      key: 'yourRights',
      title: t(privacy.yourRights.title),
      content: t(privacy.yourRights.content),
      items: privacy.yourRights.items.map(item => t(item)),
    },
    {
      key: 'contact',
      title: t(privacy.contact.title),
      content: t(privacy.contact.content),
      email: t(privacy.contact.email),
      website: t(privacy.contact.website),
    },
    {
      key: 'changes',
      title: t(privacy.changes.title),
      content: t(privacy.changes.content),
    },
  ]

  return (
    <Flex
      className='content-privacy'
      fillWidth
      maxWidth='m'
      direction='column'
    >
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t(privacy.title),
            description: t(privacy.introduction.content),
            url: `https://${baseURL}/privacy`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
          }),
        }}
      />
      
      <Flex
        fillWidth
        direction='column'
        justifyContent='center'
      >
        <Flex
          fillWidth
          direction='column'
          justifyContent='center'
          marginBottom='32'
        >
          <Heading
            variant='display-strong-xl'
            marginBottom='m'
          >
            {t(privacy.title)}
          </Heading>
          <Text
            variant='display-default-xs'
            onBackground='neutral-weak'
            marginBottom='l'
          >
            {t(privacy.lastUpdated, { date: new Date().toLocaleDateString() })}
          </Text>
        </Flex>

        <Flex
          direction='column'
          fillWidth
          gap='xl'
        >
          {privacySections.map((section) => (
            <Flex
              key={section.key}
              direction='column'
              fillWidth
              gap='m'
            >
              <Heading
                as='h2'
                variant='display-strong-s'
                marginBottom='m'
              >
                {section.title}
              </Heading>
              
              <Text
                variant='body-default-l'
                marginBottom={section.items ? 'm' : '0'}
              >
                {section.content}
              </Text>

              {section.items && section.items.length > 0 && (
                <Flex
                  as='ul'
                  direction='column'
                  gap='12'
                  paddingLeft='l'
                >
                  {section.items.map((item, index) => (
                    <Text
                      key={index}
                      as='li'
                      variant='body-default-m'
                    >
                      {item}
                    </Text>
                  ))}
                </Flex>
              )}

              {section.email && section.website && (
                <Flex
                  direction='column'
                  gap='8'
                  marginTop='m'
                >
                  <Text variant='body-default-m'>
                    {section.email}
                  </Text>
                  <Text variant='body-default-m'>
                    {section.website}
                  </Text>
                </Flex>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}