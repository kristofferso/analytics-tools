"use client";

import { useState } from "react";
import TextLink from "../../../components/elements/TextLink";
import { capitalize } from "../../../utils/capitalize";
import Image from "next/image";
import Button from "../../../components/elements/Button";
import Header from "../../../components/Header";
import NewsletterSignup from "../../../components/NewsletterSignup";
import { Check, ExternalLink, Shield, Code, Cookie, Server, Cloud, Zap, DollarSign, Eye } from "lucide-react";

interface Tool {
  name: string;
  type: string;
  color_tint: string;
  logo_url: string;
  privacy_friendly: boolean;
  open_source: boolean;
  cookie_based: boolean;
  features?: string;
  analysis_level: string;
  hosting: string;
  screenshot_url?: string;
  demo_link?: string;
  pricing_tier_dims: string;
  price_starting: number;
  url: string;
}

interface ToolClientProps {
  tool: Tool;
}

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg border border-base-300 hover:border-primary/20 transition-colors">
      <div className="text-primary flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
        <div className="text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
};

export default function ToolClient({ tool }: ToolClientProps) {
  const [screenshot, showScreenshot] = useState(false);
  
  const breadcrumbs = [
    { label: "All tools", href: "/" },
    { label: tool.name, href: null },
  ];

  const features = tool.features ? tool.features.split(", ") : [];

  return (
    <>
      <Header />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {crumb.href ? (
              <TextLink href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {crumb.label}
              </TextLink>
            ) : (
              <span className="text-foreground font-medium">{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="text-muted-foreground">/</span>
            )}
          </div>
        ))}
      </nav>

      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-8">
          {/* Logo */}
          <div className={`flex-shrink-0 w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-${tool.color_tint}-100 p-6 flex items-center justify-center shadow-lg border-2 border-${tool.color_tint}-200`}>
            <div className="relative w-full h-full">
              <Image
                src={tool.logo_url}
                fill
                style={{ objectFit: "contain" }}
                alt={`${tool.name} logo`}
                priority
                className="drop-shadow-sm"
              />
            </div>
          </div>

          {/* Title and Badges */}
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight break-words mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {tool.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {tool.type.charAt(0).toUpperCase() + tool.type.slice(1)} analytics tool
            </p>
            <div className="flex flex-wrap gap-2">
              {tool.privacy_friendly && (
                <span className="badge badge-lg badge-primary gap-2 px-4 py-2">
                  <Shield className="w-4 h-4" />
                  Privacy friendly
                </span>
              )}
              {tool.open_source && (
                <span className="badge badge-lg badge-secondary gap-2 px-4 py-2">
                  <Code className="w-4 h-4" />
                  Open source
                </span>
              )}
              {tool.cookie_based && (
                <span className="badge badge-lg badge-accent gap-2 px-4 py-2">
                  <Cookie className="w-4 h-4" />
                  Cookie based
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={<Zap className="w-5 h-5" />}
            label="Analysis Level"
            value={<span className="capitalize">{tool.analysis_level}</span>}
          />
          <InfoCard
            icon={
              tool.hosting === "cloud" ? (
                <Cloud className="w-5 h-5" />
              ) : tool.hosting === "self" ? (
                <Server className="w-5 h-5" />
              ) : (
                <div className="flex gap-1">
                  <Cloud className="w-5 h-5" />
                  <Server className="w-5 h-5" />
                </div>
              )
            }
            label="Hosting"
            value={
              <div className="flex flex-wrap gap-1">
                {(tool.hosting === "both" || tool.hosting === "cloud") && (
                  <span className="capitalize text-xs">Cloud</span>
                )}
                {(tool.hosting === "both" || tool.hosting === "self") && (
                  <span className="capitalize text-xs">Self-hosted</span>
                )}
              </div>
            }
          />
          <InfoCard
            icon={<DollarSign className="w-5 h-5" />}
            label="Pricing"
            value={
              tool.price_starting > 0 ? (
                <span>From ${tool.price_starting}/mo</span>
              ) : (
                <span className="text-green-600">Free tier</span>
              )
            }
          />
          {tool.pricing_tier_dims && (
            <InfoCard
              icon={<Eye className="w-5 h-5" />}
              label="Pricing Model"
              value={<span className="text-xs capitalize">{tool.pricing_tier_dims}</span>}
            />
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Features Section */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{capitalize(feature)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshot Section */}
          {tool.screenshot_url && (
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-primary" />
                  Screenshot
                </h2>
                <div
                  className="relative w-full aspect-video cursor-pointer bg-base-200 rounded-xl overflow-hidden border-2 border-base-300 hover:border-primary/50 transition-all group"
                  onClick={() => showScreenshot(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      showScreenshot(true);
                    }
                  }}
                  aria-label="View full screenshot"
                >
                  <Image
                    src={tool.screenshot_url}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={`${tool.name} screenshot`}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm transition-opacity">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* CTA Card */}
          <div className="card bg-gradient-to-br bg-base-200 border-2 border-primary/20">
            <div className="card-body">
              <h3 className="text-xl font-bold mb-2">Get Started</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Start using {tool.name} today and get powerful analytics insights.
              </p>
              <Button
                external
                href={tool.url}
                eventData={{
                  name: "button get tool",
                  props: { tool: tool.name, url: tool.url, position: "tool page sidebar" },
                }}
                type="primary"
                target="_blank"
                rel="noreferrer"
                className="w-full justify-center gap-2 text-base py-3"
              >
                Visit {tool.name}
                <ExternalLink className="w-4 h-4" />
              </Button>
              {tool.demo_link && (
                <>
                  <div className="divider my-4">OR</div>
                  <Button
                    external
                    className="w-full justify-center gap-2"
                    href={tool.demo_link}
                    eventData={{
                      name: "button try demo",
                      props: { tool: tool.name, url: tool.url },
                    }}
                    type="primaryOutline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Try Demo
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </>
              )}
              {tool.pricing_tier_dims && (
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Pricing based on {tool.pricing_tier_dims}
                </p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h3 className="font-semibold mb-4">Quick Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">{tool.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Analysis</span>
                  <span className="font-medium capitalize">{tool.analysis_level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hosting</span>
                  <span className="font-medium capitalize">
                    {tool.hosting === "both" ? "Cloud & Self" : tool.hosting}
                  </span>
                </div>
                {tool.price_starting > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Starting Price</span>
                    <span className="font-medium">${tool.price_starting}/mo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Modal */}
      {screenshot && tool.screenshot_url && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => showScreenshot(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              showScreenshot(false);
            }
          }}
          aria-label="Close screenshot"
        >
          <div className="relative w-full h-full max-w-7xl max-h-[95vh] flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white bg-black/70 hover:bg-black/90 rounded-full p-3 z-10 transition-all shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                showScreenshot(false);
              }}
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={tool.screenshot_url}
                fill
                style={{ objectFit: "contain" }}
                alt={`${tool.name} screenshot`}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16">
        <NewsletterSignup variant="card" />
      </div>
    </>
  );
}

