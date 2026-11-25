import { Link } from "react-router-dom";
import { PAPERS_BY_ID } from "../data";
import { studyLabel } from "../data/studyNameMap";

interface Props {
  id: string;
  /** Text to show; defaults to the short label, e.g. "Guidi et al. (2024)". */
  label?: string;
  /** Show the label as a paper id in monospace. */
  asId?: boolean;
}

/** Link to a study's detail page. Unknown ids render as plain text. */
export function StudyLink({ id, label, asId = false }: Props) {
  const text = label ?? (asId ? id : studyLabel(id));
  const cls = asId ? "study-id" : undefined;
  if (!PAPERS_BY_ID.has(id)) return <span className={cls}>{text}</span>;
  return (
    <Link to={`/studies/${encodeURIComponent(id)}`} className={cls}>
      {text}
    </Link>
  );
}
