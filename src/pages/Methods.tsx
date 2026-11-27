import { GAP_BRIEF, PAPERS } from "../data";
import { DomainChip } from "../components/DomainChip";
import { Marked } from "../components/Marked";
import { PageHeader } from "../components/PageHeader";
import { StudyLink } from "../components/StudyLink";
import { unresolvedStudyId } from "../lib/derive";
import { missingPageLocators, partialAccess, sourceTypeCounts, stateCoverage } from "../lib/review";
import { studyLabel } from "../data/studyNameMap";
import { SEARCH_DATABASES, SEARCH_LOG, queryTable, searchFlow } from "../lib/searchFlow";
import { TAG_DEFINITIONS } from "../lib/vocabulary";
import { useTitle } from "../lib/useTitle";
import { DATASET_TYPES, IMPACT_CATEGORIES, LIMITATION_TAGS } from "../types";

const types = sourceTypeCounts();
const flow = searchFlow();
const queries = queryTable();
/** "A, B, and C". */
const listAnd = (xs: string[]) => (xs.length < 3 ? xs.join(" and ") : `${xs.slice(0, -1).join(", ")}, and ${xs.at(-1)}`);
const fmt = (n: number | null) => (n === null ? "Not run" : n.toLocaleString("en-US"));
const [peer, preprint, report] = types;
const states = stateCoverage();
const top = states[0];
const leaders = states.filter((st) => st.ids.length === top.ids.length);
const next = states[leaders.length];
const partial = partialAccess();
const noPage = missingPageLocators();

/** "A, B, and C" as study links. */
function IdList({ ids }: { ids: string[] }) {
  return (
    <>
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && (i === ids.length - 1 ? (ids.length > 2 ? ", and " : " and ") : ", ")}
          <StudyLink id={id} label={studyLabel(id)} variant="inline" />
        </span>
      ))}
    </>
  );
}

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
            Of the {PAPERS.length} studies, {flow.handSelected} were hand-selected by targeted retrieval, and{" "}
            {flow.extracted} were added later from a logged search of {listAnd(SEARCH_DATABASES)} (see{" "}
            <a href="#/methods" onClick={(e) => { e.preventDefault(); document.getElementById("m-found")?.scrollIntoView(); }}>How studies were found</a>).
            Included studies covered the United States of America, reported at least one original quantitative
            estimate, addressed grid and emissions, water, or fiscal impacts, and supported their primary finding with a
            quote and locator. Marketing material, opinion pieces, and news coverage were all excluded.
          </p>
          </div>
          <div className="lf-panel">
          <h3>Extraction</h3>
          <p>
            All {PAPERS.length} studies were recorded the same way, using the same set of fields: the citation, year,
            impact area, region, type of data, research question, methods, key findings, the authors’ own stated
            limitations, and a word-for-word quote with its page or section number. Fields such as impact area and
            limitation tags use a short, fixed list of labels so studies can be compared directly. Every value comes
            from something the source actually states. If a study does not report a number, it is marked “Not
            reported.” If something could not be confirmed, it is listed under Open issues instead of being filled in
            with a guess.
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
              <li>
                {PAPERS.length} studies: {flow.handSelected} hand-selected by targeted retrieval and {flow.extracted}{" "}
                added from a logged search of {SEARCH_DATABASES.length} databases, which screened the top 50 records per
                query. The search is not exhaustive (it did not try to find every study ever published on the topic), and the hand-selected studies did not pass through its screening;{" "}
                {flow.notYetExtracted} eligible records are not yet extracted.
              </li>
              <li>
                {peer.ids.length} of {PAPERS.length} are peer-reviewed journal articles; {preprint.ids.length} are
                preprints or working papers and {report.ids.length} are institutional, government, consultant, or
                advocacy reports.
              </li>
              <li>
                Partial full-text access for{" "}
                <IdList ids={partial} />; quotes without a page number for <IdList ids={noPage} />.
              </li>
              <li>
                Sub-national evidence covers {states.length} states, led by{" "}
                {leaders.map((l) => l.state).join(" and ")} ({top.ids.length} of {PAPERS.length} studies
                {leaders.length > 1 ? " each" : ""}){next && <>, then {next.state} ({next.ids.length})</>}.
              </li>
              <li>No model or audit was independently re-run; values are reported as published.</li>
              <li>
                {GAP_BRIEF.unresolved.length} open issues remain, listed under{" "}
                <a href="#/methods" onClick={(e) => { e.preventDefault(); document.getElementById("open-issues")?.scrollIntoView(); }}>Open issues</a>.
              </li>
            </ul>
          </div>
          </div>
        </section>

        <section aria-labelledby="m-found" className="section-block" id="how-found">
          <h2 id="m-found">How studies were found</h2>
          <p className="section-lede">
            Of the {PAPERS.length} studies in the review, {flow.handSelected} were hand-selected before the logged search
            and {flow.extracted} came from it. The search below was
            run on {flow.runDates.join(", ")}, keeping the top 50 records per query and database.
          </p>
          <ol className="flow" aria-label="Search and screening flow">
            <li className="flow-step">
              <span className="flow-n">{flow.retrieved}</span>
              <span className="flow-label">
                Records retrieved from {flow.runsRun} searches ({queries.length} queries × {SEARCH_DATABASES.length}{" "}
                databases)
              </span>
              {flow.runsNotRun.length > 0 && (
                <span className="flow-side">{flow.runsNotRun.length} searches not run</span>
              )}
            </li>
            <li className="flow-step">
              <span className="flow-n">{flow.screened}</span>
              <span className="flow-label">Unique records screened on title and abstract</span>
              <span className="flow-side">{flow.duplicates} duplicates removed</span>
            </li>
            <li className="flow-step">
              <span className="flow-n">{flow.eligible}</span>
              <span className="flow-label">Eligible</span>
              <span className="flow-side">{flow.excluded} excluded (reasons below)</span>
            </li>
            <li className="flow-step flow-final">
              <span className="flow-n">{flow.extracted}</span>
              <span className="flow-label">Extracted into the review</span>
              <span className="flow-side">
                {flow.alreadyInReview} already in the review; {flow.notYetExtracted} eligible, not yet extracted
              </span>
            </li>
          </ol>
          <p className="flow-total">
            Studies in the review: {flow.handSelected} hand-selected + {flow.extracted} from the logged search ={" "}
            {PAPERS.length}.
          </p>
          <div className="vocab-grid">
            <div className="scroll-x">
              <table className="data-table">
                <caption>Exclusion reasons</caption>
                <thead>
                  <tr>
                    <th scope="col">Reason</th>
                    <th scope="col" className="num">
                      Records
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {flow.exclusionReasons.map((r) => (
                    <tr key={r.reason}>
                      <th scope="row">{r.reason}</th>
                      <td className="num">{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="scroll-x">
              <table className="data-table">
                <caption>Total hits by query and database</caption>
                <thead>
                  <tr>
                    <th scope="col">Query</th>
                    {SEARCH_DATABASES.map((db) => (
                      <th key={db} scope="col" className="num">
                        {db}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {queries.map((q) => (
                    <tr key={q.queryId}>
                      <th scope="row" className="query-cell">
                        {q.label}
                      </th>
                      {SEARCH_DATABASES.map((db) => (
                        <td key={db} className="num">
                          {fmt(q.cells[db]?.totalHits ?? null)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="table-note">{SEARCH_LOG.screeningMethod}</p>
          <p className="table-note">{SEARCH_LOG.queryNotes}</p>
        </section>

        <section aria-labelledby="m-coverage" className="section-block">
          <h2 id="m-coverage">Source types and coverage</h2>
          <div className="vocab-grid">
            <div className="scroll-x">
              <table className="data-table">
                <caption>Source types</caption>
                <thead>
                  <tr>
                    <th scope="col">Source type</th>
                    <th scope="col" className="num">
                      Studies
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((t) => (
                    <tr key={t.type}>
                      <th scope="row">{t.type}</th>
                      <td className="num">{t.ids.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="scroll-x">
              <table className="data-table">
                <caption>States with sub-national evidence</caption>
                <thead>
                  <tr>
                    <th scope="col">State</th>
                    <th scope="col" className="num">
                      Studies
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {states.map((st) => (
                    <tr key={st.state}>
                      <th scope="row">{st.state}</th>
                      <td className="num">{st.ids.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="table-note">
            A state is counted when a study names it in its region or key findings.
          </p>
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
