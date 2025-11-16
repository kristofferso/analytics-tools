import { supabase } from "../utils/supabase";
import ToolCard from "./../components/ToolCard";
import Header from "./../components/Header";
import FilterSection from "../components/FilterSection";
import { reduceDimension } from "../utils/reduceDimension";
import Link from "next/link";
import HomeClient from "./HomeClient";

async function getTools() {
  const { data: tools } = await supabase.from("tools").select("*");
  return tools || [];
}

export default async function Home() {
  const tools = await getTools();

  return <HomeClient tools={tools} />;
}

