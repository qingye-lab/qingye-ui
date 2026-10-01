import { r as reactExports, b as componentsByCategory, j as jsxRuntimeExports, a as components, B as Button, s as splitTitle, L as Link, l as componentPath } from "./index-DM02Iz28.js";
import { E as Empty, a as EmptyHeader, b as EmptyTitle, c as EmptyDescription } from "./empty-UZzeYbXj.js";
import { S as SearchInput } from "./search-input-DR84Mv-7.js";
import { P as PageHeader, H as H2 } from "./prose-Boxfwb1Q.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
import "./alert-twlv_qhe.js";
const CATEGORY_IDS = {
  通用: "general",
  表单: "forms",
  日期与时间: "date-time",
  数据展示: "data-display",
  反馈: "feedback",
  浮层: "overlays",
  导航: "navigation",
  布局: "layout",
  排版: "typography",
  工具: "utilities",
  其他: "other"
};
function matches(entry, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [entry.title, entry.slug, entry.description, entry.category, ...entry.keywords ?? [], ...entry.exports].join(" ").toLowerCase();
  return q.split(/\s+/).every((term) => haystack.includes(term));
}
function ComponentsIndexPage() {
  const [query, setQuery] = reactExports.useState("");
  const groups = reactExports.useMemo(
    () => componentsByCategory().map((group) => ({ ...group, items: group.items.filter((entry) => matches(entry, query)) })).filter((group) => group.items.length),
    [query]
  );
  const shown = groups.reduce((sum, group) => sum + group.items.length, 0);
  const categories = componentsByCategory().length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        description: `${components.length} 个组件，按用途分为 ${categories} 类。每个组件页都有可交互的示例、导入方式、API 与键盘说明。`,
        title: "组件"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-(--docs-header-height) z-10 -mx-1 mb-2 bg-background px-1 pt-1 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1 sm:max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchInput, { "aria-label": "筛选组件", onValueChange: setQuery, placeholder: "筛选：名称、用途或关键词", value: query }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-live": "polite", className: "shrink-0 text-muted-foreground text-xs numeric", children: query.trim() ? `${shown} 个结果` : `共 ${components.length} 个` })
    ] }) }),
    groups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Empty, { className: "rounded-xl border border-dashed py-12 md:py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyTitle, { className: "text-base", children: [
          "没有匹配“",
          query.trim(),
          "”的组件"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDescription, { children: "换个说法试试，例如“下拉”“date”“表格”，或者清除筛选查看全部。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setQuery(""), size: "sm", variant: "outline", children: "清除筛选" })
    ] }) : null,
    groups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": CATEGORY_IDS[group.category] ?? group.category, className: "mt-10 first-of-type:mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(H2, { className: "mt-0 mb-3 text-[1.0625rem]", id: CATEGORY_IDS[group.category] ?? group.category, children: [
        group.category,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ms-2 font-normal text-muted-foreground text-[0.8125rem] numeric", children: group.items.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: group.items.map((entry) => {
        const { zh, en } = splitTitle(entry.title);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            className: "focus-ring flex h-full flex-col gap-1 rounded-xl border px-4 py-3 transition-colors hover:bg-accent/60",
            to: componentPath(entry.slug),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-baseline gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[0.9375rem] text-foreground-strong", children: zh }),
                en ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground text-xs", children: en }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 text-pretty text-[0.8125rem] text-muted-foreground leading-relaxed", children: entry.description })
            ]
          }
        ) }, entry.slug);
      }) })
    ] }, group.category))
  ] });
}
export {
  ComponentsIndexPage as default
};
