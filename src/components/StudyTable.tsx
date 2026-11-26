import { useNavigate } from "react-router-dom";
import { SOURCE_LINKS } from "../data/sourceLinks";
import { studyLabel } from "../data/studyNameMap";
import { SHORT_NAME } from "../domains";
import { DATASET_SHORT } from "../lib/derive";
import type { FilterState, SortKey } from "../lib/filters";
import type { Paper } from "../types";
import { LIMITATION_TAGS } from "../types";
import { DomainSquare } from "./DomainChip";
import { StudyLink } from "./StudyLink";

interface Props {
  papers: Paper[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}

function SortHeader({
  label,
  sortKey,
  filters,
  onFiltersChange,
  className,
}: { label: string; sortKey: SortKey; className?: string } & Pick<Props, "filters" | "onFiltersChange">) {
  const dir = filters.sort?.key === sortKey ? filters.sort.dir : null;
  // Cycle: ascending → descending → dataset order.
  const next =
    dir === null ? { key: sortKey, dir: "asc" as const } : dir === "asc" ? { key: sortKey, dir: "desc" as const } : null;
  return (
    <th scope="col" className={className} aria-sort={dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none"}>
      <button type="button" className="sort-btn" onClick={() => onFiltersChange({ ...filters, sort: next })}>
        {label}
        <span className={`sort-ind${dir ? ` is-${dir}` : ""}`} aria-hidden="true" />
      </button>
    </th>
  );
}

/** Study list. The whole row opens the study's detail page. */
export function StudyTable({ papers, filters, onFiltersChange }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <table className="data-table study-table">
        <caption className="visually-hidden">Studies matching the current filters. Select a study to open its record.</caption>
        <colgroup>
          <col className="st-study" />
          <col className="st-year" />
          <col className="st-domain hide-sm" />
          <col className="st-dataset hide-sm" />
          <col className="st-tags" />
        </colgroup>
        <thead>
          <tr>
            <SortHeader label="Study" sortKey="id" filters={filters} onFiltersChange={onFiltersChange} />
            <SortHeader label="Year" sortKey="year" filters={filters} onFiltersChange={onFiltersChange} />
            <SortHeader label="Domain" sortKey="impact_category" filters={filters} onFiltersChange={onFiltersChange} className="hide-sm" />
            <th scope="col" className="hide-sm">
              Data source
            </th>
            <th scope="col">Limitations</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((p) => (
            <tr
              key={p.id}
              className="study-row"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) return;
                navigate(`/studies/${encodeURIComponent(p.id)}`);
              }}
            >
              <th scope="row">
                <span className="gm-name">
                  <DomainSquare category={p.impact_category} />
                  <StudyLink id={p.id} label={studyLabel(p.id)} />
                </span>
                {SOURCE_LINKS[p.id] && (
                  <a className="doc-link" href={SOURCE_LINKS[p.id]} target="_blank" rel="noopener noreferrer">
                    Open original document
                    <span className="visually-hidden"> for {studyLabel(p.id)} (opens in a new tab)</span>
                  </a>
                )}
              </th>
              <td className="num-left">{p.year}</td>
              <td className="cell-muted hide-sm">{SHORT_NAME[p.impact_category]}</td>
              <td className="cell-muted hide-sm">
                <span title={p.dataset_type} aria-hidden="true">
                  {DATASET_SHORT[p.dataset_type]}
                </span>
                <span className="visually-hidden">{p.dataset_type}</span>
              </td>
              <td>
                <span className="tag-squares">
                  {LIMITATION_TAGS.map((t) => {
                    const on = p.limitation_tags.includes(t);
                    return <span key={t} className={`tag-sq${on ? " is-on" : ""}`} title={`${t}: ${on ? "yes" : "no"}`} />;
                  })}
                </span>
                <span className="visually-hidden">Tags: {p.limitation_tags.join("; ")}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="table-note">Limitation squares follow the gap map columns, left to right.</p>
    </>
  );
}
