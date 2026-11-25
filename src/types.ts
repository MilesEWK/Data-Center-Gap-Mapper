// Types mirroring src/data/papers.json exactly. Brief types (GapBrief, Contradiction,
// EvidencePoint) are imported directly from src/data/brief.ts and are not redefined here.

export type ImpactCategory =
  | "Grid & Emissions"
  | "Water Consumption"
  | "Economic & Tax Policy"
  | "Multi-Impact";

export type DatasetType =
  | "Utility / Grid Filings"
  | "Corporate Sustainability Reports"
  | "Engineering / Top-Down Model"
  | "Public Fiscal / Tax Records";

export type LimitationTag =
  | "Missing or Self-Reported Facility Data"
  | "Indirect Power-Plant Water Excluded"
  | "Gross vs. Net Fiscal & Ratepayer Accounting"
  | "Pre-AI Compute Baseline"
  | "Bottom-Up vs. Queue Modeling Divergence";

export interface Paper {
  id: string;
  citation: string;
  year: number;
  impact_category: ImpactCategory;
  region: string;
  dataset_type: DatasetType;
  research_question: string;
  methodology: string;
  key_findings: string;
  stated_limitations: string;
  limitation_tags: LimitationTag[];
  verbatim_quote_with_page: string;
}

// Runtime lists of every allowed value. A Record keyed by the union forces the
// compiler to reject a missing or extra member, so these can never drift from the types.
const impactCategoryKeys: Record<ImpactCategory, true> = {
  "Grid & Emissions": true,
  "Water Consumption": true,
  "Economic & Tax Policy": true,
  "Multi-Impact": true,
};
const datasetTypeKeys: Record<DatasetType, true> = {
  "Utility / Grid Filings": true,
  "Corporate Sustainability Reports": true,
  "Engineering / Top-Down Model": true,
  "Public Fiscal / Tax Records": true,
};
const limitationTagKeys: Record<LimitationTag, true> = {
  "Missing or Self-Reported Facility Data": true,
  "Indirect Power-Plant Water Excluded": true,
  "Gross vs. Net Fiscal & Ratepayer Accounting": true,
  "Pre-AI Compute Baseline": true,
  "Bottom-Up vs. Queue Modeling Divergence": true,
};

export const IMPACT_CATEGORIES = Object.keys(impactCategoryKeys) as ImpactCategory[];
export const DATASET_TYPES = Object.keys(datasetTypeKeys) as DatasetType[];
export const LIMITATION_TAGS = Object.keys(limitationTagKeys) as LimitationTag[];
