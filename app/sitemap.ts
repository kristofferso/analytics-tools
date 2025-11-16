import { MetadataRoute } from "next";
import { supabase } from "../utils/supabase";

// Cache sitemap for 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://analytics.rip";

  // Get all tools
  const { data: tools } = await supabase
    .from("tools")
    .select("name")
    .order("name", { ascending: true });

  const toolUrls =
    tools?.map((tool) => ({
      url: `${baseUrl}/tool/${tool.name.toLowerCase().replace(/\s/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || [];

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

