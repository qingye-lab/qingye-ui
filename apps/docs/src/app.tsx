import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { DocsLayout, SiteShell } from "./components/layouts";
import { PlaygroundPage } from "./pages/playground";

// Every page is its own chunk; the shell (header, sidebar, search trigger) stays eager.
const Home = lazy(() => import("./pages/home"));
const Introduction = lazy(() => import("./pages/docs/introduction"));
const Installation = lazy(() => import("./pages/docs/installation"));
const Theming = lazy(() => import("./pages/docs/theming"));
const Tokens = lazy(() => import("./pages/docs/tokens"));
const Motion = lazy(() => import("./pages/docs/motion"));
const I18n = lazy(() => import("./pages/docs/i18n"));
const Accessibility = lazy(() => import("./pages/docs/accessibility"));
const ComponentsIndex = lazy(() => import("./pages/docs/components-index"));
const ComponentPage = lazy(() => import("./pages/docs/component"));
const NotFound = lazy(() => import("./pages/not-found"));
const NotFoundInline = lazy(() => import("./pages/not-found").then((m) => ({ default: () => <m.NotFoundContent /> })));

export function App() {
  return (
    <Routes>
      {/* Bare demo harness for screenshots: no site chrome. */}
      <Route element={<PlaygroundPage />} path="/playground/:slug" />
      <Route element={<SiteShell />}>
        <Route element={<Home />} index />
        <Route element={<DocsLayout />} path="docs">
          <Route element={<Introduction />} index />
          <Route element={<Installation />} path="installation" />
          <Route element={<Theming />} path="theming" />
          <Route element={<Tokens />} path="tokens" />
          <Route element={<Motion />} path="motion" />
          <Route element={<I18n />} path="i18n" />
          <Route element={<Accessibility />} path="accessibility" />
          <Route element={<ComponentsIndex />} path="components" />
          <Route element={<ComponentPage />} path="components/:slug" />
          <Route element={<NotFoundInline />} path="*" />
        </Route>
        <Route element={<NotFound />} path="*" />
      </Route>
    </Routes>
  );
}
