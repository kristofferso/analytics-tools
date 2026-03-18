import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  parseCompareSlug,
  getAllCompareSlugs,
  getAllTools,
} from "../../../data/toolsData";
import CompareClient from "./CompareClient";
import { generateCompareContent } from "../../../lib/compareContent";

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

  // Related comparisons: prefer tools of the same type, then fill with others
  const otherTools = getAllTools().filter(
    (t) => {
      const s = t.name.toLowerCase().replace(/\s/g, "-");
      return s !== slugA && s !== slugB;
    }
  );
  // Sort: same-type tools first (type shared by either toolA or toolB)
  const sameType = otherTools.filter(
    (t) => t.type === toolA.type || t.type === toolB.type
  );
  const differentType = otherTools.filter(
    (t) => t.type !== toolA.type && t.type !== toolB.type
  );
  const sortedOthers = [...sameType, ...differentType];

  const seen = new Set<string>();
  const relatedComparisons: { slug: string; nameA: string; nameB: string }[] = [];
  for (const other of sortedOthers) {
    if (relatedComparisons.length >= 6) break;
    const s = other.name.toLowerCase().replace(/\s/g, "-");
    for (const [base, baseName] of [[slugA, toolA.name], [slugB, toolB.name]] as [string, string][]) {
      if (relatedComparisons.length >= 6) break;
      const pairSlugs = [base, s].sort();
      const pairSlug = `${pairSlugs[0]}-vs-${pairSlugs[1]}`;
      if (seen.has(pairSlug)) continue;
      seen.add(pairSlug);
      const nameA = pairSlugs[0] === base ? baseName : other.name;
      const nameB = pairSlugs[0] === base ? other.name : baseName;
      relatedComparisons.push({ slug: pairSlug, nameA, nameB });
    }
  }

  const content = generateCompareContent(toolA, toolB);

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
        content={content}
      />
    </>
  );
}
