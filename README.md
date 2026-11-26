# Literature Review & Citation Gap Mapper: US Hyperscale Data Center Impacts on Grid, Water, and Fiscal Systems

**Version:** 1.3 (Batches 1-4 hand-selected, plus Batch 6 from a logged search; n = 24 studies)
**Extraction date:** 2026-11-24 (Batches 1-4); 2026-11-25 (Batch 6 and the logged search)
**Repository contents:** `src/data/papers.json` (structured extraction dataset), `src/data/brief.ts` (research gap brief data module), `README.md` (methodology), and a React + TypeScript + Vite app in `src/` that renders both

## How to Run

Requires Node.js 22.12+ (or 24+) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (prints a local URL)
npm test         # run the Vitest suite (data integrity, cross-references, filters)
npm run build    # type-check with tsc, then build static files into dist/
```

`npm run preview` serves the production build locally. The build uses relative asset paths (`base: "./"`), so `dist/` can be hosted from any sub-path. The data files in `src/data/` are read-only; `tests/data.hash` pins the SHA-256 of `papers.json`, and the test suite fails if the file changes.

---

## 1. Research Question

> How do US hyperscale data centers affect (1) electric grid load and carbon emissions, (2) freshwater consumption and watershed stress, and (3) local fiscal and tax outcomes, and where do empirical estimates of these impacts diverge or remain unmeasured because of differences in modeling architecture, system boundaries, data transparency, and temporal baselines?

The dataset feeds two outputs: an interactive **Filterable Literature Matrix**, built from `src/data/papers.json`, and an analytical **Research Gap Brief**, built from `src/data/brief.ts`.

---

## 2. Systematic Search & Inclusion Protocol

### 2.1 Search Strategy

The review combines two routes. The first 19 studies (Batches 1-4) were **hand-selected** by targeted retrieval of known primary sources, before any logged search, in four venue types:

| Source type | Examples in corpus |
|---|---|
| Peer-reviewed journals | *Environmental Research Letters*, *npj Clean Water* |
| Preprint servers | arXiv (cs.CY, cs.LG) |
| National laboratory and government audit reports | Lawrence Berkeley National Laboratory; Virginia JLARC |
| Research-institute and policy-organization studies | EPRI; Good Jobs First; REMI / U.S. Chamber of Commerce |

Full texts were retrieved by web search and direct page fetch. Uploaded project files take precedence when present. Where a PDF page number was not visible in the retrieved text, the section heading is cited instead and the gap is noted in the record.

**Logged search (2026-11-25).** Five query strings were run in OpenAlex (publication dates 2020-2026), arXiv (submissions 2020-2026, field syntax), and Crossref (from 2020):

1. `"data center" electricity consumption United States`
2. `"data center" water consumption United States`
3. `"data center" tax incentive OR subsidy OR fiscal`
4. `"data center" electricity prices ratepayers`
5. `"data center" emissions OR "air pollution" United States`

The top 50 records per query and database, by each API's relevance ranking, were retrieved (523 records from 15 searches; arXiv returned fewer than 50 for every query and none for query 4). After removing 102 duplicates by DOI and normalized title, 421 records were screened on title and abstract against §2.2-2.3: an automatic first pass excluded records outside 2020-2026, records that never mention data centers, and records outside the three domains; every other record was screened by hand. 393 were excluded with a recorded reason and 28 were eligible: 3 were already in the review, 5 were extracted (Batch 6, prioritizing peer-reviewed articles and states other than Virginia), and 20 remain "eligible, not yet extracted". Every run, total-hit count, record, decision, and reason is in `src/data/searchLog.json`, and the Methods page computes the flow from it. Total-hit counts from OpenAlex and Crossref are very large because both match any query term; they are recorded as returned. The search is not exhaustive (top 50 per run, title-and-abstract screening only), and the 19 hand-selected studies did not pass through it.

### 2.2 Inclusion Criteria

| Criterion | Requirement |
|---|---|
| **Timeframe** | Published 2020–2026 |
| **Geographic scope** | United States (national, multi-state, state, or sub-state) as primary scope, or US figures reported explicitly |
| **Empirical data** | Reports at least one original quantitative estimate (energy, emissions, water, jobs, tax revenue, or subsidy cost) produced by a stated model, audit, or data compilation |
| **Impact domain** | Addresses at least one of: grid load and emissions, water consumption, or fiscal and tax policy |
| **Traceability** | At least one verbatim quote supporting the primary finding can be extracted with a page or section locator |

### 2.3 Exclusion Criteria

- Vendor or operator marketing whitepapers and product sustainability brochures.
- Opinion pieces, news articles, and blog posts without original quantification. News and secondary coverage were used only to locate primary sources, never as extraction sources.
- Studies that report only non-US results without separable US figures.
- Studies published before 2020.

### 2.4 Protocol Deviations (Disclosed)

| Study | Deviation | Rationale for retention |
|---|---|---|
| Mytton (2021) | Global narrative review; no stated sample or primary model | Reports an explicit US figure (1.7 billion L/day) and is a widely cited baseline for water-transparency claims |
| Li et al. (2023) | Global scope; arXiv preprint, revised through 2025 | Reports US state-level WUE/EWIF values and a US 2028 on-site water projection |
| EPRI (2026) | Utility-sector research institute; extracted from a summary brief, not the full white paper; no page numbers visible | Only scenario study in the set that uses state-level project pipeline data |
| REMI / U.S. Chamber (2026) | Commissioned by an industry-aligned business association | Extracted as the representative gross-economic-multiplier study; its own gross-vs.-net caveat is recorded |
| Mytton (2021) | Full text retrieved from the author's open-access republication because the publisher page could not be fetched | Same CC-BY article text |
| Martin & Peskoe / Harvard ELI (2025) | Legal-analysis paper from a law school program, with policy recommendations; no original quantitative model | Only source built from utility rate proceedings (nearly 50 reviewed); flagged as legal and policy analysis, as REMI was flagged for its sponsor |
| Ceres (2026) | Published by an investor-advocacy nonprofit; counts water withdrawals (including hydropower), not consumption | Only multi-state estimate of water withdrawn for data center electricity; flagged as an advocacy source, as REMI was |
| PJM Market Monitor (2026) | Only Section 1 (Introduction) of the Q3 2026 State of the Market report was retrieved; the $29.4 billion figure rests on separate auction analyses not reviewed | Only source quantifying capacity-market costs attributed to data center load |
| UT COMPASS (2026) | Living white paper (first published December 2025, last updated August 2026); the August 2026 version was extracted | Only scenario projection of Texas data center water to 2040 |
| Cook / HARC (2026) | States its 2030 water range three different ways (pp. 4, 6, 12); all three are recorded | Only Texas estimate reporting both withdrawal and consumption at power plants |
| Justice & Shepherd (2025), Georgia | Full report dated December 2025; the DOAA summary is marked revised January 2026, and a revised full text was not confirmed | Only net fiscal evaluation in the set built on state revenue data for 34 data centers |
| Watten et al. / EPRI (2026), `epri_prices_2026` | **Working paper** (EPRI white paper posted to arXiv, v1); utility-sector research institute. Coded `Utility / Grid Filings` (EIA Form 861, FERC Form 1) rather than the suggested `Engineering / Top-Down Model`, because the estimates are econometric on utility filings, not engineering models | Only causal (instrumental-variables) estimate of data center effects on retail electricity prices |
| Kay, Reaser & Taylor (2026), `kay_2026` | **Working paper** (Federal Reserve Bank of Dallas WP 2606, revised October 2026; earlier NBER conference draft April 2026; not peer-reviewed); extracted from the revision, printed page numbers used | Only wholesale-market dispatch model of data center price, cost, and CO2 effects |
| Han et al. (2024; v4 2026), `han_2024` | **Preprint** (arXiv, not peer-reviewed); extracted from v4 (June 8, 2026), retitled from v1 "The Unpaid Toll" | Only estimate of data center public health costs from air pollution |
| James, Perveen & Jacobson / Ceres (2025), `james_2025` | **Advocacy report** (Ceres, with Bluerisk analysis); pages 6-16 have no text layer and were read from rendered page images | Only Arizona study; combines on-site and electricity-related water at the regional level. Companion to `ceres_2026` |
| Kay, Reaser & Taylor (2026), revision | The October 2026 Dallas Fed revision changed the headline figures from the April 2026 NBER draft (wholesale prices 6.9% by 2025 instead of 2-6%; 8.9-28.1 instead of 5-16 million tons of CO2 per month); the record was re-extracted from the revision | Latest version used, as for Han et al. |
| Li et al. (2023), publication | Published in *Communications of the ACM* 68(7), 2025, but the published version returned HTTP 403, so extraction stays on the arXiv version without page numbers | Classified as peer-reviewed by its published venue |
| Zhou et al. (2026), `zhou_2026`; Han et al. (2026), `han_2026` | **Preprints** (arXiv, not peer-reviewed); found through the logged search | Only Texas household electricity cost model; only national estimate of peak water capacity demand on public water systems |
| Muller (2026), `muller_2026` | **Working paper** (NBER WP 35100, not peer-reviewed); found through the logged search | Only estimate of combined air pollution and greenhouse gas damages from data center electricity |
| Lei & Masanet (2022) and an *Energy & Fuels* (2026) carbon-capture study | Eligible in the logged search but not extracted: the published PUE/WUE article was reachable only as a differently titled 2021 preprint, and the carbon-capture article returned HTTP 403 | Listed as eligible, not yet extracted, in `searchLog.json` |
| *Not added:* CEPR DP21854; PFM for Prince William County (2022, **consultant report**); Karimi et al. (2025, *Applied Thermal Engineering* 276) | Primary documents returned HTTP 403 or a bot check, so no quote could be verified; skipped under the verify-before-adding rule | Listed in `GAP_BRIEF.unresolved` |

---

## 3. Data Extraction Schema & Controlled Vocabulary

### 3.1 Record Schema (`src/data/papers.json`)

| Field | Type | Definition |
|---|---|---|
| `id` | string | `firstauthor_year` key |
| `citation` | string | Author(s) (Year). Title. Venue/Institution. |
| `year` | integer | Publication year (first version for preprints) |
| `impact_category` | enum | Controlled vocabulary (§3.2) |
| `region` | string | Geographic scope as stated by the study |
| `dataset_type` | enum | Controlled vocabulary (§3.2) |
| `research_question` | string | One sentence stating the core empirical question |
| `methodology` | string | Sample size, time horizon, modeling or auditing method |
| `key_findings` | string | Quantitative results with units and page locators |
| `stated_limitations` | string | Blind spots and missing variables stated by the authors, plus extraction notes |
| `limitation_tags` | array (1–3) | Standardized blind-spot tags (§3.2) |
| `verbatim_quote_with_page` | string | Exact quote supporting the primary finding, with page or section locator |

### 3.2 Controlled Vocabulary

**`impact_category`** (exactly one)
- `Grid & Emissions`
- `Water Consumption`
- `Economic & Tax Policy`
- `Multi-Impact`

**`dataset_type`** (exactly one)
- `Utility / Grid Filings`
- `Corporate Sustainability Reports`
- `Engineering / Top-Down Model`
- `Public Fiscal / Tax Records`

**`limitation_tags`** (one to three; aligned to the ranked blind spots in the Gap Brief)

| Tag | Applies when |
|---|---|
| `Missing or Self-Reported Facility Data` | Conclusions rest on undisclosed, proprietary, or operator-self-reported facility data |
| `Indirect Power-Plant Water Excluded` | Water accounting omits thermoelectric (scope-2) water |
| `Gross vs. Net Fiscal & Ratepayer Accounting` | Fiscal results omit abatement costs, ratepayer costs, or externalities |
| `Pre-AI Compute Baseline` | Empirical baseline predates post-2023 AI compute clustering, or the authors concede averages lag recent growth |
| `Bottom-Up vs. Queue Modeling Divergence` | Results depend on the shipment-based vs. project-pipeline modeling choice |

### 3.3 Extraction Rules

1. **Grounding.** Values come only from explicit statements, tables, and figures in the retrieved source text. Absent metrics are recorded as `Not reported`. Unit conversions in the Gap Brief (m³ to L, per-day to per-year) are labeled as derived.
2. **Verification.** Every record carries a verbatim quote with a page or section locator.
3. **Validation.** `src/data/papers.json` was parsed with a JSON parser, and every record was checked for key order, enum membership, tag count (1–3), and integer `year`. `src/data/brief.ts` type-checks under `tsc --strict`.
4. **Unresolved values.** Items that could not be confirmed from retrieved text are listed as `UNKNOWN` in `GAP_BRIEF.unresolved` and are not imputed.

### 3.4 Included Studies (n = 24)

| # | `id` | Impact category | Dataset type | Tags |
|---|---|---|---|---|
| 1 | `guidi_2024` | Grid & Emissions | Engineering / Top-Down Model | Missing or Self-Reported Facility Data |
| 2 | `shehabi_2024` | Multi-Impact | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 3 | `epri_2026` | Grid & Emissions | Engineering / Top-Down Model | Bottom-Up vs. Queue Modeling Divergence |
| 4 | `siddik_2021` | Multi-Impact | Engineering / Top-Down Model | Pre-AI Compute Baseline; Missing or Self-Reported Facility Data |
| 5 | `mytton_2021` | Water Consumption | Corporate Sustainability Reports | Missing or Self-Reported Facility Data; Pre-AI Compute Baseline |
| 6 | `li_2023` | Water Consumption | Corporate Sustainability Reports | Missing or Self-Reported Facility Data |
| 7 | `jlarc_2024` | Multi-Impact | Public Fiscal / Tax Records | Pre-AI Compute Baseline; Gross vs. Net Fiscal & Ratepayer Accounting; Indirect Power-Plant Water Excluded |
| 8 | `tarczynska_2025` | Economic & Tax Policy | Public Fiscal / Tax Records | Missing or Self-Reported Facility Data; Gross vs. Net Fiscal & Ratepayer Accounting |
| 9 | `remi_2026` | Economic & Tax Policy | Engineering / Top-Down Model | Gross vs. Net Fiscal & Ratepayer Accounting |
| 10 | `martin_2025` | Economic & Tax Policy | Utility / Grid Filings | Gross vs. Net Fiscal & Ratepayer Accounting; Missing or Self-Reported Facility Data |
| 11 | `pjm_imm_2026` | Multi-Impact | Utility / Grid Filings | Bottom-Up vs. Queue Modeling Divergence; Missing or Self-Reported Facility Data |
| 12 | `justice_2025` | Economic & Tax Policy | Public Fiscal / Tax Records | Gross vs. Net Fiscal & Ratepayer Accounting; Missing or Self-Reported Facility Data |
| 13 | `compass_2026` | Water Consumption | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 14 | `cook_2026` | Water Consumption | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 15 | `ceres_2026` | Water Consumption | Utility / Grid Filings | Missing or Self-Reported Facility Data |
| 16 | `epri_prices_2026` | Economic & Tax Policy | Utility / Grid Filings | Missing or Self-Reported Facility Data; Pre-AI Compute Baseline |
| 17 | `kay_2026` | Grid & Emissions | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 18 | `han_2024` | Grid & Emissions | Engineering / Top-Down Model | Missing or Self-Reported Facility Data |
| 19 | `james_2025` | Water Consumption | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 20 | `iqbal_2026` | Grid & Emissions | Utility / Grid Filings | Missing or Self-Reported Facility Data |
| 21 | `hicks_2026` | Economic & Tax Policy | Public Fiscal / Tax Records | Missing or Self-Reported Facility Data; Pre-AI Compute Baseline |
| 22 | `zhou_2026` | Economic & Tax Policy | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 23 | `han_2026` | Water Consumption | Corporate Sustainability Reports | Missing or Self-Reported Facility Data; Indirect Power-Plant Water Excluded |
| 24 | `muller_2026` | Grid & Emissions | Engineering / Top-Down Model | Missing or Self-Reported Facility Data |

---

## 4. Analytical Lenses for Gap Detection

A research gap is treated as defensible only when it can be tied to at least one of the following lenses and supported by verbatim evidence from at least two included studies.

| # | Lens | Definition | Corpus example |
|---|---|---|---|
| 1 | **Methodological Divergence** | Different modeling architectures produce conflicting projections for the same metric | 325–580 TWh by 2028 from shipment forecasts (Shehabi 2024) vs. 380–790 TWh by 2030 from project pipelines (EPRI 2026) |
| 2 | **System-Boundary & Accounting Mismatches** | Studies disagree because they draw different measurement boundaries | 66 billion L direct vs. ~800 billion L indirect water (Shehabi 2024); gross county revenue (REMI 2026) vs. 48¢ net return per $1 (JLARC 2024) |
| 3 | **Dataset & Transparency Bias** | Conclusions depend on incomplete, non-standardized, or self-reported disclosures rather than audited public filings | Fewer than one-third of operators measure water (Mytton 2021); 11 of at least 36 subsidizing states disclose recipients (Tarczynska 2025) |
| 4 | **Temporal & Scale Blind Spots** | Baselines predate post-2023 AI compute clustering or omit local municipal and ratepayer costs | 2018 baseline (Siddik 2021); $14–$37/month Dominion residential cost increase by 2040 absent from gross multiplier models (JLARC 2024 vs. REMI 2026) |

The resulting contradiction matrix (one row per verified pairwise clash; see the Contradictions page for the current count) and the consensus, divergence, and primary-gap outline are in `src/data/brief.ts`.

---

## 5. Known Limitations of This Review

1. **Sample.** 24 studies: 19 hand-selected by targeted retrieval (Batches 1-4) and 5 added from the logged search in §2.1 (Batch 6). The search is real and reproducible but not exhaustive: it screened the top 50 records per query and database on title and abstract only, 20 eligible records are not yet extracted, and the hand-selected studies did not pass through its screening. The set should not be read as representative of the full literature.
2. **Preprint, working-paper, and grey-literature reliance.** Classified in `src/data/sourceTypes.ts` (a UI-only map, not a `papers.json` field): 5 peer-reviewed journal articles (Siddik 2021; Mytton 2021; Li et al., published in *Communications of the ACM* in 2025 but extracted from the arXiv version; Iqbal et al. 2026; Hicks et al. 2026); 7 preprints or working papers (Guidi 2024, Han 2024, Zhou 2026, and Han 2026 on arXiv; Watten et al. 2026, an EPRI white paper on arXiv; Kay et al. 2026, a Dallas Fed working paper; Muller 2026, an NBER working paper); and 12 institutional, government, consultant, or advocacy reports (LBNL, EPRI scenarios, JLARC, Good Jobs First, REMI / U.S. Chamber, Harvard ELI, PJM Market Monitor, Georgia DOAA / UGA, UT COMPASS, HARC, and two Ceres reports).
3. **Partial full-text access.** From `GAP_BRIEF.unresolved`: only the EPRI scenario brief (`epri_2026`) and only Section 1 of the PJM Market Monitor report (`pjm_imm_2026`) were retrieved. No study rests on an abstract alone. Pages 6-16 of Drained by Data (`james_2025`) have no text layer and were read from page images. Three batch-4 sources (CEPR DP21854, PFM for Prince William County, Karimi et al. 2025) and two eligible search records could not be retrieved and were not added. No `sources/` folder of local PDFs was available for the full-document check in update v6, so these gaps remain.
4. **Missing page locators.** Six quotes carry no page number, citing a section heading, abstract, or web page instead: Guidi (2024), EPRI (2026), Mytton (2021), Li (2023), REMI (2026), and Kay et al. (2026).
5. **Document version risk.** The retrieved LBNL PDF carries an "EMBARGOED REPORT: DO NOT DISTRIBUTE" header. Citations should be checked against the final public release (DOI 10.71468/P1WC7Q). Han et al. (2024) and Li et al. are cited from revised arXiv versions (v4 and v5), and Kay et al. from the October 2026 revision, whose headline figures differ from the April 2026 draft.
6. **Controlled-vocabulary compression.** The fixed `dataset_type` list has no category for economic simulation, econometrics, or project-pipeline data, so REMI (2026), EPRI (2026), Kay et al. (2026), Zhou et al. (2026), and Muller (2026) are coded `Engineering / Top-Down Model`, and Watten et al. (2026) and Iqbal et al. (2026) `Utility / Grid Filings`, as the closest fits. Bottom-up studies (Shehabi 2024; Siddik 2021) are also coded under the model label.
7. **Sponsor and perspective bias.** The set includes an industry-aligned study (REMI / U.S. Chamber 2026), utility-sector research (two EPRI studies), and advocacy-organization studies (Good Jobs First 2025; Ceres 2025 and 2026). Their claims are reported as extracted, with no independent reconciliation.
8. **Geographic concentration.** Counting a state when a study names it in its region or key findings (full name, or a two-letter abbreviation after a comma, as in "Franklin County, OH"; city names such as "New York City" do not count), sub-national evidence covers 16 states. Texas and Virginia now lead with 9 of 24 studies each (Virginia was 8 of 19 before update v6), followed by Arizona and Ohio (4 each) and Georgia (3); Illinois, Nevada, Oregon, and Washington have 2 each, and California, Indiana, Iowa, Kansas, Maryland, Nebraska, and Wyoming 1 each. The Methods page computes this table live from the data. Findings may not transfer to states with little or no coverage.
9. **No independent replication.** Quantitative values are reported as published. This review does not re-run any model or audit.
10. **Open issues.** 17 unresolved items are listed in `GAP_BRIEF.unresolved` and on the Methods page, including internal inconsistencies within sources, version changes, missing locators, and sources that could not be retrieved.

---

## 6. Citation

If you use this dataset, cite the repository and the underlying primary studies listed in `src/data/papers.json`.
