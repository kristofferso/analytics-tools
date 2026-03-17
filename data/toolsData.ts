import { tools } from "./tools";
import type { Tool } from "../types/tool";

export function getAllTools(): Tool[] {
  return [...tools].sort((a, b) => a.name.localeCompare(b.name));
}

export function getToolBySlug(slug: string): Tool | null {
  return tools.find((t) => t.name.toLowerCase().replace(/\s/g, "-") === slug) ?? null;
}

export function getAllToolSlugs(): string[] {
  return getAllTools().map((t) => t.name.toLowerCase().replace(/\s/g, "-"));
}
