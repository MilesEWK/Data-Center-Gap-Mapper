import { useId, useState } from "react";
import type { Contradiction } from "../data";
import { STUDY_NAME_TO_ID } from "../data/studyNameMap";
import { domClass } from "../domains";
import { DomainChip } from "./DomainChip";
import { Marked } from "./Marked";
import { StudyLink } from "./StudyLink";

function Side({ label, name, claim }: { label: string; name: string; claim: string }) {
  const id = STUDY_NAME_TO_ID[name];
  return (
    <div className="contra-side">
      <span className="side-label">{label}</span>
      <p className="contra-study">{id ? <StudyLink id={id} label={name} /> : name}</p>
      <p className="contra-claim">
        <Marked text={claim} />
      </p>
    </div>
  );
}

export function ContradictionCard({ c, showDomain = true }: { c: Contradiction; showDomain?: boolean }) {
  const [open, setOpen] = useState(false);
  const reasonId = useId();
  return (
    <li className={`contra-card ${domClass(c.domain)}`}>
      {showDomain && <DomainChip category={c.domain} />}
      <div className="contra-grid">
        <Side label="Study A" name={c.studyA} claim={c.claimA} />
        <span className="vs" aria-hidden="true">
          vs
        </span>
        <Side label="Study B" name={c.studyB} claim={c.claimB} />
      </div>
      <button
        type="button"
        className="disclosure"
        aria-expanded={open}
        aria-controls={reasonId}
        onClick={() => setOpen(!open)}
      >
        <span className="disclosure-mark" aria-hidden="true" />
        Why they differ
      </button>
      <p id={reasonId} className="contra-reason" hidden={!open}>
        <Marked text={c.methodologicalReason} />
      </p>
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
        {rows.map((c) => (
          <ContradictionCard key={`${c.domain}|${c.studyA}|${c.claimA}|${c.studyB}|${c.claimB}`} c={c} showDomain={showDomain} />
        ))}
      </ol>
    </div>
  );
}
