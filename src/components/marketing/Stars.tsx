export function Stars({ value, max = 5 }: { value: number; max?: number }) {
  const v = Math.min(max, Math.max(0, Math.round(value)));
  return (
    <span className="inline-flex gap-0.5 text-accent-pink" aria-label={`${v} / ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i}>{i < v ? "★" : "☆"}</span>
      ))}
    </span>
  );
}
