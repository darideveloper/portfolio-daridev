import { Flex, Heading } from '@/once-ui/components';
import { ContactForm } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {

	const t = await getTranslations();
	const { blog, person } = renderContent(t);

	const title = blog.title;
	const description = blog.description;
	const ogImage = `${baseURL}${person.avatar}`;

	return {
		title,
		description,
		keywords: 'blog, portfolio, web development, design, Next.js, React, fullstack, automation, DevOps, Dari Dev, articles, writing',
		author: person.name,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/blog`,
			siteName: `${person.firstName}'s Portfolio`,
			locale: 'en_US',
			images: [
				{
					url: ogImage,
					alt: `${person.name} - ${person.role}`,
					width: 400,
					height: 400,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@DeveloperDari',
			creator: '@DeveloperDari',
			title,
			description,
			images: [ogImage],
		},
		alternates: {
			canonical: `https://${baseURL}/${locale}/blog`,
			languages: {
				'en': `https://${baseURL}/en/blog`,
				'es': `https://${baseURL}/es/blog`,
			},
		},
	};
}

export default function Blog(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);

	const t = useTranslations();
	const { person, blog, contact } = renderContent(t);
    return (
        <Flex
			fillWidth maxWidth="s"
			direction="column">
            <script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Blog',
						headline: blog.title,
						description: blog.description,
						url: `https://${baseURL}/blog`,
						image: `${baseURL}${person.avatar}`,
						author: {
							'@type': 'Person',
							name: person.name,
                            image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
            <Heading
                marginBottom="l"
                variant="display-strong-s">
                {blog.title}
            </Heading>
			<Flex
				fillWidth flex={1} direction="column">
				<Posts range={[1,3]} locale={locale} thumbnail/>
				<Posts range={[4]} columns="2" locale={locale}/>
			</Flex>
            {contact.display && (
                <ContactForm display={contact.display} />
            )}
        </Flex>
    );
}