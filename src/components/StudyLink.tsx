import { Link } from "react-router-dom";
import { PAPERS_BY_ID } from "../data";
import { studyLabel } from "../data/studyNameMap";

interface Props {
  id: string;
  /** Text to show; defaults to the short label, e.g. "Guidi et al. (2024)". */
  label?: string;
  /**
   * "name": ink, semibold, underline only on hover/focus (tables, maps, cards).
   * "inline": standard blue underlined link (inside paragraphs).
   */
  variant?: "name" | "inline";
}

/** Link to a study's detail page. Unknown ids render as plain text. */
export function StudyLink({ id, label, variant = "name" }: Props) {
  const text = label ?? studyLabel(id);
  const cls = variant === "name" ? "name-link" : undefined;
  if (!PAPERS_BY_ID.has(id)) return <span className={cls}>{text}</span>;
  return (
    <Link to={`/studies/${encodeURIComponent(id)}`} className={cls}>
      {text}
    </Link>
  );
}
