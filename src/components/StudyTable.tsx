import { useNavigate } from "react-router-dom";
import { studyLabel } from "../data/studyNameMap";
import type { FilterState, SortKey } from "../lib/filters";
import type { Paper } from "../types";
import { LIMITATION_TAGS } from "../types";
import { SHORT_TAG } from "../lib/derive";
import { DomainChip } from "./DomainChip";
import { StudyLink } from "./StudyLink";

interface Props {
  papers: Paper[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}

function SortHeader({ label, sortKey, filters, onFiltersChange }: { label: string; sortKey: SortKey } & Pick<Props, "filters" | "onFiltersChange">) {
  const dir = filters.sort?.key === sortKey ? filters.sort.dir : null;
  // Cycle: ascending → descending → dataset order.
  const next = dir === null ? { key: sortKey, dir: "asc" as const } : dir === "asc" ? { key: sortKey, dir: "desc" as const } : null;
  return (
    <th scope="col" aria-sort={dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none"}>
      <button type="button" className="sort-btn" onClick={() => onFiltersChange({ ...filters, sort: next })}>
        {label}
        <span className={`sort-ind${dir ? ` is-${dir}` : ""}`} aria-hidden="true" />
      </button>
    </th>
  );
}

/** Study list. Each row opens the study's detail page. */
export function StudyTable({ papers, filters, onFiltersChange }: Props) {
  const navigate = useNavigate();
  return (
    <div className="scroll-x">
      <table className="data-table study-table">
        <caption className="visually-hidden">Studies matching the current filters. Select a study to open its record.</caption>
        <thead>
          <tr>
            <SortHeader label="Study" sortKey="id" filters={filters} onFiltersChange={onFiltersChange} />
            <SortHeader label="Year" sortKey="year" filters={filters} onFiltersChange={onFiltersChange} />
            <SortHeader label="Domain" sortKey="impact_category" filters={filters} onFiltersChange={onFiltersChange} />
            <th scope="col">Dataset type</th>
            <th scope="col">Tags</th>
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
                <StudyLink id={p.id} label={studyLabel(p.id)} />
                <span className="row-id">{p.id}</span>
              </th>
              <td className="num">{p.year}</td>
              <td>
                <DomainChip category={p.impact_category} short />
              </td>
              <td>{p.dataset_type}</td>
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
      <p className="table-note">Tag squares, left to right: {LIMITATION_TAGS.map((t) => SHORT_TAG[t]).join(", ")}.</p>
    </div>
  );
}
