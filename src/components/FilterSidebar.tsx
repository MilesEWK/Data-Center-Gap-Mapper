import type { ReactNode } from "react";
import { PAPERS } from "../data";
import type { FilterState } from "../lib/filters";
import { hasActiveFilters, toggleValue } from "../lib/filters";
import { DATASET_TYPES, IMPACT_CATEGORIES, LIMITATION_TAGS } from "../types";
import { DomainDot } from "./DomainChip";

interface Props {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  searchInput: string;
  onSearchInput: (q: string) => void;
  onClear: () => void;
}

function CheckGroup<T extends string>({
  legend,
  values,
  selected,
  countFor,
  onChange,
  renderLabel,
}: {
  legend: string;
  values: readonly T[];
  selected: readonly T[];
  countFor: (v: T) => number;
  onChange: (next: T[]) => void;
  renderLabel?: (v: T) => ReactNode;
}) {
  return (
    <fieldset className="check-group">
      <legend>{legend}</legend>
      {values.map((v) => (
        <label key={v} className="check">
          <input
            type="checkbox"
            checked={selected.includes(v)}
            onChange={() => onChange(toggleValue(selected, v, values))}
          />
          <span className="check-text">
            {renderLabel ? renderLabel(v) : v}
            <span className="check-count">{countFor(v)}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}

/** Search plus AND-across / OR-within checkbox groups. */
export function FilterSidebar({ filters, onFiltersChange, searchInput, onSearchInput, onClear }: Props) {
  const active = hasActiveFilters(filters) || searchInput.trim() !== "";
  return (
    <form className="filter-sidebar" role="search" aria-label="Filter studies" onSubmit={(e) => e.preventDefault()}>
      <label className="field">
        <span>Search</span>
        <input
          type="search"
          id="study-search"
          value={searchInput}
          placeholder="Try Virginia or jlarc_2024"
          onChange={(e) => onSearchInput(e.target.value)}
        />
      </label>
      <CheckGroup
        legend="Impact category"
        values={IMPACT_CATEGORIES}
        selected={filters.categories}
        countFor={(v) => PAPERS.filter((p) => p.impact_category === v).length}
        onChange={(categories) => onFiltersChange({ ...filters, categories })}
        renderLabel={(v) => <DomainDot category={v} />}
      />
      <CheckGroup
        legend="Dataset type"
        values={DATASET_TYPES}
        selected={filters.datasets}
        countFor={(v) => PAPERS.filter((p) => p.dataset_type === v).length}
        onChange={(datasets) => onFiltersChange({ ...filters, datasets })}
      />
      <CheckGroup
        legend="Limitation tag"
        values={LIMITATION_TAGS}
        selected={filters.tags}
        countFor={(v) => PAPERS.filter((p) => p.limitation_tags.includes(v)).length}
        onChange={(tags) => onFiltersChange({ ...filters, tags })}
      />
      <p className="filter-logic">
        A study must match every group you use, and any ticked option within a group.
      </p>
      <button type="button" className="btn btn-secondary btn-small" onClick={onClear} disabled={!active && !filters.sort}>
        Clear filters
      </button>
    </form>
  );
}
