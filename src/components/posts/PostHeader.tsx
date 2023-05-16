import { Post } from "@/interfaces"
import { Avatar } from "../ui/Avatar"
import { DateComponent } from "../ui/DateComponent"
import { ContentfulImage } from "../ui/ContentfulImage"

type Props = { post: Post }

export const PostHeader = ({ post }: Props) => {
  const { title, coverImage, author, date } = post.fields

  const coverImageUrl = (coverImage as any).fields.file.url;
  const coverImageWidth = (coverImage as any).fields.file.details.image.width;
  const coverImageHeifht = (coverImage as any).fields.file.details.image.height;

  const authorName = (author as any).fields.name;
  const authorPicture = (author as any).fields.picture;

  return (
    <>
      <h2>{title}</h2>
      <div className='hidden md:flex md:justify-between md:items-center md:mb-10'>
        <Avatar name={authorName} picture={authorPicture} />
        <DateComponent dateString={date} className='text-sm text-gray-400' />
      </div>
      <div className='mb-8 md:mb-16 sm:mx-0'>
        <ContentfulImage
          alt={`Cover Image for ${title}`}
          src={coverImageUrl}
          width={coverImageWidth}
          height={coverImageHeifht}
        />
      </div>
      <div className='flex justify-between items-center md:hidden mb-6'>
        <Avatar name={authorName} picture={authorPicture} />
        <DateComponent dateString={date} className='text-sm text-gray-400' />
      </div>
    </>
  )
}
