/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./elements/Button";

export default function ToolCard({ tool, className }) {
  const router = useRouter();

  const urlName = tool.name?.replace(/\s/g, "-").toLowerCase();

  return (
    <div
      onClick={() => {
        router.push(`tool/${urlName}`);
      }}
      className={`card w-72 grow bg-base-200 shadow-2xl shadow-${tool.color_tint}-200 border-${tool.color_tint}-200 group cursor-pointer border hover:bg-${tool.color_tint}-50 ${className}`}
    >
      <div className="card-body max-w-full">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{tool.name}</h2>
          <img
            src={tool.logo_url}
            alt={`${tool.name} logo`}
            className="max-h-[1.2rem]"
          />
        </div>
        <p className="">
          {tool.privacy_friendly
            ? tool.open_source
              ? "A privacy friendly, open source "
              : "A privacy friendly "
            : tool.open_source
            ? "An open source "
            : "A "}
          tool with {tool.analysis_level} functionality for data analysis.
        </p>
        <p>
          Price:
          {tool.price_starting > 0 && (
            <span className="badge badge-xl badge-outline ml-2">
              From {tool.price_starting}$ / month
            </span>
          )}
          {tool.price_starting === 0 && (
            <span className="badge badge-xl badge-outline ml-2">
              Free tier available
            </span>
          )}
        </p>

        <div className="card-actions justify-end mt-6">
          <Button
            href={`/tool/${urlName}`}
            type="secondaryGray"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Read more
          </Button>

          <Button
            external
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={tool.url}
            eventData={{
              name: "button get tool",
              props: {
                tool: tool.name,
                url: tool.url,
                location: "overview card",
              },
            }}
            type="secondaryOutline"
            target="_blank"
            rel="noreferrer"
          >
            Get it ↗︎
          </Button>
        </div>
      </div>
    </div>
  );
}
