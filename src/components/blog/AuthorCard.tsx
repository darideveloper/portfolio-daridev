import { Avatar, Flex, Text, Heading, Icon } from '@/once-ui/components';
import styles from './AuthorCard.module.scss';

interface AuthorCardProps {
  author: {
    name: string;
    fullName: string;
    role: string;
    avatar: string;
    bio: string;
    social: {
      facebook?: string;
      whatsapp?: string;
      github?: string;
      twitter?: string;
    };
  };
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <article className={styles.authorCard} itemScope itemType="https://schema.org/Person">
      <Flex 
        direction="column" 
        gap="m" 
        paddingY="l"
        paddingX="l"
        background="neutral-weak"
        radius="l"
      >
        {/* Header with avatar and name */}
        <Flex gap="m" alignItems="center">
          <Avatar
            size="l"
            src={author.avatar}
          />
          <Flex direction="column" gap="4">
            <Heading 
              variant="heading-strong-s" 
              itemProp="name"
            >
              {author.fullName}
            </Heading>
            <Text 
              variant="body-default-s" 
              onBackground="neutral-weak"
              itemProp="jobTitle"
            >
              {author.role}
            </Text>
          </Flex>
        </Flex>

        {/* Bio */}
        {author.bio && (
          <Text 
            variant="body-default-s"
            itemProp="description"
          >
            {author.bio}
          </Text>
        )}

        {/* Social Links */}
        {Object.keys(author.social).length > 0 && (
          <Flex gap="s" wrap>
            {author.social.facebook && (
              <a 
                href={author.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`${author.name} on Facebook`}
              >
                <Icon name="facebook" size="m" />
              </a>
            )}
            {author.social.whatsapp && (
              <a 
                href={author.social.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`Contact ${author.name} on WhatsApp`}
              >
                <Icon name="whatsapp" size="m" />
              </a>
            )}
            {author.social.github && (
              <a 
                href={author.social.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`${author.name} on GitHub`}
              >
                <Icon name="github" size="m" />
              </a>
            )}
            {author.social.twitter && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {author.social.twitter}
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </article>
  );
}

