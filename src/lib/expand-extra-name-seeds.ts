import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { Gender, NameStyle } from "@/types/database";

const STYLES: NameStyle[] = ["MODERN", "CLASSIC", "POPULAR", "RARE"];

const KURAN_SLUGS = new Set(
  [
    "yusuf",
    "meryem",
    "elif",
    "hafsa",
    "musa",
    "harun",
    "ismail",
    "ibrahim",
    "adem",
    "yunus",
    "yahya",
    "isa",
    "nuh",
    "meryem",
    "zeynep",
    "ahmet",
    "ali",
    "hasan",
    "omer",
  ].map((s) => s.toLowerCase()),
);

function trSlugify(displayName: string): string {
  const t = displayName
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
  return t
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "")
    .replaceAll(/--+/g, "-");
}

const MEANING = (d: string, o: string, i: number) => {
  const t = i % 5;
  if (t === 0) return `${d}, ${o} kökenli; Türkiye’de aileler arasında sık tercih edilen bir tınıdır.`;
  if (t === 1) return `${d}, sade tını ve olumlu çağrışımlarla dikkat çeken, ${o} kökenlere sık rastlanan isimlerdendir.`;
  if (t === 2) return `${d}, farklı kuşaklarda duyulan, ${o} ile ilişkili söyleyişe sahip bebek isimlerinden biridir.`;
  if (t === 3) return `Anlamı aileden aileye değişen ${d} ismi, ${o} edebi çevrelerde bilinen bir tınıyı yansıtır.`;
  return `${d}, günümüzde bebek isim rehberlerinde yer alan, ${o} kökeniyle eşleşen bir tercihtir.`;
};

const ORIG = ["Arapça", "Türkçe", "Farsça", "Eski Türk", "Osmanlıca"];

export function expandExtraNameSeeds(core: BabyNameSeed[], boyPipe: string, girlPipe: string): BabyNameSeed[] {
  const taken = new Set<string>(core.map((c) => c.slug));
  const out: BabyNameSeed[] = [];
  let n = 30;
  const push = (rawName: string, gender: Gender) => {
    const displayName = rawName.trim();
    if (!displayName) return;
    const dNorm = displayName.toLocaleLowerCase("tr-TR");
    if (core.some((c) => c.gender === gender && c.displayName.trim().toLocaleLowerCase("tr-TR") === dNorm)) return;
    let slug = trSlugify(displayName);
    if (!slug) return;
    let u = 2;
    while (taken.has(slug)) {
      slug = `${trSlugify(displayName)}-${u++}`;
    }
    taken.add(slug);
    const o = ORIG[out.length % ORIG.length];
    const st = STYLES[out.length % STYLES.length];
    out.push({
      id: `n-${n++}`,
      slug,
      displayName,
      gender,
      meaning: MEANING(displayName, o, out.length),
      origin: o,
      pronunciation: displayName.replaceAll(/\s+/g, " ").slice(0, 48),
      popularity: Math.min(4.8, 2.6 + (out.length % 23) / 20),
      popularScore: 88 - (out.length % 55),
      inQuran: KURAN_SLUGS.has(slug),
      style: st,
      isShort: displayName.length <= 5,
      beautifulMeaning: out.length % 2 === 0,
      intro: `${displayName} için aile tercihlerine uygun, dengeli tını arayanlara açık bir isimdir.`,
      traits: ["Dengeli", "Akılda kalıcı", "Açık tını"],
      similar: [],
    } as BabyNameSeed);
  };
  for (const line of boyPipe.split(/[|\n]/)) push(line, "BOY");
  for (const line of girlPipe.split(/[|\n]/)) push(line, "GIRL");
  return out;
}
