import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  draftMode().disable();
  // redirect('/posts');
  return new Response(null, { status: 307, headers: { location: '/posts' } })
}