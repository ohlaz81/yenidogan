import type { Metadata } from "next";
import {
  MeaningfulNamesGuidePage,
  meaningfulGuideMetadata,
} from "@/components/marketing/guides/MeaningfulNamesGuidePage";
import { meaningfulGirlGuide } from "@/data/meaningful-name-guides";

export async function generateMetadata(): Promise<Metadata> {
  return meaningfulGuideMetadata(meaningfulGirlGuide);
}

export default function EnAnlamli100KizBebekIsmiPage() {
  return <MeaningfulNamesGuidePage guide={meaningfulGirlGuide} />;
}
