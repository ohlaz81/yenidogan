import { getSupabase } from "@/lib/supabase/admin";
import { isMissingTableError, postgrestToError } from "@/lib/supabase/errors";
import { getHomePageData } from "@/lib/queries/home";
import { HomePageView } from "@/components/marketing/HomePageView";
import type { FAQ } from "@/types/database";

export default async function HomePage() {
  const s = getSupabase();
  const [data, fr] = await Promise.all([
    getHomePageData(),
    s.from("FAQ").select("*").order("sortOrder", { ascending: true }),
  ]);
  const faqs: FAQ[] = (() => {
    if (fr.error) {
      if (isMissingTableError(fr.error)) return [];
      throw postgrestToError(fr.error, "Ana sayfa: FAQ sorgusu");
    }
    return (fr.data ?? []) as FAQ[];
  })();
  return <HomePageView data={data} faqs={faqs} />;
}
