'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface CustomImageProps extends ImageProps {

}

const NextImage = ({ src, alt, ...rest }: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const fallbackSrc = '/images/placeholderImage.png'
  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      {...rest}
      width={rest.width ?? 300}
      height={rest?.height ?? 300}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};

export default NextImage;
