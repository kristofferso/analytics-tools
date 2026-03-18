import type { Tool } from "../types/tool";

export interface CompareContent {
  intro: string;
  chooseA: string[];
  chooseB: string[];
  verdict: string;
}

function formatPrice(tool: Tool): string {
  if (tool.price_starting === 0) return "free";
  return `$${tool.price_starting}/mo`;
}

function hostingLabel(h: Tool["hosting"]): string {
  if (h === "both") return "cloud and self-hosted";
  if (h === "self") return "self-hosted";
  return "cloud-hosted";
}

export function generateCompareContent(
  toolA: Tool,
  toolB: Tool
): CompareContent {
  const priceA = formatPrice(toolA);
  const priceB = formatPrice(toolB);

  const privacyDiff = toolA.privacy_friendly !== toolB.privacy_friendly;
  const openSourceDiff = toolA.open_source !== toolB.open_source;
  const hostingDiff = toolA.hosting !== toolB.hosting;
  const priceDiff = toolA.price_starting !== toolB.price_starting;
  const sameType = toolA.type === toolB.type;
  const typeDesc = sameType ? toolA.type : `${toolA.type} and ${toolB.type}`;

  // ── Intro ────────────────────────────────────────────────────────────────
  let intro = `${toolA.name} and ${toolB.name} are both ${typeDesc} tools`;

  if (privacyDiff) {
    const privacyName = toolA.privacy_friendly ? toolA.name : toolB.name;
    const otherName = toolA.privacy_friendly ? toolB.name : toolA.name;
    intro += `, but they take very different approaches to user privacy. ${privacyName} is designed to be cookieless and GDPR-compliant by default, while ${otherName} relies on traditional tracking methods that may require a cookie consent banner.`;
  } else if (priceDiff && (toolA.price_starting === 0 || toolB.price_starting === 0)) {
    const freeName = toolA.price_starting === 0 ? toolA.name : toolB.name;
    const paidName = toolA.price_starting === 0 ? toolB.name : toolA.name;
    const paidPrice = toolA.price_starting === 0 ? priceB : priceA;
    intro += `. ${freeName} is free to use, while ${paidName} starts at ${paidPrice}. The core question is whether ${paidName}'s additional features justify the cost for your use case.`;
  } else if (openSourceDiff) {
    const osName = toolA.open_source ? toolA.name : toolB.name;
    const closedName = toolA.open_source ? toolB.name : toolA.name;
    intro += `. The key distinction is that ${osName} is open source and can be self-hosted, giving you full data ownership, while ${closedName} is a closed-source SaaS product managed entirely by the vendor.`;
  } else if (hostingDiff) {
    intro += `. They differ primarily in deployment: ${toolA.name} is ${hostingLabel(toolA.hosting)}, while ${toolB.name} is ${hostingLabel(toolB.hosting)}.`;
  } else {
    intro += `. Both share similar pricing and core functionality — the choice usually comes down to which dashboard experience fits your workflow and which ecosystem your team prefers.`;
  }

  // ── Choose A reasons ─────────────────────────────────────────────────────
  const chooseA: string[] = [];

  if (toolA.privacy_friendly && !toolB.privacy_friendly) {
    chooseA.push(
      "Privacy compliance matters to you — it is cookieless and GDPR-ready without extra setup"
    );
  }
  if (!toolA.cookie_based && toolB.cookie_based) {
    chooseA.push(
      "You want to avoid cookie consent banners and collect data without using cookies"
    );
  }
  if (toolA.open_source && !toolB.open_source) {
    chooseA.push(
      "You want full data ownership and the ability to audit or modify the code"
    );
  }
  if (toolA.hosting === "self" && toolB.hosting !== "self") {
    chooseA.push("You prefer to run analytics on your own infrastructure");
  }
  if (toolA.hosting === "both" && toolB.hosting === "cloud") {
    chooseA.push(
      "You want the option to self-host now or in the future without switching tools"
    );
  }
  if (
    toolA.price_starting < toolB.price_starting &&
    toolA.price_starting === 0
  ) {
    chooseA.push("You need a completely free solution");
  } else if (
    toolA.price_starting < toolB.price_starting &&
    toolA.price_starting > 0
  ) {
    chooseA.push(
      `Budget is a priority — ${toolA.name} costs ${priceA} vs ${priceB} for ${toolB.name}`
    );
  }
  if (toolA.analysis_level === "advanced" && toolB.analysis_level !== "advanced") {
    chooseA.push(
      "You need advanced features like funnels, cohort analysis, or user journey tracking"
    );
  }
  if (toolA.analysis_level === "simple" && toolB.analysis_level !== "simple") {
    chooseA.push(
      "You just want simple, fast traffic insights without complex configuration"
    );
  }

  if (chooseA.length < 2) {
    chooseA.push(`You prefer a more lightweight, focused analytics experience`);
    if (toolA.demo_link) {
      chooseA.push(`You want to evaluate before committing — a live demo is available`);
    } else {
      chooseA.push(`The ${toolA.name} dashboard and reporting style matches your workflow`);
    }
  }

  // ── Choose B reasons ─────────────────────────────────────────────────────
  const chooseB: string[] = [];

  if (toolB.privacy_friendly && !toolA.privacy_friendly) {
    chooseB.push(
      "Privacy compliance matters to you — it is cookieless and GDPR-ready without extra setup"
    );
  }
  if (!toolB.cookie_based && toolA.cookie_based) {
    chooseB.push(
      "You want to avoid cookie consent banners and collect data without using cookies"
    );
  }
  if (toolB.open_source && !toolA.open_source) {
    chooseB.push(
      "You want full data ownership and the ability to audit or modify the code"
    );
  }
  if (toolB.hosting === "self" && toolA.hosting !== "self") {
    chooseB.push("You prefer to run analytics on your own infrastructure");
  }
  if (toolB.hosting === "both" && toolA.hosting === "cloud") {
    chooseB.push(
      "You want the option to self-host now or in the future without switching tools"
    );
  }
  if (
    toolB.price_starting < toolA.price_starting &&
    toolB.price_starting === 0
  ) {
    chooseB.push("You need a completely free solution");
  } else if (
    toolB.price_starting < toolA.price_starting &&
    toolB.price_starting > 0
  ) {
    chooseB.push(
      `Budget is a priority — ${toolB.name} costs ${priceB} vs ${priceA} for ${toolA.name}`
    );
  }
  if (toolB.analysis_level === "advanced" && toolA.analysis_level !== "advanced") {
    chooseB.push(
      "You need advanced features like funnels, cohort analysis, or user journey tracking"
    );
  }
  if (toolB.analysis_level === "simple" && toolA.analysis_level !== "simple") {
    chooseB.push(
      "You just want simple, fast traffic insights without complex configuration"
    );
  }

  if (chooseB.length < 2) {
    chooseB.push(`You prefer a more comprehensive analytics feature set`);
    if (toolB.demo_link) {
      chooseB.push(`You want to evaluate before committing — a live demo is available`);
    } else {
      chooseB.push(`The ${toolB.name} dashboard and reporting style matches your workflow`);
    }
  }

  // ── Verdict ──────────────────────────────────────────────────────────────
  let verdict: string;

  if (privacyDiff) {
    const privacyWinner = toolA.privacy_friendly ? toolA.name : toolB.name;
    const otherTool = toolA.privacy_friendly ? toolB.name : toolA.name;
    verdict = `If privacy compliance is non-negotiable, ${privacyWinner} is the clear winner — no cookies, no consent banners, no configuration required. If you need richer user-level tracking and are comfortable managing GDPR consent, ${otherTool} gives you more data to work with.`;
  } else if (priceDiff && (toolA.price_starting === 0 || toolB.price_starting === 0)) {
    const freeTool = toolA.price_starting === 0 ? toolA.name : toolB.name;
    const paidTool = toolA.price_starting === 0 ? toolB.name : toolA.name;
    verdict = `Start with ${freeTool} if you are on a budget or just getting started. Consider switching to ${paidTool} once your traffic grows and you need the additional insights or support that come with a paid plan.`;
  } else if (openSourceDiff) {
    const osTool = toolA.open_source ? toolA.name : toolB.name;
    const closedTool = toolA.open_source ? toolB.name : toolA.name;
    verdict = `Choose ${osTool} if you want complete control over your data and are comfortable running your own infrastructure. Choose ${closedTool} if you would rather pay for a fully managed service and avoid the operational overhead.`;
  } else if (hostingDiff) {
    const selfTool =
      toolA.hosting === "self" || toolA.hosting === "both" ? toolA.name : toolB.name;
    const cloudTool =
      toolA.hosting === "self" || toolA.hosting === "both" ? toolB.name : toolA.name;
    verdict = `Go with ${selfTool} if data sovereignty and self-hosting are important to your organisation. ${cloudTool} is the better pick if you want zero infrastructure work and a hosted solution from day one.`;
  } else {
    verdict = `Both ${toolA.name} and ${toolB.name} are solid choices for ${typeDesc}. If possible, try the free trials or demos of each — the best tool is usually the one whose dashboard you will actually check every day.`;
  }

  return { intro, chooseA, chooseB, verdict };
}
