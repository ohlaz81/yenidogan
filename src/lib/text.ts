export function firstLetterTr(displayName: string) {
  const t = displayName.trim();
  if (!t) return "";
  return t[0].toLocaleUpperCase("tr-TR");
}
