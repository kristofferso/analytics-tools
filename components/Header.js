import Link from "next/link";
import trackEvent from "../utils/trackEvent";
import Button from "./elements/Button";

export default function Header() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col gap-1 items-start">
          <Link href="/">
            <a className="text-2xl font-bold leading-[1.1] hover:border-b-4 hover:-mb-1 border-gray-300">
              Analytics.rip
            </a>
          </Link>
          <h2 className="font-medium min-w-min">
            All analytics tools for apps and websites
          </h2>
        </div>

        <Button href="/tool/submit" type="primaryOutline">
          + Submit tool
        </Button>
      </div>
      <div className="divider">
        <a
          href="https://tataki.no"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 items-center group min-w-max"
          onClick={() => {
            trackEvent({
              name: "link tataki press",
              props: { position: "header" },
            });
          }}
        >
          <p
            className="font-medium min-w-max
          "
          >
            made by
          </p>

          <svg
            className="rounded fill-black group-hover:fill-primary-focus"
            width="30"
            height="30"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="300" height="300" />
            <path
              d="M89.6039 181.6C89.4706 182.267 89.4039 183.133 89.4039 184.2C89.4039 186.6 90.0706 188.333 91.4039 189.4C92.8706 190.467 95.2039 191 98.4039 191H110.604L105.404 220H88.0039C65.6039 220 54.4039 210.6 54.4039 191.8C54.4039 189 54.7372 185.467 55.4039 181.2L63.4039 136.8H49.8039L54.8039 108.4H68.4039L73.2039 81.2H107.404L102.604 108.4H125.004L120.004 136.8H97.6039L89.6039 181.6ZM127.654 164C129.654 152.533 133.587 142.467 139.454 133.8C145.321 125.133 152.387 118.467 160.654 113.8C168.921 109.133 177.654 106.8 186.854 106.8C194.721 106.8 201.321 108.4 206.654 111.6C211.987 114.8 215.854 119 218.254 124.2L221.054 108.4H255.254L235.454 220H201.254L204.254 204.2C199.987 209.4 194.587 213.6 188.054 216.8C181.521 220 174.321 221.6 166.454 221.6C158.587 221.6 151.587 219.8 145.454 216.2C139.454 212.6 134.787 207.533 131.454 201C128.121 194.333 126.454 186.533 126.454 177.6C126.454 173.333 126.854 168.8 127.654 164ZM211.254 164.2C211.654 161.8 211.854 159.6 211.854 157.6C211.854 151.067 209.921 145.933 206.054 142.2C202.321 138.467 197.521 136.6 191.654 136.6C184.854 136.6 178.654 139.067 173.054 144C167.454 148.8 163.921 155.467 162.454 164C162.054 166.4 161.854 168.6 161.854 170.6C161.854 177.133 163.721 182.333 167.454 186.2C171.321 189.933 176.121 191.8 181.854 191.8C188.654 191.8 194.854 189.333 200.454 184.4C206.054 179.467 209.654 172.733 211.254 164.2Z"
              fill="white"
            />
          </svg>
          <p className="text-xl font-bold italic group-hover:border-b-4 group-hover:-mb-1 border-gray-300">
            tataki
          </p>
        </a>
      </div>
    </div>
  );
}
