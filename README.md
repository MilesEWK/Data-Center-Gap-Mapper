# Literature Review & Citation Gap Mapper: US Hyperscale Data Center Impacts on Grid, Water, and Fiscal Systems

**Version:** 1.2 (Batch 1 + Batch 2 + update v4 + Batch 4; n = 19 studies)
**Extraction date:** 2026-11-24
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

Candidate studies were identified by targeted retrieval of known primary sources in four venue types:

| Source type | Examples in corpus |
|---|---|
| Peer-reviewed journals | *Environmental Research Letters*, *npj Clean Water* |
| Preprint servers | arXiv (cs.CY, cs.LG) |
| National laboratory and government audit reports | Lawrence Berkeley National Laboratory; Virginia JLARC |
| Research-institute and policy-organization studies | EPRI; Good Jobs First; REMI / U.S. Chamber of Commerce |

Full texts were retrieved by web search and direct page fetch. Uploaded project files take precedence when present. Where a PDF page number was not visible in the retrieved text, the section heading is cited instead and the gap is noted in the record.

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
| Kay, Reaser & Taylor (2026), `kay_2026` | **Working paper** (NBER conference paper, draft dated April 28, 2026; not peer-reviewed); printed page numbers used | Only wholesale-market dispatch model of data center price, cost, and CO2 effects |
| Han et al. (2024; v4 2026), `han_2024` | **Preprint** (arXiv, not peer-reviewed); extracted from v4 (June 8, 2026), retitled from v1 "The Unpaid Toll" | Only estimate of data center public health costs from air pollution |
| James, Perveen & Jacobson / Ceres (2025), `james_2025` | **Advocacy report** (Ceres, with Bluerisk analysis); pages 6-16 have no text layer and were read from rendered page images | Only Arizona study; combines on-site and electricity-related water at the regional level. Companion to `ceres_2026` |
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

### 3.4 Included Studies (n = 19)

| # | `id` | Impact category | Dataset type | Tags |
|---|---|---|---|---|
| 1 | `guidi_2024` | Grid & Emissions | Engineering / Top-Down Model | Missing or Self-Reported Facility Data |
| 2 | `shehabi_2024` | Multi-Impact | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 3 | `epri_2026` | Grid & Emissions | Engineering / Top-Down Model | Bottom-Up vs. Queue Modeling Divergence |
| 4 | `siddik_2021` | Multi-Impact | Engineering / Top-Down Model | Pre-AI Compute Baseline; Missing or Self-Reported Facility Data |
| 5 | `mytton_2021` | Water Consumption | Corporate Sustainability Reports | Missing or Self-Reported Facility Data; Pre-AI Compute Baseline |
| 6 | `li_2023` | Water Consumption | Corporate Sustainability Reports | Missing or Self-Reported Facility Data |
| 7 | `jlarc_2024` | Multi-Impact | Public Fiscal / Tax Records | Pre-AI Compute Baseline; Gross vs. Net Fiscal & Ratepayer Accounting |
| 8 | `tarczynska_2025` | Economic & Tax Policy | Public Fiscal / Tax Records | Missing or Self-Reported Facility Data; Gross vs. Net Fiscal & Ratepayer Accounting |
| 9 | `remi_2026` | Economic & Tax Policy | Engineering / Top-Down Model | Gross vs. Net Fiscal & Ratepayer Accounting |
| 10 | `martin_2025` | Economic & Tax Policy | Utility / Grid Filings | Gross vs. Net Fiscal & Ratepayer Accounting; Missing or Self-Reported Facility Data |
| 11 | `pjm_imm_2026` | Multi-Impact | Utility / Grid Filings | Bottom-Up vs. Queue Modeling Divergence; Missing or Self-Reported Facility Data |
| 12 | `justice_2025` | Economic & Tax Policy | Public Fiscal / Tax Records | Gross vs. Net Fiscal & Ratepayer Accounting; Missing or Self-Reported Facility Data |
| 13 | `compass_2026` | Water Consumption | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 14 | `cook_2026` | Water Consumption | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 15 | `ceres_2026` | Water Consumption | Utility / Grid Filings | Missing or Self-Reported Facility Data |
| 16 | `epri_prices_2026` | Economic & Tax Policy | Utility / Grid Filings | Missing or Self-Reported Facility Data |
| 17 | `kay_2026` | Grid & Emissions | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |
| 18 | `han_2024` | Grid & Emissions | Engineering / Top-Down Model | Missing or Self-Reported Facility Data |
| 19 | `james_2025` | Water Consumption | Engineering / Top-Down Model | Missing or Self-Reported Facility Data; Bottom-Up vs. Queue Modeling Divergence |

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

1. **Small, purposive sample.** Nine studies were selected by targeted retrieval, not an exhaustive database search (e.g., Scopus, Web of Science). No PRISMA flow counts exist, and the set should not be read as representative of the full literature.
2. **Preprint and grey-literature reliance.** Two studies are arXiv preprints (Guidi 2024; Li 2023), and five are institutional or policy reports (LBNL, EPRI, JLARC, Good Jobs First, REMI). Only two are peer-reviewed journal articles (Siddik 2021; Mytton 2021).
3. **Partial full-text access.** Some extractions rest on abstracts, summary pages, or the first portion of long PDFs: the EPRI summary brief, the JLARC summary pages and selected chapters, and the REMI web summary. Values that could not be confirmed are flagged `UNKNOWN` rather than imputed.
4. **Missing page locators.** For Guidi (2024), EPRI (2026), Mytton (2021), Li (2023), and REMI (2026), page numbers were not visible in the retrieved text, so section headings or "Abstract" are used.
5. **Document version risk.** The retrieved LBNL PDF carries an "EMBARGOED REPORT: DO NOT DISTRIBUTE" header. Citations should be checked against the final public release (DOI 10.71468/P1WC7Q).
6. **Controlled-vocabulary compression.** The fixed `dataset_type` list has no category for economic simulation or project-pipeline data, so REMI (2026) and EPRI (2026) are coded `Engineering / Top-Down Model` as the closest fit. Bottom-up studies (Shehabi 2024; Siddik 2021) are also coded under that label.
7. **Sponsor and perspective bias.** The fiscal domain includes an industry-aligned study (REMI / U.S. Chamber 2026) and an advocacy-organization study (Good Jobs First 2025). Their fiscal claims are reported as extracted, with no independent reconciliation.
8. **Geographic concentration.** Sub-national evidence is dominated by Virginia (JLARC 2024; EPRI 2026 state shares; Guidi 2024 facility counts). Findings may not transfer to other host states.
9. **No independent replication.** Quantitative values are reported as published. This review does not re-run any model or audit.

---

## 6. Citation

If you use this dataset, cite the repository and the underlying primary studies listed in `src/data/papers.json`.
