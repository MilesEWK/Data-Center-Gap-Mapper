import { useSearchParams } from "react-router-dom";
import { GAP_BRIEF, PAPERS } from "../data";
import { EvidenceList } from "../components/EvidenceList";
import { PageHeader } from "../components/PageHeader";
import { Tabs } from "../components/Tabs";
import { useTitle } from "../lib/useTitle";

const { consensus, divergence, primaryGap } = GAP_BRIEF.evidenceOutline;
const TABS = [
  { key: "agree", label: "Where studies agree", count: consensus.length },
  { key: "diverge", label: "Where they diverge", count: divergence.length },
  { key: "gap", label: "The primary gap", count: primaryGap.supportingEvidence.length },
];

export function Findings() {
  useTitle("Findings");
  const [params, setParams] = useSearchParams();
  const tab = TABS.some((t) => t.key === params.get("tab")) ? (params.get("tab") as string) : "agree";

  return (
    <>
      <PageHeader
        title="Findings"
        lede={`What the ${PAPERS.length} studies agree on, where their numbers split, and what none of them measures.`}
      />
      <div className="wrap page-body">
        <Tabs label="Findings" tabs={TABS} active={tab} onChange={(key) => setParams({ tab: key }, { replace: true })}>
          {tab === "agree" && <EvidenceList points={consensus} />}
          {tab === "diverge" && <EvidenceList points={divergence} />}
          {tab === "gap" && (
            <>
              <p className="gap-box">{primaryGap.statement}</p>
              <h2 className="h-sub">Supporting evidence</h2>
              <EvidenceList points={primaryGap.supportingEvidence} />
            </>
          )}
        </Tabs>
      </div>
    </>
  );
}
