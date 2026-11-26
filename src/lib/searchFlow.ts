import raw from "../data/searchLog.json";
import { PAPERS } from "../data";

export interface SearchRun {
  queryId: string;
  database: string;
  query: string;
  requestUrl: string;
  dateRun: string;
  totalHits: number | null;
  recordsRetrieved: number;
  status: "run" | "not run";
  note: string | null;
}

export interface SearchRecord {
  id: string;
  title: string;
  year: number | null;
  doi: string | null;
  venue: string | null;
  type: string | null;
  foundIn: string[];
  decision: "include" | "exclude";
  exclusionReason: string | null;
  status: "extracted" | "already in review" | "eligible, not yet extracted" | null;
  studyId: string | null;
  note: string | null;
}

export interface SearchLog {
  description: string;
  screeningMethod: string;
  queryNotes: string;
  runs: SearchRun[];
  records: SearchRecord[];
}

export const SEARCH_LOG = raw as SearchLog;

/** PRISMA-style counts, all computed from searchLog.json and papers.json. */
export function searchFlow() {
  const { runs, records } = SEARCH_LOG;
  const retrieved = runs.reduce((n, r) => n + r.recordsRetrieved, 0);
  const duplicates = records.reduce((n, r) => n + r.foundIn.length - 1, 0);
  const excludedRecords = records.filter((r) => r.decision === "exclude");
  const eligibleRecords = records.filter((r) => r.decision === "include");
  const extractedIds = new Set(eligibleRecords.filter((r) => r.status === "extracted").map((r) => r.studyId));
  const reasons = new Map<string, number>();
  for (const r of excludedRecords) {
    const key = r.exclusionReason?.startsWith("No abstract available") ? "No abstract available to confirm the criteria" : (r.exclusionReason ?? "");
    reasons.set(key, (reasons.get(key) ?? 0) + 1);
  }
  return {
    runsRun: runs.filter((r) => r.status === "run").length,
    runsNotRun: runs.filter((r) => r.status !== "run"),
    retrieved,
    duplicates,
    screened: records.length,
    excluded: excludedRecords.length,
    exclusionReasons: [...reasons.entries()].map(([reason, count]) => ({ reason, count })).sort((a, b) => b.count - a.count),
    eligible: eligibleRecords.length,
    extracted: extractedIds.size,
    alreadyInReview: eligibleRecords.filter((r) => r.status === "already in review").length,
    notYetExtracted: eligibleRecords.filter((r) => r.status === "eligible, not yet extracted").length,
    handSelected: PAPERS.filter((p) => !extractedIds.has(p.id)).length,
    runDates: [...new Set(runs.map((r) => r.dateRun))].sort(),
  };
}

/** One row per query string, with the hit count from each database. */
export function queryTable() {
  const byQuery = new Map<string, { queryId: string; label: string; cells: Record<string, SearchRun> }>();
  for (const r of SEARCH_LOG.runs) {
    const row = byQuery.get(r.queryId) ?? { queryId: r.queryId, label: "", cells: {} };
    if (r.database !== "arXiv") row.label = r.query;
    row.cells[r.database] = r;
    byQuery.set(r.queryId, row);
  }
  return [...byQuery.values()];
}

export const SEARCH_DATABASES = [...new Set(SEARCH_LOG.runs.map((r) => r.database))];
