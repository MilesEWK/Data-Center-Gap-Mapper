// Pure filtering, sorting, and aggregation logic. No React, no DOM: imported by the UI and by tests.
import type { DatasetType, ImpactCategory, LimitationTag, Paper } from "../types";
import { DATASET_TYPES, IMPACT_CATEGORIES, LIMITATION_TAGS } from "../types";

export type SortKey = "year" | "id" | "impact_category";
export type SortDir = "asc" | "desc";
export interface Sort {
  key: SortKey;
  dir: SortDir;
}

export interface FilterState {
  q: string;
  categories: ImpactCategory[];
  datasets: DatasetType[];
  tags: LimitationTag[];
  sort: Sort | null; // null = dataset (file) order
}

export const EMPTY_FILTERS: FilterState = { q: "", categories: [], datasets: [], tags: [], sort: null };

export function hasActiveFilters(f: FilterState): boolean {
  return f.q.trim() !== "" || f.categories.length > 0 || f.datasets.length > 0 || f.tags.length > 0;
}

/** Toggle a value in a list, keeping the list in the canonical vocabulary order. */
export function toggleValue<T extends string>(list: readonly T[], value: T, canonical: readonly T[]): T[] {
  const next = new Set(list);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return canonical.filter((v) => next.has(v));
}

function searchText(p: Paper): string {
  return [
    p.id,
    p.citation,
    String(p.year),
    p.impact_category,
    p.region,
    p.dataset_type,
    p.research_question,
    p.methodology,
    p.key_findings,
    p.stated_limitations,
    p.verbatim_quote_with_page,
    ...p.limitation_tags,
  ]
    .join("\n")
    .toLowerCase();
}

/**
 * AND across groups, OR within a group. An empty group places no constraint.
 * Keyword search: every whitespace-separated term must appear (case-insensitive).
 */
export function filterPapers(papers: readonly Paper[], f: FilterState): Paper[] {
  const terms = f.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return papers.filter((p) => {
    if (f.categories.length > 0 && !f.categories.includes(p.impact_category)) return false;
    if (f.datasets.length > 0 && !f.datasets.includes(p.dataset_type)) return false;
    if (f.tags.length > 0 && !p.limitation_tags.some((t) => f.tags.includes(t))) return false;
    if (terms.length > 0) {
      const text = searchText(p);
      if (!terms.every((t) => text.includes(t))) return false;
    }
    return true;
  });
}

/** Stable sort; ties keep dataset order. */
export function sortPapers(papers: readonly Paper[], sort: Sort | null): Paper[] {
  if (!sort) return [...papers];
  const sign = sort.dir === "asc" ? 1 : -1;
  const cmp = (a: Paper, b: Paper): number => {
    switch (sort.key) {
      case "year":
        return a.year - b.year;
      case "id":
        return a.id.localeCompare(b.id);
      case "impact_category":
        return a.impact_category.localeCompare(b.impact_category);
    }
  };
  return [...papers].sort((a, b) => sign * cmp(a, b));
}

export function tagCounts(papers: readonly Paper[]): Record<LimitationTag, number> {
  const counts = Object.fromEntries(LIMITATION_TAGS.map((t) => [t, 0])) as Record<LimitationTag, number>;
  for (const p of papers) for (const t of p.limitation_tags) counts[t] += 1;
  return counts;
}

/** All tags, count descending, ties alphabetical. */
export function rankedTags(papers: readonly Paper[]): { tag: LimitationTag; count: number }[] {
  const counts = tagCounts(papers);
  return LIMITATION_TAGS.map((tag) => ({ tag, count: counts[tag] })).sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  );
}

export interface CrossTab {
  cells: Record<DatasetType, Record<ImpactCategory, number>>;
  rowTotals: Record<DatasetType, number>;
  colTotals: Record<ImpactCategory, number>;
  total: number;
}

/** dataset_type rows × impact_category columns, with zeros for empty cells. */
export function crossTab(papers: readonly Paper[]): CrossTab {
  const zeroRow = () => Object.fromEntries(IMPACT_CATEGORIES.map((c) => [c, 0])) as Record<ImpactCategory, number>;
  const cells = Object.fromEntries(DATASET_TYPES.map((d) => [d, zeroRow()])) as CrossTab["cells"];
  const rowTotals = Object.fromEntries(DATASET_TYPES.map((d) => [d, 0])) as Record<DatasetType, number>;
  const colTotals = zeroRow();
  for (const p of papers) {
    cells[p.dataset_type][p.impact_category] += 1;
    rowTotals[p.dataset_type] += 1;
    colTotals[p.impact_category] += 1;
  }
  return { cells, rowTotals, colTotals, total: papers.length };
}
