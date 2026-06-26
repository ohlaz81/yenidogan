"use client";

export function ShareButton({
  title,
  text,
  url,
  variant = "default",
}: {
  title: string;
  text: string;
  url: string;
  variant?: "default" | "action";
}) {
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Bağlantı panoya kopyalandı.");
      }
    } catch {
      /* kullanıcı iptal */
    }
  }

  if (variant === "action") {
    return (
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-[72px] w-full flex-col items-center justify-center gap-1 rounded-2xl border border-primary bg-white px-3 py-2 text-center text-xs font-semibold text-primary transition hover:bg-white/70 sm:min-h-11 sm:w-auto sm:flex-row sm:gap-2 sm:px-4"
      >
        <span className="text-lg leading-none" aria-hidden="true">
          🔗
        </span>
        <span className="leading-tight">Paylaş</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-2xl border border-primary px-4 py-2 text-xs font-semibold text-primary"
    >
      Paylaş
    </button>
  );
}
