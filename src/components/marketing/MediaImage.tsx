"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useState } from "react";

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
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const resolvedSrc = failedSrc === src ? fallbackSrc : src;

  const hasNoOrganic = (className ?? "").includes("no-organic");
  const mergedClassName = `${hasNoOrganic ? "" : "site-organic-image"} ${className ?? ""}`.trim();
  const isSvg = resolvedSrc.endsWith(".svg");
  const isRemote = /^https?:\/\//i.test(resolvedSrc);
  if (isSvg || isRemote) {
    const cls = fill
      ? `absolute inset-0 h-full w-full object-cover ${mergedClassName}`.trim()
      : mergedClassName;
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={cls}
        onError={() => {
          if (resolvedSrc !== fallbackSrc) setFailedSrc(src);
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
          if (resolvedSrc !== fallbackSrc) setFailedSrc(src);
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
        if (resolvedSrc !== fallbackSrc) setFailedSrc(src);
      }}
    />
  );
}
