import { useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export interface TabDef {
  key: string;
  label: string;
  count?: number;
}

interface Props {
  label: string;
  tabs: TabDef[];
  active: string;
  onChange: (key: string) => void;
  children: ReactNode;
}

/** Accessible tabs (arrow keys move between tabs). The active key is owned by the caller. */
export function Tabs({ label, tabs, active, onChange, children }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(
    0,
    tabs.findIndex((t) => t.key === active),
  );

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + tabs.length) % tabs.length;
    onChange(tabs[next].key);
    refs.current[next]?.focus();
  };

  const current = tabs[index];
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={i === index}
            aria-controls={`panel-${t.key}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => onChange(t.key)}
          >
            {t.label}
            {t.count !== undefined && <span className="tab-count">{t.count}</span>}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${current.key}`} aria-labelledby={`tab-${current.key}`} className="tab-panel">
        {children}
      </div>
    </div>
  );
}
