import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">Hakkımızda</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Yenidogan.net, anne ve baba adaylarının hayatlarındaki en özel kararlardan biri olan bebek ismi seçimini daha
        bilinçli, kolay ve keyifli hale getirmek amacıyla kurulmuş kapsamlı bir isim rehber platformudur. Amacımız,
        ailelerin bebekleri için en doğru, anlamlı ve özel ismi güvenilir bilgiler eşliğinde kolayca bulabilmelerine
        yardımcı olmaktır.
      </p>
      <p className="mt-4 text-muted">
        Platformumuzda kız ve erkek bebek isimleri; anlamları, kökenleri, Kur&apos;an&apos;da geçip geçmediği, kullanım
        oranları, popülerlik düzeyleri ve farklı tarz seçenekleriyle detaylı şekilde sunulmaktadır. Yenidogan.net,
        yalnızca isim önerileri sunan bir site değil; ebeveynlerin çocuklarına ömür boyu taşıyacakları en değerli
        armağanlardan biri olan isim konusunda doğru karar vermelerini destekleyen profesyonel bir rehberdir.
      </p>
      <p className="mt-4 text-muted">
        Modern ve kullanıcı dostu yapısıyla Yenidogan.net, annelerin ve babaların yüzlerce seçenek arasında kaybolmadan
        kendi değerlerine, kültürlerine ve hayallerine en uygun ismi keşfetmesini sağlar. Her ailenin hikayesine anlam
        katacak en özel ismi bulma yolculuğunda Yenidogan.net, güvenilir bilgi, ilham ve kolaylığın buluşma
        noktasıdır.
      </p>
    </div>
  );
}
