import { GAP_BRIEF, PAPERS } from "../data";
import { DomainChip } from "../components/DomainChip";
import { Marked } from "../components/Marked";
import { PageHeader } from "../components/PageHeader";
import { StudyLink } from "../components/StudyLink";
import { unresolvedStudyId } from "../lib/derive";
import { TAG_DEFINITIONS } from "../lib/vocabulary";
import { useTitle } from "../lib/useTitle";
import { DATASET_TYPES, IMPACT_CATEGORIES, LIMITATION_TAGS } from "../types";

export function Methods() {
  useTitle("Methods");
  return (
    <>
      <PageHeader title="Methods" lede="How studies were chosen, coded, and checked." />
      <div className="wrap page-body">
        <section aria-labelledby="m-how" className="section-block">
          <h2 id="m-how">How the review was done</h2>
          <div className="lf-grid">
          <div className="lf-panel">
          <h3>Search and inclusion</h3>
          <p>
            Targeted retrieval of primary sources from peer-reviewed journals, preprint servers, national-laboratory and
            government audit reports, and research-institute studies. Included studies cover the United States, report at
            least one original quantitative estimate, address grid and emissions, water, or fiscal impacts, and support
            their primary finding with a verbatim quote and locator. Marketing material, opinion pieces, and news coverage
            are excluded.
          </p>
          </div>
          <div className="lf-panel">
          <h3>Extraction</h3>
          <p>
            Each of the {PAPERS.length} records follows a fixed schema with controlled vocabularies. Values come only from
            explicit source statements. Absent metrics are recorded as “Not reported”, and anything that could not be
            confirmed is listed under Open issues rather than imputed.
          </p>
          </div>
          <div className="lf-panel">
          <h3>Gap detection</h3>
          <p>
            A gap counts only if it ties to one of the review’s analytical lenses (methodological divergence,
            system-boundary and accounting mismatches, dataset and transparency bias, or temporal and scale blind spots)
            and is supported by verbatim evidence from more than one study.
          </p>
          </div>
          <div className="lf-panel">
            <h3 id="m-limits">Limitations</h3>
            <ul>
              <li>A small, purposive sample rather than an exhaustive database search.</li>
              <li>Heavy reliance on preprints and institutional or policy reports.</li>
              <li>Partial full-text access, and missing page locators for some sources.</li>
              <li>Sub-national evidence is concentrated in Virginia.</li>
              <li>No model or audit was independently re-run; values are reported as published.</li>
            </ul>
          </div>
          </div>
        </section>

        <section aria-labelledby="m-vocab" className="section-block">
          <h2 id="m-vocab">Controlled vocabulary</h2>
          <div className="vocab-grid">
            <div className="scroll-x">
              <table className="data-table">
                <caption>Impact categories</caption>
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col" className="num">
                      Studies
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {IMPACT_CATEGORIES.map((c) => (
                    <tr key={c}>
                      <th scope="row">
                        <DomainChip category={c} />
                      </th>
                      <td className="num">{PAPERS.filter((p) => p.impact_category === c).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="scroll-x">
              <table className="data-table">
                <caption>Dataset types</caption>
                <thead>
                  <tr>
                    <th scope="col">Dataset type</th>
                    <th scope="col" className="num">
                      Studies
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DATASET_TYPES.map((d) => (
                    <tr key={d}>
                      <th scope="row">{d}</th>
                      <td className="num">{PAPERS.filter((p) => p.dataset_type === d).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="scroll-x">
            <table className="data-table">
              <caption>Limitation tags</caption>
              <thead>
                <tr>
                  <th scope="col">Tag</th>
                  <th scope="col">Applies when</th>
                  <th scope="col" className="num">
                    Studies
                  </th>
                </tr>
              </thead>
              <tbody>
                {LIMITATION_TAGS.map((t) => (
                  <tr key={t}>
                    <th scope="row">{t}</th>
                    <td>{TAG_DEFINITIONS[t]}</td>
                    <td className="num">{PAPERS.filter((p) => p.limitation_tags.includes(t)).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="open-issues-title" id="open-issues" className="section-block">
          <h2 id="open-issues-title">Open issues</h2>
          <ul className="open-issues">
            {GAP_BRIEF.unresolved.map((u) => {
              const id = unresolvedStudyId(u);
              return (
                <li key={u}>
                  <span className="badge-open">Open</span>
                  <span className="open-issue-text">
                    <Marked text={u} />
                  </span>
                  {id && (
                    <span className="open-issue-link">
                      <StudyLink id={id} label="Open study" variant="inline" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
