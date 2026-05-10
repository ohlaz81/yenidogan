-- Name.slug benzersizliği: bootstrap (20260428191500) tabloda genelde zaten vardır.
-- Eski kurulumlarda eksikse eklenir; varsa hiçbir şey yapılmaz (EXCEPTION yerine IF — 42P07 önlenir).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE n.nspname = 'public'
      AND t.relname = 'Name'
      AND c.conname = 'Name_slug_key'
      AND c.contype = 'u'
  ) THEN
    ALTER TABLE public."Name" ADD CONSTRAINT "Name_slug_key" UNIQUE (slug);
  END IF;
END $$;
