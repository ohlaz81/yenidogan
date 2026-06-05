import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://yenidogan.net",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://yenidogan.net/kiz-isimleri",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://yenidogan.net/erkek-isimleri",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://yenidogan.net/kuranda-gecen-isimler",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://yenidogan.net/populer-isimler",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://yenidogan.net/modern-isimler",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://yenidogan.net/nadir-isimler",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://yenidogan.net/kisa-isimler",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://yenidogan.net/tum-isimler",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://yenidogan.net/isim-rehberi",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
