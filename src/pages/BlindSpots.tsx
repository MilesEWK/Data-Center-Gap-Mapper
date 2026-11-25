import { CrossTab } from "../components/CrossTab";
import { GapMap } from "../components/GapMap";
import { PageHeader } from "../components/PageHeader";
import { TagBars } from "../components/TagBars";
import { useTitle } from "../lib/useTitle";

export function BlindSpots() {
  useTitle("Blind spots");
  return (
    <>
      <PageHeader
        title="Blind spots"
        lede="Recurring weaknesses in how these studies collect and count their data."
      />
      <div className="wrap page-body">
        <section aria-labelledby="bs-tags" className="section-block">
          <h2 id="bs-tags">How often each limitation appears</h2>
          <p className="section-lede">Select a bar to list those studies.</p>
          <TagBars />
        </section>

        <section className="section-block">
          <GapMap id="gap-map-full" showHint={false} />
        </section>

        <section aria-labelledby="bs-xtab" className="section-block">
          <h2 id="bs-xtab">Dataset type by impact category</h2>
          <p className="section-lede">Each non-zero count opens the matching studies.</p>
          <CrossTab />
        </section>
      </div>
    </>
  );
}
