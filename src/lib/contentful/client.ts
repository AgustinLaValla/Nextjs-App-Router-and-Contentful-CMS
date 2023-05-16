import { createClient } from "contentful";

export const client = createClient({
  space: process.env.SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string
});

export const previewClient = createClient({
  host: 'preview.contentful.com',
  space: process.env.SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string
});