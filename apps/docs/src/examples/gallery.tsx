import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { IconArrowLeft, IconArrowUpRight, IconChevronDown, IconComponents } from "@tabler/icons-react";
import { AXES_MESSAGE, AXES_READY, applyAxes, axesFromSearch, type Axes } from "@/lib/axes";
import { Route, Routes, useLocation } from "react-router-dom";
import { Badge } from "@qingye_lab/ui/components/badge";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaViewport } from "@qingye_lab/ui/components/scroll-area";
import { Separator } from "@qingye_lab/ui/components/separator";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { useDocsLocale } from "@/lib/docs-locale";
import { componentLabel, navLabel } from "@/lib/nav";
import { findComponent } from "@/lib/registry";
import { repoFile } from "@/lib/site";
import { CATEGORIES, type Category } from "@/lib/types";
import { localePath, type DocsLocale } from "@/lib/paths";
import { NotFoundContent } from "@/pages/not-found";
import { EXAMPLES, findExample, type ExampleEntry } from "./list";
import { ExampleEmbeddedProvider, useExampleEmbedded } from "./embedding";
import "./examples.css";

type UsedComponentItem = {
  slug: string;
  title: string;
  hint?: string;
  category: Category | "其他";
};

function resolveUsedComponents(slugs: readonly string[], locale: DocsLocale): { category: Category | "其他"; items: UsedComponentItem[] }[] {
  const byCategory = new Map<Category | "其他", UsedComponentItem[]>();
  for (const slug of slugs) {
    const entry = findComponent(slug);
    const label = entry ? componentLabel(entry, locale) : { title: slug };
    const category: Category | "其他" = entry?.category ?? "其他";
    const list = byCategory.get(category) ?? [];
    list.push({ slug, title: label.title, ...(label.hint ? { hint: label.hint } : {}), category });
    byCategory.set(category, list);
  }
  const ordered: { category: Category | "其他"; items: UsedComponentItem[] }[] = [];
  for (const cat of [...CATEGORIES, "其他" as const]) {
    const items = byCategory.get(cat);
    if (items?.length) ordered.push({ category: cat, items });
  }
  return ordered;
}

const WorkspaceApp = lazy(() => import("./workspace"));
const RecordsPage = lazy(() => import("./records"));
const BookingApp = lazy(() => import("./booking"));
const ReviewApp = lazy(() => import("./review"));

/** 示例应用本身，按 id 取；总览的缩略（裸框路由）与查看页用同一份。 */
export function ExampleRoutes() {
  return <Suspense>
    <Routes>
      <Route element={<WorkspaceApp />} path="workspace/*" />
      <Route element={<RecordsPage />} path="records" />
      <Route element={<BookingApp />} path="booking" />
      <Route element={<ReviewApp />} path="review" />
      <Route element={<Missing />} path="*" />
    </Routes>
  </Suspense>;
}

function Missing() {
  const embedded = useExampleEmbedded();
  const en = useDocsLocale() === "en";
  const body = <Empty state="not-applicable">
    <EmptyTitle level={1}>{en ? "No such example page" : "没有这个示例页面"}</EmptyTitle>
    <EmptyActions>{embedded
      ? <Link className={buttonVariants({ variant: "bordered" })} to="/examples">{en ? "All examples" : "全部示例"}</Link>
      : <a className={buttonVariants({ variant: "bordered" })} href={localePath("/examples", en ? "en" : "zh")} target="_top">{en ? "All examples" : "全部示例"}</a>}
    </EmptyActions>
  </Empty>;
  return embedded
    ? <div className="h-full overflow-y-auto p-(--qy-panel-padding)">{body}</div>
    : <main className="h-full overflow-y-auto p-(--qy-panel-padding) outline-none" id="main" tabIndex={-1}>{body}</main>;
}

const PREVIEW_WIDTH = 1440;
function Preview({ example, eager }: { example: ExampleEntry; eager: boolean }) {
  const locale = useDocsLocale();
  const en = locale === "en";
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(eager);
  const stage = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = stage.current?.parentElement;
    if (!node) return;
    const measure = () => node.style.setProperty("--preview-scale", String(node.clientWidth / PREVIEW_WIDTH));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (mounted) return;
    const node = stage.current?.parentElement;
    if (!node || typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);
  const title = en ? example.title.en : example.title.zh;
  return <Link aria-label={`${en ? "Open" : "打开"} ${title}`} className="examples-preview" data-loaded={loaded || undefined} to={`/examples/${example.id}`}>
    <span aria-hidden="true" className="examples-preview-stage" ref={stage} />
    {mounted ? <iframe aria-hidden="true" inert onLoad={() => setLoaded(true)} src={`/frame/examples/${example.id}`} tabIndex={-1} title={title} /> : null}
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
              </div>
              <div className="examples-actions">
                <Link aria-label={`${en ? "Open" : "打开"} ${t(example.title)}`} className={buttonVariants({ variant: "bordered" })} to={`/examples/${example.id}`}>{en ? "Open" : "打开"}</Link>
                <a aria-label={`${en ? "Source" : "源码"} ${t(example.title)}`} className={buttonVariants({ variant: "quiet" })} href={repoFile(example.source)} rel="noreferrer" target="_blank">{en ? "Source" : "源码"}</a>
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
 * 查看一个示例：极轻的清墨底单行切换带（36px）退居视觉底层，
 * 左侧「示例」返回与 4 个示例直达切换，右侧按需展开的组件清单与源码入口；
 * 彻底消除「大白顶栏 + 应用品牌顶栏」的层叠压迫感，把全部舞台交还给示例应用。
 */
function ExampleView({ example, children }: { example: ExampleEntry; children: ReactNode }) {
  const locale = useDocsLocale();
  const en = locale === "en";
  const title = en ? example.title.en : example.title.zh;
  useDocumentTitle(title);
  const groups = useMemo(() => resolveUsedComponents(example.uses, locale), [example.uses, locale]);

  return <main className="example-view" id="main" tabIndex={-1}>
    <div className="example-bar-band">
      <div className="example-bar site-frame">
        <div className="example-bar-left">
          <Link className="example-bar-back" to="/examples">
            <IconArrowLeft aria-hidden="true" className="size-3.5" />
            <span>{en ? "Examples" : "示例"}</span>
          </Link>
          <Separator className="h-3.5" orientation="vertical" />
          <nav aria-label={en ? "Switch example" : "切换示例"} className="example-bar-switcher">
            {EXAMPLES.map((entry) => {
              const active = entry.id === example.id;
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className="example-bar-tab"
                  data-active={active || undefined}
                  key={entry.id}
                  to={`/examples/${entry.id}`}
                >
                  {en ? entry.title.en : entry.title.zh}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="example-bar-actions">
          <Popover>
            <PopoverTrigger render={<Button size="xs" variant="quiet" />}>
              <IconComponents aria-hidden="true" />
              <span>{en ? "Components" : "组件"}</span>
              <Badge className="numeric">{example.uses.length}</Badge>
              <IconChevronDown aria-hidden="true" className="text-muted-foreground" />
            </PopoverTrigger>
            <PopoverPopup
              align="end"
              className="w-[min(calc(22*var(--qy-cai)),calc(100vw-2rem))]"
              positionerProps={{ collisionPadding: 12 }}
              viewportProps={{ className: "p-0 overflow-hidden" }}
            >
              <div className="example-uses-popover-head">
                <PopoverTitle>{en ? "Components used" : "本示例用到的组件"}</PopoverTitle>
                <span className="numeric text-support text-muted-foreground">
                  {en ? `${example.uses.length} total` : `共 ${example.uses.length} 个`}
                </span>
              </div>
              <ScrollAreaRoot className="example-uses-popover-scroll">
                <ScrollAreaViewport className="example-uses-popover-scroll" fade tabIndex={-1}>
                  <div className="example-uses-groups">
                    {groups.map((group) => (
                      <section className="example-uses-group" key={group.category}>
                        <h3 className="example-uses-group-title">{navLabel(group.category, locale)}</h3>
                        <ul className="example-uses-grid">
                          {group.items.map((item) => (
                            <li key={item.slug}>
                              <Link className="example-uses-link" to={`/components/${item.slug}`}>
                                <span className="example-uses-link-title">{item.title}</span>
                                {item.hint && <span className="example-uses-link-hint">{item.hint}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar />
              </ScrollAreaRoot>
            </PopoverPopup>
          </Popover>

          <Separator className="h-3.5" orientation="vertical" />

          <a
            className={buttonVariants({ size: "xs", variant: "quiet" })}
            href={repoFile(example.source)}
            rel="noreferrer"
            target="_blank"
          >
            <span>{en ? "Source" : "源码"}</span>
            <IconArrowUpRight aria-hidden="true" className="text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
    <div className="example-frame" data-slot="example-frame"><ExampleEmbeddedProvider value>{children}</ExampleEmbeddedProvider></div>
  </main>;
}

export default function ExamplesGallery() {
  const { pathname } = useLocation();
  const id = pathname.replace(/^(\/en)?\/examples\/?/, "").split("/")[0];
  if (!id) return <ExamplesIndex />;
  if (!findExample(id)) return <main className="site-frame outline-none" id="main" tabIndex={-1}><NotFoundContent /></main>;
  return <ExampleView example={findExample(id)!}><ExampleRoutes /></ExampleView>;
}

export function ExampleFrame() {
  useEffect(() => {
    const root = document.documentElement;
    applyAxes(root, axesFromSearch(window.location.search));
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== AXES_MESSAGE) return;
      applyAxes(root, event.data.axes as Partial<Axes>);
    };
    window.addEventListener("message", onMessage);
    if (window.parent !== window) window.parent.postMessage({ type: AXES_READY }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  return <div className="h-dvh" data-example-bare><ExampleRoutes /></div>;
}
