import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { PAPERS_BY_ID } from "../data";
import type { Contradiction } from "../data";
import { STUDY_NAME_TO_ID, studyLabel } from "../data/studyNameMap";
import { domClass } from "../domains";
import { DomainChip } from "./DomainChip";
import { GlossText } from "./GlossText";
import { Marked } from "./Marked";
import { StudyLink } from "./StudyLink";

function Side({ label, name, claim, planKey }: { label: string; name: string; claim: string; planKey?: string }) {
  const id = STUDY_NAME_TO_ID[name];
  return (
    <div className="contra-side">
      <span className="side-label">{label}</span>
      <p className="contra-study">{id ? <StudyLink id={id} label={name} /> : name}</p>
      <p className="contra-claim">
        <GlossText text={claim} planKey={planKey} />
      </p>
    </div>
  );
}

/** One study's record, side by side with the other in the panel. Hidden if the name has no record. */
function StudyFacts({ name }: { name: string }) {
  const id = STUDY_NAME_TO_ID[name];
  const paper = id ? PAPERS_BY_ID.get(id) : undefined;
  if (!paper) return null;
  return (
    <div className="facts">
      <h5 className="facts-title">{studyLabel(paper.id)}</h5>
      <dl>
        <div>
          <dt>Year</dt>
          <dd>{paper.year}</dd>
        </div>
        <div>
          <dt>Data source</dt>
          <dd>{paper.dataset_type}</dd>
        </div>
        <div>
          <dt>Region</dt>
          <dd>
            <Marked text={paper.region} />
          </dd>
        </div>
        <div>
          <dt>Limitations</dt>
          <dd>
            <ul className="facts-tags">
              {paper.limitation_tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <Link to={`/studies/${encodeURIComponent(paper.id)}`} state={{ scrollTo: "s-quote" }} className="facts-link">
        Read the source quote
      </Link>
    </div>
  );
}

/** "Why the numbers differ": reason, what each counted, side-by-side records, and why it matters. */
function WhyPanel({ c, k }: { c: Contradiction; k?: string }) {
  const hasA = Boolean(STUDY_NAME_TO_ID[c.studyA] && PAPERS_BY_ID.has(STUDY_NAME_TO_ID[c.studyA]));
  const hasB = Boolean(STUDY_NAME_TO_ID[c.studyB] && PAPERS_BY_ID.has(STUDY_NAME_TO_ID[c.studyB]));
  return (
    <div className="why">
      {c.methodologicalReason && (
        <section className="why-block">
          <h4>In short</h4>
          <p>
            <GlossText text={c.methodologicalReason} planKey={k && `${k}|methodologicalReason`} />
          </p>
        </section>
      )}
      {c.whatEachMeasured && (
        <section className="why-block">
          <h4>What each study counted</h4>
          <p>
            <GlossText text={c.whatEachMeasured} planKey={k && `${k}|whatEachMeasured`} />
          </p>
        </section>
      )}
      {(hasA || hasB) && (
        <section className="why-block" aria-label="The two studies compared">
          <div className="facts-grid">
            <StudyFacts name={c.studyA} />
            <StudyFacts name={c.studyB} />
          </div>
        </section>
      )}
      {c.whyItMatters && (
        <section className="why-matters">
          <h4>Why it matters</h4>
          <p>
            <GlossText text={c.whyItMatters} planKey={k && `${k}|whyItMatters`} />
          </p>
        </section>
      )}
    </div>
  );
}

export function ContradictionCard({ c, showDomain = true, k }: { c: Contradiction; showDomain?: boolean; k?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <li className={`contra-card ${domClass(c.domain)}`}>
      {showDomain && <DomainChip category={c.domain} />}
      <div className="contra-grid">
        <Side label="Study A" name={c.studyA} claim={c.claimA} planKey={k && `${k}|claimA`} />
        <span className="vs" aria-hidden="true">
          vs
        </span>
        <Side label="Study B" name={c.studyB} claim={c.claimB} planKey={k && `${k}|claimB`} />
      </div>
      <button
        type="button"
        className="disclosure"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span className="disclosure-mark" aria-hidden="true" />
        Why the numbers differ
      </button>
      {/* Always rendered so the height can animate; inert while closed so nothing inside is focusable. */}
      <div id={panelId} className={`why-wrap${open ? " is-open" : ""}`} inert={!open}>
        <div className="why-inner">
          <WhyPanel c={c} k={k} />
        </div>
      </div>
    </li>
  );
}

/** Column headers once (desktop), then one card per contradiction. */
export function ContradictionList({ rows, showDomain = true }: { rows: Contradiction[]; showDomain?: boolean }) {
  return (
    <div className="contra-list">
      <div className="contra-head" aria-hidden="true">
        <span>Study A</span>
        <span />
        <span>Study B</span>
      </div>
      <ol>
        {rows.map((c, i) => (
          <ContradictionCard key={`${c.domain}|${c.studyA}|${c.claimA}|${c.studyB}|${c.claimB}`} c={c} showDomain={showDomain} k={`c${i}`} />
        ))}
      </ol>
    </div>
  );
}
