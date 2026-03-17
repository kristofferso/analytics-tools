import HomeClient from "./HomeClient";
import { Metadata } from "next";
import { getAllTools } from "../data/toolsData";

export const metadata: Metadata = {
  title: "All Analytics Tools - Compare Features, Pricing & More",
  description: "Browse and compare all analytics tools for apps and websites. Filter by privacy-friendly, open source, hosting options, and features. Find the perfect analytics solution for your needs.",
  openGraph: {
    title: "All Analytics Tools - Compare Features, Pricing & More",
    description: "Browse and compare all analytics tools for apps and websites. Filter by privacy-friendly, open source, hosting options, and features.",
    url: "https://analytics.rip",
  },
};

export default function Home() {
  const tools = getAllTools();

  // Add structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Analytics Tools Directory",
    description: "A comprehensive directory of analytics tools for apps and websites",
    url: "https://analytics.rip",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools?.length || 0,
      itemListElement: tools?.slice(0, 10).map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          url: `https://analytics.rip/tool/${tool.name.toLowerCase().replace(/\s/g, "-")}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeClient tools={tools} />
    </>
  );
}

