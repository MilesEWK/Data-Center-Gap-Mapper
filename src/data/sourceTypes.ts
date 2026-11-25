/**
 * UI-only classification of each study's publication type, used for the review-level
 * limitations on the Methods page. Deliberately kept out of papers.json.
 * Coding follows the citation field and README §2.4.
 */
export const SOURCE_TYPES = [
  "Peer-reviewed journal article",
  "Preprint or working paper",
  "Institutional, government, consultant, or advocacy report",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

const [PEER, PREPRINT, REPORT] = SOURCE_TYPES;

export const SOURCE_TYPE_BY_ID: Record<string, SourceType> = {
  guidi_2024: PREPRINT, // arXiv
  shehabi_2024: REPORT, // LBNL
  epri_2026: REPORT, // EPRI
  siddik_2021: PEER, // Environmental Research Letters
  mytton_2021: PEER, // npj Clean Water
  li_2023: PREPRINT, // arXiv
  jlarc_2024: REPORT, // Virginia legislative audit
  tarczynska_2025: REPORT, // Good Jobs First (advocacy)
  remi_2026: REPORT, // REMI / U.S. Chamber (consultant, industry-sponsored)
  martin_2025: REPORT, // Harvard ELI
  pjm_imm_2026: REPORT, // PJM Independent Market Monitor
  justice_2025: REPORT, // UGA Carl Vinson Institute for Georgia DOAA
  compass_2026: REPORT, // UT Austin white paper
  cook_2026: REPORT, // HARC
  ceres_2026: REPORT, // Ceres (advocacy)
  epri_prices_2026: PREPRINT, // EPRI white paper on arXiv (working paper)
  kay_2026: PREPRINT, // NBER conference paper (working paper)
  han_2024: PREPRINT, // arXiv
  james_2025: REPORT, // Ceres (advocacy)
};
