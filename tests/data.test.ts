import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { GAP_BRIEF, PAPERS } from "../src/data";
import { STUDY_NAME_TO_ID } from "../src/data/studyNameMap";
import { validateData } from "../src/data/validate";
import { EMPTY_FILTERS, filterPapers, rankedTags, tagCounts } from "../src/lib/filters";
import { parseFilters, serializeFilters } from "../src/lib/urlState";
import type { LimitationTag, Paper } from "../src/types";
import { LIMITATION_TAGS } from "../src/types";

const PAPERS_PATH = new URL("../src/data/papers.json", import.meta.url);
const HASH_PATH = new URL("./data.hash", import.meta.url);

// Independent read of the raw file, so tests don't only check the app's own import path.
const raw = JSON.parse(readFileSync(PAPERS_PATH, "utf8")) as Paper[];

// The original review had 9 studies; update v4 (Part 2) added 6 verified sources.
const ORIGINAL_STUDIES = 9;
const ADDED_IN_V4 = 6;
const ADDED_IN_V5 = 4;
const ADDED_IN_V6 = 5; // logged search, batch 6

describe("papers.json", () => {
  it(`contains ${ORIGINAL_STUDIES + ADDED_IN_V4 + ADDED_IN_V5 + ADDED_IN_V6} papers with unique ids`, () => {
    expect(PAPERS).toHaveLength(ORIGINAL_STUDIES + ADDED_IN_V4 + ADDED_IN_V5 + ADDED_IN_V6);
    expect(raw).toHaveLength(PAPERS.length);
    expect(new Set(PAPERS.map((p) => p.id)).size).toBe(PAPERS.length);
  });

  it("matches the SHA-256 recorded in tests/data.hash", () => {
    const actual = createHash("sha256").update(readFileSync(PAPERS_PATH)).digest("hex");
    const expected = readFileSync(HASH_PATH, "utf8").trim();
    expect(actual).toBe(expected);
  });

  it("passes runtime validation with no violations", () => {
    expect(validateData()).toEqual([]);
  });
});

describe("brief.ts cross-references", () => {
  const ids = new Set(raw.map((p) => p.id));

  it("every evidenceOutline citation exists in papers.json", () => {
    const { consensus, divergence, primaryGap } = GAP_BRIEF.evidenceOutline;
    const cited = [...consensus, ...divergence, ...primaryGap.supportingEvidence].flatMap((pt) => pt.citations);
    expect(cited.length).toBeGreaterThan(0);
    const missing = cited.filter((id) => !ids.has(id));
    expect(missing).toEqual([]);
  });

  it("every contradictionMatrix study name exists in the name map", () => {
    const names = GAP_BRIEF.contradictionMatrix.flatMap((c) => [c.studyA, c.studyB]);
    const unmapped = names.filter((n) => !(n in STUDY_NAME_TO_ID));
    expect(unmapped).toEqual([]);
    // ...and every mapped id is a real paper.
    const badIds = names.map((n) => STUDY_NAME_TO_ID[n]).filter((id) => !ids.has(id));
    expect(badIds).toEqual([]);
  });
});

describe("aggregation and filtering", () => {
  it("tag counts match a direct reduce over papers.json", () => {
    const expected = raw.reduce<Record<string, number>>((acc, p) => {
      for (const t of p.limitation_tags) acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {});
    const counts = tagCounts(PAPERS);
    for (const tag of LIMITATION_TAGS) expect(counts[tag]).toBe(expected[tag] ?? 0);
  });

  it("ranks all tags by count descending, ties alphabetical", () => {
    const ranked = rankedTags(PAPERS);
    expect(ranked.map((r) => r.tag).sort()).toEqual([...LIMITATION_TAGS].sort());
    for (let i = 1; i < ranked.length; i++) {
      const a = ranked[i - 1];
      const b = ranked[i];
      expect(a.count > b.count || (a.count === b.count && a.tag.localeCompare(b.tag) < 0)).toBe(true);
    }
  });

  it('the "Gross vs. Net Fiscal & Ratepayer Accounting" filter returns exactly the tagged papers', () => {
    const tag: LimitationTag = "Gross vs. Net Fiscal & Ratepayer Accounting";
    const result = filterPapers(PAPERS, { ...EMPTY_FILTERS, tags: [tag] }).map((p) => p.id);
    const expected = raw.filter((p) => p.limitation_tags.includes(tag)).map((p) => p.id);
    expect(expected.length).toBeGreaterThan(0);
    expect(result).toEqual(expected);
  });

  it("combines groups with AND and values within a group with OR", () => {
    const f = {
      ...EMPTY_FILTERS,
      categories: ["Water Consumption", "Economic & Tax Policy"] as Paper["impact_category"][],
      datasets: ["Public Fiscal / Tax Records"] as Paper["dataset_type"][],
    };
    const expected = raw
      .filter((p) => f.categories.includes(p.impact_category) && f.datasets.includes(p.dataset_type))
      .map((p) => p.id);
    expect(filterPapers(PAPERS, f).map((p) => p.id)).toEqual(expected);
  });
});

describe("URL state", () => {
  it("round-trips filters through the query string and drops unknown values", () => {
    const f = {
      q: "water",
      categories: ["Multi-Impact"] as Paper["impact_category"][],
      datasets: [] as Paper["dataset_type"][],
      tags: ["Pre-AI Compute Baseline", "Gross vs. Net Fiscal & Ratepayer Accounting"] as LimitationTag[],
      sort: { key: "year" as const, dir: "desc" as const },
    };
    expect(parseFilters(serializeFilters(f))).toEqual({ ...f, tags: [...LIMITATION_TAGS].filter((t) => f.tags.includes(t)) });
    expect(parseFilters("?cat=Bogus&tag=Nope&sort=foo:up")).toEqual(EMPTY_FILTERS);
  });
});

describe("review-level limitations", () => {
  it("classifies every study, and only studies in the set, by source type", async () => {
    const { SOURCE_TYPE_BY_ID } = await import("../src/data/sourceTypes");
    expect(Object.keys(SOURCE_TYPE_BY_ID).sort()).toEqual(PAPERS.map((p) => p.id).sort());
  });

  it("source-type counts sum to the study count", async () => {
    const { sourceTypeCounts } = await import("../src/lib/review");
    expect(sourceTypeCounts().reduce((n, t) => n + t.ids.length, 0)).toBe(PAPERS.length);
  });

  it("counts a state only when the record names it, and not Virginia inside West Virginia", async () => {
    const { stateCoverage, statesInPaper } = await import("../src/lib/review");
    for (const { state, ids } of stateCoverage()) {
      for (const id of ids) {
        const p = PAPERS.find((x) => x.id === id)!;
        const text = `${p.region} ${p.key_findings}`;
        const abbr = Object.entries({ Ohio: "OH", Texas: "TX" }).find(([n]) => n === state)?.[1];
        expect(text.includes(state) || (abbr !== undefined && text.includes(`, ${abbr}`)), `${id} ${state}`).toBe(true);
      }
    }
    expect(statesInPaper({ region: "West Virginia", key_findings: "" })).toEqual(["West Virginia"]);
    expect(statesInPaper({ region: "Franklin County, OH and Dallas County, TX", key_findings: "" })).toEqual(["Ohio", "Texas"]);
    expect(statesInPaper({ region: "IN OR CO2 emissions, CO2", key_findings: "" })).toEqual([]);
  });
});

describe("primary gap statement", () => {
  it("states the computed count of studies tagged Missing or Self-Reported Facility Data", () => {
    const m = GAP_BRIEF.evidenceOutline.primaryGap.statement.match(/\((\d+) of (\d+)\)/);
    expect(m, "statement must contain '(N of M)'").not.toBeNull();
    const tagged = PAPERS.filter((p) => p.limitation_tags.includes("Missing or Self-Reported Facility Data")).length;
    expect(Number(m![1])).toBe(tagged);
    expect(Number(m![2])).toBe(PAPERS.length);
  });
});

describe("search log", () => {
  it("is internally consistent and links only to studies in papers.json", async () => {
    const { SEARCH_LOG, searchFlow } = await import("../src/lib/searchFlow");
    const ids = new Set(PAPERS.map((p) => p.id));
    for (const r of SEARCH_LOG.records) {
      if (r.studyId) expect(ids.has(r.studyId), r.studyId).toBe(true);
      if (r.decision === "exclude") expect(r.exclusionReason, r.id).toBeTruthy();
      if (r.decision === "include") expect(r.status, r.id).toBeTruthy();
    }
    const f = searchFlow();
    expect(f.retrieved).toBe(f.duplicates + f.screened);
    expect(f.screened).toBe(f.excluded + f.eligible);
    expect(f.eligible).toBe(f.extracted + f.alreadyInReview + f.notYetExtracted);
    expect(f.handSelected + f.extracted).toBe(PAPERS.length);
  });
});

describe("downloads", () => {
  it("papers.json download is byte-identical to the stored file", async () => {
    const { papersJson } = await import("../src/lib/exports");
    expect(papersJson()).toBe(readFileSync(PAPERS_PATH, "utf8"));
  });

  it("CSV and BibTeX exports have one entry per record", async () => {
    const { bibtex, contradictionsCsv, doiOf, papersCsv } = await import("../src/lib/exports");
    const csv = papersCsv();
    expect(csv.startsWith("id,citation,year,")).toBe(true);
    for (const p of PAPERS) expect(csv).toContain(`\r\n${p.id},`);
    expect(contradictionsCsv().split("\r\n").filter((l) => /^(Grid|Water|Economic|Multi)/.test(l)).length).toBe(
      GAP_BRIEF.contradictionMatrix.length,
    );
    const bib = bibtex();
    expect(bib.match(/^@misc\{/gm)?.length).toBe(PAPERS.length);
    expect(doiOf("Front. Environ. Sci. 14, 1939591. https://doi.org/10.3389/fenvs.2026.1939591")).toBe("10.3389/fenvs.2026.1939591");
  });
});
