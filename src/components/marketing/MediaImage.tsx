 "use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function MediaImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}) {
  const fallbackSrc = "/media/placeholder.svg";
  const [resolvedSrc, setResolvedSrc] = useState(src);
  useEffect(() => {
    setResolvedSrc(src);
  }, [src]);

  const hasNoOrganic = (className ?? "").includes("no-organic");
  const mergedClassName = `${hasNoOrganic ? "" : "site-organic-image"} ${className ?? ""}`.trim();
  const isSvg = resolvedSrc.endsWith(".svg");
  const isRemote = /^https?:\/\//i.test(resolvedSrc);
  if (isSvg || isRemote) {
    const cls = fill
      ? `absolute inset-0 h-full w-full object-cover ${mergedClassName}`.trim()
      : mergedClassName;
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={cls}
        onError={() => {
          if (resolvedSrc !== fallbackSrc) setResolvedSrc(fallbackSrc);
        }}
      />
    );
  }
  if (fill) {
    return (
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        className={mergedClassName}
        sizes={sizes}
        onError={() => {
          if (resolvedSrc !== fallbackSrc) setResolvedSrc(fallbackSrc);
        }}
      />
    );
  }
  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={mergedClassName}
      sizes={sizes}
      onError={() => {
        if (resolvedSrc !== fallbackSrc) setResolvedSrc(fallbackSrc);
      }}
    />
  );
}
