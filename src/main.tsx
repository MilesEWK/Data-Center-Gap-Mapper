import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { validateData } from "./data/validate";
import "@fontsource-variable/inter/opsz.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource-variable/source-serif-4/opsz-italic.css";
import "./styles/tokens.css";
import "./styles/app.css";

// Run data validation once on load. Violations are reported, never auto-corrected.
const violations = validateData();
if (import.meta.env.DEV && violations.length > 0) {
  for (const v of violations) console.error(`[data validation] ${v}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App violations={violations} />
  </StrictMode>,
);
