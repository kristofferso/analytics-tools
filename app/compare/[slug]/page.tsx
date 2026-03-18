import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  parseCompareSlug,
  getAllCompareSlugs,
  getAllToolSlugs,
  getToolBySlug,
} from "../../../data/toolsData";
import CompareClient from "./CompareClient";

export function generateStaticParams() {
  return getAllCompareSlugs().map((slug) => ({ slug }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = parseCompareSlug(slug);

  if (!pair) {
    return { title: "Comparison Not Found" };
  }

  const [toolA, toolB] = pair;
  const slugA = toolA.name.toLowerCase().replace(/\s/g, "-");
  const slugB = toolB.name.toLowerCase().replace(/\s/g, "-");
  const canonicalSlug = `${slugA}-vs-${slugB}`;

  const title = `${toolA.name} vs ${toolB.name}: Analytics Tool Comparison`;
  const description = `Compare ${toolA.name} and ${toolB.name} side-by-side. See pricing, features, privacy support, hosting options, and more to find the right analytics tool for you.`;

  return {
    title,
    description,
    keywords: [
      `${toolA.name} vs ${toolB.name}`,
      `${toolA.name} alternative`,
      `${toolB.name} alternative`,
      "analytics tool comparison",
      toolA.type,
      toolB.type,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://analytics.rip/compare/${canonicalSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://analytics.rip/compare/${canonicalSlug}`,
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = parseCompareSlug(slug);

  if (!pair) {
    notFound();
  }

  const [toolA, toolB] = pair;
  const slugA = toolA.name.toLowerCase().replace(/\s/g, "-");
  const slugB = toolB.name.toLowerCase().replace(/\s/g, "-");

  // Pick up to 4 related comparisons: other tools vs toolA and toolB
  const allSlugs = getAllToolSlugs().filter(
    (s) => s !== slugA && s !== slugB
  );
  const relatedComparisons = allSlugs.slice(0, 4).flatMap((s) => {
    const other = getToolBySlug(s);
    if (!other) return [];
    // canonical ordering: alphabetically smaller slug goes first
    const pairA = [slugA, s].sort();
    const pairB = [slugB, s].sort();
    return [
      { slug: `${pairA[0]}-vs-${pairA[1]}`, nameA: pairA[0] === slugA ? toolA.name : other.name, nameB: pairA[0] === slugA ? other.name : toolA.name },
      { slug: `${pairB[0]}-vs-${pairB[1]}`, nameA: pairB[0] === slugB ? toolB.name : other.name, nameB: pairB[0] === slugB ? other.name : toolB.name },
    ];
  }).slice(0, 6);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${toolA.name} vs ${toolB.name}`,
    description: `Side-by-side comparison of ${toolA.name} and ${toolB.name} analytics tools.`,
    url: `https://analytics.rip/compare/${slugA}-vs-${slugB}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CompareClient
        toolA={toolA}
        toolB={toolB}
        relatedComparisons={relatedComparisons}
      />
    </>
  );
}
