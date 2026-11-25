import { Link } from "react-router-dom";
import { studyLabel } from "../data/studyNameMap";
import { gapMapColumns, gapMapRows } from "../lib/derive";
import { tagHref } from "../lib/links";
import { DomainChip } from "./DomainChip";
import { StudyLink } from "./StudyLink";

const ROWS = gapMapRows();
const COLS = gapMapColumns();

/** Studies × limitation tags. A filled square means the study carries the tag. */
export function GapMap({ id = "gap-map" }: { id?: string }) {
  return (
    <figure className="gapmap" id={id} aria-labelledby={`${id}-title`} tabIndex={-1}>
      <figcaption>
        <h2 id={`${id}-title`}>Gap map</h2>
        <p className="figure-desc">
          Which blind spots each study has. A filled square means the study carries that limitation. Select a column to
          see those studies.
        </p>
      </figcaption>

      <p className="scroll-hint">Scroll sideways to see all {COLS.length} columns.</p>
      <div className="scroll-x">
        <table className="gapmap-table">
          <caption className="visually-hidden">
            Gap map: {ROWS.length} studies by {COLS.length} limitation tags. Yes means the study carries the tag.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="gm-study-col">
                Study
              </th>
              {COLS.map((c, i) => (
                <th key={c.tag} scope="col">
                  <span className="has-tip">
                    <Link to={tagHref(c.tag)} aria-describedby={`tip-${id}-${i}`}>
                      {c.short}
                    </Link>
                    <span className="tooltip" role="tooltip" id={`tip-${id}-${i}`}>
                      {c.tag}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((p) => (
              <tr key={p.id}>
                <th scope="row" className="gm-study-col">
                  <span className="gm-row-label">
                    <StudyLink id={p.id} label={studyLabel(p.id)} />
                    <DomainChip category={p.impact_category} short />
                  </span>
                </th>
                {COLS.map((c) => {
                  const on = p.limitation_tags.includes(c.tag);
                  return (
                    <td key={c.tag}>
                      <span className={`gm-cell${on ? " is-on" : ""}`} data-cell="" data-on={on} title={`${c.tag}: ${on ? "yes" : "no"}`} />
                      <span className="visually-hidden">{on ? "Yes" : "No"}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="gm-study-col">
                Studies with tag
              </th>
              {COLS.map((c) => (
                <td key={c.tag}>{c.count}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <dl className="gm-legend">
        {COLS.map((c) => (
          <div key={c.tag}>
            <dt>{c.short}</dt>
            <dd>{c.tag}</dd>
          </div>
        ))}
      </dl>

      {COLS.filter((c) => c.count === 0).map((c) => (
        <p key={c.tag} className="callout-unknown">
          <span className="unknown-label">Unknown:</span> no study in this set is tagged {c.tag}.
        </p>
      ))}
    </figure>
  );
}
