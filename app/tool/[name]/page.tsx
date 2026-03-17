import ToolClient from "./ToolClient";
import { Metadata } from "next";
import { getToolBySlug, getAllToolSlugs } from "../../../data/toolsData";

export async function generateStaticParams() {
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
    return {
      title: "Tool Not Found",
    };
  }

  const title = `${tool.name} - Analytics Tool Review & Comparison`;
  const description = `${tool.name} is a ${tool.type} tool${tool.privacy_friendly ? " that is privacy-friendly" : ""}${tool.open_source ? " and open source" : ""}. ${tool.features ? `Features include: ${tool.features.split(", ").slice(0, 3).join(", ")}.` : ""} Compare pricing, features, and more.`;

  return {
    title,
    description,
    keywords: [
      tool.name,
      tool.type,
      "analytics tool",
      tool.privacy_friendly ? "privacy-friendly analytics" : "",
      tool.open_source ? "open source analytics" : "",
      ...(tool.features ? tool.features.split(", ") : []),
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://analytics.rip/tool/${name}`,
      images: tool.screenshot_url
        ? [
            {
              url: `https://analytics.rip${tool.screenshot_url}`,
              width: 1200,
              height: 630,
              alt: `${tool.name} screenshot`,
            },
          ]
        : tool.logo_url
        ? [
            {
              url: `https://analytics.rip${tool.logo_url}`,
              width: 1200,
              height: 630,
              alt: `${tool.name} logo`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: tool.screenshot_url
        ? [`https://analytics.rip${tool.screenshot_url}`]
        : tool.logo_url
        ? [`https://analytics.rip${tool.logo_url}`]
        : [],
    },
    alternates: {
      canonical: `https://analytics.rip/tool/${name}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const tool = getToolBySlug(name);

  if (!tool) {
    return null;
  }

  // Generate structured data (JSON-LD)
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "Analytics Software",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: tool.price_starting > 0 ? tool.price_starting : 0,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: tool.price_starting > 0 ? tool.price_starting : 0,
        priceCurrency: "USD",
        billingIncrement: "monthly",
      },
    },
    featureList: tool.features ? tool.features.split(", ") : [],
    url: tool.url,
    description: `${tool.name} is a ${tool.type} tool${tool.privacy_friendly ? " that is privacy-friendly" : ""}${tool.open_source ? " and open source" : ""}.`,
  };

  // Add optional fields only if they exist
  if (tool.screenshot_url) {
    structuredData.screenshot = `https://analytics.rip${tool.screenshot_url}`;
  }
  if (tool.logo_url) {
    structuredData.logo = `https://analytics.rip${tool.logo_url}`;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolClient tool={tool} />
    </>
  );
}

