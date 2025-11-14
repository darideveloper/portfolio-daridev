import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { Footer, Header, RouteGuard, WhatsAppButton } from "@/components";
import { baseURL, effects, style } from '@/app/resources'
import { getBrandFromHeaders } from '@/utils/getBrand'

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { Background, Flex } from "@/once-ui/components";

import Script from 'next/script';


export async function generateMetadata(
	{ params: { locale }}: { params: { locale: string }}
) {

	const t = await getTranslations();
	
	// Get brand dynamically from headers (this is a server component)
	const brand = getBrandFromHeaders();
	const { person, home } = renderContent(t, brand);

	return {
		metadataBase: new URL(baseURL),
		title: home.title,
		description: home.description,
		keywords: 'portfolio, web development, design, Next.js, React, fullstack, automation, DevOps, Dari Dev',
		author: person.name,
		// Favicon based in brand
		icons: {
			icon: `/favicon/${brand}.ico`,
		},
		viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
		charset: 'utf-8',
		referrer: 'origin-when-cross-origin',
		themeColor: '#000000',
		colorScheme: 'light dark',
		openGraph: {
			title: `${person.firstName}'s Portfolio`,
			description: 'Portfolio website showcasing my work.',
			url: `${baseURL}/${locale}`,
			siteName: `${person.firstName}'s Portfolio`,
			locale: locale === 'es' ? 'es_ES' : 'en_US',
			type: 'website',
			images: [
				{
					url: `${baseURL}${person.avatar}`,
					alt: `${person.name} - ${person.role}`,
					width: 400,
					height: 400,
					type: 'image/webp',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			site: '@DeveloperDari',
			creator: '@DeveloperDari',
			title: `${person.firstName}'s Portfolio`,
			description: 'Portfolio website showcasing my work.',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		alternates: {
			canonical: `${baseURL}/${locale}`,
			languages: {
				'en': `${baseURL}/en`,
				'es': `${baseURL}/es`,
			},
		},
	}
};

const primary = Inter({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap',
})

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
*/

const code = Source_Code_Pro({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

interface RootLayoutProps {
	children: React.ReactNode;
	params: {locale: string};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({locale}));
  }

  export default async function RootLayout({
	children,
	params: {locale}
} : RootLayoutProps) {
	unstable_setRequestLocale(locale);
	const messages = await getMessages();
	const t = await getTranslations();
	
	// Get brand from middleware headers (server component)
	const brand = getBrandFromHeaders();
	
	const { person, social } = renderContent(t, brand);
	return (
		<NextIntlClientProvider messages={messages}>
			<Flex
				as="html" lang="en"
				background="page"
				data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
				data-solid={style.solid} data-solid-style={style.solidStyle}
				data-theme={style.theme}
				data-border={style.border}
				data-surface={style.surface}
				data-transition={style.transition}
				className={classNames(
					primary.variable,
					secondary ? secondary.variable : '',
					tertiary ? tertiary.variable : '',
					code.variable)}>
				<Flex style={{minHeight: '100vh'}}
					as="body"
					fillWidth margin="0" padding="0"
					direction="column">
					<script
						type="application/ld+json"
						suppressHydrationWarning
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'Organization',
								name: `${person.firstName}'s Portfolio`,
								url: `${baseURL}`,
								logo: `${baseURL}${person.avatar}`,
								description: 'Portfolio website showcasing web development and design work',
								sameAs: social
									.filter((item) => item.link && !item.link.startsWith('mailto:'))
									.map((item) => item.link),
								founder: {
									'@type': 'Person',
									name: person.name,
									jobTitle: person.role,
									image: `${baseURL}${person.avatar}`,
								},
								contactPoint: {
									'@type': 'ContactPoint',
									contactType: 'customer service',
									email: 'darideveloper@gmail.com',
								},
							}),
						}}
					/>

					{/* Google tag (gtag.js) */}
					<Script
						src="https://www.googletagmanager.com/gtag/js?id=G-808LT56M6M"
						async
						strategy="afterInteractive"
					/>
					<Script
						id="google-analytics"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', 'G-808LT56M6M');
							`.trim(),
						}}
					/>

					{/* Influencer Roulette */}
					<Script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4509450751077172"
						crossOrigin="anonymous"
						strategy="afterInteractive"
					/>

					{/* Umami analytics */}
					<Script
						src="https://umami.apps.darideveloper.com/script.js"
						data-website-id="ea4f3991-4f85-4710-a9cc-fc4848110c56"
						strategy="afterInteractive"
					/>

					<Background
						mask={effects.mask as any}
						gradient={effects.gradient as any}
						dots={effects.dots as any}
						lines={effects.lines as any}/>
					<Flex
						fillWidth
						minHeight="16">
					</Flex>
					<Header brand={brand}/>
					<Flex
						zIndex={0}
						fillWidth paddingY="l" paddingX="l"
						justifyContent="center" flex={1}>
						<Flex
							justifyContent="center"
							fillWidth minHeight="0">
							<RouteGuard>
								{children}
							</RouteGuard>
						</Flex>
					</Flex>
					<Footer brand={brand}/>
					<WhatsAppButton brand={brand}/>
				</Flex>
			</Flex>
		</NextIntlClientProvider>
	);
}