import React from 'react'
import Link from 'next/link';
import { Post } from '@/interfaces'
import { ContentfulImage } from '../ui/ContentfulImage';
import { DateComponent } from '../ui/DateComponent';
import { Avatar } from '../ui/Avatar';

type Props = {
  post: Post
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const { title, slug, excerpt, coverImage, date, author } = post.fields;

  const coverImageUrl = (coverImage as any).fields.file.url;
  const coverImageWidth = (coverImage as any).fields.file.details.image.width;
  const coverImageHeifht = (coverImage as any).fields.file.details.image.height;

  const authorName = (author as any).fields.name;
  const authorPicture = (author as any).fields.picture;

  return (
    <li className='rounded-md overflow-hidden shadow-md'>
      <Link href={`/posts/${slug}`} aria-label={title}>
        <div className='mb-2'>
          <ContentfulImage
            alt={`Cover Image for ${title}`}
            src={coverImageUrl}
            width={coverImageWidth}
            height={coverImageHeifht}
          />
        </div>
        <div className='p-4'>
          <h3 className='text-xl mb-1 leading-snug'>{title}</h3>
          <div className='text-sm mb-4 text-gray-400'>
            <DateComponent dateString={date} />
          </div>
          <p className='text-base mb-4'>{excerpt}</p>
          <Avatar name={authorName} picture={authorPicture} />
        </div>
      </Link>
    </li>
  )
}
