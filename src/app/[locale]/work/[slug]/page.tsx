import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { AvatarGroup, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'
import { baseURL, renderContent } from '@/app/resources';
import { routing } from '@/i18n/routing';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/utils/formatDate';
import ScrollToHash from '@/components/ScrollToHash';
import { QuoteForm } from '@/components/quote'

// Dari Dev Components
import ShareButtons from '@/components/ShareButtons'

interface WorkParams {
    params: {
        slug: string;
		locale: string;
    };
}

export async function generateStaticParams(): Promise<{ slug: string; locale: string }[]> {
	const locales = routing.locales;
    
    // Create an array to store all posts from all locales
    const allPosts: { slug: string; locale: string }[] = [];

    // Fetch posts for each locale
    for (const locale of locales) {
        const posts = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);
        allPosts.push(...posts.map(post => ({
            slug: post.slug,
            locale: locale,
        })));
    }

    return allPosts;
}

export async function generateMetadata({ params: { slug, locale } }: WorkParams) {
	let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]).find((post) => post.slug === slug)
	
	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		images,
		image,
		team,
	} = post.metadata
	
	// Use the first image from the images array if image field doesn't exist
	let ogImage = image
		? `${baseURL}${image}`
		: images && images.length > 0
			? `${baseURL}${images[0]}`
			: `${baseURL}/images/avatar.png`;

	return {
		title,
		description,
		keywords: `project, ${title}, portfolio, web development, design, Next.js, React, fullstack, automation, DevOps, Dari Dev`,
		author: 'Dari Dev',
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			authors: ['Dari Dev'],
			url: `${baseURL}/${locale}/work/${post.slug}`,
			siteName: 'Dari Dev Portfolio',
			locale: locale === 'es' ? 'es_ES' : 'en_US',
			images: [
				{
					url: ogImage,
					alt: `${title} - Project by Dari Dev`,
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
			site: '@DeveloperDari',
			creator: '@DeveloperDari',
		},
		alternates: {
			canonical: `${baseURL}/${locale}/work/${post.slug}`,
			languages: {
				'en': `${baseURL}/en/work/${post.slug}`,
				'es': `${baseURL}/es/work/${post.slug}`,
			},
		},
	}
}

export default function Project({ params }: WorkParams) {
	unstable_setRequestLocale(params.locale);
	let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', params.locale]).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	const t = useTranslations();
	const { person } = renderContent(t);

	const avatars = post.metadata.team?.map((person) => ({
        src: person.avatar,
    })) || [];

	return (
		<Flex as="section"
			fillWidth maxWidth="m"
			direction="column" alignItems="center"
			gap="l">
			<script
				type="application/ld+json"
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
							? `${baseURL}${post.metadata.image}`
							: post.metadata.images && post.metadata.images.length > 0
								? `${baseURL}${post.metadata.images[0]}`
								: `${baseURL}/og?title=${post.metadata.title}`,
						url: `${baseURL}/${params.locale}/work/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Flex
				fillWidth maxWidth="xs" gap="16"
				direction="column">
				<Button
					href={`/${params.locale}/work`}
					variant="tertiary"
					size="s"
					prefixIcon="chevronLeft">
					Projects
				</Button>
				<Heading
					variant="display-strong-s">
					{post.metadata.title}
				</Heading>
			</Flex>
			{post.metadata.images.length > 0 && (
				<SmartImage
					aspectRatio="16 / 9"
					radius="m"
					alt="image"
					src={post.metadata.images[0]}/>
			)}
			<Flex style={{margin: 'auto'}}
				as="article"
				maxWidth="xs" fillWidth
				direction="column">
				<Flex
					gap="12" marginBottom="24"
					alignItems="center">
					{ post.metadata.team && (
						<AvatarGroup
							reverseOrder
							avatars={avatars}
							size="m"/>
					)}
					<Text
						variant="body-default-s"
						onBackground="neutral-weak">
						{formatDate(post.metadata.publishedAt)}
					</Text>
				</Flex>

				<ShareButtons />

				<CustomMDX source={post.content} />
			</Flex>
			<ScrollToHash />

			{/* Quote Form at footer */}
			<QuoteForm />
		</Flex>
	)
}