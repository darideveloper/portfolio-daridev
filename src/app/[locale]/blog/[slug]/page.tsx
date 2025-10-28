import ScrollToHash from '@/components/ScrollToHash'
import { notFound } from 'next/navigation'
import { QuoteForm } from '@/components/quote'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { Avatar, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'

import { baseURL, renderContent } from '@/app/resources'
import { unstable_setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { formatDate } from '@/app/utils/formatDate'
import { getAuthor } from '@/app/resources/authors'

// Dari Dev Components
import ShareButtons from '@/components/ShareButtons'
import AuthorCard from '@/components/blog/AuthorCard'

interface BlogParams {
  params: {
    slug: string
    locale: string
  }
}

export async function generateStaticParams() {
  const locales = routing.locales

  // Create an array to store all posts from all locales
  const allPosts: { slug: string; locale: string }[] = []

  // Fetch posts for each locale
  for (const locale of locales) {
    const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale])
    allPosts.push(
      ...posts.map((post) => ({
        slug: post.slug,
        locale: locale,
      }))
    )
  }

  return allPosts
}

export async function generateMetadata({ params: { slug, locale } }: BlogParams) {
  let post = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).find(
    (post) => post.slug === slug
  )

  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  
  // Get author data
  const authorId = post.metadata.author || 'daridev';
  const author = getAuthor(authorId);
  
  let ogImage = image
    ? `${baseURL}${image}`
    : `${baseURL}/images/avatar.png`
    
  const postsTags = post.metadata.tag || []

  return {
    title,
    description,
    keywords: `blog, ${(Array.isArray(postsTags) ? postsTags.join(', ') : postsTags)}, portfolio, web development, design, Next.js, React, fullstack, automation, DevOps, Dari Dev, article`,
    author: author.fullName,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      authors: [author.fullName],
      url: `${baseURL}/${locale}/blog/${post.slug}`,
      siteName: 'Dari Dev Portfolio',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: ogImage,
          alt: `${title} - Article by ${author.fullName}`,
          width: 1200,
          height: 630,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      title,
      description,
      card: ogImage.includes('/images/avatar.png') ? 'summary' : 'summary_large_image',
      site: author.social.twitter || '@DeveloperDari',
      creator: author.social.twitter || '@DeveloperDari',
    },
    alternates: {
      canonical: `${baseURL}/${locale}/blog/${post.slug}`,
      languages: {
        'en': `${baseURL}/en/blog/${post.slug}`,
        'es': `${baseURL}/es/blog/${post.slug}`,
      },
    },
  }
}

export default function Blog({ params }: BlogParams) {
  unstable_setRequestLocale(params.locale)
  let post = getPosts([
    'src',
    'app',
    '[locale]',
    'blog',
    'posts',
    params.locale,
  ]).find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const t = useTranslations()
  
  // Get author data
  const authorId = post.metadata.author || 'daridev';
  const author = getAuthor(authorId);

  return (
    <Flex
      as='section'
      fillWidth
      maxWidth='xs'
      direction='column'
      gap='m'
    >

      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? {
                  '@type': 'ImageObject',
                  url: `${baseURL}${post.metadata.image}`,
                  caption: post.metadata.title,
                }
              : `${baseURL}/og?title=${post.metadata.title}`,
            url: `${baseURL}/${params.locale}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: author.fullName,
              url: author.social.facebook || author.social.github,
              image: `${baseURL}${author.avatar}`
            },
          }),
        }}
      />
      <Button
        href={`/${params.locale}/blog`}
        variant='tertiary'
        size='s'
        prefixIcon='chevronLeft'
      >
        Posts
      </Button>
      <Heading variant='display-strong-s'>{post.metadata.title}</Heading>
      <Flex
        gap='12'
        alignItems='center'
      >
        <Avatar
          size='s'
          src={author.avatar}
        />
        <Flex
          direction='column'
          gap='4'
        >
          <Text
            variant='body-default-s'
            onBackground='neutral-strong'
          >
            {author.fullName}
          </Text>
          <Text
            variant='body-default-s'
            onBackground='neutral-weak'
          >
            {formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
      </Flex>

	  <ShareButtons />

      {/* Hero/Banner Image for the Blog Post */}
      {post.metadata.image && (
        <Flex
          fillWidth
          style={{
            marginTop: 'var(--static-space-16)',
            marginBottom: 'var(--static-space-24)',
          }}
        >
          <SmartImage
            src={post.metadata.image}
            alt={`Featured image for the article: ${post.metadata.title} by ${author.fullName}`}
            title={`${post.metadata.title} - Featured Image by ${author.fullName}`}
            aspectRatio="16 / 9"
            radius="m"
            priority
            style={{
              width: '100%',
            }}
          />
        </Flex>
      )}

      <Flex
        as='article'
        direction='column'
        fillWidth
      >
        <CustomMDX source={post.content} />
      </Flex>

      {/* Author Card at the bottom */}
      <AuthorCard author={author} />

      <ScrollToHash />

      {/* Quote Form at footer */}
      <QuoteForm />

    </Flex>
  )
}
