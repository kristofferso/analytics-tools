import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Page from "../components/Page";

export const metadata: Metadata = {
  title: {
    default: "Analytics.rip - All Analytics Tools for Apps and Websites",
    template: "%s | Analytics.rip",
  },
  description: "Discover and compare the best analytics tools for your apps and websites. Find privacy-friendly, open-source, and feature-rich analytics solutions.",
  keywords: ["analytics tools", "web analytics", "privacy-friendly analytics", "open source analytics", "analytics comparison"],
  authors: [{ name: "Tataki" }],
  creator: "Tataki",
  publisher: "Tataki",
  metadataBase: new URL("https://analytics.rip"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://analytics.rip",
    siteName: "Analytics.rip",
    title: "Analytics.rip - All Analytics Tools for Apps and Websites",
    description: "Discover and compare the best analytics tools for your apps and websites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics.rip - All Analytics Tools for Apps and Websites",
    description: "Discover and compare the best analytics tools for your apps and websites.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Page>{children}</Page>
        <Analytics />
      </body>
    </html>
  );
}

