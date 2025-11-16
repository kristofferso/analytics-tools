"use client";

import { useState } from "react";
import TextLink from "../../../components/elements/TextLink";
import { capitalize } from "../../../utils/capitalize";
import Image from "next/image";
import Button from "../../../components/elements/Button";
import Header from "../../../components/Header";

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
    <div className="flex flex-col gap-2">
      <h3 className="uppercase font-medium">{title}</h3>
      {children}
    </div>
  );
};

export default function ToolClient({ tool }: ToolClientProps) {
  const [screenshot, showScreenshot] = useState(false);
  return (
    <>
      <Header />
      <TextLink href="/">← All tools</TextLink>
      <h1 className="text-5xl font-bold leading-tight break-words">
        {tool.name}
      </h1>
      <div>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <div
            className={`lg:w-80 h-80 lg:h-auto flex items-center justify-center p-12 bg-${tool.color_tint}-100`}
          >
            <div className="relative h-full w-full max-w-[24rem] max-h-[12rem]">
              <Image
                src={tool.logo_url}
                fill
                style={{ objectFit: "contain" }}
                alt={`${tool.name} logo`}
              />
            </div>
          </div>
          <div className="card-body flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="card-title">
                {tool.name} – a {tool.type} tool
              </h2>
              <div className="flex gap-3 self-start flex-wrap">
                {tool.privacy_friendly && (
                  <p className="badge badge-primary badge-lg">
                    Privacy friendly
                  </p>
                )}
                {tool.open_source && (
                  <p className="badge badge-secondary badge-lg">Open source</p>
                )}
                {tool.cookie_based && (
                  <p className="badge badge-accent badge-lg">Cookie based</p>
                )}
              </div>
            </div>
            <FeatureSection title="Functionality">
              <ul className="list-inside list-disc">
                {tool.features &&
                  tool.features
                    .split(", ")
                    .map((feature, index) => (
                      <li key={index}>{capitalize(feature)}</li>
                    ))}
              </ul>
            </FeatureSection>
            <FeatureSection title="Analysis level">
              <div className="badge badge-lg capitalize">
                {tool.analysis_level}
              </div>
            </FeatureSection>
            <FeatureSection title="Hosting">
              <div className="flex gap-2 flex-wrap">
                {(tool.hosting === "both" || tool.hosting === "cloud") && (
                  <div className="badge badge-lg capitalize">cloud hosted</div>
                )}
                {(tool.hosting === "both" || tool.hosting === "self") && (
                  <div className="badge badge-lg capitalize">self hosted</div>
                )}
              </div>
            </FeatureSection>
            {tool.screenshot_url && (
              <FeatureSection title="Screenshot">
                <div
                  className="relative h-40 w-64 cursor-pointer max-w-full bg-gray-100 rounded-xl"
                  onClick={() => showScreenshot(true)}
                >
                  <Image
                    src={tool.screenshot_url}
                    fill
                    style={{ objectFit: "contain" }}
                    alt={`${tool.name} screenshot`}
                  />
                </div>
              </FeatureSection>
            )}
            {tool.demo_link && (
              <FeatureSection title="Demo">
                {tool.name} has a demo version
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
              </FeatureSection>
            )}
            <FeatureSection title="Pricing">
              <p>
                Pricing tiers are differentiated by {tool.pricing_tier_dims}.
              </p>
              {tool.price_starting > 0 && (
                <p className="badge badge-lg badge-outline">
                  From {tool.price_starting}$ / month
                </p>
              )}
              {tool.price_starting === 0 && (
                <p className="badge badge-lg badge-outline">
                  Free tier available
                </p>
              )}
            </FeatureSection>
            <div className="card-actions justify-end">
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
                Get it ↗︎
              </Button>
            </div>
          </div>
        </div>
      </div>
      {screenshot && tool.screenshot_url && (
        <div
          className="bg-black bg-opacity-20 fixed h-full w-full top-0 left-0 p-4 cursor-pointer"
          onClick={() => showScreenshot(false)}
        >
          <div className="relative w-full h-full max-w-4xl mx-auto">
            <Image
              src={tool.screenshot_url}
              fill
              style={{ objectFit: "contain" }}
              alt={`${tool.name} screenshot`}
            />
          </div>
        </div>
      )}
    </>
  );
}

