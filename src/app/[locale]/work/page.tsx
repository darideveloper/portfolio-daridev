import { getPosts } from '@/app/utils/utils';
import { Flex } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getBrandFromHeaders } from '@/utils/getBrand';

export async function generateMetadata(
    {params: {locale}}: { params: { locale: string }}
) {

    const t = await getTranslations();
    const brand = getBrandFromHeaders();
    const { work, person } = renderContent(t, brand);

	const title = work.title;
	const description = work.description;
	const ogImage = `${baseURL}${person.avatar}`;

	return {
		title,
		description,
		keywords: 'projects, portfolio, web development, design, Next.js, React, fullstack, automation, DevOps, Dari Dev, work',
		author: person.name,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `${baseURL}/${locale}/work`,
			siteName: `${person.firstName}'s Portfolio`,
			locale: locale === 'es' ? 'es_ES' : 'en_US',
			images: [
				{
					url: ogImage,
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
			title,
			description,
		},
		alternates: {
			canonical: `${baseURL}/${locale}/work`,
			languages: {
				'en': `${baseURL}/en/work`,
				'es': `${baseURL}/es/work`,
			},
		},
	};
}

export default function Work(
    { params: {locale}}: { params: { locale: string }}
) {
    unstable_setRequestLocale(locale);
    let allProjects = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);

    const t = useTranslations();
    const brand = getBrandFromHeaders();
    const { person, work } = renderContent(t, brand);

    return (
        <Flex
			fillWidth maxWidth="m"
			direction="column">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        headline: work.title,
                        description: work.description,
                        url: `${baseURL}/work`,
                        image: `${baseURL}${person.avatar}`,
                        author: {
                            '@type': 'Person',
                            name: person.name,
                        },
                        hasPart: allProjects.map(project => {
                            const projectImage = project.metadata.image || (project.metadata.images && project.metadata.images[0]) || '/images/avatar.png';
                            return {
                                '@type': 'CreativeWork',
                                headline: project.metadata.title,
                                description: project.metadata.summary,
                                url: `${baseURL}/work/${project.slug}`,
                                image: `${baseURL}${projectImage}`,
                            };
                        }),
                    }),
                }}
            />
            <Projects locale={locale}/>
        </Flex>
    );
}