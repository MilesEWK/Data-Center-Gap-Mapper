// Definitions shown on the Methods page. Wording follows README.md §3.2 ("Applies when").
// This is explanatory UI copy, not data: the tags themselves come from papers.json.
import type { LimitationTag } from "../types";

export const TAG_DEFINITIONS: Record<LimitationTag, string> = {
  "Missing or Self-Reported Facility Data":
    "Conclusions rest on undisclosed, proprietary, or operator-self-reported facility data.",
  "Indirect Power-Plant Water Excluded": "Water accounting omits thermoelectric (scope-2) water.",
  "Gross vs. Net Fiscal & Ratepayer Accounting":
    "Fiscal results omit abatement costs, ratepayer costs, or externalities.",
  "Pre-AI Compute Baseline":
    "The empirical baseline predates post-2023 AI compute clustering, or the authors concede averages lag recent growth.",
  "Bottom-Up vs. Queue Modeling Divergence":
    "Results depend on the shipment-based vs. project-pipeline modeling choice.",
};
