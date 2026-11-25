import { Link } from "react-router-dom";
import type { Domain } from "../data";
import { domClass } from "../domains";
import { contradictionsInDomain, plural, studiesInCategory } from "../lib/derive";

export function DomainCard({ slug, domain }: { slug: string; domain: Domain }) {
  const studies = studiesInCategory(domain).length;
  const multi = studiesInCategory("Multi-Impact").length;
  const contradictions = contradictionsInDomain(domain).length;
  return (
    <article className={`domain-card ${domClass(domain)}`} aria-labelledby={`card-${slug}`}>
      <h3 id={`card-${slug}`}>
        <span className="dot" aria-hidden="true" />
        {domain}
      </h3>
      <dl>
        <div>
          <dt>Studies</dt>
          <dd>{studies}</dd>
        </div>
        <div>
          <dt>Contradictions</dt>
          <dd>{contradictions}</dd>
        </div>
      </dl>
      {multi > 0 && <p className="card-note">+ {plural(multi, "multi-impact study", "multi-impact studies")}</p>}
      <Link to={`/domains/${slug}`} className="card-link">
        View domain
      </Link>
    </article>
  );
}
