// Pure, data-derived views used by pages and tests. Nothing here is hardcoded from the data.
import { GAP_BRIEF, PAPERS, PAPERS_BY_ID } from "../data";
import type { Contradiction, Domain, EvidencePoint } from "../data";
import { STUDY_NAME_TO_ID } from "../data/studyNameMap";
import type { ImpactCategory, LimitationTag, Paper } from "../types";
import { IMPACT_CATEGORIES, LIMITATION_TAGS } from "../types";

/** Short column labels for the gap map. The full tag name is always available alongside. */
export const SHORT_TAG: Record<LimitationTag, string> = {
  "Missing or Self-Reported Facility Data": "Facility data",
  "Indirect Power-Plant Water Excluded": "Indirect water",
  "Gross vs. Net Fiscal & Ratepayer Accounting": "Fiscal accounting",
  "Pre-AI Compute Baseline": "Pre-AI baseline",
  "Bottom-Up vs. Queue Modeling Divergence": "Model divergence",
};

export function studiesInCategory(category: ImpactCategory): Paper[] {
  return PAPERS.filter((p) => p.impact_category === category);
}

export function contradictionsInDomain(domain: Domain | null): Contradiction[] {
  return domain ? GAP_BRIEF.contradictionMatrix.filter((c) => c.domain === domain) : GAP_BRIEF.contradictionMatrix;
}

/** Paper ids a contradiction row refers to (via the display-name map). */
export function contradictionIds(c: Contradiction): string[] {
  return [STUDY_NAME_TO_ID[c.studyA], STUDY_NAME_TO_ID[c.studyB]].filter((id): id is string => Boolean(id));
}

/** Consensus or divergence points that cite at least one of the given paper ids. */
export function relatedEvidence(ids: readonly string[]): { kind: "agree" | "diverge"; point: EvidencePoint }[] {
  const set = new Set(ids);
  const { consensus, divergence } = GAP_BRIEF.evidenceOutline;
  return [
    ...consensus.filter((p) => p.citations.some((c) => set.has(c))).map((point) => ({ kind: "agree" as const, point })),
    ...divergence.filter((p) => p.citations.some((c) => set.has(c))).map((point) => ({ kind: "diverge" as const, point })),
  ];
}

export type EvidenceKind = "agree" | "diverge" | "gap";

/** Everything in the brief that references one study. */
export function appearsIn(id: string): {
  contradictions: Contradiction[];
  evidence: { kind: EvidenceKind; point: EvidencePoint }[];
} {
  const { consensus, divergence, primaryGap } = GAP_BRIEF.evidenceOutline;
  const cites = (p: EvidencePoint) => p.citations.includes(id);
  return {
    contradictions: GAP_BRIEF.contradictionMatrix.filter((c) => contradictionIds(c).includes(id)),
    evidence: [
      ...consensus.filter(cites).map((point) => ({ kind: "agree" as const, point })),
      ...divergence.filter(cites).map((point) => ({ kind: "diverge" as const, point })),
      ...primaryGap.supportingEvidence.filter(cites).map((point) => ({ kind: "gap" as const, point })),
    ],
  };
}

/** Gap map rows: grouped by domain in the fixed domain order, file order within a domain. */
export function gapMapRows(): Paper[] {
  return [...PAPERS].sort(
    (a, b) => IMPACT_CATEGORIES.indexOf(a.impact_category) - IMPACT_CATEGORIES.indexOf(b.impact_category),
  );
}

export function gapMapColumns(): { tag: LimitationTag; short: string; count: number }[] {
  return LIMITATION_TAGS.map((tag) => ({
    tag,
    short: SHORT_TAG[tag],
    count: PAPERS.filter((p) => p.limitation_tags.includes(tag)).length,
  }));
}

/** "shehabi_2024: reference year ..." → "shehabi_2024" if it is a real paper id. */
export function unresolvedStudyId(item: string): string | null {
  const id = item.split(":")[0]?.trim() ?? "";
  return PAPERS_BY_ID.has(id) ? id : null;
}

export function yearRange(): string {
  const years = PAPERS.map((p) => p.year);
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min}–${max}`;
}

export function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}
