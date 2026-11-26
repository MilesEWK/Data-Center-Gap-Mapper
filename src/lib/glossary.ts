import type { Contradiction } from "../data";

/** Plain-language glossary. Definitions are written for this site; citations point to where a study defines or uses the term. */
export interface GlossaryEntry {
  slug: string;
  term: string;
  definition: string;
  /** "defined": the study defines the term in these words or close to them; "example": the study uses it. */
  cite?: { kind: "defined" | "example"; id: string; text: string };
  /** Case-insensitive patterns that count as a use of the term in page text. */
  match: RegExp;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: "wue",
    term: "WUE (water usage effectiveness)",
    definition: "Liters of water a data center uses on site for each kilowatt-hour of energy its IT equipment uses. It leaves out water used at power plants.",
    cite: { kind: "defined", id: "han_2026", text: "the ratio of total direct/on-site water consumption to total IT energy (p. 3)" },
    match: /\bWUEs?\b(?!source)/,
  },
  {
    slug: "pue",
    term: "PUE (power usage effectiveness)",
    definition: "A facility's total energy use divided by the energy its IT equipment uses. A value of 1.0 would mean no energy went to cooling or power conversion.",
    cite: { kind: "defined", id: "muller_2026", text: "the ratio of total facility power to IT equipment power (p. 5)" },
    match: /\bPUEs?\b/,
  },
  {
    slug: "ewif",
    term: "EWIF (electricity water intensity factor)",
    definition: "Water used at power plants for each kilowatt-hour of electricity they generate. It changes with the mix of plants on the grid.",
    cite: { kind: "example", id: "li_2023", text: "uses a U.S. average off-site EWIF of 3.142 L/kWh" },
    match: /\bEWIF\b/,
  },
  {
    slug: "wuesource",
    term: "WUEsource",
    definition: "A version of WUE that adds the water used to generate a facility's electricity to the water it uses on site.",
    cite: { kind: "example", id: "mytton_2021", text: "proposes WUEsource" },
    match: /\bWUEsource\b/,
  },
  {
    slug: "withdrawal-consumption",
    term: "Water withdrawal vs. consumption",
    definition: "Withdrawal is all water taken from a river, lake, or aquifer, much of which is returned. Consumption is the part not returned, mostly lost to evaporation.",
    cite: { kind: "example", id: "cook_2026", text: "Texas grid power for data centers consumes about 17 billion gallons but withdraws about 1,067 billion gallons a year (p. 10)" },
    match: /\bwithdrawals?\b/i,
  },
  {
    slug: "direct-indirect-water",
    term: "Direct vs. indirect water",
    definition: "Direct water is used at the data center itself, mostly for cooling. Indirect water is used elsewhere on its behalf, mainly at the power plants that generate its electricity.",
    cite: { kind: "defined", id: "james_2025", text: "direct use is water consumed on-site; indirect use is water consumed in the value chain, including electricity generation (p. 4)" },
    match: /\b(?:in)?direct (?:water|on-site water|power-plant water)\b/i,
  },
  {
    slug: "capacity-market",
    term: "Capacity auction / capacity market",
    definition: "A market where a grid operator pays power plants in advance to be available during future periods of peak demand. PJM runs one as an annual auction, and its costs reach customers' bills.",
    cite: { kind: "example", id: "pjm_imm_2026", text: "a $29.4 billion capacity-cost increase from including data center load in the auctions (pp. 1, 51)" },
    match: /\bcapacity[- ](?:market|auction|cost)s?\b/i,
  },
  {
    slug: "balancing-authority",
    term: "Balancing authority",
    definition: "The organization responsible for keeping electricity supply and demand matched, moment to moment, within a region of the grid.",
    cite: { kind: "example", id: "james_2025", text: "maps each Phoenix-area data center to its balancing authority, APS or SRP (p. 15)" },
    match: /\bbalancing[- ]authorit(?:y|ies)\b/i,
  },
  {
    slug: "grid-mix",
    term: "Grid mix / emissions intensity",
    definition: "The grid mix is the combination of power sources supplying a region. Emissions intensity is the CO2 released per unit of electricity, which depends on that mix.",
    cite: { kind: "defined", id: "iqbal_2026", text: "CO2 intensity as power-sector CO2 emissions divided by electricity generation (p. 4)" },
    match: /\b(?:grid mix|carbon intensity|emissions intensity|CO2 intensity)\b/i,
  },
  {
    slug: "but-for",
    term: "\"But-for\" attribution",
    definition: "Counting only the activity that would not have happened without a policy, such as a tax break, rather than all activity that received it.",
    cite: { kind: "example", id: "justice_2025", text: "attributes 30% of data center activity to Georgia's exemption (p. 3)" },
    match: /\bbut[- ]for\b/i,
  },
  {
    slug: "gross-net",
    term: "Gross vs. net fiscal impact",
    definition: "A gross figure counts all revenue or activity linked to a facility. A net figure subtracts costs such as forgone taxes, incentives, and public services.",
    cite: { kind: "example", id: "jlarc_2024", text: "the sales tax exemption returns 48 cents in revenue per $1 spent (Table 2-2, p. 23)" },
    match: /\b(?:gross|net) (?:fiscal|county|tax|revenue|return)\w*\b/i,
  },
  {
    slug: "abatement",
    term: "Abatement",
    definition: "A reduction in, or exemption from, a tax for a set period, often local property tax, offered to attract investment.",
    cite: { kind: "example", id: "hicks_2026", text: "Texas data center tax abatement programs projected to cost $9 billion from 2025 to 2030 (p. 54)" },
    match: /\babatements?\b/i,
  },
  {
    slug: "special-contract",
    term: "Special contract",
    definition: "A negotiated electricity agreement between a utility and one large customer, with terms that differ from the standard published rates.",
    cite: { kind: "example", id: "martin_2025", text: "reviews state utility commission proceedings on data center special contracts, which are often confidential (pp. 1-2)" },
    match: /\bspecial contracts?\b/i,
  },
  {
    slug: "hyperscale-colocation",
    term: "Hyperscale vs. colocation",
    definition: "A hyperscale data center is a very large facility run by one company for its own cloud or AI services. A colocation facility rents space, power, and cooling to many tenants.",
    cite: { kind: "example", id: "shehabi_2024", text: "hyperscale and colocation facilities accounted for 84% of direct water use in 2023 (p. 57)" },
    match: /\b(?:hyperscale|colocation)\b/i,
  },
  {
    slug: "instrumental-variable",
    term: "Instrumental variable",
    definition: "A statistical method that uses a factor which affects the cause but not the outcome directly, to separate cause and effect when other influences are mixed in.",
    cite: { kind: "example", id: "epri_prices_2026", text: "uses the length of the 1947 Interstate Highway Plan in each state as the instrument (p. 3)" },
    match: /\binstrument(?:al[- ]variables?)?\b/i,
  },
  {
    slug: "twh",
    term: "TWh (terawatt-hour)",
    definition: "A unit of electrical energy equal to one billion kilowatt-hours, used for annual national or state totals.",
    cite: { kind: "example", id: "shehabi_2024", text: "U.S. data centers used 176 TWh in 2023 (p. 7)" },
    match: /\bTWh\b/,
  },
  {
    slug: "gw",
    term: "GW (gigawatt)",
    definition: "A unit of power, or the rate of electricity use at a moment, equal to 1,000 megawatts. Data center capacity and grid demand are given in GW.",
    cite: { kind: "example", id: "compass_2026", text: "Texas transmission providers reported 78 GW of prospective large-load capacity for 2030 (p. 26)" },
    match: /\bGW\b/,
  },
  {
    slug: "mt-co2e",
    term: "Mt CO2e",
    definition: "Million metric tons of carbon dioxide equivalent, which adds other greenhouse gases to CO2 in proportion to their warming effect.",
    cite: { kind: "example", id: "guidi_2024", text: "105.59 million metric tons CO2e from U.S. data centers in a year" },
    match: /\bMt(?: CO2e?)?\b/,
  },
  {
    slug: "acre-foot",
    term: "Acre-foot",
    definition: "A volume of water that would cover one acre one foot deep, about 326,000 gallons. Water planners in the western U.S. use it for supply and demand.",
    cite: { kind: "example", id: "cook_2026", text: "25 billion gallons, or 77 thousand acre-feet, in 2025 (pp. 4, 6)" },
    match: /\bacre-f(?:oo|ee)t\b|\bkAF\b/i,
  },
];

export const GLOSSARY_BY_SLUG = new Map(GLOSSARY.map((g) => [g.slug, g]));

/**
 * For page text in display order, as [key, text] pairs, which glossary terms make their first
 * appearance in each piece. Keys are positions, so repeated identical text links only once.
 */
export function firstUses(entries: [string, string][]): Map<string, string[]> {
  const seen = new Set<string>();
  const plan = new Map<string, string[]>();
  for (const [key, text] of entries) {
    const here: string[] = [];
    for (const g of GLOSSARY) {
      if (!seen.has(g.slug) && g.match.test(text)) {
        seen.add(g.slug);
        here.push(g.slug);
      }
    }
    plan.set(key, here);
  }
  return plan;
}

export type Segment = { text: string; slug?: string };

/** Splits text so that the first match of each listed term becomes its own linked segment. */
export function linkSegments(text: string, slugs: string[]): Segment[] {
  const spans: { start: number; end: number; slug: string }[] = [];
  for (const slug of slugs) {
    const g = GLOSSARY_BY_SLUG.get(slug);
    if (!g) continue;
    const re = new RegExp(g.match.source, g.match.flags.replace("g", "") + "g");
    for (const m of text.matchAll(re)) {
      const start = m.index ?? 0;
      const end = start + m[0].length;
      if (!spans.some((s) => start < s.end && end > s.start)) {
        spans.push({ start, end, slug });
        break;
      }
    }
  }
  spans.sort((a, b) => a.start - b.start);
  const out: Segment[] = [];
  let pos = 0;
  for (const s of spans) {
    if (s.start > pos) out.push({ text: text.slice(pos, s.start) });
    out.push({ text: text.slice(s.start, s.end), slug: s.slug });
    pos = s.end;
  }
  if (pos < text.length) out.push({ text: text.slice(pos) });
  return out;
}

/** Keys for the text fields of one contradiction row, in display order. */
export const CONTRA_FIELDS = ["claimA", "claimB", "methodologicalReason", "whatEachMeasured", "whyItMatters"] as const;

/** Contradiction text in the order it appears on a page, keyed by row and field. */
export function contradictionTexts(rows: Contradiction[]): [string, string][] {
  return rows.flatMap((c, i) => CONTRA_FIELDS.map((f): [string, string] => [`c${i}|${f}`, c[f] ?? ""]));
}
