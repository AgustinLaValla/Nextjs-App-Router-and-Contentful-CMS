import { PostCard } from '@/components';
import React from 'react'
import { PostSkeleton } from '@/interfaces';
import { client } from '@/lib';

export const revalidate = 60;

const PostsPage = async () => {
  const { items } = await client.getEntries<PostSkeleton>({ content_type: 'post' });

  return (
    <section className="section">
      <div className="container">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
          {
            items.map(post => <PostCard post={post} />)
          }
        </ul>
      </div>
    </section>
  )
}



export default PostsPage;
