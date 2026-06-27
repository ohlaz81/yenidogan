const INSTAGRAM_URL = "https://www.instagram.com/yenidogannet/";

function InstagramIcon() {
  return (
    <span
      aria-hidden="true"
      className="grid h-16 w-16 shrink-0 place-items-center rounded-[22px] bg-[linear-gradient(135deg,#f9c05f_0%,#ee5b83_38%,#c744a8_68%,#7057d9_100%)] shadow-[0_18px_36px_rgba(199,68,168,0.24)] ring-1 ring-white/70 sm:h-20 sm:w-20"
    >
      <svg viewBox="0 0 32 32" className="h-9 w-9 text-white sm:h-11 sm:w-11" fill="none">
        <rect x="7.5" y="7.5" width="17" height="17" rx="5.2" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="16" cy="16" r="4.1" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="21.35" cy="10.95" r="1.25" fill="currentColor" />
      </svg>
    </span>
  );
}

export function InstagramFollowCard() {
  return (
    <section className="mt-8 overflow-hidden rounded-[24px] border border-pink-100/80 bg-white shadow-[0_18px_50px_rgba(75,42,127,0.10)]">
      <div className="relative flex flex-col items-center gap-5 px-5 py-6 text-center sm:px-6 lg:flex-row lg:items-center lg:gap-7 lg:px-7 lg:py-6 lg:text-left">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_20%,rgba(233,30,140,0.14),transparent_34%),linear-gradient(135deg,rgba(255,240,243,0.75),rgba(255,255,255,0)_58%)]" />

        <div className="relative">
          <InstagramIcon />
        </div>

        <div className="relative min-w-0 flex-1">
          <p className="font-display text-xl font-semibold text-primary sm:text-2xl">Yenidoğan.net Instagram</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted lg:mx-0">
            Yeni eklenen isimleri, isim rehberlerini, bebek isim önerilerini ve ilham veren içerikleri kaçırmayın.
          </p>
          <p className="mt-3 text-sm font-semibold text-accent-pink">@yenidogannet</p>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f6b85f_0%,#ed5a86_42%,#bc4ab0_72%,#6f5bd8_100%)] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(188,74,176,0.26)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(188,74,176,0.34)] focus:outline-none focus:ring-4 focus:ring-pink-100 sm:w-auto sm:min-w-48"
        >
          Instagram&apos;da Takip Et
        </a>
      </div>
    </section>
  );
}
