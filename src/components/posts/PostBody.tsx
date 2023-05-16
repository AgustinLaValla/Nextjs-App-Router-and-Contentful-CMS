import { Post } from '@/interfaces';
import { RichText } from '@/components';


type Props = {
  post: Post
}

export const PostBody: React.FC<Props> = ({ post }) => {
  const { content } = post.fields

  return (
    <div className='mx-auto prose'>
      <RichText content={content} />
    </div>
  )
}

