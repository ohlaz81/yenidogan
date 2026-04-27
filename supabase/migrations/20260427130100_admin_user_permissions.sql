-- =============================================================================
-- Admin ince yetkiler: kullanıcı başına izin satırları
-- =============================================================================
-- Uygulama sabitleri (src/lib/admin-permissions.ts ile aynı olmalı):
--   admin.names          → İsim listesi, yeni isim, düzenleme, silme
--   admin.contact        → İletişim mesajları (okuma / okundu işaretleme)
--   admin.home_featured  → Ana sayfa öne çıkan kız/erkek slotları (popüler vitrin)
--   admin.content        → Medya, isim rehberi, SSS/FAQ
--   admin.about          → Hakkımızda vb. site metinleri (ileride SiteSetting / CMS)
--
-- Bu migration, mevcut TÜM "User" satırlarına yukarıdaki izinleri ekler (idempotent).
-- Yeni personel için: INSERT ile sadece ihtiyaç duyulan permission satırlarını ekleyin.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public."UserPermission" (
  "userId" text NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
  permission text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("userId", permission)
);

CREATE INDEX IF NOT EXISTS "UserPermission_userId_idx" ON public."UserPermission" ("userId");

COMMENT ON TABLE public."UserPermission" IS 'Admin paneli izinleri; JWT yerine sunucuda UserPermission sorgulanır.';

INSERT INTO public."UserPermission" ("userId", permission)
SELECT u.id, p.permission
FROM public."User" AS u
CROSS JOIN (
  VALUES
    ('admin.names'),
    ('admin.contact'),
    ('admin.home_featured'),
    ('admin.content'),
    ('admin.about')
) AS p(permission)
ON CONFLICT ("userId", permission) DO NOTHING;
