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
        className="inline-flex min-h-[84px] min-w-0 flex-1 flex-col items-center justify-center gap-1 border-0 bg-transparent px-1.5 py-2 text-center text-[11px] font-semibold leading-tight text-primary transition hover:bg-accent-pink-soft/40 sm:min-h-11 sm:w-auto sm:flex-none sm:flex-row sm:gap-2 sm:rounded-2xl sm:border sm:border-primary sm:bg-white sm:px-4 sm:text-xs sm:hover:bg-white/70"
      >
        <span className="text-lg leading-none" aria-hidden="true">
          🔗
        </span>
        <span className="max-w-full whitespace-normal leading-tight">Paylaş</span>
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
