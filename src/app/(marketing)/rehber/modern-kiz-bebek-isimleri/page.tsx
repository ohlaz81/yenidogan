import type { Metadata } from "next";
import {
  ModernNamesGuidePage,
  modernGuideMetadata,
} from "@/components/marketing/guides/ModernNamesGuidePage";
import { modernGirlGuide } from "@/data/modern-name-guides";

export async function generateMetadata(): Promise<Metadata> {
  return modernGuideMetadata(modernGirlGuide);
}

export default function ModernKizBebekIsimleriPage() {
  return <ModernNamesGuidePage guide={modernGirlGuide} />;
}
