import { EntryFieldTypes, Entry } from 'contentful'

export type AuthorEntrySkeleton = {
  // contentTypeId: 'author'
  fields: {
    name: EntryFieldTypes.Text,
    picture: EntryFieldTypes.AssetLink
  }
}

export interface PostSkeleton {
  contentTypeId: 'post',
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    excerpt: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    author: any,
    coverImage: any
  }
}

export type Post = Entry<PostSkeleton, undefined, string>