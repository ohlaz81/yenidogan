import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Supabase Storage (ve proje alan adı) üzerinden gelen görseller — boş bırakılınca
    // production'da <Image> bu URL'lerde hata verebilir.
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co", pathname: "/**" },
    ],
  },
};

export default nextConfig;
