"use client";

export function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
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
