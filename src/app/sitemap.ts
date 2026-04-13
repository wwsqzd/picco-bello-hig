import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://picco-bello-hig.de";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uber-uns`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutzerklaerung`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}