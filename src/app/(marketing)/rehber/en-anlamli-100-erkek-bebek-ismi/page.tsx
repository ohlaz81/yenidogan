import type { Metadata } from "next";
import {
  MeaningfulNamesGuidePage,
  meaningfulGuideMetadata,
} from "@/components/marketing/guides/MeaningfulNamesGuidePage";
import { meaningfulBoyGuide } from "@/data/meaningful-name-guides";

export async function generateMetadata(): Promise<Metadata> {
  return meaningfulGuideMetadata(meaningfulBoyGuide);
}

export default function EnAnlamli100ErkekBebekIsmiPage() {
  return <MeaningfulNamesGuidePage guide={meaningfulBoyGuide} />;
}
