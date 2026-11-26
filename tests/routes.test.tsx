import { readFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { GapMap } from "../src/components/GapMap";
import { PAPERS } from "../src/data";
import { DOMAIN_SLUGS } from "../src/domains";
import { studiesInCategory } from "../src/lib/derive";
import { AppRoutes } from "../src/routes";
import type { Paper } from "../src/types";
import { LIMITATION_TAGS } from "../src/types";

const raw = JSON.parse(readFileSync(new URL("../src/data/papers.json", import.meta.url), "utf8")) as Paper[];

/** Server-rendered HTML, with React's text-node separators (<!-- -->) removed so plain text can be matched. */
function html(node: Parameters<typeof renderToString>[0]): string {
  return renderToString(node).replaceAll("<!-- -->", "");
}

function render(path: string): string {
  return html(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

function count(html: string, needle: string): number {
  return html.split(needle).length - 1;
}

describe("routes", () => {
  const firstId = raw[0].id;
  const cases: [string, string][] = [
    ["/", "Where the evidence on U.S. hyperscale data centers runs out"],
    ["/findings", "Findings"],
    ["/findings?tab=gap", "The primary gap"],
    ["/contradictions", "Contradictions"],
    ["/domains/grid", "Grid &amp; Emissions"],
    ["/domains/water", "Water Consumption"],
    ["/domains/fiscal", "Economic &amp; Tax Policy"],
    ["/blind-spots", "Blind spots"],
    ["/studies", "Studies"],
    [`/studies/${firstId}`, firstId],
    ["/methods", "Methods"],
  ];

  it.each(cases)("%s renders its page", (path, heading) => {
    const html = render(path);
    expect(html).toContain("<main");
    expect(html).toContain(heading);
    expect(html).not.toContain("Page not found");
  });

  it("an unknown study id renders the 404 page", () => {
    const html = render("/studies/not_a_real_id");
    expect(html).toContain("Page not found");
    expect(html).toContain("Back to Overview");
  });

  it("an unknown route renders the 404 page", () => {
    expect(render("/no/such/page")).toContain("Page not found");
    expect(render("/domains/multi")).toContain("Page not found");
  });

  it("the studies page applies filters from its URL query", () => {
    const tag = "Gross vs. Net Fiscal & Ratepayer Accounting";
    const html = render(`/studies?tag=${encodeURIComponent(tag)}`);
    const expected = raw.filter((p) => p.limitation_tags.includes(tag as Paper["limitation_tags"][number])).length;
    expect(html).toContain(`Showing ${expected} of ${raw.length} studies`);
  });
});

describe("resolved data", () => {
  it('no rendered page contains the text "UNKNOWN"', () => {
    const paths = [
      "/",
      "/findings",
      "/findings?tab=diverge",
      "/findings?tab=gap",
      "/contradictions",
      ...Object.keys(DOMAIN_SLUGS).map((s) => `/domains/${s}`),
      "/blind-spots",
      "/studies",
      "/methods",
      ...raw.map((p) => `/studies/${p.id}`),
    ];
    for (const path of paths) expect(render(path), path).not.toContain("UNKNOWN");
  });
});

describe("page copy", () => {
  const pages = [
    "/",
    "/findings",
    "/contradictions",
    ...Object.keys(DOMAIN_SLUGS).map((s) => `/domains/${s}`),
    "/blind-spots",
    "/studies",
    "/methods",
    ...raw.map((p) => `/studies/${p.id}`),
  ];
  // Helper and intro text lives in these classes; the shared footer is deliberately excluded.
  const helperClasses = ["page-lede", "section-lede", "figure-desc", "gm-key-hint", "filter-logic", "table-note"];
  const strip = (h: string) => h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").trim();
  const helpersOn = (html: string) =>
    helperClasses.flatMap((c) =>
      [...html.matchAll(new RegExp(`<(p|span) class="${c}"[^>]*>([\\s\\S]*?)</\\1>`, "g"))].map((m) => strip(m[2])),
    );

  it("no helper sentence appears on more than one page", () => {
    // Guard against a vacuous pass: the extractor must find the known intro and helper lines.
    const blind = helpersOn(render("/blind-spots"));
    expect(blind).toContain("Recurring weaknesses in how these studies collect and count their data.");
    expect(blind).toContain("Select a bar to list those studies.");
    expect(helpersOn(render("/"))).toContain("Select a column name to list those studies.");
    const seen = new Map<string, string>();
    for (const path of pages) {
      for (const text of new Set(helpersOn(render(path)))) {
        expect(seen.get(text), `"${text}" on ${seen.get(text)} and ${path}`).toBeUndefined();
        seen.set(text, path);
      }
    }
  });

  it('no section text starts with "This section" or "Below"', () => {
    for (const path of pages) {
      for (const text of helpersOn(render(path))) expect(text, path).not.toMatch(/^(This section|Below)\b/);
    }
  });

  it('"Open study" appears at most once per card', () => {
    const html = render("/methods");
    for (const li of html.split("<li").slice(1)) expect(li.split("Open study").length - 1).toBeLessThanOrEqual(1);
  });
});

describe("domain pages", () => {
  it.each(Object.entries(DOMAIN_SLUGS))("/domains/%s study count equals a direct filter", (slug, category) => {
    const direct = raw.filter((p) => p.impact_category === category);
    expect(studiesInCategory(category).map((p) => p.id)).toEqual(direct.map((p) => p.id));

    // The "Studies in this domain" section lists exactly those studies.
    const html = render(`/domains/${slug}`);
    const section = html.slice(html.indexOf('id="d-studies"'), html.indexOf('id="d-multi"'));
    expect(count(section, "data-study-id=")).toBe(direct.length);
    for (const p of direct) expect(section).toContain(`data-study-id="${p.id}"`);
  });
});

describe("gap map", () => {
  const map = html(
    <MemoryRouter>
      <GapMap />
    </MemoryRouter>,
  );

  it("has one cell per study per tag (24 × 5)", () => {
    expect(count(map, "data-cell=")).toBe(24 * 5);
    expect(count(map, "data-cell=")).toBe(PAPERS.length * LIMITATION_TAGS.length);
  });

  it("fills exactly as many cells as there are tag assignments", () => {
    const totalTags = raw.reduce((n, p) => n + p.limitation_tags.length, 0);
    expect(count(map, 'data-on="true"')).toBe(totalTags);
  });

  it("calls out every tag no study carries", () => {
    for (const tag of LIMITATION_TAGS) {
      const used = raw.some((p) => p.limitation_tags.includes(tag));
      const callout = `no study in this set is tagged ${tag.replace(/&/g, "&amp;")}.`;
      expect(map.includes(callout)).toBe(!used);
    }
  });
});
