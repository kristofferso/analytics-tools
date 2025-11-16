"use client";

import TextLink from "./elements/TextLink";
import NewsletterSignup from "./NewsletterSignup";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pb-12 pt-8 flex flex-col gap-6">
        {children}
      </div>
      <footer className="footer footer-center py-16 px-10 bg-base-200 text-base-content rounded mt-12 border-t">
        <div className="w-full max-w-2xl">
          <NewsletterSignup variant="inline" className="mb-8" />
        </div>
        <div className="flex flex-row justify-center gap-4 flex-wrap">
          <TextLink href="/">All analytics tools</TextLink>
          <TextLink href="/guide">Tool guide</TextLink>
          <TextLink href="/tool/submit">Submit tool</TextLink>
          <TextLink href="/cookies">Cookie policy</TextLink>
        </div>

        <div>
          <p className="text-base">
            analytics.rip – an app by{" "}
            <TextLink
              href="https://tataki.no"
              external={true}
              eventData={{
                name: "link tataki press",
                props: { position: "footer" },
              }}
            >
              Tataki
            </TextLink>
          </p>
        </div>
      </footer>
    </>
  );
}

