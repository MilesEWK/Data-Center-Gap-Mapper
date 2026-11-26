import { Link } from "react-router-dom";
import { PAPERS } from "../data";
import { yearRange } from "../lib/derive";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cols">
          <section aria-labelledby="f-about">
            <h2 id="f-about">About this review</h2>
            <p>
              A structured review of {PAPERS.length} studies, from the years {yearRange()} on how the United States&rsquo;
              hyperscale data centers affect the grid, water, and local finances. Also highlighting where the evidence
              disagrees, or is missing.
            </p>
          </section>
          <section aria-labelledby="f-data">
            <h2 id="f-data">Data</h2>
            <ul>
              <li>
                <Link to="/methods">How the review was done</Link>
              </li>
              <li>
                <Link to="/studies">All studies</Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="f-cite">
            <h2 id="f-cite">Citation note</h2>
            <p>Cite this repository and the underlying primary studies, not this site alone.</p>
          </section>
        </div>
        <p className="footer-small">All figures computed from papers.json and brief.ts.</p>
      </div>
    </footer>
  );
}
