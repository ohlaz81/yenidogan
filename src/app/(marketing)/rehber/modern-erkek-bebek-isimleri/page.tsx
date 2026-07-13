import type { Metadata } from "next";
import {
  ModernNamesGuidePage,
  modernGuideMetadata,
} from "@/components/marketing/guides/ModernNamesGuidePage";
import { modernBoyGuide } from "@/data/modern-name-guides";

export async function generateMetadata(): Promise<Metadata> {
  return modernGuideMetadata(modernBoyGuide);
}

export default function ModernErkekBebekIsimleriPage() {
  return <ModernNamesGuidePage guide={modernBoyGuide} />;
}
