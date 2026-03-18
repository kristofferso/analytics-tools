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

export function getAlternativesForTool(slug: string): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return getAllTools().filter(
    (t) => t.type === tool.type && t.name !== tool.name
  );
}

/** Parses a compare slug like "plausible-vs-fathom" into [toolA, toolB]. */
export function parseCompareSlug(slug: string): [Tool, Tool] | null {
  let idx = slug.indexOf("-vs-");
  while (idx !== -1) {
    const aSlug = slug.slice(0, idx);
    const bSlug = slug.slice(idx + 4);
    const toolA = getToolBySlug(aSlug);
    const toolB = getToolBySlug(bSlug);
    if (toolA && toolB) return [toolA, toolB];
    idx = slug.indexOf("-vs-", idx + 1);
  }
  return null;
}

/** Returns all canonical compare slugs (A < B alphabetically by slug). */
export function getAllCompareSlugs(): string[] {
  const slugs = getAllToolSlugs();
  const pairs: string[] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push(`${slugs[i]}-vs-${slugs[j]}`);
    }
  }
  return pairs;
}
