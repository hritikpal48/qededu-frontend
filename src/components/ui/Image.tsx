"use client";

<<<<<<< HEAD
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
const customLoader = ({ src }: { src: string }) => src;
=======
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
>>>>>>> 517095bb465b98282f25504d42808b68775aff85

interface CustomImageProps extends ImageProps {
  key?: string;
}

const customLoader = ({ src }: { src: string }) => {
  return src.startsWith("http") ? src : `${src}`;
};

const isValidImageSrc = (src: string): boolean => {
  // Trim trailing whitespace
  const trimmed = src.trim();

  // Reject if empty, not a string, or contains invalid characters
  if (
    !trimmed ||
    /\s/.test(trimmed) ||
    !/\.(jpg|jpeg|png|webp|svg|gif)$/i.test(trimmed)
  ) {
    return false;
  }

  // Accept relative or absolute URLs
  try {
    new URL(trimmed, "http://localhost"); // Local fallback base
    return true;
  } catch {
    return false;
  }
};

const NextImage = ({ src, alt, ...rest }: CustomImageProps) => {
  const fallbackSrc = "/images/placeholderImage.png";

<<<<<<< HEAD
  const [imgSrc, setImgSrc] = useState<string | StaticImport>(() => {
    if (typeof src === "string" && isValidImageSrc(src)) {
=======
  const [imgSrc, setImgSrc] = useState(() => {
    if (typeof src === 'string' && isValidImageSrc(src)) {
>>>>>>> 517095bb465b98282f25504d42808b68775aff85
      return src.trim();
    }
    return fallbackSrc;
  });

  useEffect(() => {
<<<<<<< HEAD
    if (typeof src === "string") {
      if (typeof src === "string" && isValidImageSrc(src)) {
        setImgSrc(src.trim());
      } else {
        setImgSrc(fallbackSrc);
      }
    } else {
      setImgSrc(src);
=======
    if (typeof src === 'string' && isValidImageSrc(src)) {
      setImgSrc(src.trim());
    } else {
      setImgSrc(fallbackSrc);
>>>>>>> 517095bb465b98282f25504d42808b68775aff85
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
      loader={customLoader}
    />
  );
};

export default NextImage;
