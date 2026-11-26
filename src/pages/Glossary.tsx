import { PageHeader } from "../components/PageHeader";
import { StudyLink } from "../components/StudyLink";
import { GLOSSARY } from "../lib/glossary";
import { useTitle } from "../lib/useTitle";

export function Glossary() {
  useTitle("Glossary");
  return (
    <>
      <PageHeader title="Glossary" lede="Plain-language definitions of the technical terms used in the studies and on this site." />
      <div className="wrap page-body">
        <dl className="glossary">
          {GLOSSARY.map((g) => (
            <div key={g.slug} id={`g-${g.slug}`} className="glossary-entry" tabIndex={-1}>
              <dt>{g.term}</dt>
              <dd>
                <p>{g.definition}</p>
                {g.cite && (
                  <p className="glossary-cite">
                    <span className="sources-label">{g.cite.kind === "defined" ? "Defined in" : "Example"}</span>
                    <StudyLink id={g.cite.id} variant="inline" />: {g.cite.text}
                  </p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
