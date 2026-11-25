import { Link } from "react-router-dom";
import { PAPERS } from "../data";
import { rankedTags } from "../lib/filters";
import { tagHref } from "../lib/links";

/** Share of studies carrying each limitation tag, most frequent first. Each bar opens the filtered study list. */
export function TagBars() {
  const total = PAPERS.length;
  const ranked = rankedTags(PAPERS);
  const max = Math.max(0, ...ranked.map((r) => r.count));
  return (
    <ul className="tag-bars">
      {ranked.map(({ tag, count }) => {
        const pct = total === 0 ? 0 : Math.round((count / total) * 100);
        return (
          <li key={tag}>
            <Link to={tagHref(tag)} className="tag-bar">
              <span className="tag-bar-label">{tag}</span>
              <span className="tag-bar-value">
                {count} of {total} studies ({pct}%)
              </span>
              <span className="tag-bar-track" aria-hidden="true">
                <span className="tag-bar-fill" style={{ width: `${max === 0 ? 0 : (count / max) * 100}%` }} />
              </span>
            </Link>
            {count === 0 && (
              <p className="zero-note">No study in this set is tagged with this blind spot.</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
