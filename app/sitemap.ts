import { MetadataRoute } from "next";
import { getAllToolSlugs, getAllCompareSlugs } from "../data/toolsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://analytics.rip";

  const slugs = getAllToolSlugs();

  const toolUrls = slugs.map((slug) => ({
    url: `${baseUrl}/tool/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const alternativesUrls = slugs.map((slug) => ({
    url: `${baseUrl}/alternatives/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const compareUrls = getAllCompareSlugs().map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
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
    ...alternativesUrls,
    ...compareUrls,
  ];
}

