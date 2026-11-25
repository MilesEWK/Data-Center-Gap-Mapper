import type { EvidencePoint } from "../data";
import { StudyLink } from "./StudyLink";

/** Numbered findings, each followed by small source-id links to study detail pages. */
export function EvidenceList({ points }: { points: EvidencePoint[] }) {
  return (
    <ol className="evidence">
      {points.map((pt) => (
        <li key={pt.point}>
          <p>{pt.point}</p>
          <p className="sources">
            <span className="sources-label">Sources</span>
            {pt.citations.map((id) => (
              <StudyLink key={id} id={id} asId />
            ))}
          </p>
        </li>
      ))}
    </ol>
  );
}
