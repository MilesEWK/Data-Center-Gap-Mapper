import { createContext } from "react";

/** Position key → glossary slugs whose first use on the page falls there. Empty map = no linking. */
export const GlossaryPlan = createContext<Map<string, string[]>>(new Map());
