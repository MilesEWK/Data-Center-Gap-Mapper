import { GAP_BRIEF, PAPERS } from "../data";
import { SOURCE_LINKS } from "../data/sourceLinks";
import { STUDY_NAME_TO_ID } from "../data/studyNameMap";
import { SEARCH_LOG } from "./searchFlow";

const PAPER_FIELDS = [
  "id", "citation", "year", "impact_category", "region", "dataset_type", "research_question",
  "methodology", "key_findings", "stated_limitations", "limitation_tags", "verbatim_quote_with_page",
] as const;

function csvCell(v: unknown): string {
  const s = Array.isArray(v) ? v.join("; ") : v === undefined || v === null ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function csv(header: readonly string[], rows: unknown[][]): string {
  return [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

/** papers.json exactly as stored (2-space indent, trailing newline). */
export function papersJson(): string {
  return JSON.stringify(PAPERS, null, 2) + "\n";
}

export function searchLogJson(): string {
  return JSON.stringify(SEARCH_LOG, null, 2) + "\n";
}

export function papersCsv(): string {
  return csv(PAPER_FIELDS, PAPERS.map((p) => PAPER_FIELDS.map((f) => p[f])));
}

export function contradictionsCsv(): string {
  const header = [
    "domain", "study_a", "study_a_id", "claim_a", "study_b", "study_b_id", "claim_b",
    "methodological_reason", "what_each_measured", "why_it_matters",
  ];
  return csv(header, GAP_BRIEF.contradictionMatrix.map((c) => [
    c.domain, c.studyA, STUDY_NAME_TO_ID[c.studyA] ?? "", c.claimA, c.studyB, STUDY_NAME_TO_ID[c.studyB] ?? "", c.claimB,
    c.methodologicalReason, c.whatEachMeasured ?? "", c.whyItMatters ?? "",
  ]));
}

const tex = (s: string) => s.replace(/([&%$#_{}])/g, "\\$1");

/** First DOI written in a citation, if any. */
export function doiOf(citation: string): string | null {
  const m = citation.match(/\b(10\.\d{4,9}\/[^\s,;]+[^\s,;.)])/);
  return m ? m[1] : null;
}

/** One @misc entry per study; the full citation goes in `note` because citations are free text. */
export function bibtex(): string {
  return PAPERS.map((p) => {
    const lines = [`  note = {${tex(p.citation)}}`, `  year = {${p.year}}`];
    const doi = doiOf(p.citation);
    if (doi) lines.push(`  doi = {${tex(doi)}}`);
    if (SOURCE_LINKS[p.id]) lines.push(`  url = {${SOURCE_LINKS[p.id]}}`);
    return `@misc{${p.id},\n${lines.join(",\n")}\n}\n`;
  }).join("\n");
}

/** Starts a browser download of generated text. */
export function download(filename: string, text: string, type: string): void {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
