'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface CustomImageProps extends ImageProps {
  key?: string;
}

const isValidImageSrc = (src: string): boolean => {
  // Trim trailing whitespace
  const trimmed = src.trim();

  // Reject if empty, not a string, or contains invalid characters
  if (!trimmed || /\s/.test(trimmed) || !/\.(jpg|jpeg|png|webp|svg|gif)$/i.test(trimmed)) {
    return false;
  }

  // Accept relative or absolute URLs
  try {
    new URL(trimmed, 'http://localhost'); // Local fallback base
    return true;
  } catch {
    return false;
  }
};

const NextImage = ({ src, alt, ...rest }: CustomImageProps) => {
  const fallbackSrc = '/images/placeholderImage.png';

  const [imgSrc, setImgSrc] = useState(() => {
    if (typeof src === 'string' && isValidImageSrc(src)) {
      return src.trim();
    }
    return fallbackSrc;
  });

  useEffect(() => {
    if (typeof src === 'string' && isValidImageSrc(src)) {
      setImgSrc(src.trim());
    } else {
      setImgSrc(fallbackSrc);
    }
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      {...rest}
      width={rest.width ?? 300}
      height={rest.height ?? 300}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};

export default NextImage;
