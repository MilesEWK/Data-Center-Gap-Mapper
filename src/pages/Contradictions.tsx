import { useSearchParams } from "react-router-dom";
import { GAP_BRIEF } from "../data";
import { DOMAIN_SLUGS, SHORT_NAME, domClass } from "../domains";
import { ContradictionList } from "../components/ContradictionCard";
import { contradictionTexts, firstUses } from "../lib/glossary";
import { GlossaryPlan } from "../lib/glossaryContext";
import { PageHeader } from "../components/PageHeader";
import { contradictionsInDomain } from "../lib/derive";
import { useTitle } from "../lib/useTitle";

export function Contradictions() {
  useTitle("Contradictions");
  const [params, setParams] = useSearchParams();
  const slug = params.get("domain") ?? "";
  const domain = DOMAIN_SLUGS[slug] ?? null;
  const rows = contradictionsInDomain(domain);

  return (
    <>
      <PageHeader
        title="Contradictions"
        lede={`${GAP_BRIEF.contradictionMatrix.length} places where two studies report different figures for the same thing, and the method choice behind each split.`}
      />
      <div className="wrap page-body">
        <div className="segmented" role="group" aria-label="Filter by domain">
          <button type="button" aria-pressed={domain === null} onClick={() => setParams({}, { replace: true })}>
            All <span className="seg-count">{GAP_BRIEF.contradictionMatrix.length}</span>
          </button>
          {Object.entries(DOMAIN_SLUGS).map(([s, d]) => (
            <button
              key={s}
              type="button"
              className={domClass(d)}
              aria-pressed={domain === d}
              onClick={() => setParams({ domain: s }, { replace: true })}
            >
              <span className="dot" aria-hidden="true" />
              {SHORT_NAME[d]} <span className="seg-count">{contradictionsInDomain(d).length}</span>
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          Showing {rows.length} of {GAP_BRIEF.contradictionMatrix.length}
        </p>
        <GlossaryPlan.Provider value={firstUses(contradictionTexts(rows))}>
          <ContradictionList rows={rows} />
        </GlossaryPlan.Provider>
      </div>
    </>
  );
}
