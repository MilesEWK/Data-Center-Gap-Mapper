import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BlindSpots } from "./pages/BlindSpots";
import { Contradictions } from "./pages/Contradictions";
import { Data } from "./pages/Data";
import { DomainPage } from "./pages/DomainPage";
import { Findings } from "./pages/Findings";
import { Glossary } from "./pages/Glossary";
import { Methods } from "./pages/Methods";
import { NotFound } from "./pages/NotFound";
import { Overview } from "./pages/Overview";
import { Studies } from "./pages/Studies";
import { StudyDetail } from "./pages/StudyDetail";

/** All routes. Rendered inside HashRouter in the app and MemoryRouter in tests. */
export function AppRoutes({ violations = [] }: { violations?: string[] }) {
  return (
    <Routes>
      <Route element={<Layout violations={violations} />}>
        <Route index element={<Overview />} />
        <Route path="findings" element={<Findings />} />
        <Route path="contradictions" element={<Contradictions />} />
        <Route path="domains/:slug" element={<DomainPage />} />
        <Route path="blind-spots" element={<BlindSpots />} />
        <Route path="studies" element={<Studies />} />
        <Route path="studies/:id" element={<StudyDetail />} />
        <Route path="methods" element={<Methods />} />
        <Route path="data" element={<Data />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
