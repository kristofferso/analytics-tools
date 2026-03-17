import TextLink from "../../components/elements/TextLink";
import Header from "../../components/Header";
import GuideClient from "./GuideClient";
import { getAllTools } from "../../data/toolsData";

export default function Guide() {
  const tools = getAllTools();

  return (
    <>
      <Header />
      <TextLink href="/">← Back to all tools</TextLink>
      <GuideClient tools={tools} />
    </>
  );
}

