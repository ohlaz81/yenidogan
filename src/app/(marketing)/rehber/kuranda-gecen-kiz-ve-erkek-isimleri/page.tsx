import type { Metadata } from "next";
import {
  QuranNamesGuidePage,
  quranNamesGuideMetadata,
} from "@/components/marketing/guides/QuranNamesGuidePage";

export function generateMetadata(): Metadata {
  return quranNamesGuideMetadata();
}

export default function KurandaGecenKizVeErkekIsimleriPage() {
  return <QuranNamesGuidePage />;
}
