import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { DocsLayout, SiteShell } from "./components/layouts";
import { PlaygroundPage } from "./pages/playground";
import { DOCS_LOCALES, PATHS, localePath } from "./lib/paths";

// Every page is its own chunk; the shell (header, sidebar, search trigger) stays eager.
const Home = lazy(() => import("./pages/home"));
const ExamplesGallery = lazy(() => import("./examples/gallery"));
const Introduction = lazy(() => import("./pages/docs/introduction"));
const Installation = lazy(() => import("./pages/docs/installation"));
const Theming = lazy(() => import("./pages/docs/theming"));
const Tokens = lazy(() => import("./pages/docs/tokens"));
const Motion = lazy(() => import("./pages/docs/motion"));
const I18n = lazy(() => import("./pages/docs/i18n"));
const Accessibility = lazy(() => import("./pages/docs/accessibility"));
const ComponentsIndex = lazy(() => import("./pages/docs/components-index"));
const ComponentPage = lazy(() => import("./pages/docs/component"));
const DesignPhilosophy = lazy(() => import("./pages/docs/design-philosophy"));
const Foundations = lazy(() => import("./pages/docs/foundations"));
const AI = lazy(() => import("./pages/docs/ai"));
const PatternsIndex = lazy(() => import("./pages/docs/patterns").then((module) => ({ default: module.PatternsIndexPage })));
const NotFound = lazy(() => import("./pages/not-found"));
const NotFoundInline = lazy(() => import("./pages/not-found").then((m) => ({ default: () => <m.NotFoundContent /> })));

export function App() {
  return (
    <Routes>
      {DOCS_LOCALES.map((locale) => (
        <Route key={locale} path={localePath(PATHS.home, locale)}>
          {/* Bare demo harness for screenshots: no site chrome. */}
          <Route element={<PlaygroundPage />} path="playground/:slug" />
          <Route element={<SiteShell />}>
            <Route element={<Home />} index />
            {/* 示例在站点外壳之内：切换条与固定的框，随时可换示例或回到组件库。 */}
            <Route element={<ExamplesGallery />} path="examples/*" />
            {/* One documentation layout holds every docs and component page, so the sidebar and its scroll position persist across them. */}
            <Route element={<DocsLayout />}>
              {/* Short component URLs share content identity with the established docs URLs. */}
              <Route path="components">
                <Route element={<ComponentsIndex />} index />
                <Route element={<ComponentPage />} path=":slug" />
                <Route element={<NotFoundInline />} path="*" />
              </Route>
              <Route path="docs">
                <Route element={<Introduction />} index />
                <Route element={<Installation />} path="installation" />
                <Route element={<Theming />} path="theming" />
                <Route element={<DesignPhilosophy />} path="design-philosophy" />
                <Route element={<Foundations />} path="foundations" />
                <Route element={<AI />} path="ai" />
                <Route element={<PatternsIndex />} path="patterns" />
                <Route element={<Tokens />} path="tokens" />
                <Route element={<Motion />} path="motion" />
                <Route element={<I18n />} path="i18n" />
                <Route element={<Accessibility />} path="accessibility" />
                <Route element={<ComponentsIndex />} path="components" />
                <Route element={<ComponentPage />} path="components/:slug" />
                <Route element={<NotFoundInline />} path="*" />
              </Route>
            </Route>
            <Route element={<NotFound />} path="*" />
          </Route>
        </Route>
      ))}
    </Routes>
  );
}
