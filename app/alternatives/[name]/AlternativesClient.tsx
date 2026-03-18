"use client";

import Header from "../../../components/Header";
import ToolCard from "../../../components/ToolCard";
import TextLink from "../../../components/elements/TextLink";
import { Shield, Code } from "lucide-react";
import type { Tool } from "../../../types/tool";

interface AlternativesClientProps {
  tool: Tool;
  alternatives: Tool[];
  slug: string;
}

export default function AlternativesClient({
  tool,
  alternatives,
  slug,
}: AlternativesClientProps) {
  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
        <TextLink href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          All tools
        </TextLink>
        <span className="text-muted-foreground">/</span>
        <TextLink href={`/tool/${slug}`} className="text-muted-foreground hover:text-foreground transition-colors">
          {tool.name}
        </TextLink>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">Alternatives</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Best {tool.name} alternatives
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Explore the top {tool.type} tools that can replace {tool.name}. Compare pricing, features, and privacy options.
        </p>
      </div>

      {/* About the tool being replaced */}
      <div className="card bg-base-200 border border-base-300 mb-10">
        <div className="card-body py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1">
                Looking to replace
              </p>
              <p className="font-semibold text-lg">{tool.name}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge badge-outline capitalize">{tool.type}</span>
                {tool.privacy_friendly && (
                  <span className="badge badge-primary gap-1">
                    <Shield className="w-3 h-3" />
                    Privacy friendly
                  </span>
                )}
                {tool.open_source && (
                  <span className="badge badge-secondary gap-1">
                    <Code className="w-3 h-3" />
                    Open source
                  </span>
                )}
                <span className="badge badge-outline">
                  {tool.price_starting > 0 ? `From $${tool.price_starting}/mo` : "Free tier"}
                </span>
              </div>
            </div>
            <TextLink href={`/tool/${slug}`} className="text-sm shrink-0">
              View full {tool.name} review →
            </TextLink>
          </div>
        </div>
      </div>

      {/* Alternatives grid */}
      {alternatives.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-6">
            {alternatives.length} alternative{alternatives.length !== 1 ? "s" : ""} found
          </p>
          <div className="flex flex-wrap gap-6">
            {alternatives.map((alt) => (
              <ToolCard key={alt.name} tool={alt} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="mb-2">No alternatives found yet.</p>
          <TextLink href="/tool/submit">Submit a tool →</TextLink>
        </div>
      )}
    </>
  );
}
