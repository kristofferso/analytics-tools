import { Metadata } from "next";
import {
  getAllToolSlugs,
  getToolBySlug,
  getAlternativesForTool,
} from "../../../data/toolsData";
import AlternativesClient from "./AlternativesClient";

export function generateStaticParams() {
  return getAllToolSlugs().map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const tool = getToolBySlug(name);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  const title = `Best ${tool.name} Alternatives in ${new Date().getFullYear()}`;
  const description = `Looking for ${tool.name} alternatives? Compare the best ${tool.type} tools — including privacy-friendly, open source, and free options.`;

  return {
    title,
    description,
    keywords: [
      `${tool.name} alternatives`,
      `best ${tool.name} alternatives`,
      `${tool.name} competitors`,
      `${tool.type} tools`,
      `${tool.type} alternatives`,
      "analytics tools",
      tool.privacy_friendly ? "privacy-friendly analytics" : "",
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://analytics.rip/alternatives/${name}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://analytics.rip/alternatives/${name}`,
    },
  };
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const tool = getToolBySlug(name);

  if (!tool) {
    return null;
  }

  const alternatives = getAlternativesForTool(name);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${tool.name} Alternatives`,
    description: `Top alternatives to ${tool.name} in the ${tool.type} category`,
    numberOfItems: alternatives.length,
    itemListElement: alternatives.map((alt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: alt.name,
      url: `https://analytics.rip/tool/${alt.name.toLowerCase().replace(/\s/g, "-")}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AlternativesClient tool={tool} alternatives={alternatives} slug={name} />
    </>
  );
}
