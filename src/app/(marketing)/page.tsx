import { getSupabase } from "@/lib/supabase/admin";
import { getHomePageData } from "@/lib/queries/home";
import { HomePageView } from "@/components/marketing/HomePageView";
import type { FAQ } from "@/types/database";

export default async function HomePage() {
  const s = getSupabase();
  const [data, fr] = await Promise.all([
    getHomePageData(),
    s.from("FAQ").select("*").order("sortOrder", { ascending: true }),
  ]);
  if (fr.error) throw fr.error;
  const faqs = (fr.data ?? []) as FAQ[];
  return <HomePageView data={data} faqs={faqs} />;
}
