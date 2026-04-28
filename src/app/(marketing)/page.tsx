import { getHomePageData } from "@/lib/queries/home";
import { HomePageView } from "@/components/marketing/HomePageView";
import { STATIC_FAQS } from "@/data/static-faqs";

export default async function HomePage() {
  const data = await getHomePageData();
  return <HomePageView data={data} faqs={STATIC_FAQS} />;
}
