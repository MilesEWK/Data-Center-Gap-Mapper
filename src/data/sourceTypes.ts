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
  li_2023: PEER, // Communications of the ACM 68(7), 2025 (arXiv version extracted)
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
  kay_2026: PREPRINT, // Dallas Fed working paper (earlier NBER conference draft)
  han_2024: PREPRINT, // arXiv
  james_2025: REPORT, // Ceres (advocacy)
  iqbal_2026: PEER, // Frontiers in Environmental Science
  hicks_2026: PEER, // Journal of Regional Analysis & Policy
  zhou_2026: PREPRINT, // arXiv
  han_2026: PREPRINT, // arXiv
  muller_2026: PREPRINT, // NBER working paper
};
