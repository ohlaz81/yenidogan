-- =============================================================================
-- Bootstrap: public uygulama tablolari (admin icerik, iletisim, bulten, isimler)
-- =============================================================================
-- Bu migration, canli veritabaninda sadece "User" ve "UserPermission" oldugu
-- durumda eksik tablolari guvenli sekilde (IF NOT EXISTS) olusturur.
-- Idempotenttir: tekrar calistirilabilir.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public."MediaAsset" (
  id text PRIMARY KEY,
  url text NOT NULL,
  alt text,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public."Name" (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  "displayName" text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('GIRL', 'BOY', 'UNISEX')),
  meaning text NOT NULL,
  origin text NOT NULL,
  pronunciation text NOT NULL,
  popularity integer NOT NULL DEFAULT 1 CHECK (popularity >= 1 AND popularity <= 5),
  "popularScore" integer NOT NULL DEFAULT 0 CHECK ("popularScore" >= 0),
  "inQuran" boolean NOT NULL DEFAULT false,
  style text NOT NULL CHECK (style IN ('MODERN', 'CLASSIC', 'RARE', 'POPULAR')),
  "isShort" boolean NOT NULL DEFAULT false,
  "beautifulMeaning" boolean NOT NULL DEFAULT false,
  "firstLetter" text NOT NULL,
  intro text,
  traits jsonb,
  published boolean NOT NULL DEFAULT true,
  "imageId" text REFERENCES public."MediaAsset"(id) ON DELETE SET NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "Name_published_idx" ON public."Name"(published);
CREATE INDEX IF NOT EXISTS "Name_gender_idx" ON public."Name"(gender);
CREATE INDEX IF NOT EXISTS "Name_firstLetter_idx" ON public."Name"("firstLetter");
CREATE INDEX IF NOT EXISTS "Name_popularScore_idx" ON public."Name"("popularScore" DESC);

CREATE TABLE IF NOT EXISTS public."SimilarName" (
  id text PRIMARY KEY,
  "sourceId" text NOT NULL REFERENCES public."Name"(id) ON DELETE CASCADE,
  "targetId" text NOT NULL REFERENCES public."Name"(id) ON DELETE CASCADE,
  UNIQUE ("sourceId", "targetId")
);

CREATE INDEX IF NOT EXISTS "SimilarName_sourceId_idx" ON public."SimilarName"("sourceId");
CREATE INDEX IF NOT EXISTS "SimilarName_targetId_idx" ON public."SimilarName"("targetId");

CREATE TABLE IF NOT EXISTS public."HomeFeaturedName" (
  id text PRIMARY KEY,
  "column" text NOT NULL CHECK ("column" IN ('girl', 'boy')),
  position integer NOT NULL CHECK (position >= 0),
  "nameId" text REFERENCES public."Name"(id) ON DELETE SET NULL,
  UNIQUE ("column", position)
);

CREATE INDEX IF NOT EXISTS "HomeFeaturedName_nameId_idx" ON public."HomeFeaturedName"("nameId");

CREATE TABLE IF NOT EXISTS public."GuideArticle" (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body text NOT NULL,
  "coverId" text REFERENCES public."MediaAsset"(id) ON DELETE SET NULL,
  published boolean NOT NULL DEFAULT false,
  "publishedAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "GuideArticle_published_idx" ON public."GuideArticle"(published);
CREATE INDEX IF NOT EXISTS "GuideArticle_updatedAt_idx" ON public."GuideArticle"("updatedAt" DESC);

CREATE TABLE IF NOT EXISTS public."FAQ" (
  id text PRIMARY KEY,
  "sortOrder" integer NOT NULL DEFAULT 0,
  question text NOT NULL,
  answer text NOT NULL
);

CREATE INDEX IF NOT EXISTS "FAQ_sortOrder_idx" ON public."FAQ"("sortOrder" ASC);

CREATE TABLE IF NOT EXISTS public."ContactMessage" (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  read boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS "ContactMessage_read_createdAt_idx"
  ON public."ContactMessage"(read ASC, "createdAt" DESC);

CREATE TABLE IF NOT EXISTS public."NewsletterSubscriber" (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

-- Admin ana sayfa slot guncellemeleri icin temel satirlar (idempotent)
INSERT INTO public."HomeFeaturedName" (id, "column", position, "nameId")
SELECT x.id, x.col, x.pos, NULL
FROM (
  VALUES
    ('slot_girl_0', 'girl', 0),
    ('slot_girl_1', 'girl', 1),
    ('slot_girl_2', 'girl', 2),
    ('slot_girl_3', 'girl', 3),
    ('slot_girl_4', 'girl', 4),
    ('slot_boy_0', 'boy', 0),
    ('slot_boy_1', 'boy', 1),
    ('slot_boy_2', 'boy', 2),
    ('slot_boy_3', 'boy', 3),
    ('slot_boy_4', 'boy', 4)
) AS x(id, col, pos)
ON CONFLICT ("column", position) DO NOTHING;

COMMENT ON TABLE public."Name" IS 'Isim kayitlari (admin CRUD + listeleme filtreleri).';
COMMENT ON TABLE public."GuideArticle" IS 'Isim rehberi icerikleri.';
COMMENT ON TABLE public."FAQ" IS 'Sik sorulan sorular.';
COMMENT ON TABLE public."MediaAsset" IS 'Yuklenen medya varliklari.';
COMMENT ON TABLE public."ContactMessage" IS 'Iletisim formundan gelen mesajlar.';
COMMENT ON TABLE public."NewsletterSubscriber" IS 'Bulten aboneleri.';
