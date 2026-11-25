import { Link } from "react-router-dom";
import { GAP_BRIEF, PAPERS } from "../data";
import { yearRange } from "../lib/derive";

/** Four headline numbers, each linking to the page that explains it. */
export function StatStrip() {
  const stats = [
    { value: String(PAPERS.length), label: "Studies reviewed", to: "/studies", dom: "dom-grid" },
    { value: yearRange(), label: "Years covered", to: "/studies?sort=year%3Aasc", dom: "dom-water" },
    { value: String(GAP_BRIEF.contradictionMatrix.length), label: "Contradictions found", to: "/contradictions", dom: "dom-fiscal" },
    { value: String(GAP_BRIEF.unresolved.length), label: "Unresolved items", to: "/methods", state: { scrollTo: "unresolved" }, dom: "dom-multi" },
  ];
  return (
    <ul className="stat-strip" aria-label="Key figures">
      {stats.map((s) => (
        <li key={s.label} className={s.dom}>
          <Link to={s.to} state={s.state}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
