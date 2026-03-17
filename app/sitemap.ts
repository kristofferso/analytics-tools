import { MetadataRoute } from "next";
import { getAllToolSlugs } from "../data/toolsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://analytics.rip";

  const toolUrls = getAllToolSlugs().map((slug) => ({
    url: `${baseUrl}/tool/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tool/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...toolUrls,
  ];
}

