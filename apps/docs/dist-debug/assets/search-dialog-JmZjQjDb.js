import { c as createLucideIcon, J as GUIDES, O as OVERVIEW, a as components, s as splitTitle, l as componentPath, N as useNavigate, r as reactExports, j as jsxRuntimeExports, P as KbdGroup, K as Kbd, Q as focusPageHeading, R as CATEGORIES } from "./index-DM02Iz28.js";
import { k as CommandDialog, l as CommandDialogPopup, C as Command, a as CommandInput, b as CommandPanel, c as CommandEmpty, d as CommandList, e as CommandGroup, f as CommandGroupLabel, g as CommandCollection, h as CommandItem, j as CommandFooter } from "./command-BRcGQYa0.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import { A as ArrowUp } from "./arrow-up-BkVdZzdH.js";
import { A as ArrowDown } from "./arrow-down-D6zHiGm4.js";
import { C as CornerDownLeft } from "./corner-down-left-DCdAQS2c.js";
import "./autocomplete-DlyiU5Sk.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ComboboxEmpty-BQp7q2Mg.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./stringifyLocale-DOx30wH1.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const __iconNode = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode);
function searchEntries() {
  const guides = [...GUIDES, { ...OVERVIEW, keywords: ["components", "全部", "列表", "overview"] }].map((page) => ({
    value: page.path,
    label: page.title,
    title: page.title,
    group: "文档",
    meta: "指南",
    haystack: { strong: [page.title, ...page.keywords ?? []], weak: [page.description] }
  }));
  const items = components.map((entry) => {
    const { zh, en } = splitTitle(entry.title);
    return {
      value: componentPath(entry.slug),
      label: entry.title,
      title: zh,
      ...en ? { hint: en } : {},
      group: "组件",
      meta: entry.category,
      haystack: { strong: [entry.title, entry.slug, entry.slug.replace(/-/g, " "), ...entry.keywords ?? []], weak: [entry.description, ...entry.exports] }
    };
  });
  return [...guides, ...items];
}
const norm = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();
function score(entry, query) {
  const terms = norm(query).split(" ").filter(Boolean);
  if (!terms.length) return 1;
  const identity = entry.value.split("/").pop() ?? "";
  let total = identity === norm(query).replace(/\s+/g, "-") ? 50 : identity.startsWith(terms[0]) ? 15 : 0;
  for (const term of terms) {
    let best = 0;
    for (const text of entry.haystack.strong) {
      const value = norm(text);
      if (value === term) best = Math.max(best, 100);
      else if (value.startsWith(term)) best = Math.max(best, 60);
      else if (value.includes(term)) best = Math.max(best, 40);
    }
    if (!best) {
      for (const text of entry.haystack.weak) if (norm(text).includes(term)) best = Math.max(best, 10);
    }
    if (!best) return 0;
    total += best;
  }
  return total;
}
function browseGroups(entries) {
  const docs = entries.filter((entry) => entry.group === "文档");
  const byCategory = CATEGORIES.map((category) => ({
    value: category,
    items: entries.filter((entry) => entry.group === "组件" && entry.meta === category)
  }));
  const known = new Set(CATEGORIES);
  const other = entries.filter((entry) => entry.group === "组件" && !known.has(entry.meta));
  return [{ value: "文档", items: docs }, ...byCategory, { value: "其他", items: other }].filter((group) => group.items.length);
}
function resultGroups(entries, query) {
  const ranked = entries.map((entry) => ({ entry, rank: score(entry, query) })).filter((item) => item.rank > 0).sort((a, b) => b.rank - a.rank);
  const pick = (group) => ranked.filter((item) => item.entry.group === group).map((item) => item.entry);
  return [
    { value: "组件", items: pick("组件") },
    { value: "文档", items: pick("文档") }
  ].filter((group) => group.items.length);
}
function SearchDialog({ open, onOpenChange }) {
  const navigate = useNavigate();
  const entries = reactExports.useMemo(searchEntries, []);
  const all = reactExports.useMemo(() => browseGroups(entries), [entries]);
  const [query, setQuery] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => query.trim() ? resultGroups(entries, query) : all, [entries, all, query]);
  const navigated = reactExports.useRef(false);
  const searching = query.trim().length > 0;
  const choose = (entry) => {
    navigated.current = true;
    onOpenChange(false);
    navigate(entry.value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CommandDialog,
    {
      onOpenChange: (next) => {
        if (next) navigated.current = false;
        onOpenChange(next);
      },
      onOpenChangeComplete: (next) => {
        if (!next) setQuery("");
      },
      open,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommandDialogPopup,
        {
          "aria-label": "搜索文档",
          finalFocus: () => {
            if (!navigated.current) return true;
            focusPageHeading();
            return false;
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { filteredItems: filtered, items: all, onValueChange: setQuery, value: query, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { "aria-label": "搜索组件与文档", placeholder: "搜索组件、指南或关键词…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandPanel, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandEmpty, { children: [
                "没有找到与“",
                query.trim(),
                "”相关的内容。"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandList, { className: "max-h-[min(24rem,60dvh)]", children: (group, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { className: index > 0 ? "mt-2" : void 0, items: group.items, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroupLabel, { children: group.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CommandCollection, { children: (entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { className: "gap-2.5", onClick: () => choose(entry), value: entry, children: [
                  entry.group === "文档" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { "aria-hidden": "true", className: "size-4 shrink-0 opacity-60" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { "aria-hidden": "true", className: "size-4 shrink-0 opacity-60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: entry.title }),
                  entry.hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground text-xs", children: entry.hint }) : null,
                  searching && entry.group === "组件" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ms-auto shrink-0 ps-3 text-muted-foreground/80 text-xs", children: entry.meta }) : null
                ] }, entry.value) })
              ] }) }, group.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { "aria-hidden": "true" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { "aria-hidden": "true" }) })
                  ] }),
                  "选择"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CornerDownLeft, { "aria-hidden": "true" }) }),
                  "打开"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Esc" }),
                "关闭"
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
export {
  SearchDialog as default
};
