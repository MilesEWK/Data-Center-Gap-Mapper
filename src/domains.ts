// UI-only domain vocabulary: colour keys, short names, and the /domains/:slug routes.
// Records keyed by the unions make the compiler reject a missing category.
import type { Domain } from "./data";
import type { ImpactCategory } from "./types";

/** Colour key per impact category (matches the --grid / --water / --fiscal / --multi tokens). */
const COLOR_KEY: Record<ImpactCategory, "grid" | "water" | "fiscal" | "multi"> = {
  "Grid & Emissions": "grid",
  "Water Consumption": "water",
  "Economic & Tax Policy": "fiscal",
  "Multi-Impact": "multi",
};

/** Short display name used in navigation, filters and cards. */
export const SHORT_NAME: Record<ImpactCategory, string> = {
  "Grid & Emissions": "Grid & Emissions",
  "Water Consumption": "Water",
  "Economic & Tax Policy": "Fiscal & Tax",
  "Multi-Impact": "Multi-impact",
};

/** Route slug for each single-domain page. Multi-Impact has no page of its own. */
export const DOMAIN_SLUGS: Record<string, Domain> = {
  grid: "Grid & Emissions",
  water: "Water Consumption",
  fiscal: "Economic & Tax Policy",
};

export function slugFor(domain: Domain): string {
  return Object.entries(DOMAIN_SLUGS).find(([, d]) => d === domain)?.[0] ?? "";
}

/** Class that sets --dom (and --dom-tint) for this category, e.g. "dom-water". */
export function domClass(category: string): string {
  const key = COLOR_KEY[category as ImpactCategory];
  return key ? `dom-${key}` : "dom-none";
}
