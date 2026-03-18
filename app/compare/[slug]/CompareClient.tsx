"use client";

import Image from "next/image";
import { Check, X, ExternalLink } from "lucide-react";
import Header from "../../../components/Header";
import Button from "../../../components/elements/Button";
import TextLink from "../../../components/elements/TextLink";
import NewsletterSignup from "../../../components/NewsletterSignup";
import { capitalize } from "../../../utils/capitalize";
import type { Tool } from "../../../types/tool";

interface RelatedComparison {
  slug: string;
  nameA: string;
  nameB: string;
}

interface CompareClientProps {
  toolA: Tool;
  toolB: Tool;
  relatedComparisons: RelatedComparison[];
}

const BoolCell = ({ value }: { value: boolean }) =>
  value ? (
    <Check className="w-5 h-5 text-green-500 mx-auto" />
  ) : (
    <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
  );

function featureSet(tool: Tool): Set<string> {
  return new Set(
    tool.features ? tool.features.split(", ").map((f) => f.trim()) : []
  );
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s/g, "-");
}

export default function CompareClient({
  toolA,
  toolB,
  relatedComparisons,
}: CompareClientProps) {
  const slugA = toSlug(toolA.name);
  const slugB = toSlug(toolB.name);

  const featuresA = featureSet(toolA);
  const featuresB = featureSet(toolB);
  const onlyA = [...featuresA].filter((f) => !featuresB.has(f));
  const onlyB = [...featuresB].filter((f) => !featuresA.has(f));
  const shared = [...featuresA].filter((f) => featuresB.has(f));
  const hasFeatures = onlyA.length > 0 || onlyB.length > 0 || shared.length > 0;

  const rows: { label: string; a: string; b: string }[] = [
    {
      label: "Starting price",
      a: toolA.price_starting > 0 ? `$${toolA.price_starting}/mo` : "Free",
      b: toolB.price_starting > 0 ? `$${toolB.price_starting}/mo` : "Free",
    },
    {
      label: "Pricing model",
      a: toolA.pricing_tier_dims ?? "—",
      b: toolB.pricing_tier_dims ?? "—",
    },
    {
      label: "Analysis level",
      a: capitalize(toolA.analysis_level),
      b: capitalize(toolB.analysis_level),
    },
    {
      label: "Hosting",
      a:
        toolA.hosting === "both"
          ? "Cloud & Self-hosted"
          : capitalize(toolA.hosting),
      b:
        toolB.hosting === "both"
          ? "Cloud & Self-hosted"
          : capitalize(toolB.hosting),
    },
    {
      label: "Type",
      a: capitalize(toolA.type),
      b: capitalize(toolB.type),
    },
  ];

  const boolRows: { label: string; a: boolean; b: boolean }[] = [
    {
      label: "Privacy friendly",
      a: toolA.privacy_friendly,
      b: toolB.privacy_friendly,
    },
    { label: "Open source", a: toolA.open_source, b: toolB.open_source },
    { label: "Cookie based", a: toolA.cookie_based, b: toolB.cookie_based },
  ];

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
        <TextLink
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          All tools
        </TextLink>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">
          {toolA.name} vs {toolB.name}
        </span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center gap-6 mb-12 text-center">
        <div className="flex items-center gap-6 sm:gap-10">
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-${toolA.color_tint}-100 p-4 flex items-center justify-center shadow-md border-2 border-${toolA.color_tint}-200`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={toolA.logo_url}
                  fill
                  style={{ objectFit: "contain" }}
                  alt={`${toolA.name} logo`}
                  priority
                />
              </div>
            </div>
            <span className="font-bold text-lg sm:text-xl">{toolA.name}</span>
          </div>

          <span className="text-2xl font-bold text-muted-foreground px-2">vs</span>

          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-${toolB.color_tint}-100 p-4 flex items-center justify-center shadow-md border-2 border-${toolB.color_tint}-200`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={toolB.logo_url}
                  fill
                  style={{ objectFit: "contain" }}
                  alt={`${toolB.name} logo`}
                  priority
                />
              </div>
            </div>
            <span className="font-bold text-lg sm:text-xl">{toolB.name}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold">
          {toolA.name} vs {toolB.name}
        </h1>
        <p className="text-muted-foreground max-w-xl">
          A side-by-side comparison of {toolA.name} and {toolB.name} —
          pricing, features, privacy, and more.
        </p>
      </div>

      {/* Comparison table */}
      <div className="card bg-base-100 shadow-lg border border-base-300 mb-8">
        <div className="card-body p-0 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-base-300">
                <th className="bg-base-200 w-1/3 py-4 px-6 font-semibold text-muted-foreground text-sm uppercase tracking-wide" />
                <th className="text-center py-4 px-6 font-bold text-base">
                  {toolA.name}
                </th>
                <th className="text-center py-4 px-6 font-bold text-base">
                  {toolB.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-base-300">
                  <td className="bg-base-200 py-4 px-6 text-sm font-medium text-muted-foreground">
                    {row.label}
                  </td>
                  <td className="py-4 px-6 text-center text-sm capitalize">
                    {row.a}
                  </td>
                  <td className="py-4 px-6 text-center text-sm capitalize">
                    {row.b}
                  </td>
                </tr>
              ))}
              {boolRows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-base-300 last:border-0"
                >
                  <td className="bg-base-200 py-4 px-6 text-sm font-medium text-muted-foreground">
                    {row.label}
                  </td>
                  <td className="py-4 px-6">
                    <BoolCell value={row.a} />
                  </td>
                  <td className="py-4 px-6">
                    <BoolCell value={row.b} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features comparison */}
      {hasFeatures && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
              <h3 className="font-semibold mb-3">Only in {toolA.name}</h3>
              {onlyA.length > 0 ? (
                <ul className="space-y-2">
                  {onlyA.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {capitalize(f)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body">
              <h3 className="font-semibold mb-3">Both tools</h3>
              {shared.length > 0 ? (
                <ul className="space-y-2">
                  {shared.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {capitalize(f)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No shared features</p>
              )}
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
              <h3 className="font-semibold mb-3">Only in {toolB.name}</h3>
              {onlyB.length > 0 ? (
                <ul className="space-y-2">
                  {onlyB.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {capitalize(f)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="card bg-base-200 border-2 border-primary/20">
          <div className="card-body items-center text-center">
            <h3 className="text-lg font-bold mb-1">{toolA.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {toolA.price_starting > 0
                ? `From $${toolA.price_starting}/mo`
                : "Free tier available"}
            </p>
            <Button
              external
              href={toolA.url}
              type="primary"
              target="_blank"
              rel="noreferrer"
              eventData={{
                name: "button get tool",
                props: {
                  tool: toolA.name,
                  url: toolA.url,
                  position: "compare page",
                },
              }}
              className="gap-2"
            >
              Visit {toolA.name}
              <ExternalLink className="w-4 h-4" />
            </Button>
            <TextLink
              href={`/tool/${slugA}`}
              className="text-xs mt-3 text-muted-foreground"
            >
              View full details
            </TextLink>
          </div>
        </div>

        <div className="card bg-base-200 border-2 border-primary/20">
          <div className="card-body items-center text-center">
            <h3 className="text-lg font-bold mb-1">{toolB.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {toolB.price_starting > 0
                ? `From $${toolB.price_starting}/mo`
                : "Free tier available"}
            </p>
            <Button
              external
              href={toolB.url}
              type="primary"
              target="_blank"
              rel="noreferrer"
              eventData={{
                name: "button get tool",
                props: {
                  tool: toolB.name,
                  url: toolB.url,
                  position: "compare page",
                },
              }}
              className="gap-2"
            >
              Visit {toolB.name}
              <ExternalLink className="w-4 h-4" />
            </Button>
            <TextLink
              href={`/tool/${slugB}`}
              className="text-xs mt-3 text-muted-foreground"
            >
              View full details
            </TextLink>
          </div>
        </div>
      </div>

      {/* Related comparisons */}
      {relatedComparisons.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">More comparisons</h2>
          <div className="flex flex-wrap gap-2">
            {relatedComparisons.map((c) => (
              <TextLink
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="badge badge-lg badge-outline gap-1 py-3 px-4 hover:badge-primary transition-colors"
              >
                {c.nameA} vs {c.nameB}
              </TextLink>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-8">
        <NewsletterSignup variant="card" />
      </div>
    </>
  );
}
