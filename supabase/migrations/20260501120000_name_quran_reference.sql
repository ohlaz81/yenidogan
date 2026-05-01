-- Kur'an'da geçen isimler için sure/ayet veya kısa açıklama (admin düzenler).
ALTER TABLE public."Name"
  ADD COLUMN IF NOT EXISTS "quranReference" text;

COMMENT ON COLUMN public."Name"."quranReference" IS 'Kur''an''da geçiş: kısa not (ör. sure/ayet); inQuran true iken doldurulur.';
