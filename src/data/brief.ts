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
  whatEachMeasured?: string; // plain-language description of what each study counted
  whyItMatters?: string; // consequence for anyone citing either figure
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
      whatEachMeasured:
        "Shehabi counts servers, storage, and network gear sold into the US market each year, estimates how many are still running, and multiplies by their power draw and facility overhead. Guidi starts from a list of 2,132 named facilities, sizes each from building footprints, and assumes each runs at 75% utilization.",
      whyItMatters:
        "Both numbers are defensible, but they are not interchangeable. A citation should name the method: the shipment-based figure (176 TWh) is the federal reference point, while the facility-based figure (192.64 TWh) can be mapped to specific locations and grids.",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Shehabi et al. (2024)",
      claimA: "176 TWh in 2023 (excludes cryptocurrency)",
      studyB: "EPRI (2026)",
      claimB: "Roughly 177-192 TWh in 2024; 184 TWh cited for 2024 (includes cryptocurrency mining)",
      methodologicalReason:
        "System boundary: EPRI includes cryptocurrency mining and small-scale facilities, while LBNL's 176 TWh excludes cryptocurrency. EPRI also uses project data, not shipments.",
      whatEachMeasured:
        "LBNL's 2023 total covers conventional data centers and leaves out cryptocurrency mining. EPRI's 2024 range counts small- and large-scale data centers plus cryptocurrency mining, built from state-level project data.",
      whyItMatters:
        "Part of the gap is scope, not error. Comparing the two without noting the cryptocurrency boundary makes year-over-year growth look larger than it is.",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Shehabi et al. (2024)",
      claimA: "325-580 TWh in 2028, 6.7%-12.0% of US electricity (p. 7)",
      studyB: "EPRI (2026)",
      claimB: "About 380-790 TWh in 2030, 9%-17% of US electricity",
      methodologicalReason:
        "Shehabi projects from equipment shipment forecasts. EPRI projects from announced project pipelines, which it calls a pipeline indicator rather than a near-term peak forecast. EPRI describes the two as only roughly consistent through 2028.",
      whatEachMeasured:
        "LBNL extends its shipment model to 2028 using scenarios for GPU sales, AI server hours, and cooling efficiency. EPRI tallies projects that are operating, under construction, or announced, and projects to 2030 under different completion assumptions.",
      whyItMatters:
        "Planners using the higher pipeline-based range risk overbuilding if announced projects stall; planners using the shipment range risk underbuilding if announcements convert. EPRI itself warns its capacity figures are a pipeline indicator, not a peak-load forecast.",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Guidi et al. (2024)",
      claimA: "105.59 million metric tons CO2e, 2.18% of US energy-related emissions; 548 gCO2e/kWh, 48% above the US average",
      studyB: "Shehabi et al. (2024)",
      claimB: "74 billion kg CO2e (74 Mt) (p. 58)",
      methodologicalReason:
        "Guidi attributes each facility to its eGRID 2022 balancing-authority mix. Shehabi lacks facility-level data and applies a single grid mix (p. 58).",
      whatEachMeasured:
        "Guidi assigns each facility the emissions rate of its local balancing authority, which raises the total because many facilities sit on fossil-heavy grids. LBNL applies one average grid mix to all data centers because it has no facility locations.",
      whyItMatters:
        "The roughly 30 Mt gap comes from where data centers are, not how much power they use. Any emissions claim should state whether it uses local or national grid intensity.",
    },
    {
      domain: "Grid & Emissions",
      studyA: "Guidi et al. (2024)",
      claimA: "105.59 million metric tons CO2e (2.18% of US emissions)",
      studyB: "Siddik et al. (2021)",
      claimB: "3.15 x 10^7 t CO2-eq (about 31.5 Mt), nearly 0.5% of US GHG emissions (§3.3, p. 7)",
      methodologicalReason:
        "Temporal baseline (2018 vs. Sep 2023 to Aug 2024) and attribution method (power control area vs. balancing authority). Siddik notes results are sensitive to the method used to attribute power plants to consumers (§2.2, p. 4).",
      whatEachMeasured:
        "Siddik measures 2018 operations, when data centers used about 1.8% of US electricity. Guidi measures facilities operating from September 2023 to August 2024, after AI-driven growth, and uses a finer grid attribution.",
      whyItMatters:
        "Most of the threefold difference reflects real growth plus method. Siddik's figure should not be cited as a current estimate.",
    },
    {
      domain: "Water Consumption",
      studyA: "Siddik et al. (2021)",
      claimA: "Direct (on-site) water 1.30 x 10^8 m3 (about 130 billion L) in 2018 (§3.1, p. 6)",
      studyB: "Shehabi et al. (2024)",
      claimB: "Direct water 66 billion L in 2023 (p. 57)",
      methodologicalReason:
        "Siddik applies a fixed cooling coefficient of 1.8 m3/MWh and assumes all facilities use potable supply. Shehabi models cooling by data center type. The older estimate is about twice the newer one even though electricity use more than doubled over the period.",
      whatEachMeasured:
        "Siddik multiplies each facility's energy by a single national cooling-water rate. LBNL models water use separately for each data center type, where large hyperscale sites tend to be more water-efficient per unit of energy.",
      whyItMatters:
        "Direct water estimates are highly sensitive to the cooling assumption. The newer, lower figure does not mean data centers use less water than in 2018; it means the older coefficient likely overstated on-site use.",
    },
    {
      domain: "Water Consumption",
      studyA: "Mytton (2021)",
      claimA: "US data centre water consumption 1.7 billion litres/day; body text: 626 billion litres in 2014, direct plus electricity-generation water (from the 2016 LBNL report)",
      studyB: "Shehabi et al. (2024)",
      claimB: "Direct water 66 billion L (2023); indirect water nearly 800 billion L (2023) (pp. 57-58)",
      methodologicalReason:
        "System boundary and baseline year. Mytton reports one combined total (direct plus indirect) using 2014 data; Shehabi splits 2023 water into direct (66 billion L) and indirect (nearly 800 billion L). Citing Mytton's total as on-site water would overstate direct use about ninefold.",
      whatEachMeasured:
        "Mytton's 1.7 billion litres per day (626 billion litres per year) is the 2016 LBNL estimate for 2014, adding on-site cooling water to the water power plants consumed to generate the electricity. LBNL 2024 reports the same two parts separately for 2023.",
      whyItMatters:
        "Read correctly, the two sources roughly agree that indirect water dominates. The error to avoid is quoting Mytton's combined total as on-site water use.",
    },
    {
      domain: "Water Consumption",
      studyA: "Li et al. (2023)",
      claimA: "US data center on-site water about 150-280 billion L in 2028",
      studyB: "Shehabi et al. (2024)",
      claimB: "Hyperscale data centers 60-124 billion L in 2028 (p. 57); no all-facility 2028 total is reported",
      methodologicalReason:
        "Partial mismatch only. Li uses location-specific WUE taken from Microsoft disclosures. Shehabi projects only the hyperscale segment for 2028 and reports no all-facility 2028 total, so no like-for-like comparison is possible.",
      whatEachMeasured:
        "Li projects on-site water for all US data centers in 2028 from company-reported water efficiency. LBNL projects 2028 water only for hyperscale facilities, leaving out colocation and enterprise data centers.",
      whyItMatters:
        "No published like-for-like 2028 total exists in this set. That absence is itself a gap: future water planning lacks an independent all-facility projection.",
    },
    {
      domain: "Water Consumption",
      studyA: "JLARC (2024)",
      claimA: "Virginia data center water use is currently sustainable but growing (p. vii): about 2.1 billion gallons in 2023, under 0.5% of state withdrawals, but 2%-21% of use at six local utilities (pp. 62-63)",
      studyB: "Siddik et al. (2021)",
      claimB: "About one-fifth of direct water comes from moderately to highly stressed watersheds; nearly half of servers rely partly on plants in water-stressed regions",
      methodologicalReason:
        "Scale and boundary mismatch. JLARC assesses one state's direct withdrawals, with over a third of supply from reclaimed water. Siddik maps national HUC-8 watersheds and includes indirect power-plant water. JLARC's own utility-level figures (up to 21%) show local stress can hide behind a small statewide share.",
      whatEachMeasured:
        "JLARC adds up utility-reported water use by Virginia data centers in 2023 and compares it to statewide withdrawals. Siddik estimates national water footprints by watershed, including water consumed at the power plants serving each site.",
      whyItMatters:
        "A small statewide share can hide local strain. JLARC's own utility-level data show data centers at up to 21% of some utilities' water use, which supports watershed-level rather than state-level assessment.",
    },
    {
      domain: "Water Consumption",
      studyA: "Cook / HARC (2026)",
      claimA: "About 25 billion gallons in 2025 (0.4% of Texas water use), on-site cooling plus power-plant consumption; 29-161 billion gallons by 2030 (0.5-2.7%) (pp. 4, 6)",
      studyB: "UT COMPASS (2026)",
      claimB: "About 33 billion gallons in 2025 (0.6% of statewide demand); averages of 225 billion gallons in 2030 (3.7%) and 348 billion gallons in 2040 (5.8%) (Table 7, pp. 24-25)",
      methodologicalReason:
        "Capacity and rate assumptions. HARC scales 9,567 MW of existing capacity and ERCOT's 22,175-77,965 MW 2030 forecasts by national LBNL water rates and EIA power-plant water data. COMPASS assumes 8 GW for 2025 and 40-70 GW for 2030, and varies facility efficiency and grid mix. COMPASS calls the two 2025 totals consistent in magnitude; the gap opens in the projections. At ~78 GW, COMPASS estimates about 319 billion gallons; HARC's highest stated total, 161, assumes onsite gas plants (Scenario 3), and its current-grid figures imply about 227 (derived: 87 on-site + 140 power-plant; HARC does not state this total).",
      whatEachMeasured:
        "HARC multiplies current and forecast data center power demand by LBNL cooling-water rates, then adds the water Texas power plants consumed per MWh in 2023, under four power-supply scenarios. COMPASS models scenarios from assumed capacity, facility efficiency (utilization, PUE, and WUE), and three representative grid mixes, and reports the average across them.",
      whyItMatters:
        "Both studies put today's share under 1% of Texas water use. For 2030, the capacity assumption moves the answer several-fold, so any projection should be cited with the capacity it assumes. COMPASS also warns its totals should not be added to statewide demand, because power-plant water may already be counted in the steam-electric category.",
    },
    {
      domain: "Water Consumption",
      studyA: "Ceres (2026)",
      claimA: "Electricity for data centers in seven states drew an estimated 12.9 trillion liters (3.4 trillion gallons) of water withdrawals in 2024, including hydropower (pp. 2, 7; liters converted)",
      studyB: "Shehabi et al. (2024)",
      claimB: "Indirect water footprint of nearly 800 billion liters for all US data centers in 2023 (p. 58)",
      methodologicalReason:
        "Withdrawal vs. footprint boundary. Ceres counts every gallon power plants withdraw, including water passing through hydropower dams, and assigns data centers each state's EPRI electricity share. LBNL reports an indirect water footprint calculated with a single grid mix. Seven states holding about half of US data centers come out at about 12.9 trillion liters (3.4 trillion gallons), roughly 16 times LBNL's national figure of nearly 800 billion liters.",
      whatEachMeasured:
        "Ceres adds up 2024 withdrawals at 1,434 water-using power plants in seven states, using EIA-reported data where available and WRI estimates for the rest, then attributes a share to data centers. LBNL estimates the water associated with US data center electricity in 2023 by applying one grid mix to its national electricity estimate.",
      whyItMatters:
        "Withdrawals show how much water a power supply depends on; consumption shows how much is lost to the local system. HARC's Texas figures show how far apart the two can be: the grid serving Texas data centers withdraws about 1,067 billion gallons a year but consumes about 17 billion. Setting Ceres' total beside a consumption figure overstates use by an order of magnitude.",
    },
    {
      domain: "Economic & Tax Policy",
      studyA: "REMI / U.S. Chamber (2026)",
      claimA: "Five-year gross county tax revenue of about $96 million (Franklin County, OH) to $174 million (Dallas County, TX) per 50 MW facility",
      studyB: "JLARC (2024)",
      claimB: "Sales and use tax exemption returns 48 cents per $1 spent (Table 2-2, p. 23); $928.6 million in FY23 tax savings (p. 20)",
      methodologicalReason:
        "REMI reports gross revenue and says it is not net fiscal benefit. JLARC nets the exemption cost against the revenue it generates.",
      whatEachMeasured:
        "REMI simulates one hypothetical 50 MW facility and totals the taxes it would generate in four counties, before subtracting any exemptions or abatements. JLARC uses actual Virginia tax data and compares revenue generated with sales tax forgone through the exemption.",
      whyItMatters:
        "Gross revenue answers 'how much tax flows in'; net return answers 'is the incentive worth it'. Policymakers weighing incentives need the net figure, which in Virginia is 48 cents per dollar.",
    },
    {
      domain: "Economic & Tax Policy",
      studyA: "REMI / U.S. Chamber (2026)",
      claimA: "740 operational-phase jobs per facility (economy-wide); 50 on-site workers assumed",
      studyB: "Tarczynska (2025)",
      claimB: "Cost per job: Illinois $1.4 million average; Nevada Switch $2.1 million (2016); Ohio $1.4 million (Google), $1 million (Meta) (pp. 13-14)",
      methodologicalReason:
        "REMI counts induced economy-wide jobs from an input-output/CGE model. Tarczynska divides disclosed subsidy cost by promised jobs.",
      whatEachMeasured:
        "REMI counts every job its model links to the facility across the state economy, including supplier and consumer-spending jobs, while assuming only 50 on-site workers. Tarczynska divides each state's disclosed subsidy cost by the jobs the company promised.",
      whyItMatters:
        "Both statistics are accurate within their boundaries, but they answer different questions. Citing 740 jobs alongside a $1-2 million subsidy per promised job without explaining the boundary misleads in either direction.",
    },
    {
      domain: "Economic & Tax Policy",
      studyA: "REMI / U.S. Chamber (2026)",
      claimA: "Five-year gross county tax revenue of about $96 million (Franklin County, OH) to $174 million (Dallas County, TX) per 50 MW facility",
      studyB: "Justice & Shepherd (2025)",
      claimB: "Net fiscal impact of -$432.6 million in 2025: $474.2 million in forgone state tax revenue against $34.6 million (construction) and $6.9 million (operations) in added collections after a 30% 'but for' attribution (pp. 4-5)",
      methodologicalReason:
        "Gross vs. net, and attribution. REMI totals the taxes one hypothetical facility would generate, before exemptions or abatements, and treats all of its activity as new. Georgia subtracts the revenue forgone through the exemption and credits only the 30% of data center activity its econometric model attributes to the incentive.",
      whatEachMeasured:
        "REMI simulates a single 50 MW facility in four counties and reports the county tax it would generate over five years. Georgia uses Department of Revenue data on 34 data centers to compare the state sales tax given up with the state tax collected on the share of activity the exemption caused.",
      whyItMatters:
        "A gross revenue figure cannot show whether an incentive pays for itself. Georgia finds the exemption does not on a fiscal basis, while still reporting about $2.86 of value-added impact per $1 forgone; the two results should be cited together, each with its boundary.",
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
      {
        point:
          "In Texas, power-plant water exceeds on-site cooling water: HARC estimates about 17 billion gallons consumed at power plants versus about 8 billion gallons for on-site cooling (p. 10), and COMPASS finds indirect use often takes the major share of the total (p. 26).",
        citations: ["cook_2026", "compass_2026"],
      },
      {
        point:
          "State sales tax exemptions for data centers return less revenue than they cost: Georgia forgoes $474.2 million in 2025 against $34.6 million plus $6.9 million in added collections (pp. 4-5), consistent with Virginia's 48 cents per $1.",
        citations: ["justice_2025", "jlarc_2024"],
      },
      {
        point:
          "Grid costs for data centers reach other customers: PJM's Market Monitor attributes an irreversible $29.4 billion increase in capacity costs to data center load (p. 51); PJM assigned about half of $5 billion in transmission, driven by generator retirements and data center load growth, to Virginia utilities, with Maryland utilities placing an average of 66% of transmission costs on residential ratepayers (p. 15).",
        citations: ["pjm_imm_2026", "martin_2025"],
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
      {
        point:
          "Texas data center water projections for 2030 span 29-161 billion gallons (HARC) to an average of 225 billion gallons (COMPASS), driven mainly by the capacity each study assumes; both put 2025 use under 1% of state water.",
        citations: ["cook_2026", "compass_2026"],
      },
      {
        point:
          "Indirect water figures differ by an order of magnitude with the measure used: Ceres reports 3.4 trillion gallons of withdrawals for seven states in 2024, while HARC shows the grid serving Texas data centers withdraws about 1,067 billion gallons but consumes about 17 billion.",
        citations: ["ceres_2026", "cook_2026", "shehabi_2024"],
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
            "Temporal blind spot: Siddik's baseline is 2018 and Mytton's US water figure rests on 2014 data, both before AI-era compute; JLARC says its averages likely underestimate recent years (p. 15).",
          citations: ["siddik_2021", "mytton_2021", "jlarc_2024"],
        },
        {
          point:
            "The new sources share the facility-data problem: PJM's Market Monitor calls data center load forecasts largely unsubstantiated (pp. 1-2), Georgia reports no verified statewide data center load (p. 9), COMPASS had no operator-reported water data (p. 24), and Ceres relies on self-reported EIA data and WRI estimates for 1,240 of 1,434 plants (pp. 18-19).",
          citations: ["pjm_imm_2026", "justice_2025", "compass_2026", "ceres_2026"],
        },
        {
          point:
            "Ratepayer costs and fiscal returns are measured in separate studies, never for the same facilities: Georgia's evaluation leaves grid and water strain unquantified (p. 9), PJM's Monitor quantifies capacity costs but not tax effects, and Harvard ELI finds verifying cost isolation all but impossible (pp. 1-2).",
          citations: ["justice_2025", "pjm_imm_2026", "martin_2025"],
        },
      ],
    },
  },

  unresolved: [
    "epri_2026: the ESCA brief has no page numbers; the full EPRI white paper was not retrieved, so locators cite the brief only.",
    "shehabi_2024: the report gives 2023 electricity use as 176 TWh (p. 7) and as approximately 178 TWh (p. 58); the source is internally inconsistent.",
    "shehabi_2024: no 2028 direct-water total for all US data centers is reported (hyperscale only, 60-124 billion L), so the 2028 comparison with li_2023 stays partial.",
    "remi_2026: authorship differs across the REMI page (U.S. Department of Commerce), the study text (Curtis Dubay, U.S. Chamber), and the Chamber page (no author, dated October 15, 2026).",
    "pjm_imm_2026: only Section 1 (Introduction) of the Q3 2026 State of the Market report was retrieved; the $29.4 billion figure rests on the Monitor's separate auction analyses, which were not reviewed.",
    "cook_2026: the 2030 range is stated three ways in the same report: 29-161 billion gallons (98-494 kAF) on p. 4, 29-161 billion gallons (88-494 kAF) on p. 6, and 23-161 billion gallons (71-494 kAF), 0.4-2.7%, on p. 12.",
    "ceres_2026: drought exposure is given both as 46% of water-using power plants and as 44% of electricity generated using water (p. 3).",
    "justice_2025: the full report reviewed is dated December 2025, while the DOAA summary is marked revised January 2026; whether the full report text was also revised was not confirmed.",
  ],
};

export default GAP_BRIEF;
