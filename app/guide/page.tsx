import { supabase } from "../../utils/supabase";
import TextLink from "../../components/elements/TextLink";
import Header from "../../components/Header";
import ToolCard from "../../components/ToolCard";
import GuideClient from "./GuideClient";

async function getTools() {
  const { data: tools } = await supabase
    .from("tools")
    .select("*")
    .order("name", { ascending: true });
  return tools || [];
}

// Cache guide page for 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Guide() {
  const tools = await getTools();

  return (
    <>
      <Header />
      <TextLink href="/">← Back to all tools</TextLink>
      <GuideClient tools={tools} />
    </>
  );
}

