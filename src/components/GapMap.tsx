import { Link } from "react-router-dom";
import { studyLabel } from "../data/studyNameMap";
import { gapMapColumns, gapMapRows } from "../lib/derive";
import { tagHref } from "../lib/links";
import { DomainSquare } from "./DomainChip";
import { StudyLink } from "./StudyLink";

const ROWS = gapMapRows();
const COLS = gapMapColumns();

/** Two-line header label: "Facility data" → "Facility" / "data". */
function TwoLine({ text }: { text: string }) {
  const i = text.indexOf(" ");
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <br />
      {text.slice(i + 1)}
    </>
  );
}

/** Studies × limitation tags. A filled square means the study carries the tag. */
export function GapMap({ id = "gap-map", showHint = true }: { id?: string; showHint?: boolean }) {
  return (
    <figure className="gapmap" id={id} aria-labelledby={`${id}-title`} tabIndex={-1}>
      <figcaption className="gapmap-caption">
        <h2 id={`${id}-title`}>Gap map</h2>
        <p className="gm-key">
          <span className="gm-key-item">
            <span className="gm-cell is-on" aria-hidden="true" />
            Has this limitation
          </span>
          <span className="gm-key-item">
            <span className="gm-cell" aria-hidden="true" />
            Does not
          </span>
          {showHint && <span className="gm-key-hint">Select a column name to list those studies.</span>}
        </p>
      </figcaption>

      {/* Grid: 768px and up. */}
      <table className="gapmap-table">
        <caption className="visually-hidden">
          Gap map: {ROWS.length} studies by {COLS.length} limitation tags. Yes means the study carries the tag.
        </caption>
        <colgroup>
          <col className="gm-col-study" />
          {COLS.map((c) => (
            <col key={c.tag} className="gm-col-tag" />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="gm-study">
              Study
            </th>
            {COLS.map((c, i) => (
              <th key={c.tag} scope="col">
                <span className="has-tip">
                  <Link to={tagHref(c.tag)} className="gm-head-link" aria-describedby={`tip-${id}-${i}`}>
                    <TwoLine text={c.short} />
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
              <th scope="row" className="gm-study">
                <span className="gm-name">
                  <DomainSquare category={p.impact_category} />
                  <StudyLink id={p.id} label={studyLabel(p.id)} />
                  <span className="visually-hidden">, {p.impact_category}</span>
                </span>
              </th>
              {COLS.map((c) => {
                const on = p.limitation_tags.includes(c.tag);
                return (
                  <td key={c.tag}>
                    <span
                      className={`gm-cell${on ? " is-on" : ""}`}
                      data-cell=""
                      data-on={on}
                      title={`${c.tag}: ${on ? "yes" : "no"}`}
                    />
                    <span className="visually-hidden">{on ? "Yes" : "No"}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className="gm-study">
              Studies with this limitation
            </th>
            {COLS.map((c) => (
              <td key={c.tag}>{c.count}</td>
            ))}
          </tr>
        </tfoot>
      </table>

      {/* List: below 768px. */}
      <ul className="gm-list" aria-label="Limitations by study">
        {ROWS.map((p) => (
          <li key={p.id}>
            <span className="gm-name">
              <DomainSquare category={p.impact_category} />
              <StudyLink id={p.id} label={studyLabel(p.id)} />
            </span>
            <span className="gm-list-tags">
              {COLS.filter((c) => p.limitation_tags.includes(c.tag)).map((c) => (
                <Link key={c.tag} to={tagHref(c.tag)} title={c.tag}>
                  {c.short}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ul>

      {COLS.filter((c) => c.count === 0).map((c) => (
        <p key={c.tag} className="callout-unknown">
          <span className="unknown-label">Unknown:</span> no study in this set is tagged {c.tag}.
        </p>
      ))}
    </figure>
  );
}
