import { SHORT_NAME, domClass } from "../domains";
import type { ImpactCategory } from "../types";

interface Props {
  category: string;
  /** Use the short name ("Water") instead of the full category name. */
  short?: boolean;
}

/** 8px square in the domain colour plus a text label, so colour is never the only signal. */
export function DomainChip({ category, short = false }: Props) {
  const label = short ? (SHORT_NAME[category as ImpactCategory] ?? category) : category;
  return (
    <span className={`domain-mark ${domClass(category)}`}>
      <span className="sq" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Square followed by a label, for headers and filters (same mark, label inherits text colour). */
export function DomainDot({ category, label }: { category: string; label?: string }) {
  return (
    <span className={`domain-mark domain-mark-inherit ${domClass(category)}`}>
      <span className="sq" aria-hidden="true" />
      {label ?? category}
    </span>
  );
}

/** The bare square, for placing before a study name. Hidden from assistive tech; pair it with text. */
export function DomainSquare({ category }: { category: string }) {
  return <span className={`sq ${domClass(category)}`} title={category} aria-hidden="true" />;
}
