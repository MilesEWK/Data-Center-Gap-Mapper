import { Link } from "react-router-dom";
import { PAPERS } from "../data";
import { EMPTY_FILTERS, crossTab } from "../lib/filters";
import { serializeFilters } from "../lib/urlState";
import { DATASET_TYPES, IMPACT_CATEGORIES } from "../types";
import { DomainDot } from "./DomainChip";

/** Dataset type × impact category. Non-zero cells open the study list filtered to that pair. */
export function CrossTab() {
  const x = crossTab(PAPERS);
  return (
    <div className="scroll-x">
      <table className="data-table xtab">
        <caption className="visually-hidden">Studies by dataset type (rows) and impact category (columns), with totals</caption>
        <thead>
          <tr>
            <th scope="col">Dataset type</th>
            {IMPACT_CATEGORIES.map((c) => (
              <th scope="col" key={c} className="num">
                <DomainDot category={c} />
              </th>
            ))}
            <th scope="col" className="num">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {DATASET_TYPES.map((d) => (
            <tr key={d}>
              <th scope="row">{d}</th>
              {IMPACT_CATEGORIES.map((c) => {
                const n = x.cells[d][c];
                return (
                  <td key={c} className="num">
                    {n === 0 ? (
                      <span className="zero">0</span>
                    ) : (
                      <Link
                        to={`/studies${serializeFilters({ ...EMPTY_FILTERS, datasets: [d], categories: [c] })}`}
                        aria-label={`${n} ${n === 1 ? "study" : "studies"}: ${d}, ${c}`}
                      >
                        {n}
                      </Link>
                    )}
                  </td>
                );
              })}
              <td className="num strong">{x.rowTotals[d]}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            {IMPACT_CATEGORIES.map((c) => (
              <td key={c} className="num strong">
                {x.colTotals[c]}
              </td>
            ))}
            <td className="num strong">{x.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
