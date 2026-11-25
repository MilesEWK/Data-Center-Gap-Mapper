// Shared hrefs into the Studies page, built with the same serializer the page parses.
import type { LimitationTag } from "../types";
import { EMPTY_FILTERS } from "./filters";
import { serializeFilters } from "./urlState";

export function tagHref(tag: LimitationTag): string {
  return `/studies${serializeFilters({ ...EMPTY_FILTERS, tags: [tag] })}`;
}
