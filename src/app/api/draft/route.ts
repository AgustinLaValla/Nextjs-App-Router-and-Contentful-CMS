import { draftMode } from "next/headers";
import { redirect } from 'next/navigation';
import { PostSkeleton } from "@/interfaces";
import { previewClient } from "@/lib/contentful/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug)
    return new Response('Invalid slug', { status: 401 })

  const { items } = await previewClient.getEntries<PostSkeleton>({
    content_type: 'post',
    "fields.slug": (slug as string)
  });

  const [post] = items;
  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  draftMode().enable();

  redirect(`/posts/${post.fields.slug}`);

};