'use client'

import {
  Flex,
  Heading,
  SmartImage,
  SmartLink,
  Tag,
  Text,
} from '@/once-ui/components'
import styles from './Posts.module.scss'
import { formatDate } from '@/app/utils/formatDate'

interface PostProps {
  post: any
  thumbnail: boolean
}

export default function Post({ post, thumbnail }: PostProps) {
  return (
    <SmartLink
      className={styles.hover}
      style={{
        textDecoration: 'none',
        margin: '0',
        height: 'fit-content',
      }}
      key={post.slug}
      href={`/blog/${post.slug}`}
    >
      <Flex
        position='relative'
        mobileDirection='column'
        fillWidth
        paddingY='12'
        paddingX='16'
        gap='32'
      >
        {post.metadata.image && thumbnail && (
          <Flex
            className={styles.image}
            style={{
              width: '100%',
            }}
          >
            <SmartImage
              priority
              style={{
                cursor: 'pointer',
                border: '1px solid var(--neutral-alpha-weak)',
              }}
              radius='m'
              src={post.metadata.image}
              alt={'Thumbnail of ' + post.metadata.title}
              aspectRatio='16 / 9'
            />
          </Flex>
        )}
        <Flex
          position='relative'
          gap='8'
          direction='column'
          justifyContent='center'
          style={{
            width: '100%',
          }}
        >
          <Heading
            as='h2'
            variant='heading-strong-l'
          >
            {post.metadata.title}
          </Heading>
          <Text
            variant='label-default-s'
            onBackground='neutral-weak'
          >
            {formatDate(post.metadata.publishedAt, false)}
          </Text>
          <div className='flex gap-2 w-full' style={{ flexWrap: 'wrap'}}>
            {post.metadata.tag &&
              post.metadata.tag.map((tag: string) => (
                <Tag
                  className='mt-8 mr-8 inline-block'
                  label={tag}
                  variant='neutral'
                />
              ))}
          </div>
        </Flex>
      </Flex>
    </SmartLink>
  )
}
