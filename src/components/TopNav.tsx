import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DOMAIN_SLUGS, SHORT_NAME, domClass } from "../domains";

const MAIN_LINKS: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Overview", end: true },
  { to: "/findings", label: "Findings" },
  { to: "/contradictions", label: "Contradictions" },
];
const TAIL_LINKS: { to: string; label: string }[] = [
  { to: "/blind-spots", label: "Blind spots" },
  { to: "/studies", label: "Studies" },
  { to: "/methods", label: "Methods" },
];
const DOMAIN_LINKS = Object.entries(DOMAIN_SLUGS).map(([slug, category]) => ({
  to: `/domains/${slug}`,
  label: SHORT_NAME[category],
  category,
}));

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? "nav-link is-active" : "nav-link");

export function TopNav() {
  const location = useLocation();
  const { pathname } = location;
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Close both menus on any navigation, including back/forward (state adjusted during render, no effect).
  const [seenLocation, setSeenLocation] = useState(location);
  if (location !== seenLocation) {
    setSeenLocation(location);
    setDomainsOpen(false);
    setMenuOpen(false);
  }
  const domainsRef = useRef<HTMLLIElement>(null);

  // Close the Domains dropdown on outside click or Escape.
  useEffect(() => {
    if (!domainsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!domainsRef.current?.contains(e.target as Node)) setDomainsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDomainsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [domainsOpen]);

  const inDomains = pathname.startsWith("/domains/");

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link to="/" className="site-name">
          Data Center Gap Mapper
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav aria-label="Main" className="desktop-nav">
          <ul>
            {MAIN_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={navClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="dropdown" ref={domainsRef}>
              <button
                type="button"
                className={`nav-link nav-button${inDomains ? " is-active" : ""}`}
                aria-expanded={domainsOpen}
                aria-controls="domains-menu"
                onClick={() => setDomainsOpen(!domainsOpen)}
              >
                Domains
                <span className="caret" aria-hidden="true" />
              </button>
              {domainsOpen && (
                <ul id="domains-menu" className="dropdown-menu">
                  {DOMAIN_LINKS.map((d) => (
                    <li key={d.to}>
                      <NavLink to={d.to} className={({ isActive }) => `dropdown-link ${domClass(d.category)}${isActive ? " is-active" : ""}`}>
                        <span className="dot" aria-hidden="true" />
                        {d.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {TAIL_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={navClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="mobile-menu">
          <ul className="wrap">
            {MAIN_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={navClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mobile-group">Domains</li>
            {DOMAIN_LINKS.map((d) => (
              <li key={d.to} className="mobile-sub">
                <NavLink to={d.to} className={({ isActive }) => `nav-link ${domClass(d.category)}${isActive ? " is-active" : ""}`}>
                  <span className="dot" aria-hidden="true" />
                  {d.label}
                </NavLink>
              </li>
            ))}
            {TAIL_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={navClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
