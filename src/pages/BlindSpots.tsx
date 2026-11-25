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
        lede="Which limitations recur across the studies, and which combinations of data source and domain no study covers."
      />
      <div className="wrap page-body">
        <section aria-labelledby="bs-tags" className="section-block">
          <h2 id="bs-tags">How often each limitation appears</h2>
          <p className="section-lede">Select a bar to list those studies.</p>
          <TagBars />
        </section>

        <section className="section-block">
          <GapMap id="gap-map-full" />
        </section>

        <section aria-labelledby="bs-xtab" className="section-block">
          <h2 id="bs-xtab">Dataset type by impact category</h2>
          <p className="section-lede">
            A zero is a combination no study in this set covers. Select a number to list those studies.
          </p>
          <CrossTab />
        </section>
      </div>
    </>
  );
}
