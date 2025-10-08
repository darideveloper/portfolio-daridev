import { Flex } from "@/once-ui/components";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getBrandFromHeaders } from '@/utils/getBrand';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {

	const t = await getTranslations();
	const brand = getBrandFromHeaders();
	const { gallery, person } = renderContent(t, brand);

	const title = gallery.title;
	const description = gallery.description;
	const ogImage = `${baseURL}${person.avatar}`;

	return {
		title,
		description,
		keywords: 'gallery, portfolio, web development, design, Next.js, React, fullstack, automation, DevOps, Dari Dev, photos, images',
		author: person.name,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/gallery`,
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
			canonical: `https://${baseURL}/${locale}/gallery`,
			languages: {
				'en': `https://${baseURL}/en/gallery`,
				'es': `https://${baseURL}/es/gallery`,
			},
		},
	};
}

export default function Gallery(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const brand = getBrandFromHeaders();
	const { gallery, person } = renderContent(t, brand);
    return (
        <Flex fillWidth>
            <script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ImageGallery',
						name: gallery.title,
						description: gallery.description,
						url: `https://${baseURL}/gallery`,
						image: gallery.images.map((image) => ({
                            '@type': 'ImageObject',
                            url: `${baseURL}${image.src}`,
                            description: image.alt,
                        })),
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
            <MasonryGrid/>
        </Flex>
    );
}