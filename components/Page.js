import Head from "next/head";
import TextLink from "./elements/TextLink";

export default function Page({ children }) {
  return (
    <>
      <Head>
        <title>Analytics.rip</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 pb-12 pt-8 flex flex-col gap-6">
        {children}
      </div>
      <footer className="footer footer-center py-16 px-10 bg-base-200 text-base-content rounded mt-12 border-t">
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
