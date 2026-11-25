/** The site's one decorative element: four equal segments in the domain colours. */
export function DomainStripe({ variant = "page" }: { variant?: "page" | "title" }) {
  return (
    <div className={`domain-stripe domain-stripe-${variant}`} aria-hidden="true">
      <span className="dom-grid" />
      <span className="dom-water" />
      <span className="dom-fiscal" />
      <span className="dom-multi" />
    </div>
  );
}
