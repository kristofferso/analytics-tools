"use client";

import { useState } from "react";
import TextLink from "../../../components/elements/TextLink";
import { capitalize } from "../../../utils/capitalize";
import Image from "next/image";
import Button from "../../../components/elements/Button";
import Header from "../../../components/Header";
import NewsletterSignup from "../../../components/NewsletterSignup";

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

const FeatureSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-700">{title}</h3>
      <div className="pl-1">{children}</div>
    </div>
  );
};

export default function ToolClient({ tool }: ToolClientProps) {
  const [screenshot, showScreenshot] = useState(false);
  
  const breadcrumbs = [
    { label: "All tools", href: "/" },
    { label: tool.name, href: null },
  ];

  return (
    <>
      <Header />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {crumb.href ? (
              <TextLink href={crumb.href} className="text-gray-600 hover:text-gray-900">
                {crumb.label}
              </TextLink>
            ) : (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </div>
        ))}
      </nav>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight break-words mb-4">
          {tool.name}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {tool.name} – a {tool.type} tool
        </p>
        <div className="flex gap-2 flex-wrap">
          {tool.privacy_friendly && (
            <span className="badge badge-primary badge-lg">
              Privacy friendly
            </span>
          )}
          {tool.open_source && (
            <span className="badge badge-secondary badge-lg">Open source</span>
          )}
          {tool.cookie_based && (
            <span className="badge badge-accent badge-lg">Cookie based</span>
          )}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl mb-8">
        <div
          className={`lg:w-80 h-80 lg:h-auto flex items-center justify-center p-12 bg-${tool.color_tint}-100 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none`}
        >
          <div className="relative h-full w-full max-w-[24rem] max-h-[12rem]">
            <Image
              src={tool.logo_url}
              fill
              style={{ objectFit: "contain" }}
              alt={`${tool.name} logo`}
              priority
            />
          </div>
        </div>
        <div className="card-body flex flex-col gap-6 p-6 lg:p-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <FeatureSection title="Analysis Level">
              <div className="badge badge-lg badge-outline capitalize">
                {tool.analysis_level}
              </div>
            </FeatureSection>
            <FeatureSection title="Hosting">
              <div className="flex gap-2 flex-wrap">
                {(tool.hosting === "both" || tool.hosting === "cloud") && (
                  <span className="badge badge-lg badge-outline capitalize">cloud hosted</span>
                )}
                {(tool.hosting === "both" || tool.hosting === "self") && (
                  <span className="badge badge-lg badge-outline capitalize">self hosted</span>
                )}
              </div>
            </FeatureSection>
          </div>

          {/* Features */}
          <FeatureSection title="Features">
            <ul className="list-inside list-disc space-y-1">
              {tool.features &&
                tool.features
                  .split(", ")
                  .map((feature, index) => (
                    <li key={index} className="text-gray-700">{capitalize(feature)}</li>
                  ))}
            </ul>
          </FeatureSection>

          {/* Pricing */}
          <FeatureSection title="Pricing">
            <div className="flex flex-col gap-2">
              {tool.pricing_tier_dims && (
                <p className="text-gray-600 text-sm">
                  Pricing tiers are differentiated by {tool.pricing_tier_dims}.
                </p>
              )}
              {tool.price_starting > 0 ? (
                <span className="badge badge-lg badge-outline w-fit">
                  From ${tool.price_starting} / month
                </span>
              ) : (
                <span className="badge badge-lg badge-outline w-fit">
                  Free tier available
                </span>
              )}
            </div>
          </FeatureSection>

          {/* Screenshot */}
          {tool.screenshot_url && (
            <FeatureSection title="Screenshot">
              <div
                className="relative h-48 w-full max-w-md cursor-pointer bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors"
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
                  style={{ objectFit: "contain" }}
                  alt={`${tool.name} screenshot`}
                  className="hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all">
                  <span className="text-white opacity-0 hover:opacity-100 text-sm font-medium">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </FeatureSection>
          )}

          {/* Demo Link */}
          {tool.demo_link && (
            <FeatureSection title="Try It Out">
              <div className="flex flex-col gap-3">
                <p className="text-gray-600">
                  {tool.name} offers a demo version you can try before signing up.
                </p>
                <Button
                  external
                  className="self-start"
                  href={tool.demo_link}
                  eventData={{
                    name: "button try demo",
                    props: { tool: tool.name, url: tool.url },
                  }}
                  type="secondaryGray"
                  target="_blank"
                  rel="noreferrer"
                >
                  Try demo ↗︎
                </Button>
              </div>
            </FeatureSection>
          )}

          {/* CTA Button */}
          <div className="card-actions justify-start mt-4 pt-4 border-t border-gray-200">
            <Button
              external
              href={tool.url}
              eventData={{
                name: "button get tool",
                props: { tool: tool.name, url: tool.url, position: "tool page" },
              }}
              type="primarySquare"
              target="_blank"
              rel="noreferrer"
            >
              Get {tool.name} ↗︎
            </Button>
          </div>
        </div>
      </div>

      {/* Screenshot Modal */}
      {screenshot && tool.screenshot_url && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 cursor-pointer"
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
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10"
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
      <div className="mt-12">
        <NewsletterSignup variant="card" />
      </div>
    </>
  );
}

