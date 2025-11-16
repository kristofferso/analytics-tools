import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Page from "../components/Page";

export const metadata: Metadata = {
  title: "Analytics.rip",
  description: "All analytics tools for apps and websites",
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

