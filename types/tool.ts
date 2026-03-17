export type AnalysisLevel = "simple" | "medium" | "advanced";
export type Hosting = "cloud" | "self" | "both";

export interface Tool {
  name: string;
  type: string;
  color_tint: string;
  logo_url: string;
  screenshot_url?: string;
  privacy_friendly: boolean;
  open_source: boolean;
  cookie_based: boolean;
  features?: string;
  analysis_level: AnalysisLevel;
  hosting: Hosting;
  url: string;
  demo_link?: string;
  pricing_tier_dims?: string;
  price_starting: number;
}
