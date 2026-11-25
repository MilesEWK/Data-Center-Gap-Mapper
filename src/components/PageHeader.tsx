import type { ReactNode } from "react";
import { domClass } from "../domains";
import { Breadcrumbs } from "./Breadcrumbs";
import { DomainStripe } from "./DomainStripe";
import type { Crumb } from "./Breadcrumbs";

interface Props {
  title: string;
  lede: ReactNode;
  /** Impact category: adds the domain-colour left border and tint. */
  domain?: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Light band at the top of every page except Overview. */
export function PageHeader({ title, lede, domain, breadcrumbs, children }: Props) {
  return (
    <header className={`page-header${domain ? ` page-header-domain ${domClass(domain)}` : ""}`}>
      <div className="wrap">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1>{title}</h1>
        <DomainStripe variant="title" />
        <p className="page-lede">{lede}</p>
        {children}
      </div>
    </header>
  );
}
