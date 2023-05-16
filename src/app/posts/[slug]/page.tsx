import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { client } from '@/lib';
import { PostSkeleton } from '@/interfaces';
import { previewClient } from '@/lib/contentful/client';
import { PostBody, PostHeader, PreviewAlert } from '@/components';

export const revalidate = 60;

export async function generateStaticParams() {
  const { items } = await client.getEntries<PostSkeleton>({ content_type: 'post' });

  return items.map(post => ({ slug: post.fields.slug }));
}

type Props = {
  params: { slug: string },
  searchParams: { [key: string]: string }
}

export const PostPage = async ({ params }: Props) => {
  const { isEnabled: isDraft } = draftMode();

  let api = isDraft ? previewClient : client;

  const { items } = await api.getEntries<PostSkeleton>({
    content_type: 'post',
    'fields.slug': params.slug
  });

  const [post] = items;
  if (!post) redirect('/posts');

  return (
    <section className='section'>
      {isDraft && <PreviewAlert />}
      <div className='container'>
        <article className='prose mx-auto'>
          <>
            <PostHeader post={post} />
            <PostBody post={post} />
          </>
        </article>
      </div>
    </section>
  )
}

export default PostPage;