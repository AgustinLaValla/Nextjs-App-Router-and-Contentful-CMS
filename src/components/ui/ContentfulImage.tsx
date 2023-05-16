import Image from 'next/image'

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  fill?: boolean;
  className?: string;
}

export const ContentfulImage = (props: Props) => {
  let { src, width, quality, alt, height, fill, ...rest } = props;

  if (!src.startsWith('http:') || !src.startsWith('http:')) {
    src = `https:${src}`;
  }

  return <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    quality={quality || 75}
    fill={fill}
    {...rest}
  />
}