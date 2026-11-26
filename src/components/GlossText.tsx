import { useContext } from "react";
import { Link } from "react-router-dom";
import { GLOSSARY_BY_SLUG, linkSegments } from "../lib/glossary";
import { GlossaryPlan } from "../lib/glossaryContext";
import { Marked } from "./Marked";

/** Renders data text exactly as written; the page's first use of each glossary term links to its entry. */
export function GlossText({ text, planKey }: { text: string; planKey?: string }) {
  const plan = useContext(GlossaryPlan);
  const slugs = (planKey ? plan.get(planKey) : undefined) ?? [];
  if (slugs.length === 0) return <Marked text={text} />;
  return (
    <>
      {linkSegments(text, slugs).map((s, i) =>
        s.slug ? (
          <Link
            key={i}
            to="/glossary"
            state={{ scrollTo: `g-${s.slug}` }}
            className="gloss-link"
            title={`Glossary: ${GLOSSARY_BY_SLUG.get(s.slug)?.term ?? ""}`}
          >
            {s.text}
          </Link>
        ) : (
          <Marked key={i} text={s.text} />
        ),
      )}
    </>
  );
}
