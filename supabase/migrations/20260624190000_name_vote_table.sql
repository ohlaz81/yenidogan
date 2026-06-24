-- =============================================================================
-- NameVote: isim detay sayfalari icin anonim cihaz bazli begeni sistemi
-- =============================================================================
-- Not: Client dogrudan bu tabloya erismeyecek; oy yazma/okuma islemleri
-- server-side API tarafinda service role Supabase client ile yapilacak.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public."NameVote" (
  id text PRIMARY KEY,
  "nameId" text NOT NULL REFERENCES public."Name"(id) ON DELETE CASCADE,
  "deviceKeyHash" text NOT NULL,
  vote text NOT NULL CHECK (vote IN ('LIKE', 'DISLIKE')),
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("nameId", "deviceKeyHash")
);

CREATE INDEX IF NOT EXISTS "NameVote_nameId_idx" ON public."NameVote"("nameId");
CREATE INDEX IF NOT EXISTS "NameVote_vote_idx" ON public."NameVote"(vote);

CREATE OR REPLACE FUNCTION public."setNameVoteUpdatedAt"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS "NameVote_setUpdatedAt" ON public."NameVote";
CREATE TRIGGER "NameVote_setUpdatedAt"
BEFORE UPDATE ON public."NameVote"
FOR EACH ROW
EXECUTE FUNCTION public."setNameVoteUpdatedAt"();

ALTER TABLE public."NameVote" ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public."NameVote" IS 'Isim begeni/begenmeme oylari; anonim cihaz hash ile tekil oy tutulur.';
COMMENT ON COLUMN public."NameVote"."deviceKeyHash" IS 'Server tarafinda hashlenmis anonim cihaz anahtari.';
COMMENT ON COLUMN public."NameVote".vote IS 'LIKE veya DISLIKE.';
