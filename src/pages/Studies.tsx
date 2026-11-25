import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PAPERS } from "../data";
import { FilterSidebar } from "../components/FilterSidebar";
import { PageHeader } from "../components/PageHeader";
import { StudyTable } from "../components/StudyTable";
import type { FilterState } from "../lib/filters";
import { EMPTY_FILTERS, filterPapers, hasActiveFilters, sortPapers } from "../lib/filters";
import { parseFilters, serializeFilters } from "../lib/urlState";
import { useTitle } from "../lib/useTitle";

const SEARCH_DEBOUNCE_MS = 250;

export function Studies() {
  useTitle("Studies");
  const [params, setParams] = useSearchParams();
  // Filter state lives in this page's URL query (e.g. #/studies?tag=...).
  const filters = useMemo(() => parseFilters(`?${params.toString()}`), [params]);
  const setFilters = useCallback(
    (next: FilterState) => setParams(new URLSearchParams(serializeFilters(next)), { replace: true }),
    [setParams],
  );

  // What the user is typing; written to the URL after a pause.
  const [searchInput, setSearchInput] = useState(filters.q);
  // When the query changes from outside the box (a link, Clear filters), mirror it into the box.
  const [seenQ, setSeenQ] = useState(filters.q);
  if (filters.q !== seenQ) {
    setSeenQ(filters.q);
    setSearchInput(filters.q);
  }

  useEffect(() => {
    if (searchInput === filters.q) return;
    const t = window.setTimeout(() => setFilters({ ...filters, q: searchInput }), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [searchInput, filters, setFilters]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const visible = useMemo(() => sortPapers(filterPapers(PAPERS, filters), filters.sort), [filters]);
  const activeCount = filters.categories.length + filters.datasets.length + filters.tags.length + (filters.q.trim() ? 1 : 0);
  const clear = () => {
    setSearchInput("");
    setFilters(EMPTY_FILTERS);
  };

  return (
    <>
      <PageHeader title="Studies" lede="Every study in the review. Filter, sort, and open any study for its full record." />
      <div className="wrap page-body studies-layout">
        <button
          type="button"
          className="btn btn-secondary filters-toggle"
          aria-expanded={drawerOpen}
          aria-controls="filters-drawer"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
        <aside id="filters-drawer" className={`filters-drawer${drawerOpen ? " is-open" : ""}`} aria-label="Filters">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            searchInput={searchInput}
            onSearchInput={setSearchInput}
            onClear={clear}
          />
        </aside>

        <div className="studies-main">
          <p className="result-count" aria-live="polite">
            Showing {visible.length} of {PAPERS.length} studies
          </p>
          {visible.length === 0 ? (
            <div className="empty">
              <p>
                No studies match. Clear filters to see all {PAPERS.length}.
              </p>
              <button type="button" className="btn btn-secondary" onClick={clear}>
                Clear filters
              </button>
            </div>
          ) : (
            <StudyTable papers={visible} filters={filters} onFiltersChange={setFilters} />
          )}
          {hasActiveFilters(filters) && visible.length > 0 && (
            <p className="muted small">
              <button type="button" className="btn-link" onClick={clear}>
                Clear filters
              </button>{" "}
              to see all {PAPERS.length}.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
