import { Link, useParams } from "react-router-dom";
import { DOMAIN_SLUGS, SHORT_NAME, domClass } from "../domains";
import { ContradictionList } from "../components/ContradictionCard";
import { PageHeader } from "../components/PageHeader";
import { StudyLink } from "../components/StudyLink";
import { studyLabel } from "../data/studyNameMap";
import { contradictionsInDomain, plural, relatedEvidence, studiesInCategory } from "../lib/derive";
import { tagHref } from "../lib/links";
import { useTitle } from "../lib/useTitle";
import type { Paper } from "../types";
import { NotFound } from "./NotFound";

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

  return (
    <div className={domClass(domain)}>
      <PageHeader
        title={domain}
        domain={domain}
        breadcrumbs={[{ label: "Overview", to: "/" }, { label: SHORT_NAME[domain] }]}
        lede={`${plural(studies.length, "study", "studies")} in this domain, ${plural(
          contradictions.length,
          "contradiction",
          "contradictions",
        )}, and the evidence that cites them.`}
      />
      <div className="wrap page-body domain-body">
        <section aria-labelledby="d-studies" className="domain-section">
          <h2 id="d-studies">Studies in this domain</h2>
          <StudyRows papers={studies} />
        </section>

        <section aria-labelledby="d-multi" className="domain-section">
          <h2 id="d-multi">Multi-impact studies</h2>
          <p className="section-lede">These studies span several domains; check each record for this domain's figures.</p>
          <StudyRows papers={multi} />
        </section>

        <section aria-labelledby="d-contra" className="domain-section">
          <h2 id="d-contra">Contradictions</h2>
          {contradictions.length > 0 ? (
            <ContradictionList rows={contradictions} showDomain={false} />
          ) : (
            <p className="muted">No contradictions in this domain.</p>
          )}
        </section>

        <section aria-labelledby="d-evidence" className="domain-section">
          <h2 id="d-evidence">Related evidence</h2>
          <p className="section-lede">Consensus and divergence points that cite at least one study in this domain.</p>
          <ol className="evidence">
            {evidence.map(({ kind, point }) => (
              <li key={point.point}>
                <p>
                  <Link to={`/findings?tab=${kind}`} className="kind-label">
                    {kind === "agree" ? "Agreement" : "Divergence"}
                  </Link>
                  {point.point}
                </p>
                <p className="sources">
                  <span className="sources-label">Sources</span>
                  {point.citations.map((id) => (
                    <StudyLink key={id} id={id} asId />
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
