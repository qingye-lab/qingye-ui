import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
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
import { repoFile } from "@/lib/site";
import { NotFoundContent } from "@/pages/not-found";
import { EXAMPLES, findExample, type ExampleEntry } from "./list";
import { ExampleEmbeddedProvider } from "./embedding";
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
 * 示例总览（2026-10-30 重做，与首页同一种语言：尺度、墨与位置，不加装饰）。
 * 每个示例是一段：上面是它的真实画面（裸框路由在 iframe 里按桌面宽 1440 渲染、缩放到画面实际宽度，不可交互、不进读屏），整幅占满站框，是这一段的主体；
 * 下面一行说明分三栏：名称与类型、说明与用到的组件、动作。画面载入前是一层清染的占位，载入后才显出，不出现空白框。
 */
/** The preview renders the app at a desktop width of 1440 CSS px and scales that to the preview's actual width. */
const PREVIEW_WIDTH = 1440;
function Preview({ example, eager }: { example: ExampleEntry; eager: boolean }) {
  const locale = useDocsLocale();
  const en = locale === "en";
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    // 画面框是 iframe 的父元素（站内 Link 不转发 ref）。
    const node = frame.current?.parentElement;
    if (!node) return;
    const measure = () => node.style.setProperty("--preview-scale", String(node.clientWidth / PREVIEW_WIDTH));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const title = en ? example.title.en : example.title.zh;
  return <Link aria-label={`${en ? "Open" : "打开"} ${title}`} className="examples-preview" data-loaded={loaded || undefined} to={`/examples/${example.id}`}>
    <iframe aria-hidden="true" inert loading={eager ? "eager" : "lazy"} onLoad={() => setLoaded(true)} ref={frame} src={`/frame/examples/${example.id}`} tabIndex={-1} title={title} />
  </Link>;
}

function ExamplesIndex() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (copy: { zh: string; en: string }) => (en ? copy.en : copy.zh);
  useDocumentTitle(en ? "Examples" : "示例");
  return <>
    <main className="examples site-frame" id="main" tabIndex={-1}>
      <header className="examples-head">
        <Heading level={1} step="display-lg">{en ? "Examples" : "示例"}</Heading>
        <Text className="text-muted-foreground" step="reading">{en ? "Complete applications built only from @qingye_lab/ui. They follow this site's light or dark mode; the data is local and nothing is sent anywhere." : "只用 @qingye_lab/ui 搭成的完整应用，明暗跟随本站。数据都在本地，不发送到任何地方。"}</Text>
      </header>
      <ul className="examples-list">
        {EXAMPLES.map((example, index) => (
          <li className="examples-item" key={example.id}>
            <Preview eager={index === 0} example={example} />
            <div className="examples-caption">
              <div className="examples-name-block">
                <Heading level={2} step="display"><Link className="examples-name" to={`/examples/${example.id}`}>{t(example.title)}</Link></Heading>
                <Text className="text-muted-foreground" step="body">{t(example.kind)}</Text>
              </div>
              <div className="examples-about">
                <Text step="reading">{t(example.text)}</Text>
                <ul aria-label={en ? "Components used" : "用到的组件"} className="examples-uses">
                  {example.uses.map((slug) => <li key={slug}><Link className={linkClassName} to={`/components/${slug}`}>{findComponentLabel(slug, locale)}</Link></li>)}
                </ul>
              </div>
              <div className="examples-actions">
                <Link className={buttonVariants({ variant: "bordered" })} to={`/examples/${example.id}`}>{en ? "Open" : "打开"}</Link>
                <a className={buttonVariants({ variant: "quiet" })} href={repoFile(example.source)} rel="noreferrer" target="_blank">{en ? "Source" : "源码"}</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
    <SiteFooter />
  </>;
}

/*
 * 查看一个示例：一行查看栏（回到总览的位置、示例名与源码）在站框里；其下示例应用铺满整个宽度、在自己的框内滚动。
 * 不再给应用外面套一道圆角框——工作区自己有面与边界，外面再围一圈就是同一范围画两次（NG11）。
 */
function ExampleView({ example, children }: { example: ExampleEntry; children: ReactNode }) {
  const locale = useDocsLocale();
  const en = locale === "en";
  const title = en ? example.title.en : example.title.zh;
  useDocumentTitle(title);
  // 查看页的主体是一个 <main>：查看栏与示例应用都在其中（见 embedding.ts）。
  return <main className="example-view" id="main" tabIndex={-1}>
    <div className="example-bar site-frame">
      {/* 示例应用自己也有面包屑；这一条命名为「示例位置」，两条在读屏的地标列表里分得开。 */}
      <Breadcrumb aria-label={en ? "Example location" : "示例位置"}>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink render={<Link to="/examples" />}>{en ? "Examples" : "示例"}</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbCurrent>{title}</BreadcrumbCurrent></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* 示例是为了演示组件库：这一页用到的主要组件，各自去往组件页。 */}
      <div className="example-uses">
        <span className="text-muted-foreground">{en ? "Built with" : "用到"}</span>
        <ul aria-label={en ? "Components used" : "用到的组件"}>
          {example.uses.map((slug) => <li key={slug}><Link className={linkClassName} to={`/components/${slug}`}>{findComponentLabel(slug, locale)}</Link></li>)}
        </ul>
        <a className={linkClassName} href={repoFile(example.source)} rel="noreferrer" target="_blank">{en ? "Source" : "源码"}</a>
      </div>
    </div>
    <div className="example-frame" data-slot="example-frame"><ExampleEmbeddedProvider value>{children}</ExampleEmbeddedProvider></div>
  </main>;
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

