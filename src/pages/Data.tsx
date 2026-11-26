import { GAP_BRIEF, PAPERS } from "../data";
import { CopyButton } from "../components/CopyButton";
import { PageHeader } from "../components/PageHeader";
import { bibtex, contradictionsCsv, download, papersCsv, papersJson, searchLogJson } from "../lib/exports";
import { SEARCH_LOG } from "../lib/searchFlow";
import { useTitle } from "../lib/useTitle";

const AUTHOR = "Wofford-Kao, M.";
const SITE_URL = "https://milesewk.github.io/Data-Center-Gap-Mapper/";
const SITE_TITLE = "Data Center Gap Mapper: A Structured Review of U.S. Hyperscale Data Center Impacts";

export function Data() {
  useTitle("Data");
  const files = [
    {
      name: "papers.json",
      what: `All ${PAPERS.length} study records exactly as stored.`,
      run: () => download("papers.json", papersJson(), "application/json"),
    },
    {
      name: "papers.csv",
      what: "The same records as a spreadsheet; limitation tags are separated by semicolons.",
      run: () => download("papers.csv", papersCsv(), "text/csv"),
    },
    {
      name: "contradictions.csv",
      what: `The ${GAP_BRIEF.contradictionMatrix.length} contradiction rows, with study ids and the explanation fields.`,
      run: () => download("contradictions.csv", contradictionsCsv(), "text/csv"),
    },
    {
      name: "searchLog.json",
      what: `The logged search: ${SEARCH_LOG.runs.length} query runs and ${SEARCH_LOG.records.length} screened records with decisions.`,
      run: () => download("searchLog.json", searchLogJson(), "application/json"),
    },
    {
      name: "citations.bib",
      what: "A BibTeX entry for every study, built from its citation, DOI, and source link.",
      run: () => download("citations.bib", bibtex(), "application/x-bibtex"),
    },
  ];
  const citation = `${AUTHOR} (${__BUILD_YEAR__}). ${SITE_TITLE}. ${SITE_URL}`;
  return (
    <>
      <PageHeader title="Data" lede="Download the review's records, contradictions, and search log, generated from the same files the site reads." />
      <div className="wrap page-body">
        <section aria-labelledby="dl-title" className="section-block">
          <h2 id="dl-title">Downloads</h2>
          <ul className="download-list">
            {files.map((f) => (
              <li key={f.name}>
                <button type="button" className="download-button" onClick={f.run}>
                  Download <span className="mono">{f.name}</span>
                </button>
                <span className="download-what">{f.what}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="cite-title" className="section-block">
          <h2 id="cite-title">How to cite this review</h2>
          <div className="cite-box">
            <p className="cite-text">{citation}</p>
            <CopyButton text={citation} label="Copy citation" />
          </div>
          <p className="table-note">Cite the underlying primary studies for any figure you reuse; their citations are in each study record.</p>
        </section>
      </div>
    </>
  );
}
