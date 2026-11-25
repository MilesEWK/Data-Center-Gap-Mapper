// Filter state <-> URL query string. Unknown values in the URL are ignored, never coerced.
import type { FilterState, SortDir, SortKey } from "./filters";
import { EMPTY_FILTERS } from "./filters";
import { DATASET_TYPES, IMPACT_CATEGORIES, LIMITATION_TAGS } from "../types";

const SORT_KEYS: readonly SortKey[] = ["year", "id", "impact_category"];
const SORT_DIRS: readonly SortDir[] = ["asc", "desc"];

function pick<T extends string>(values: string[], allowed: readonly T[]): T[] {
  const set = new Set(values);
  return allowed.filter((v) => set.has(v));
}

export function parseFilters(search: string): FilterState {
  const params = new URLSearchParams(search);
  const [key, dir] = (params.get("sort") ?? "").split(":");
  const sort =
    SORT_KEYS.includes(key as SortKey) && SORT_DIRS.includes(dir as SortDir)
      ? { key: key as SortKey, dir: dir as SortDir }
      : null;
  return {
    q: params.get("q") ?? EMPTY_FILTERS.q,
    categories: pick(params.getAll("cat"), IMPACT_CATEGORIES),
    datasets: pick(params.getAll("ds"), DATASET_TYPES),
    tags: pick(params.getAll("tag"), LIMITATION_TAGS),
    sort,
  };
}

export function serializeFilters(f: FilterState): string {
  const params = new URLSearchParams();
  if (f.q.trim()) params.set("q", f.q.trim());
  f.categories.forEach((c) => params.append("cat", c));
  f.datasets.forEach((d) => params.append("ds", d));
  f.tags.forEach((t) => params.append("tag", t));
  if (f.sort) params.set("sort", `${f.sort.key}:${f.sort.dir}`);
  const s = params.toString();
  return s ? `?${s}` : "";
}
