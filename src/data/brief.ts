// brief.ts — Research Gap Brief data for the Filterable Literature Matrix dashboard.
// Every figure below traces to an object in papers.json (by `id`) and its verbatim quote/page field.

export type Domain = "Grid & Emissions" | "Water Consumption" | "Economic & Tax Policy";

export interface Contradiction {
  domain: Domain;
  studyA: string;
  claimA: string;
  studyB: string;
  claimB: string;
  methodologicalReason: string;
}

export interface EvidencePoint {
  point: string;
  citations: string[]; // paper ids from papers.json
}

export interface GapBrief {
  researchQuestion: string;
  contradictionMatrix: Contradiction[];
  evidenceOutline: {
    consensus: EvidencePoint[];
    divergence: EvidencePoint[];
    primaryGap: {
      statement: string;
      supportingEvidence: EvidencePoint[];
    };
  };
  unresolved: string[];
}

export const GAP_BRIEF: GapBrief = {
  researchQuestion:
    "How do US hyperscale data centers affect (1) electric grid load and carbon emissions, (2) freshwater consumption and watershed stress, and (3) local fiscal and tax outcomes, and where do empirical estimates of these impacts diverge or remain unmeasured because of differences in modeling architecture, system boundaries, data transparency, and temporal baselines?",

  contradictionMatrix: [
    {
      domain: "Grid & Emissions",
      studyA: "Shehabi et al. (2024)",
      claimA: "176 TWh in 2023, 4.4% of US electricity (p. 7); excludes cryptocurrency",
      studyB: "Guidi et al. (2024)",
      claimB: "192.64 TWh, about 4.59% of 2022 US electricity (Sep 2023 to Aug 2024 facilities)",
      methodologicalReason:
        "Shehabi scales up hardware shipment data to an installed base. Guidi models 2,132 individual facilities from footprint data with a uniform 0.75 uptime assumption.",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Shehabi et al. (2024)",
      claimA: "176 TWh in 2023 (excludes cryptocurrency)",
      studyB: "EPRI (2026)",
      claimB: "Roughly 177-192 TWh in 2024; 184 TWh cited for 2024 (includes cryptocurrency mining)",
      methodologicalReason:
        "System boundary: EPRI includes cryptocurrency mining and small-scale facilities, while LBNL's 176 TWh excludes cryptocurrency. EPRI also uses project data, not shipments.",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Shehabi et al. (2024)",
      claimA: "325-580 TWh in 2028, 6.7%-12.0% of US electricity (p. 7)",
      studyB: "EPRI (2026)",
      claimB: "About 380-790 TWh in 2030, 9%-17% of US electricity",
      methodologicalReason:
        "Shehabi projects from equipment shipment forecasts. EPRI projects from announced project pipelines, which it calls a pipeline indicator rather than a near-term peak forecast. EPRI describes the two as only roughly consistent through 2028.",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Guidi et al. (2024)",
      claimA: "105.59 million metric tons CO2e, 2.18% of US energy-related emissions; 548 gCO2e/kWh, 48% above the US average",
      studyB: "Shehabi et al. (2024)",
      claimB: "74 billion kg CO2e (74 Mt) (p. 58)",
      methodologicalReason:
        "Guidi attributes each facility to its eGRID 2022 balancing-authority mix. Shehabi lacks facility-level data and applies a single grid mix (p. 58).",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Guidi et al. (2024)",
      claimA: "105.59 million metric tons CO2e (2.18% of US emissions)",
      studyB: "Siddik et al. (2021)",
      claimB: "3.15 x 10^7 t CO2-eq (about 31.5 Mt), nearly 0.5% of US GHG emissions (§3.3, p. 7)",
      methodologicalReason:
        "Temporal baseline (2018 vs. Sep 2023 to Aug 2024) and attribution method (power control area vs. balancing authority). Siddik notes results are sensitive to the method used to attribute power plants to consumers (§2.2, p. 4).",
    },
    {
      domain: "Water Consumption",
      studyA: "Siddik et al. (2021)",
      claimA: "Direct (on-site) water 1.30 x 10^8 m3 (about 130 billion L) in 2018 (§3.1, p. 6)",
      studyB: "Shehabi et al. (2024)",
      claimB: "Direct water 66 billion L in 2023 (p. 57)",
      methodologicalReason:
        "Siddik applies a fixed cooling coefficient of 1.8 m3/MWh and assumes all facilities use potable supply. Shehabi models cooling by data center type. The older estimate is about twice the newer one even though electricity use more than doubled over the period.",
    },
    {
      domain: "Water Consumption",
      studyA: "Mytton (2021)",
      claimA: "US data centre water consumption 1.7 billion litres/day (about 620 billion L/yr, x365)",
      studyB: "Shehabi et al. (2024)",
      claimB: "Direct water 66 billion L (2023); indirect water nearly 800 billion L (p. 58)",
      methodologicalReason:
        "Unclear system boundary. Whether Mytton's figure is direct-only or includes indirect water is UNKNOWN from the fetched text. It is about 9x LBNL's direct figure and close in magnitude to LBNL's indirect figure.",
    },
    {
      domain: "Water Consumption",
      studyA: "Li et al. (2023)",
      claimA: "US data center on-site water about 150-280 billion L in 2028",
      studyB: "Shehabi et al. (2024)",
      claimB: "Hyperscale data centers 60-124 billion L in 2028 (p. 57); total for 2028 not reported in fetched excerpt",
      methodologicalReason:
        "Partial mismatch only. Li uses location-specific WUE taken from Microsoft disclosures; Shehabi gives a hyperscale-only segment. A like-for-like total is UNKNOWN.",
    },
    {
      domain: "Water Consumption",
      studyA: "JLARC (2024)",
      claimA: "Virginia data center water use is currently sustainable but growing (p. vii)",
      studyB: "Siddik et al. (2021)",
      claimB: "About one-fifth of direct water comes from moderately to highly stressed watersheds; nearly half of servers rely partly on plants in water-stressed regions",
      methodologicalReason:
        "Scale and boundary mismatch. JLARC assesses one state's permitted withdrawals. Siddik maps national HUC-8 watersheds and includes indirect power-plant water.",
    },
    {
      domain: "Economic & Tax Policy",
      studyA: "REMI / U.S. Chamber (2026)",
      claimA: "Five-year gross county tax revenue of about $96 million (Franklin County, OH) to $174 million (Dallas County, TX) per 50 MW facility",
      studyB: "JLARC (2024)",
      claimB: "Sales and use tax exemption returns 48 cents per $1 spent (Table 2-2, p. 23); $928.6 million in FY23 tax savings (p. 20)",
      methodologicalReason:
        "REMI reports gross revenue and says it is not net fiscal benefit. JLARC nets the exemption cost against the revenue it generates.",
    },
    {
      domain: "Economic & Tax Policy",
      studyA: "REMI / U.S. Chamber (2026)",
      claimA: "740 operational-phase jobs per facility (economy-wide); 50 on-site workers assumed",
      studyB: "Tarczynska (2025)",
      claimB: "Cost per job: Illinois $1.4 million average; Nevada Switch $2.1 million (2016); Ohio $1.4 million (Google), $1 million (Meta) (pp. 13-14)",
      methodologicalReason:
        "REMI counts induced economy-wide jobs from an input-output/CGE model. Tarczynska divides disclosed subsidy cost by promised jobs.",
    },
  ],

  evidenceOutline: {
    consensus: [
      {
        point:
          "US data centers used about 4%-5% of US electricity in 2023-2024: 4.4% (176 TWh, 2023), more than 4% (192.64 TWh), and 4%-5% today.",
        citations: ["shehabi_2024", "guidi_2024", "epri_2026"],
      },
      {
        point:
          "Load is projected to at least double near-term: 325-580 TWh by 2028; 380-790 TWh (9%-17%) by 2030; Virginia unconstrained demand doubles within 10 years (p. ii).",
        citations: ["shehabi_2024", "epri_2026", "jlarc_2024"],
      },
      {
        point:
          "Indirect power-plant water dominates the total footprint: about three-quarters of 5.13 x 10^8 m3 is indirect; indirect water is nearly 800 billion L vs. 66 billion L direct; US off-site EWIF 3.142 L/kWh vs. on-site WUE 0.550 L/kWh; electricity generation is the largest contributor.",
        citations: ["siddik_2021", "shehabi_2024", "li_2023", "mytton_2021"],
      },
      {
        point:
          "Virginia is the epicenter: 301 facilities, the most of any state; the only state above 20% data center electricity share today, projected at 39%-57% by 2030; $928.6 million in FY23 sales tax savings.",
        citations: ["guidi_2024", "epri_2026", "jlarc_2024"],
      },
      {
        point:
          "Net fiscal return on Virginia's exemption is below break-even: 48 cents returned per $1 (JLARC Table 2-2, p. 23), consistent with Tarczynska's 52 cents lost per dollar.",
        citations: ["jlarc_2024", "tarczynska_2025"],
      },
      {
        point:
          "Grid supply skews fossil: more than 56% fossil-fuel share of data center electricity; least-cost procurement under current policy favors natural gas; meeting half of Virginia's unconstrained demand requires one 1,500 MW gas plant every two years for 15 years (p. iv).",
        citations: ["guidi_2024", "epri_2026", "jlarc_2024"],
      },
    ],
    divergence: [
      {
        point:
          "Baseline electricity spread of 176 vs. 184 vs. 192.64 TWh comes from shipment-based vs. project-based vs. facility-footprint-based estimation and from cryptocurrency inclusion.",
        citations: ["shehabi_2024", "epri_2026", "guidi_2024"],
      },
      {
        point:
          "Emissions estimates span 31.5 Mt (2018) to 74 Mt to 105.59 Mt CO2e, driven by grid-mix attribution (single national mix vs. balancing authority vs. power control area) and by baseline year.",
        citations: ["siddik_2021", "shehabi_2024", "guidi_2024"],
      },
      {
        point:
          "Direct water estimates (about 130 billion L in 2018 vs. 66 billion L in 2023) move opposite to electricity growth, reflecting a fixed 1.8 m3/MWh coefficient vs. cooling modeled by facility type.",
        citations: ["siddik_2021", "shehabi_2024"],
      },
      {
        point:
          "Fiscal conclusions split on accounting boundary: $96-$174 million five-year gross county revenue vs. 48 cents net return per $1 of exemption.",
        citations: ["remi_2026", "jlarc_2024"],
      },
      {
        point:
          "Job counts split on boundary: 740 economy-wide operational jobs vs. $1-$2.1 million subsidy cost per promised job.",
        citations: ["remi_2026", "tarczynska_2025"],
      },
    ],
    primaryGap: {
      statement:
        "No study in the set combines (a) metered, facility-level post-2023 electricity data, (b) direct plus indirect water at watershed scale, and (c) net fiscal accounting that includes ratepayer and municipal infrastructure costs for the same facilities. Each paper captures at most one or two of these, and every one depends on undisclosed or self-reported facility data.",
      supportingEvidence: [
        {
          point:
            "Facility data is unavailable or self-reported: industry data is 'closely guarded'; LBNL cites a lack of direct energy data (p. 8) and unavailable facility-level data (p. 58); fewer than one-third of operators measure water; Li's WUE inputs come from Microsoft web disclosures.",
          citations: ["guidi_2024", "shehabi_2024", "mytton_2021", "li_2023"],
        },
        {
          point:
            "Fiscal disclosure is missing: only 11 of at least 36 subsidizing states disclose recipients, 5 disclose amounts, and none reports both promised and actual jobs.",
          citations: ["tarczynska_2025"],
        },
        {
          point:
            "Ratepayer costs sit outside economic-impact models: Dominion residential costs could rise $14-$37 per month by 2040 (JLARC p. v), while REMI reports gross revenue and does not quantify electricity, water, land, traffic, or noise costs.",
          citations: ["jlarc_2024", "remi_2026"],
        },
        {
          point:
            "Externalities are omitted: JLARC's energy model excludes the social cost of carbon (p. 29), and its economic model omits health and environmental costs (p. 14).",
          citations: ["jlarc_2024"],
        },
        {
          point:
            "Temporal blind spot: Siddik's baseline is 2018 and Mytton's is 2021, both before AI-era compute; JLARC says its averages likely underestimate recent years (p. 15).",
          citations: ["siddik_2021", "mytton_2021", "jlarc_2024"],
        },
      ],
    },
  },

  unresolved: [
    "mytton_2021: whether the 1.7 billion litres/day figure is direct-only or includes indirect water (UNKNOWN).",
    "shehabi_2024: reference year for the ~800 billion L indirect water and 74 Mt CO2e figures (UNKNOWN in fetched excerpt).",
    "shehabi_2024: total US direct water for 2028 (only the hyperscale segment, 60-124 billion L, was retrieved).",
    "jlarc_2024: water volume figures (not reported in the summary pages).",
    "remi_2026: explicit economic multipliers (Not reported) and authorship attribution (Department of Commerce vs. U.S. Chamber).",
    "epri_2026: page numbers (none visible in the ESCA brief).",
  ],
};

export default GAP_BRIEF;
