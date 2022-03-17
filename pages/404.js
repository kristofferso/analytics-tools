import TextLink from "../components/elements/TextLink";
import Page from "../components/Page";

export default function FourOFour() {
  return (
    <Page>
      <h1 className="text-4xl font-medium">Not found</h1>
      <p className="">
        That&apos;s a missing page, unfortunately! Sorry about that.
      </p>
      <TextLink href="/">← Back to overview</TextLink>
    </Page>
  );
}
