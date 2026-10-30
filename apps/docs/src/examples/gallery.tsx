import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { AXES_MESSAGE, applyAxes, axesFromSearch, type Axes } from "@/lib/axes";
import { Route, Routes, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import { buttonVariants } from "@qingye_lab/ui/components/button";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { useDocsLocale } from "@/lib/docs-locale";
import { componentLabel } from "@/lib/nav";
import { findComponent } from "@/lib/registry";
import { localePath } from "@/lib/paths";
import { repoFile } from "@/lib/site";
import { NotFoundContent } from "@/pages/not-found";
import { EXAMPLES, findExample, type ExampleEntry } from "./list";
import type { DocsLocale } from "@/lib/paths";

const findComponentLabel = (slug: string, locale: DocsLocale) => { const entry = findComponent(slug); return entry ? componentLabel(entry, locale).title : slug; };
import "./examples.css";

const WorkspaceApp = lazy(() => import("./workspace"));
const RecordsPage = lazy(() => import("./records"));
const BookingApp = lazy(() => import("./booking"));

/** 示例应用本身，按 id 取；总览的缩略（裸框路由）与查看页用同一份。 */
export function ExampleRoutes() {
  return <Suspense>
    <Routes>
      <Route element={<WorkspaceApp />} path="workspace/*" />
      <Route element={<RecordsPage />} path="records" />
      <Route element={<BookingApp />} path="booking" />
      <Route element={<Missing />} path="*" />
    </Routes>
  </Suspense>;
}

/** 未知的示例路径：与站点其余页面同一个未找到状态，留在示例框内。 */
function Missing() {
  return <main className="h-full overflow-y-auto p-(--qy-panel-padding) outline-none" id="main" tabIndex={-1}><NotFoundContent /></main>;
}

/*
 * 示例总览：每个示例一行，与首页同一张两栏网格——起始栏是名称、类型、说明与用到的组件，内容栏是它的真实缩略。
 * 缩略是 iframe 里的裸框路由，懒加载、不可交互、不进读屏；整块缩略与「打开」去往同一个查看页。
 */
function ExamplesIndex() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (copy: { zh: string; en: string }) => (en ? copy.en : copy.zh);
  useDocumentTitle(en ? "Examples" : "示例");
  return <>
    <main className="examples site-frame" id="main" tabIndex={-1}>
      <header className="examples-head">
        <Heading level={1} step="display">{en ? "Examples" : "示例"}</Heading>
        <Text className="text-muted-foreground" step="reading">{en ? "Complete applications built only from @qingye_lab/ui. The data is local; nothing is sent anywhere." : "只用 @qingye_lab/ui 搭成的完整应用。数据都在本地，不发送到任何地方。"}</Text>
      </header>
      <ul className="examples-list">
        {EXAMPLES.map((example) => (
          <li className="examples-item" key={example.id}>
            <div className="examples-text">
              <Text className="examples-kind" step="support">{t(example.kind)}</Text>
              <Heading level={2} step="title"><Link className="examples-name" to={`/examples/${example.id}`}>{t(example.title)}</Link></Heading>
              <Text step="body">{t(example.text)}</Text>
              <ul aria-label={en ? "Components used" : "用到的组件"} className="examples-uses">
                {example.uses.map((slug) => <li key={slug}><Link className={`${linkClassName} text-support`} to={`/components/${slug}`}>{findComponentLabel(slug, locale)}</Link></li>)}
              </ul>
              <div className="examples-actions">
                <Link className={buttonVariants({ variant: "bordered" })} to={`/examples/${example.id}`}>{en ? "Open" : "打开"}</Link>
                <a className={buttonVariants({ variant: "quiet" })} href={repoFile(example.source)} rel="noreferrer" target="_blank">{en ? "Source" : "源码"}</a>
              </div>
            </div>
            <Link aria-label={`${en ? "Open" : "打开"} ${t(example.title)}`} className="examples-thumb" to={`/examples/${example.id}`}>
              <iframe aria-hidden="true" inert loading="lazy" src={localePath(`/frame/examples/${example.id}`, locale)} tabIndex={-1} title={t(example.title)} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
    <SiteFooter />
  </>;
}

/* 查看一个示例：框上方一行是回到总览的位置与源码；框里是正在运行的示例，在框内滚动，不把站点一起卷走。 */
function ExampleView({ example, children }: { example: ExampleEntry; children: ReactNode }) {
  const locale = useDocsLocale();
  const en = locale === "en";
  const title = en ? example.title.en : example.title.zh;
  useDocumentTitle(title);
  return <div className="example-view site-frame">
    <div className="example-bar">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink render={<Link to="/examples" />}>{en ? "Examples" : "示例"}</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbCurrent>{title}</BreadcrumbCurrent></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <a className={`${linkClassName} text-support`} href={repoFile(example.source)} rel="noreferrer" target="_blank">{en ? "View source" : "查看源码"}</a>
    </div>
    <div className="example-frame" data-slot="example-frame">{children}</div>
  </div>;
}

export default function ExamplesGallery() {
  const { pathname } = useLocation();
  const id = pathname.replace(/^(\/en)?\/examples\/?/, "").split("/")[0];
  if (!id) return <ExamplesIndex />;
  // 未知的示例：站点统一的未找到状态，不套查看栏（没有可以回到的示例）。
  if (!findExample(id)) return <div className="site-frame"><Missing /></div>;
  return <ExampleView example={findExample(id)!}><ExampleRoutes /></ExampleView>;
}

/**
 * 裸框：只有示例本身，供总览的缩略与首页的示例窗口使用。明暗由框内的 ThemeProvider 跟随站点（同一份存储）；
 * 地址里的 density / brand 是初值，同源的父页面可以用 postMessage 再改，不必重载。
 */
export function ExampleFrame() {
  useEffect(() => {
    const root = document.documentElement;
    applyAxes(root, axesFromSearch(window.location.search));
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== AXES_MESSAGE) return;
      applyAxes(root, event.data.axes as Partial<Axes>);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  return <div className="h-dvh" data-example-bare><ExampleRoutes /></div>;
}

