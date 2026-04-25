import Image from "next/image";

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
  const mergedClassName = `site-organic-image ${className ?? ""}`.trim();
  const isSvg = src.endsWith(".svg");
  if (isSvg) {
    const cls = fill
      ? `absolute inset-0 h-full w-full object-cover ${mergedClassName}`.trim()
      : mergedClassName;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={cls} />;
  }
  if (fill) {
    return <Image src={src} alt={alt} fill className={mergedClassName} sizes={sizes} />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={mergedClassName}
      sizes={sizes}
    />
  );
}
