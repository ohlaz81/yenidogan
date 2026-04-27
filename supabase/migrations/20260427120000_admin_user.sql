-- =============================================================================
-- İlk yönetici kullanıcı + "User" tablosu (NextAuth credentials, admin paneli)
-- =============================================================================
-- Uygulama: Supabase SQL Editor veya `supabase db push` / `psql -f ...`
--
-- Varsayılan giriş (YEREL / İLK KURULUM — üretimde mutlaka değiştirin):
--   E-posta: admin@yenidogan.net
--   Şifre:   YenidoganAdmin2026!
--
-- Şifre, bcryptjs (Node) ile üretilmiş sabit hash’tir ($2b$10$...).
-- =============================================================================

CREATE TABLE IF NOT EXISTS public."User" (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  "passwordHash" text NOT NULL,
  name text,
  role text NOT NULL DEFAULT 'ADMIN' CHECK (role = 'ADMIN'),
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "User_email_idx" ON public."User" (email);

COMMENT ON TABLE public."User" IS 'Admin girişi (NextAuth credentials); bcrypt hash passwordHash.';

-- Aynı e-posta varsa şifreyi bu seed ile günceller (yeniden kurulum).
INSERT INTO public."User" (id, email, "passwordHash", name, role, "createdAt", "updatedAt")
VALUES (
  'seed_admin_yenidogan',
  'admin@yenidogan.net',
  '$2b$10$lEJlqY3217GnMjUjevTjGOun4olvbIW86V7F15/ggn04SAo6whzj6',
  'Site yöneticisi',
  'ADMIN',
  now(),
  now()
)
ON CONFLICT (email) DO UPDATE SET
  "passwordHash" = EXCLUDED."passwordHash",
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  "updatedAt" = now();
