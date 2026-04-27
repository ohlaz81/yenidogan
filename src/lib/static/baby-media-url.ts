/** `public/media/babies` altındaki dosya adı (ör. `baby (1).jpeg`) için güvenli URL. */
export function babyMediaPublicUrl(fileName: string) {
  return `/media/babies/${encodeURIComponent(fileName)}`;
}
