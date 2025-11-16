import TextLink from "../../../components/elements/TextLink";
import Header from "../../../components/Header";

export default function Submitted() {
  return (
    <>
      <Header />
      <h1 className="text-4xl font-medium">Thank you!</h1>
      <p className="">
        We&apos;ve received your submission and will try to add it to the
        overview as fast as we can. We appreciate your contribution!
      </p>
      <TextLink href="/">← Back to overview</TextLink>
    </>
  );
}

