import type { Gender } from "@/types/database";
import { nameDisplayTextClass } from "@/lib/name-gender-styles";

export function Stars({ value, max = 5, gender }: { value: number; max?: number; gender?: Gender }) {
  const v = Math.min(max, Math.max(0, Math.round(value)));
  const tone = gender != null ? nameDisplayTextClass(gender) : "text-accent-pink";
  return (
    <span className={`inline-flex gap-0.5 ${tone}`} aria-label={`${v} / ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i}>{i < v ? "★" : "☆"}</span>
      ))}
    </span>
  );
}
