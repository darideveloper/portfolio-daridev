import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Flex, Heading, Text } from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import { QuoteForm } from '@/components/quote';
import { getBrandFromHeaders } from '@/utils/getBrand';

export async function generateMetadata(
	{ params: { locale } }: { params: { locale: string } }
) {
	const t = await getTranslations();
	const brand = getBrandFromHeaders();
	const { person } = renderContent(t, brand);
	const title = t('quote.title');
	const description = t('quote.description');
	const ogImage = `${baseURL}${person.avatar}`;

	return {
		title,
		description,
		keywords: 'quote, pricing, web development, custom website, Dari Dev',
		author: person.name,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/quote`,
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
			canonical: `https://${baseURL}/${locale}/quote`,
			languages: {
				'en': `https://${baseURL}/en/quote`,
				'es': `https://${baseURL}/es/quote`,
			},
		},
	};
}

export default function Quote(
	{ params: { locale } }: { params: { locale: string } }
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const brand = getBrandFromHeaders();
	const { person } = renderContent(t, brand);

	return (
		<Flex
			fillWidth maxWidth="m"
			direction="column"
			gap="xl"
			paddingY="l">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: t('quote.title'),
						description: t('quote.description'),
						url: `https://${baseURL}/quote`,
						image: `${baseURL}${person.avatar}`,
						publisher: {
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
			<Heading as="h1" size="xl" style={{ textAlign: 'center' }}>
				{t('quote.pageTitle')}
			</Heading>
			<QuoteForm />
		</Flex>
	);
}
