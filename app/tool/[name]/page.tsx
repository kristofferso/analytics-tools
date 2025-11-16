import TextLink from "../../../components/elements/TextLink";
import { supabase } from "../../../utils/supabase";
import { capitalize } from "../../../utils/capitalize";
import Image from "next/image";
import Button from "../../../components/elements/Button";
import Header from "../../../components/Header";
import ToolClient from "./ToolClient";

async function getTool(name: string) {
  const upperName = name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
  const { data: tool } = await supabase
    .from("tools")
    .select("*")
    .ilike("name", upperName)
    .single();

  return tool;
}

export async function generateStaticParams() {
  const { data: tools } = await supabase.from("tools").select("*");

  return (tools || []).map((tool) => ({
    name: tool.name.toLowerCase().replace(/\s/g, "-"),
  }));
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const tool = await getTool(name);

  if (!tool) {
    return null;
  }

  return <ToolClient tool={tool} />;
}

