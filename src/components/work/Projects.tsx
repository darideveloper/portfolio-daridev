import { getPosts } from '@/app/utils/utils';
import { Flex } from '@/once-ui/components';

import { SwiperProjectCard } from '@/components/SwiperProjectCard';

interface ProjectsProps {
    range?: [number, number?];
    locale: string;
}

export function Projects({ range, locale }: ProjectsProps) {
    let allProjects = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);

    const sortedProjects = allProjects.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedProjects = range
        ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
        : sortedProjects;

    return (
        <Flex
            fillWidth gap="xl" marginBottom="40" paddingX="l"
            direction="column">
            {displayedProjects.map((post) => (
                <SwiperProjectCard
                    key={post.slug}
                    href={`work/${post.slug}`}
                    images={post.metadata.images}
                    title={post.metadata.title}
                    description={post.metadata.summary}
                    content={post.content}
                    avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
                    link={post.metadata.link || ""}
                    autoPlay={true}
                    autoPlayDelay={2000}
                    pauseOnHover={true}
                    showNavigation={false}
                    showPagination={true}
                />
            ))}
        </Flex>
    );
}