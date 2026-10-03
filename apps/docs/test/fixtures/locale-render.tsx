import { renderToPipeableStream, renderToStaticMarkup } from "react-dom/server";
import { Writable } from "node:stream";
import { MemoryRouter, Route, Routes, createRoutesFromElements, matchRoutes } from "react-router-dom";
import { UILocaleProvider, zhCN, type UILocale } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";
import { components } from "../../src/lib/registry";
import { GUIDES, NAV_LABELS, navSections, neighbours, breadcrumbs, componentLabel } from "../../src/lib/nav";
import { searchEntries, score } from "../../src/lib/search";
import * as paths from "../../src/lib/paths";
import { localizedMeta } from "../../src/lib/localized-meta";
import { DemoFrame } from "../../src/components/demo";
import { DocsNav } from "../../src/components/docs-nav";
import { DocsBreadcrumbs } from "../../src/components/docs-breadcrumbs";
import { DocFooter } from "../../src/components/pager";
import ComponentsIndex from "../../src/pages/docs/components-index";
import { Link } from "../../src/components/locale-link";
import type { ComponentEntry } from "../../src/lib/registry";
import type { DocsLocale } from "../../src/lib/paths";
import { App } from "../../src/app";
import ComponentPage from "../../src/pages/docs/component";
import DesignPhilosophyPage from "../../src/pages/docs/design-philosophy";
import { ContentBoundary } from "../../src/components/content-boundary";
export { pageDecisionsFor, designFor, methodsFor, METHODS } from "../../src/lib/design-guidance";
export { siteUrl } from "../../src/lib/site";

const originalSlugs = components.map((entry) => entry.slug);
export const thirdLanguage: UILocale = { code: "fr-CA", messages: zhCN.messages };
export const routeMatches = (path: string) => matchRoutes(createRoutesFromElements(App().props.children), path);
export const knownPaths = [paths.PATHS.home, ...GUIDES.map((guide) => guide.path), paths.PATHS.components,
  ...originalSlugs.map((slug) => paths.componentPath(slug)), "/components/button", "/playground/button",
  "/examples", "/examples/mail", "/examples/dashboard", "/examples/studio", "/docs/patterns/detail/r1"];

export const referenceMeta: ComponentEntry = {
  slug: "reference-fixture", title: "参考夹具 ReferenceFixture", titleEn: "Reference fixture",
  description: "参考中文说明", descriptionEn: "Reference description",
  decisions: "参考中文判断", decisionsEn: "Reference decision",
  category: "通用", source: "local", exports: ["ReferenceFixture"],
  api: [
    { name: "FixtureRoot", description: "根部件中文", descriptionEn: " \n\t", props: [
      { name: "value", type: "string", description: "值中文", descriptionEn: "Controlled `value`" },
      { name: "disabled", type: "boolean", default: "false", description: "禁用中文" },
      { name: "render", type: "ReactElement", description: "渲染中文", descriptionEn: " \t" },
    ] },
    { name: "FixtureTrigger", description: "触发部件中文", descriptionEn: "Trigger description" },
    { name: "FixtureContent", description: "内容部件中文", props: [
      { name: "align", type: "string", description: "对齐中文" },
    ] },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "激活中文", descriptionEn: "Activate the trigger" },
    { keys: "Shift + Tab", description: "前一个中文" },
    { keys: "ArrowUp 或 ArrowDown", description: "方向中文", descriptionEn: "Move focus" },
    { keys: "Escape", description: "关闭中文", descriptionEn: "  " },
  ],
  notes: ["首条中文", "中间中文", "第三条中文", "第四条中文", "末条中文"],
  notesEn: ["First note", " \n\t", "Third `note`"],
};

// Deliberately incomplete content: button is translated, input is not,
// select has only titleEn, and textarea has only descriptionEn.
// Decisions also cover an absent translation and an explicitly empty one.
const mixed: ComponentEntry[] = [
  { slug: "button", title: "按钮 Button", titleEn: "[W4.2 fixture] Button", description: "按钮中文说明", descriptionEn: "[W4.2 fixture] Button description", decisions: "按钮中文判断", decisionsEn: "[W4.3 fixture] Button decision", category: "通用", source: "local", exports: ["Button"], api: [] },
  { slug: "input", title: "输入框 Input", description: "输入框中文说明", decisions: "输入框中文判断", category: "通用", source: "local", exports: ["Input"], api: [] },
  { slug: "select", title: "选择 Select", titleEn: "[W4.2 fixture] Select", description: "选择中文说明", decisions: "选择中文判断", category: "通用", source: "local", exports: ["Select"], api: [] },
  { slug: "textarea", title: "文本域 Textarea", description: "文本域中文说明", descriptionEn: "[W4.3 fixture] Textarea description", decisions: "文本域中文判断", decisionsEn: "", category: "通用", source: "local", exports: ["Textarea"], api: [] },
  referenceMeta,
];
components.splice(0, components.length, ...mixed);
const guide = GUIDES.find((page) => page.path === paths.PATHS.docs)!;
guide.titleEn = "[W4.2 fixture] Introduction";
guide.descriptionEn = "[W4.2 fixture] Introduction description";
NAV_LABELS["通用"]!.titleEn = "[W4.2 fixture] General";

export { paths, localizedMeta, navSections, neighbours, breadcrumbs, componentLabel, searchEntries, score, mixed };

/** Render the real component page, including its localized-entry decision path. */
export function renderDecisionPage(locale: DocsLocale, slug: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const output = new Writable({
      write(chunk, _encoding, done) { html += chunk.toString(); done(); },
      final(done) { resolve(html); done(); },
    });
    output.on("error", reject);
    const stream = renderToPipeableStream(
      <MemoryRouter initialEntries={[paths.componentPath(slug, locale)]}>
        <UILocaleProvider locale={locale === "en" ? enUS : zhCN}>
          <Routes>
            <Route path={`${paths.localePath(paths.PATHS.components, locale)}/:slug`} element={<ComponentPage />} />
          </Routes>
        </UILocaleProvider>
      </MemoryRouter>,
      { onAllReady() { stream.pipe(output); }, onError(error) { stream.abort(); reject(error); } },
    );
  });
}

/** Exercise the real boundary's failed state with the title supplied by the page. */
export async function renderFailedDemoPage(locale: DocsLocale) {
  const render = ContentBoundary.prototype.render;
  ContentBoundary.prototype.render = function () {
    this.state = { failed: true };
    return render.call(this);
  };
  try { return await renderDecisionPage(locale, referenceMeta.slug); }
  finally { ContentBoundary.prototype.render = render; }
}

export function renderMethodsPage(locale: DocsLocale) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[paths.guidePath("design-philosophy", locale)]}>
    <UILocaleProvider locale={locale === "en" ? enUS : zhCN}><DesignPhilosophyPage /></UILocaleProvider>
  </MemoryRouter>);
}

export function renderMixed(locale: DocsLocale, pathname = paths.componentPath("button", locale)) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[pathname]}>
    <UILocaleProvider locale={locale === "en" ? enUS : zhCN}>
      <DocsNav />
      <DocsBreadcrumbs />
      <ComponentsIndex />
      <DocFooter path={pathname} />
      <DemoFrame slug="button" demo={{ id: "translated", source: "const fixture = true;", default: () => <p>演示内容</p>, meta: { title: "演示中文标题", titleEn: "[W4.2 fixture] Demo", descriptionEn: "[W4.2 fixture] Demo description" } }} />
      <DemoFrame slug="input" demo={{ id: "fallback", source: "const fixture = false;", default: () => <p>回退内容</p>, meta: { title: "未翻译演示", description: "未翻译演示说明" } }} />
      <Link to="/docs/installation?mode=test#providers">路径夹具</Link>
    </UILocaleProvider>
  </MemoryRouter>);
}
