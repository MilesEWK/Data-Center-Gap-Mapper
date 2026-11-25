import { Link, useParams } from "react-router-dom";
import { PAPERS, PAPERS_BY_ID } from "../data";
import { studyLabel } from "../data/studyNameMap";
import { domClass, slugFor } from "../domains";
import { CopyButton } from "../components/CopyButton";
import { DomainChip } from "../components/DomainChip";
import { Marked } from "../components/Marked";
import { PageHeader } from "../components/PageHeader";
import { StudyLink } from "../components/StudyLink";
import { appearsIn } from "../lib/derive";
import { tagHref } from "../lib/links";
import { useTitle } from "../lib/useTitle";
import { NotFound } from "./NotFound";

const KIND_LABEL = { agree: "Where studies agree", diverge: "Where they diverge", gap: "The primary gap" } as const;

export function StudyDetail() {
  const { id = "" } = useParams();
  const paper = PAPERS_BY_ID.get(id);
  useTitle(paper ? studyLabel(paper.id) : "Not found");
  if (!paper) return <NotFound />;

  const index = PAPERS.findIndex((p) => p.id === paper.id);
  const prev = index > 0 ? PAPERS[index - 1] : null;
  const next = index < PAPERS.length - 1 ? PAPERS[index + 1] : null;
  const refs = appearsIn(paper.id);

  return (
    <div className={domClass(paper.impact_category)}>
      <PageHeader
        title={studyLabel(paper.id)}
        breadcrumbs={[{ label: "Studies", to: "/studies" }, { label: paper.id }]}
        lede={
          <span className="study-meta">
            <DomainChip category={paper.impact_category} />
            <span>{paper.year}</span>
            <span>
              <Marked text={paper.region} />
            </span>
          </span>
        }
      />
      <article className="wrap page-body study-detail">
        <section aria-labelledby="s-citation">
          <h2 id="s-citation">Citation</h2>
          <p className="reading">{paper.citation}</p>
          <CopyButton text={paper.citation} label="Copy citation" />
        </section>
        <section aria-labelledby="s-rq">
          <h2 id="s-rq">Research question</h2>
          <p className="reading">
            <Marked text={paper.research_question} />
          </p>
        </section>
        <section aria-labelledby="s-method">
          <h2 id="s-method">Methodology</h2>
          <p className="reading">
            <Marked text={paper.methodology} />
          </p>
          <p className="muted small">Dataset type: {paper.dataset_type}</p>
        </section>
        <section aria-labelledby="s-findings">
          <h2 id="s-findings">Key findings</h2>
          <p className="reading">
            <Marked text={paper.key_findings} />
          </p>
        </section>
        <section aria-labelledby="s-limits">
          <h2 id="s-limits">Stated limitations</h2>
          <p className="reading">
            <Marked text={paper.stated_limitations} />
          </p>
        </section>
        <section aria-labelledby="s-tags">
          <h2 id="s-tags">Limitation tags</h2>
          <ul className="tag-links">
            {paper.limitation_tags.map((t) => (
              <li key={t}>
                <Link to={tagHref(t)}>{t}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="s-quote">
          <h2 id="s-quote">Verbatim quote</h2>
          <blockquote className="quote">
            <Marked text={paper.verbatim_quote_with_page} />
          </blockquote>
          <CopyButton text={paper.verbatim_quote_with_page} label="Copy quote" />
        </section>
        <section aria-labelledby="s-appears">
          <h2 id="s-appears">Appears in</h2>
          {refs.contradictions.length === 0 && refs.evidence.length === 0 ? (
            <p className="muted">Not referenced in the brief.</p>
          ) : (
            <div className="appears-groups">
              {refs.contradictions.length > 0 && (
                <div>
                  <h3>Contradictions ({refs.contradictions.length})</h3>
                  <ul className="appears">
                    {refs.contradictions.map((c) => (
                      <li key={`${c.studyA}|${c.claimA}|${c.studyB}|${c.claimB}`}>
                        <Link to={`/contradictions?domain=${slugFor(c.domain)}`}>
                          {c.studyA} vs {c.studyB}
                        </Link>
                        <span className="muted">{c.domain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {refs.evidence.length > 0 && (
                <div>
                  <h3>Evidence points ({refs.evidence.length})</h3>
                  <ul className="appears">
                    {refs.evidence.map(({ kind, point }) => (
                      <li key={`${kind}|${point.point}`}>
                        <Link to={`/findings?tab=${kind}`}>{KIND_LABEL[kind]}</Link>
                        <span>{point.point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
        <nav aria-label="Previous and next study" className="prev-next">
          {prev ? (
            <span>
              <span className="muted small">Previous</span>
              <StudyLink id={prev.id} />
            </span>
          ) : (
            <span />
          )}
          {next && (
            <span className="next">
              <span className="muted small">Next</span>
              <StudyLink id={next.id} />
            </span>
          )}
        </nav>
      </article>
    </div>
  );
}
