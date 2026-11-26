import { Link, useParams } from "react-router-dom";
import { DOMAIN_SLUGS, SHORT_NAME, domClass } from "../domains";
import { ContradictionList } from "../components/ContradictionCard";
import { GlossText } from "../components/GlossText";
import { contradictionTexts, firstUses } from "../lib/glossary";
import { GlossaryPlan } from "../lib/glossaryContext";
import { PageHeader } from "../components/PageHeader";
import { StudyLink } from "../components/StudyLink";
import { studyLabel } from "../data/studyNameMap";
import { contradictionsInDomain, relatedEvidence, studiesInCategory } from "../lib/derive";
import { tagHref } from "../lib/links";
import { useTitle } from "../lib/useTitle";
import type { Paper } from "../types";
import { NotFound } from "./NotFound";

/** Per-domain copy, keyed by route slug, so no heading or note repeats across the three pages. */
const COPY: Record<string, { intro: string; studies: string; contradictions: string; multiNote: string }> = {
  grid: {
    intro: "How much electricity data centers draw, how fast that is growing, and how much carbon it carries.",
    studies: "Studies measuring load and emissions",
    contradictions: "Where estimates disagree",
    multiNote: "Each covers more than one domain; open a record for its electricity and emissions figures.",
  },
  water: {
    intro: "Water used on site for cooling, and water consumed at the power plants that supply the electricity.",
    studies: "Studies measuring water use",
    contradictions: "Where water figures conflict",
    multiNote: "Each covers more than one domain; open a record for its water figures.",
  },
  fiscal: {
    intro: "Tax revenue, incentives, jobs, and costs passed on to ratepayers.",
    studies: "Studies measuring fiscal effects",
    contradictions: "Where fiscal findings split",
    multiNote: "Each covers more than one domain; open a record for its tax and cost figures.",
  },
};

function StudyRows({ papers }: { papers: Paper[] }) {
  return (
    <ul className="study-rows">
      {papers.map((p) => (
        <li key={p.id} data-study-id={p.id}>
          <p className="study-row-title">
            <StudyLink id={p.id} label={studyLabel(p.id)} />
            <span className="muted">{p.year}</span>
          </p>
          <p className="muted">{p.dataset_type}</p>
          <ul className="tag-links">
            {p.limitation_tags.map((t) => (
              <li key={t}>
                <Link to={tagHref(t)}>{t}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function DomainPage() {
  const { slug = "" } = useParams();
  const domain = DOMAIN_SLUGS[slug];
  const name = domain ? SHORT_NAME[domain] : "Not found";
  useTitle(name);
  if (!domain) return <NotFound />;

  const studies = studiesInCategory(domain);
  const multi = studiesInCategory("Multi-Impact");
  const contradictions = contradictionsInDomain(domain);
  const evidence = relatedEvidence(studies.map((p) => p.id));
  const copy = COPY[slug];
  const plan = firstUses([...contradictionTexts(contradictions), ...evidence.map((e, i): [string, string] => [`ev${i}`, e.point.point])]);

  return (
    <div className={domClass(domain)}>
      <PageHeader
        title={domain}
        domain={domain}
        breadcrumbs={[{ label: "Overview", to: "/" }, { label: SHORT_NAME[domain] }]}
        lede={copy.intro}
      />
      <GlossaryPlan.Provider value={plan}>
      <div className="wrap page-body domain-body">
        <section aria-labelledby="d-studies" className="domain-section">
          <h2 id="d-studies">{copy.studies}</h2>
          <StudyRows papers={studies} />
        </section>

        <section aria-labelledby="d-multi" className="domain-section">
          <h2 id="d-multi">Multi-impact studies</h2>
          <p className="section-lede">{copy.multiNote}</p>
          <StudyRows papers={multi} />
        </section>

        <section aria-labelledby="d-contra" className="domain-section">
          <h2 id="d-contra">{copy.contradictions}</h2>
          {contradictions.length > 0 ? (
            <ContradictionList rows={contradictions} showDomain={false} />
          ) : (
            <p className="muted">No contradictions in this domain.</p>
          )}
          <p className="section-link">
            <Link to="/contradictions">See all contradictions</Link>
          </p>
        </section>

        <section aria-labelledby="d-evidence" className="domain-section">
          <h2 id="d-evidence">What the evidence shows</h2>
          <ol className="evidence">
            {evidence.map(({ kind, point }, i) => (
              <li key={point.point}>
                <p>
                  <Link to={`/findings?tab=${kind}`} className="kind-label">
                    {kind === "agree" ? "Agreement" : "Divergence"}
                  </Link>
                  <GlossText text={point.point} planKey={`ev${i}`} />
                </p>
                <p className="sources">
                  <span className="sources-label">Sources</span>
                  {point.citations.map((id) => (
                    <StudyLink key={id} id={id} variant="inline" />
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
      </GlossaryPlan.Provider>
    </div>
  );
}
