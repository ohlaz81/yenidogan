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
  const isSvg = src.endsWith(".svg");
  if (isSvg) {
    const cls = fill
      ? `absolute inset-0 h-full w-full object-cover ${className ?? ""}`.trim()
      : className;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={cls} />;
  }
  if (fill) {
    return <Image src={src} alt={alt} fill className={className} sizes={sizes} />;
  }
  return (
    <Image src={src} alt={alt} width={width ?? 400} height={height ?? 400} className={className} sizes={sizes} />
  );
}
