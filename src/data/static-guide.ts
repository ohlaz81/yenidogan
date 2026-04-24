import type { GuideArticle, MediaAsset } from "@/types/database";
import { DEFAULT_NAME_MEDIA } from "@/lib/static/default-name-media";

const T = "2020-01-20T00:00:00.000Z";

export type GuideWithCover = GuideArticle & { cover: MediaAsset | null };

const cover = () => DEFAULT_NAME_MEDIA;

const articles: GuideWithCover[] = [
  {
    id: "g-1",
    slug: "bebek-ismi-nasil-secilir",
    title: "Bebek ismi nasıl seçilir?",
    excerpt: "Aile dinamiği, okunuş ve anlam arasında denge kurmanın yolları.",
    body: `<h2>Ön hazırlık</h2>
<p>Liste yapın, birlikte dinleyin, kısaltmaları ve imzayı test edin.</p>
<h2>Paylaşın</h2>
<p>İsim bir karar ağı ve duygudur: yakın çevreyle yürütülen açık diyalog süreci daha sağlıklı olur.</p>
<ul><li>Okunuşu net mi?</li><li>Anlam ve köken aile değerleriyle çelişmiyor mu?</li><li>İleride eş adı, ikinci isim, soyadı birlikte söyleyişe uyumlu mu?</li></ul>`,
    coverId: null,
    published: true,
    publishedAt: T,
    createdAt: T,
    updatedAt: T,
    cover: cover(),
  },
  {
    id: "g-2",
    slug: "isimlerin-anlamlari-neden-onemlidir",
    title: "İsimlerin anlamları neden önemlidir?",
    excerpt: "Duygusal yük, kültürel çağrı ve aile hikayesi açısından anlamı tarif etmek.",
    body: `<h2>İsim, bir tür davet</h2>
<p>Anlam; çocuğa ileri taşınan küçük bir söz ve hatıra olur. Bu yüzden kaynağı ve telaffuzunu birlikte değerlendirmek faydalıdır.</p>`,
    coverId: null,
    published: true,
    publishedAt: T,
    createdAt: T,
    updatedAt: T,
    cover: cover(),
  },
  {
    id: "g-3",
    slug: "modern-ve-benzersiz-isim-onerileri",
    title: "Modern ve farklı isim önerileri nereden başlar?",
    excerpt: "Tını, sade, ulusötesi ve söyleyiş dengesi; listeleri üretmekten çok, süzgeçle seçmek.",
    body: `<h2>Çeşitliliği açık tutun</h2>
<p>Küçük, akılda kalan, tekrarlarla boğulmayan isimlere ağırlık vermek, hem tınıyı hem bireysel hatırayı kuvvetlendirir.</p>`,
    coverId: null,
    published: true,
    publishedAt: T,
    createdAt: T,
    updatedAt: T,
    cover: cover(),
  },
  {
    id: "g-4",
    slug: "nadir-isimler-ve-bakilmasi-gerekenler",
    title: "Nadir isimler: nelere dikkat edilmeli?",
    excerpt: "Telaffuz, yazım, kayıt ekranları ve sosyal söyleyiş üzerine pratik notlar.",
    body: `<h2>Telaffuz ve imza</h2>
<p>Nadir, özel; ama bürokrasilerde, okul ve iş ortamında açıklanabilir tını, uzun vadede konfor sağlar.</p>`,
    coverId: null,
    published: true,
    publishedAt: T,
    createdAt: T,
    updatedAt: T,
    cover: cover(),
  },
];

export function getStaticGuides() {
  return articles;
}

export function getStaticGuideBySlug(slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}
