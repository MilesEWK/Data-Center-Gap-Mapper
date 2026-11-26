// UI-only lookup: contradictionMatrix display names (studyA / studyB in brief.ts) → papers.json ids.
// Lives outside brief.ts so the data file stays untouched. validate.ts checks every entry.
export const STUDY_NAME_TO_ID: Readonly<Record<string, string>> = {
  "Guidi et al. (2024)": "guidi_2024",
  "Shehabi et al. (2024)": "shehabi_2024",
  "EPRI (2026)": "epri_2026",
  "Siddik et al. (2021)": "siddik_2021",
  "Mytton (2021)": "mytton_2021",
  "Li et al. (2023)": "li_2023",
  "JLARC (2024)": "jlarc_2024",
  "REMI / U.S. Chamber (2026)": "remi_2026",
  "Tarczynska (2025)": "tarczynska_2025",
  "Martin & Peskoe (2025)": "martin_2025",
  "PJM Market Monitor (2026)": "pjm_imm_2026",
  "Justice & Shepherd (2025)": "justice_2025",
  "UT COMPASS (2026)": "compass_2026",
  "Cook / HARC (2026)": "cook_2026",
  "Ceres (2026)": "ceres_2026",
  "Watten et al. (2026)": "epri_prices_2026",
  "Kay et al. (2026)": "kay_2026",
  "Han et al. (2024)": "han_2024",
  "James et al. / Ceres (2025)": "james_2025",
  "Iqbal et al. (2026)": "iqbal_2026",
  "Hicks et al. (2026)": "hicks_2026",
  "Zhou et al. (2026)": "zhou_2026",
  "Han et al. (2026)": "han_2026",
  "Muller (2026)": "muller_2026",
};

const ID_TO_STUDY_NAME: ReadonlyMap<string, string> = new Map(
  Object.entries(STUDY_NAME_TO_ID).map(([name, id]) => [id, name]),
);

/** Short label for a paper id (e.g. "Guidi et al. (2024)"); falls back to the id itself. */
export function studyLabel(id: string): string {
  return ID_TO_STUDY_NAME.get(id) ?? id;
}
