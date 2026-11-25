import { Fragment } from "react";
import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((c, i) => (
          <Fragment key={`${c.label}-${i}`}>
            <li>
              {c.to && i < items.length - 1 ? (
                <Link to={c.to}>{c.label}</Link>
              ) : (
                <span aria-current={i === items.length - 1 ? "page" : undefined}>{c.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
