export function firstLetterTr(displayName: string) {
  const t = displayName.trim();
  if (!t) return "";
  return t[0].toLocaleUpperCase("tr-TR");
}

/** URL veya rota parçasından Türkçe harf (ör. `harf` sorgu parametresi). */
export function normalizeTrLetter(harf: string) {
  try {
    return decodeURIComponent(harf).trim().toLocaleUpperCase("tr-TR");
  } catch {
    return harf.trim().toLocaleUpperCase("tr-TR");
  }
}
