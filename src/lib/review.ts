import { GAP_BRIEF, PAPERS } from "../data";
import { SOURCE_TYPE_BY_ID, SOURCE_TYPES, type SourceType } from "../data/sourceTypes";
import { unresolvedStudyId } from "./derive";

/** Review-level figures for the Methods page, all computed from papers.json and brief.ts. */

export function sourceTypeCounts(): { type: SourceType; ids: string[] }[] {
  return SOURCE_TYPES.map((type) => ({
    type,
    ids: PAPERS.filter((p) => SOURCE_TYPE_BY_ID[p.id] === type).map((p) => p.id),
  }));
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const STATE_ABBR: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut",
  DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island",
  SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

/**
 * States a record names in its region or key findings (where its sub-national evidence is reported).
 * Full names match anywhere; two-letter abbreviations only after a comma, as in "Franklin County, OH",
 * so words such as "IN", "OR", or "CO2" are never read as states.
 */
export function statesInPaper(p: { region: string; key_findings: string }): string[] {
  const text = `${p.region} ${p.key_findings}`;
  const abbrs = new Set([...text.matchAll(/, ([A-Z]{2})\b/g)].map((m) => STATE_ABBR[m[1]]).filter(Boolean));
  return US_STATES.filter((s) => {
    // "Virginia" must not match inside "West Virginia"; "Washington" must not match "Washington, D.C.";
    // a city named after a state ("New York City", "Kansas City") is a comparison, not state evidence.
    const re = new RegExp(`(?<!West )\\b${s}\\b(?!,? D\\.?C\\.?)(?! City)`);
    return re.test(text) || abbrs.has(s);
  });
}

/** States with sub-national evidence, most-covered first, with the studies covering each. */
export function stateCoverage(): { state: string; ids: string[] }[] {
  const map = new Map<string, string[]>();
  for (const p of PAPERS) for (const s of statesInPaper(p)) map.set(s, [...(map.get(s) ?? []), p.id]);
  return [...map.entries()]
    .map(([state, ids]) => ({ state, ids }))
    .sort((a, b) => b.ids.length - a.ids.length || a.state.localeCompare(b.state));
}

/** Studies whose verbatim quote has no page number (a section heading or web page is cited instead). */
export function missingPageLocators(): string[] {
  return PAPERS.filter((p) => !/\((?:[^)]*\b)?pp?\. [ivxlc\d]/i.test(p.verbatim_quote_with_page)).map((p) => p.id);
}

/** Studies whose open issue says only part of the document, or only an abstract, was retrieved. */
export function partialAccess(): string[] {
  const ids = GAP_BRIEF.unresolved
    .filter((u) => /not retrieved|was retrieved|abstract only/i.test(u))
    .map(unresolvedStudyId)
    .filter((id): id is string => id !== null);
  return [...new Set(ids)];
}
