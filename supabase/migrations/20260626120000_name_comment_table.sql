-- =============================================================================
-- NameComment: isim detay sayfalari icin onayli yorum altyapisi
-- =============================================================================
-- Not: Client dogrudan bu tabloya erismeyecek; yorum yazma/okuma islemleri
-- ileride server-side API tarafinda service role Supabase client ile yapilacak.
-- RLS aktif ve policy yok: anon/auth istemciler icin dogrudan erisim kapali.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public."NameComment" (
  id text PRIMARY KEY,
  "nameId" text NOT NULL REFERENCES public."Name"(id) ON DELETE CASCADE,
  "fullName" text NOT NULL,
  "displayName" text NOT NULL,
  comment text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "NameComment_nameId_idx" ON public."NameComment"("nameId");
CREATE INDEX IF NOT EXISTS "NameComment_status_idx" ON public."NameComment"(status);

CREATE OR REPLACE FUNCTION public."setNameCommentUpdatedAt"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS "NameComment_setUpdatedAt" ON public."NameComment";
CREATE TRIGGER "NameComment_setUpdatedAt"
BEFORE UPDATE ON public."NameComment"
FOR EACH ROW
EXECUTE FUNCTION public."setNameCommentUpdatedAt"();

ALTER TABLE public."NameComment" ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public."NameComment" IS 'Isim detay sayfalari icin onayli yorumlar; yayin icin APPROVED status gerekir.';
COMMENT ON COLUMN public."NameComment"."displayName" IS 'Sitede gosterilecek maskelenmis ad; ornek: Murat O......';
COMMENT ON COLUMN public."NameComment".status IS 'PENDING, APPROVED veya REJECTED.';
