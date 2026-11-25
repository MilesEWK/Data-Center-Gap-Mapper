import { SHORT_NAME, domClass } from "../domains";
import type { ImpactCategory } from "../types";

interface Props {
  category: string;
  /** Use the short name ("Water") instead of the full category name. */
  short?: boolean;
}

/** Tinted chip with a coloured dot. Text stays ink, so colour is never the only signal. */
export function DomainChip({ category, short = false }: Props) {
  const label = short ? (SHORT_NAME[category as ImpactCategory] ?? category) : category;
  return (
    <span className={`chip ${domClass(category)}`}>
      <span className="dot" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Coloured dot followed by a text label, for headers and filters. */
export function DomainDot({ category, label }: { category: string; label?: string }) {
  return (
    <span className={`dot-label ${domClass(category)}`}>
      <span className="dot" aria-hidden="true" />
      {label ?? category}
    </span>
  );
}
