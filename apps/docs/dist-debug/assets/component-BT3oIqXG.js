import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, m as useParams, n as findComponent, s as splitTitle, o as componentSourceUrl, p as loadDemos, K as Kbd } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { E as Empty, a as EmptyHeader, d as EmptyMedia, b as EmptyTitle, c as EmptyDescription } from "./empty-UZzeYbXj.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
import { c as cleanDemoSource, C as CopyCodeButton, a as CodeView, b as CodeBlock, i as importSnippet } from "./code-block-DcaGy5kk.js";
import { T as Tabs, a as TabsList, b as TabsTab, c as TabsPanel } from "./tabs-DqRxi0L7.js";
import { c as H3, P as PageHeader, H as H2, a as P, C as Code, A } from "./prose-Boxfwb1Q.js";
import { NotFoundContent } from "./not-found-BA6hCUFA.js";
import { L as Layers } from "./layers-DinC0tSz.js";
import "./copy-CMgYpHr5.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./alert-twlv_qhe.js";
const __iconNode = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode);
class DemoBoundary extends reactExports.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", role: "status", children: [
        "这个示例暂时无法渲染：",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: this.state.error.message })
      ] });
    }
    return this.props.children;
  }
}
function DemoFrame({ slug, demo }) {
  const source = reactExports.useMemo(() => cleanDemoSource(demo.source), [demo.source]);
  const Demo = demo.default;
  const id = `demo-${demo.id}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": id, className: "mt-10 first:mt-6", "data-demo": demo.id, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { className: "mt-0 mb-1.5", id, children: demo.meta.title }),
    demo.meta.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 max-w-[42rem] text-pretty text-[0.875rem] text-muted-foreground leading-relaxed", children: demo.meta.description }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { className: cn("gap-0 overflow-hidden rounded-xl border bg-background", !demo.meta.description && "mt-3"), defaultValue: "preview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 border-b bg-surface-subtle/60 py-1 ps-1.5 pe-1.5 dark:bg-surface/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "aria-label": `${demo.meta.title}：预览或代码`, size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "preview", children: "预览" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "code", children: "代码" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCodeButton, { value: source })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TabsPanel,
        {
          className: cn(
            "outline-none",
            demo.meta.flush ? "min-w-0" : "flex min-h-36 min-w-0 flex-wrap items-center justify-center gap-4 p-6 sm:p-10"
          ),
          "data-demo-preview": `${slug}/${demo.id}`,
          keepMounted: true,
          value: "preview",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(DemoBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Demo, {}) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "outline-none", value: "code", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeView, { className: "max-h-[32rem] bg-surface-subtle dark:bg-surface", code: source }) })
    ] })
  ] });
}
const cache = /* @__PURE__ */ new Map();
function demosFor(slug) {
  let promise = cache.get(slug);
  if (!promise) {
    promise = loadDemos(slug);
    promise.catch(() => cache.delete(slug));
    cache.set(slug, promise);
  }
  return promise;
}
class LoadBoundary extends reactExports.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-muted-foreground text-sm", role: "status", children: [
      "示例加载失败：",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: this.state.error.message })
    ] });
  }
}
function ComponentPage() {
  const { slug = "" } = useParams();
  const entry = findComponent(slug);
  if (!entry) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFoundContent, { detail: `没有名为 “${slug}” 的组件文档。` });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComponentDoc, { entry });
}
function ComponentDoc({ entry }) {
  const { zh, en } = splitTitle(entry.title);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        description: entry.description,
        documentTitle: en ? `${zh} ${en}` : zh,
        title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          zh,
          en ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ms-3 font-normal text-[0.6em] text-muted-foreground align-[0.12em]", children: en }) : null
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "lg", variant: "outline", children: entry.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "lg", variant: "secondary", children: entry.source === "coss" ? "源自 coss ui" : "本地组件" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              className: "focus-ring inline-flex items-center gap-1.5 rounded-sm text-muted-foreground transition-colors hover:text-foreground",
              href: componentSourceUrl(entry.slug),
              rel: "noreferrer",
              target: "_blank",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { "aria-hidden": "true", className: "size-3.5" }),
                "源码"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "usage", children: "导入" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: importSnippet(entry.exports) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { className: "mt-3 text-[0.875rem] text-muted-foreground", children: [
      "也可以按组件入口导入，只打包这一个文件：",
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Code, { children: [
        "@yanqing/ui/components/",
        entry.slug
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "examples", children: "示例" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Demos, { slug: entry.slug }) }),
    entry.api.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(ApiReference, { parts: entry.api }) : null,
    entry.keyboard?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(KeyboardTable, { rows: entry.keyboard }) : null,
    entry.notes?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "notes", children: "使用建议" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-4 flex max-w-[42rem] flex-col gap-2.5", children: entry.notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-[0.9375rem] text-foreground/90 leading-[1.75]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "mt-[0.8em] size-1 shrink-0 rounded-full bg-foreground/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pretty", children: renderInline(note) })
      ] }, note)) })
    ] }) : null
  ] });
}
function Demos({ slug }) {
  const demos = reactExports.use(demosFor(slug));
  if (!demos.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { className: "mt-4 rounded-xl border border-dashed py-12 md:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTitle, { className: "text-base", children: "示例整理中" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyDescription, { children: [
        "这个组件的示例还在编写。可以先阅读下方的 API，或在 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/components", children: "组件总览" }),
        " 中浏览其他组件。"
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: demos.map((demo) => /* @__PURE__ */ jsxRuntimeExports.jsx(DemoFrame, { demo, slug }, demo.id)) });
}
function renderInline(text) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map(
    (part, index) => part.startsWith("`") && part.endsWith("`") && part.length > 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: part.slice(1, -1) }, index) : part
  );
}
const partId = (name) => `api-${name.replace(/[^A-Za-z0-9]+/g, "-").toLowerCase()}`;
function ApiReference({ parts }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "api", children: "API" }),
    parts.map((part) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 border-t pt-6 first:mt-5 first:border-t-0 first:pt-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { className: "mt-0 mb-1.5 font-mono font-medium text-[0.9375rem]", id: partId(part.name), children: part.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 max-w-[42rem] text-pretty text-[0.875rem] text-muted-foreground leading-relaxed", children: renderInline(part.description) }),
      part.props?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { className: "min-w-[36rem] table-fixed", density: "compact", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("colgroup", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("col", { className: "w-[26%]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("col", { className: "w-[30%]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("col", { className: "w-[14%]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("col", {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "bg-surface-subtle/60 dark:bg-surface/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "ps-4 text-xs", children: "属性" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "类型" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "默认值" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "pe-4 text-xs", children: "说明" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: part.props.map((prop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-normal py-2.5 ps-4 align-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "break-words font-mono font-medium text-[0.8125rem] text-foreground-strong", children: prop.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-normal py-2.5 align-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "break-words font-mono text-[0.75rem] text-(--sh-entity) leading-relaxed", children: prop.type }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-normal py-2.5 align-top", children: prop.default ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "break-words font-mono text-[0.75rem] text-foreground/80", children: prop.default }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-label": "无", className: "text-foreground-subtle", children: "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-normal py-2.5 pe-4 align-top text-[0.8125rem] text-foreground/85 leading-relaxed", children: renderInline(prop.description) })
        ] }, prop.name)) })
      ] }) }) : null
    ] }, part.name))
  ] });
}
function Keys({ value }) {
  const alternatives = value.split(/\s+\/\s+|\s*或\s*/);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex flex-wrap items-center gap-1.5", children: alternatives.map((alt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
    i > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "me-0.5 text-muted-foreground text-xs", children: "或" }) : null,
    alt.split(/\s*\+\s*/).map((key, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      j > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "+" }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { className: "h-6 min-w-6 px-1.5 font-mono text-[0.75rem] text-foreground/85", children: key })
    ] }, j))
  ] }, i)) });
}
function KeyboardTable({ rows }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "keyboard", children: "键盘交互" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { density: "compact", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "bg-surface-subtle/60 dark:bg-surface/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[40%] ps-4 text-xs", children: "按键" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "pe-4 text-xs", children: "行为" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-normal py-2.5 ps-4 align-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Keys, { value: row.keys }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-normal py-2.5 pe-4 align-top text-[0.8125rem] text-foreground/85 leading-relaxed", children: renderInline(row.description) })
      ] }, row.keys)) })
    ] }) })
  ] });
}
export {
  ComponentPage as default
};
