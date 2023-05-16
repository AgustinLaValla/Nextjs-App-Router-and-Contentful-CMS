import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import { ContentfulImage } from './ContentfulImage';
import { Document as ContentfulDocument, Block, Inline, Text } from '@contentful/rich-text-types/dist/types/types';

type MarkContentProps = {
  children: React.ReactNode
}

type NodeContentProps = {
  node: Block | Inline
}

const Code: React.FC<MarkContentProps> = ({ children }) => (
  <code>{children}</code>
);

const EntryHyperLink: React.FC<NodeContentProps> = ({ node }) => {
  if (node.data?.target?.sys?.contentType?.sys?.id === 'post') {
    return (
      <Link href={`/posts/${node.data.target.fields.slug}`}>
        {node.data.target.fields.title}
      </Link>
    )
  }
  return null
}

const HyperLink: React.FC<NodeContentProps> = ({ node }) => {
  const text = node.content.find(item => item.nodeType === 'text') as Text
  return (
    <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
      {text.value}
    </a>
  )
}

const EmbeddedEntry: React.FC<NodeContentProps> = ({ node }) => {
  if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
    return (
      <iframe
        height='400'
        width='100%'
        src={node.data.target.fields.embedUrl}
        title={node.data.target.fields.title}
        allowFullScreen={true}
      />
    )
  }
  return null;
}

const EmbeddedAsset: React.FC<NodeContentProps> = ({ node }) =>
  <ContentfulImage
    src={node.data.target.fields.file.url}
    height={node.data.target.fields.file.details.image.height}
    width={node.data.target.fields.file.details.image.width}
    alt={node.data.target.fields.title}
    className='h-20 w-20' />


const options: Options = {
  renderMark: {
    [MARKS.CODE]: (text) => <Code>{text}</Code>,
    [MARKS.BOLD]: (text) => <span className='font-bold'>{text}</span>
  },
  renderNode: { 
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (
        node.content.find((item: any) =>
          item.marks?.find((mark: any) => mark.type === 'code')
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        )
      }

      return <p>{children}</p>
    },
    [INLINES.ENTRY_HYPERLINK]: node => <EntryHyperLink node={node} />,
    [INLINES.HYPERLINK]: node => <HyperLink node={node} />,
    [BLOCKS.EMBEDDED_ENTRY]: node => <EmbeddedEntry node={node} />,
    [BLOCKS.EMBEDDED_ASSET]: node => <EmbeddedAsset node={node} />
  }
}

type Props = { content: ContentfulDocument }

export const RichText = ({ content }: Props) => {
  return <>{documentToReactComponents(content, options)}</>
}