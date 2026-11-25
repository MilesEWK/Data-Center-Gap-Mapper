import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DomainStripe } from "./DomainStripe";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";
import { ValidationBanner } from "./ValidationBanner";

/** Scrolls to the top on every route change, or to a section when a link asks for one. */
function ScrollManager() {
  const { pathname, state } = useLocation();
  const target = (state as { scrollTo?: string } | null)?.scrollTo;
  useEffect(() => {
    const el = target ? document.getElementById(target) : null;
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, target]);
  return null;
}

export function Layout({ violations }: { violations: string[] }) {
  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        // Hash links would change the route under HashRouter; move focus instead.
        e.preventDefault();
        document.getElementById("main")?.focus();
      }}>
        Skip to content
      </a>
      {import.meta.env.DEV && <ValidationBanner violations={violations} />}
      <ScrollManager />
      <DomainStripe />
      <TopNav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
