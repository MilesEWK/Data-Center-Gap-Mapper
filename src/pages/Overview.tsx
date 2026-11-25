import { Link } from "react-router-dom";
import { GAP_BRIEF, PAPERS } from "../data";
import { DOMAIN_SLUGS } from "../domains";
import { DomainCard } from "../components/DomainCard";
import { DomainStripe } from "../components/DomainStripe";
import { GapMap } from "../components/GapMap";
import { StatStrip } from "../components/StatStrip";
import { useTitle } from "../lib/useTitle";

function goToGapMap() {
  const el = document.getElementById("gap-map");
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  el.focus({ preventScroll: true });
}

export function Overview() {
  useTitle("Overview");
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <h1 id="hero-title">Where the evidence on U.S. hyperscale data centers runs out</h1>
          <DomainStripe variant="title" />
          <p className="hero-gap">{GAP_BRIEF.evidenceOutline.primaryGap.statement}</p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={goToGapMap}>
              See the gap map
            </button>
            <Link to="/studies" className="btn btn-secondary">
              Browse the {PAPERS.length} studies
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap section-tight" aria-label="Key figures">
        <StatStrip />
      </section>

      <section className="wrap section">
        <GapMap />
      </section>

      <section className="band section-band" aria-labelledby="domains-title">
        <div className="wrap">
          <h2 id="domains-title">Impact domains</h2>
          <div className="domain-cards">
            {Object.entries(DOMAIN_SLUGS).map(([slug, domain]) => (
              <DomainCard key={slug} slug={slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
