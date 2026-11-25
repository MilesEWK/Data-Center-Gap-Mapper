import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

/** HashRouter keeps every route working on static hosts (e.g. Netlify drag-and-drop) with no redirect config. */
export default function App({ violations }: { violations: string[] }) {
  return (
    <HashRouter>
      <AppRoutes violations={violations} />
    </HashRouter>
  );
}
