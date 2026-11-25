// Runtime integrity checks, run once on app load. Reports violations; never alters data.
import { GAP_BRIEF, PAPERS, PAPERS_BY_ID } from "./index";
import { STUDY_NAME_TO_ID } from "./studyNameMap";
import { DATASET_TYPES, IMPACT_CATEGORIES, LIMITATION_TAGS } from "../types";

export function validateData(): string[] {
  const violations: string[] = [];
  const allowedCategories = new Set<string>(IMPACT_CATEGORIES);
  const allowedDatasets = new Set<string>(DATASET_TYPES);
  const allowedTags = new Set<string>(LIMITATION_TAGS);

  // Papers
  const seen = new Set<string>();
  PAPERS.forEach((p, i) => {
    const where = `papers.json[${i}] (${String(p.id)})`;
    if (seen.has(p.id)) violations.push(`${where}: duplicate id`);
    seen.add(p.id);
    if (!Number.isInteger(p.year)) violations.push(`${where}: year is not an integer`);
    if (!allowedCategories.has(p.impact_category))
      violations.push(`${where}: impact_category "${String(p.impact_category)}" is not an allowed value`);
    if (!allowedDatasets.has(p.dataset_type))
      violations.push(`${where}: dataset_type "${String(p.dataset_type)}" is not an allowed value`);
    if (!Array.isArray(p.limitation_tags)) {
      violations.push(`${where}: limitation_tags is not an array`);
    } else {
      const n = p.limitation_tags.length;
      if (n < 1 || n > 3) violations.push(`${where}: has ${n} limitation tags (expected 1-3)`);
      p.limitation_tags.forEach((t) => {
        if (!allowedTags.has(t)) violations.push(`${where}: limitation tag "${String(t)}" is not an allowed value`);
      });
    }
  });

  // Evidence outline citations
  const { consensus, divergence, primaryGap } = GAP_BRIEF.evidenceOutline;
  const sections: [string, typeof consensus][] = [
    ["consensus", consensus],
    ["divergence", divergence],
    ["primaryGap.supportingEvidence", primaryGap.supportingEvidence],
  ];
  for (const [name, points] of sections) {
    points.forEach((pt, i) => {
      pt.citations.forEach((id) => {
        if (!PAPERS_BY_ID.has(id))
          violations.push(`brief.ts evidenceOutline.${name}[${i}]: citation "${id}" matches no papers.json id`);
      });
    });
  }

  // Contradiction matrix display names → ids
  GAP_BRIEF.contradictionMatrix.forEach((row, i) => {
    for (const name of [row.studyA, row.studyB]) {
      const id = STUDY_NAME_TO_ID[name];
      if (id === undefined) violations.push(`brief.ts contradictionMatrix[${i}]: "${name}" is missing from studyNameMap.ts`);
      else if (!PAPERS_BY_ID.has(id))
        violations.push(`studyNameMap.ts: "${name}" maps to "${id}", which matches no papers.json id`);
    }
  });

  return violations;
}
