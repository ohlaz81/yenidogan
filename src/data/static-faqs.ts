import type { FAQ } from "@/types/database";

export const STATIC_FAQS: FAQ[] = [
  {
    id: "faq-1",
    sortOrder: 1,
    question: "Bebek ismi seçerken nelere dikkat etmeliyim?",
    answer:
      "Okunuş, anlam, aile ve kültürel uyum, kısaltma ve imla gibi konularda fikir alışverişi yapmanız faydalı olur. İsim sayfasındaki köken ve telaffuz bilgileri size yol gösterebilir.",
  },
  {
    id: "faq-2",
    sortOrder: 2,
    question: "İsimlerin anlamları neden önemlidir?",
    answer:
      "Anlam, ismin taşıyacağı duygusal ve kültürel yükü hafifletir veya güçlendirir. Farklı kaynaklarda küçük farklılıklar olabileceğini unutmayın; en doğru netleşmeyi aile dinamiğinizle ve güvendiğiniz kaynaklarla yapın.",
  },
  {
    id: "faq-3",
    sortOrder: 3,
    question: "Kur’an’da geçen isimler nasıl değerlendirilir?",
    answer:
      "Bazı isimler dini metinlerde veya gelenekte özel yere sahiptir. Sayfalarımızdaki “Kur’an’da geçiyor mu?” alanı yönlendiricidir; kesin hüküm için güvendiğiniz ilim veya aile rehberliğinize başvurun.",
  },
  {
    id: "faq-4",
    sortOrder: 4,
    question: "Favori listesini nerede görüntülerim?",
    answer:
      "Tarayıcınızda “Favorilerim” bölümünü kullanabilirsiniz. Bu liste cihazınızda tutulur; cihaz veya tarayıcı değişiminde yeniden eklemeniz gerekebilir.",
  },
  {
    id: "faq-5",
    sortOrder: 5,
    question: "İletişim veya içerik önerisi nasıl gönderirim?",
    answer:
      "“İletişim” sayfasındaki formu kullanabilirsiniz. Öneri ve geri bildirimleriniz, editoryal kaliteyi artırmamıza yardımcı olur.",
  },
];
