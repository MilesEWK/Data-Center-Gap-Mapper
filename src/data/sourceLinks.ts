/**
 * UI-only map from study id to the primary document actually opened during extraction.
 * A study is left out when the URL used to read it was not recorded; no URL is guessed.
 * (DOI links are used only where the DOI link itself was the page opened.)
 */
export const SOURCE_LINKS: Record<string, string> = {
  jlarc_2024: "https://jlarc.virginia.gov/pdfs/reports/Rpt598.pdf",
  martin_2025: "https://eelp.law.harvard.edu/wp-content/uploads/2025/03/Harvard-ELI-Extracting-Profits-from-the-Public.pdf",
  pjm_imm_2026: "https://www.monitoringanalytics.com/reports/PJM_State_of_the_Market/2026/2026q3-som-pjm-sec1.pdf",
  justice_2025: "https://open.ga.gov/openga/report/downloadFile?rid=33298",
  compass_2026: "https://compass.beg.utexas.edu/files/publications/Water_Requirements_for_DC_White_Paper.pdf",
  cook_2026: "https://harcresearch.org/wp-content/uploads/2026/01/Thirsty-Data-Water-Use-and-The-Projected-Data-Center-Boom-in-Texas.pdf",
  ceres_2026: "https://www.ceres.org/download/6489292d-d4a5-476c-874f-72e0c8c49c22",
  epri_prices_2026: "https://arxiv.org/abs/2606.19777",
  kay_2026: "https://www.dallasfed.org/~/media/documents/research/papers/2026/wp2606r1.pdf",
  han_2024: "https://arxiv.org/abs/2412.06288",
  james_2025: "https://www.ceres.org/download/5369abdc-dab9-49e3-9d65-9e76ebbfa74b",
  iqbal_2026: "https://www.frontiersin.org/journals/environmental-science/articles/10.3389/fenvs.2026.1939591/pdf",
  hicks_2026: "https://jrap.scholasticahq.com/article/172680.pdf",
  zhou_2026: "https://arxiv.org/pdf/2611.16095",
  han_2026: "https://arxiv.org/pdf/2603.02705",
  muller_2026: "https://www.nber.org/system/files/working_papers/w35100/w35100.pdf",
};
