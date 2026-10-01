import { j as jsxRuntimeExports, r as reactExports, U as UILocaleProvider, z as zhCN } from "./index-DM02Iz28.js";
import { C as CopyButton } from "./copy-button-B3gSj0u1.js";
import { P as Pagination, a as PaginationContent, b as PaginationItem, c as PaginationPrevious, d as PaginationLink, e as PaginationEllipsis, f as PaginationNext } from "./pagination-Ds9Vkdd5.js";
import { S as SearchInput } from "./search-input-DR84Mv-7.js";
import { T as Tabs, a as TabsList, b as TabsTab } from "./tabs-DqRxi0L7.js";
import { b as CodeBlock } from "./code-block-DcaGy5kk.js";
import { P as PageHeader, a as P, C as Code, H as H2, b as Callout } from "./prose-Boxfwb1Q.js";
import "./copy-CMgYpHr5.js";
import "./chevron-left-CtqcxRzh.js";
import "./ellipsis-BiesIFo2.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./alert-twlv_qhe.js";
const enUS = {
  code: "en-US",
  messages: {
    close: "Close",
    loading: "Loading",
    breadcrumb: "Breadcrumb",
    more: "More",
    pagination: "Pagination",
    previousPage: "Previous",
    nextPage: "Next",
    morePages: "More pages",
    sidebar: "Workspace navigation",
    sidebarDescription: "Main workspace navigation",
    toggleSidebar: "Toggle sidebar",
    showOptions: "Show options",
    clearSelection: "Clear selection",
    remove: "Remove",
    decrease: "Decrease",
    increase: "Increase",
    numberInput: "Number input",
    notifications: "Notifications",
    closeNotification: "Dismiss notification",
    selectDate: "Select date",
    clearDate: "Clear date",
    selectDateTime: (label) => `Select ${label} date and time`,
    time: "Time",
    done: "Done",
    showPassword: "Show password",
    hidePassword: "Hide password",
    clearSearch: "Clear search",
    copy: "Copy",
    copied: "Copied",
    copyError: "Copy failed. Please copy manually.",
    copyFailed: "Copy failed",
    addFiles: "Add files",
    dropFiles: "Drop files here or choose local files",
    chooseFiles: "Choose files",
    removeFile: (name) => `Remove ${name}`,
    fileError: (name, reason) => `${name}: ${reason === "type" ? "File type is not supported" : reason === "size" ? "File is too large" : "File count limit exceeded"}`,
    selectDateTimePlaceholder: "Select date and time",
    now: "Now",
    dropFilesActive: "Release to add files",
    fileProgress: (name) => `Upload progress for ${name}`,
    fileCount: (count) => count === 1 ? "1 file" : `${count} files`,
    table: "Data table",
    noResults: "No matching results",
    searchTable: "Search table",
    pageSummary: (page, pages, total) => `Page ${page} of ${pages}, ${total} items`,
    steps: "Steps",
    stepComplete: "Completed",
    stepCurrent: "Current",
    stepUpcoming: "Not started",
    stepError: "Error",
    timeline: "Timeline",
    carousel: "Carousel",
    slide: "Slide",
    slideOf: (index, total) => `${index} of ${total}`,
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    clear: "Clear",
    cancel: "Cancel",
    confirm: "Confirm",
    apply: "Apply",
    reset: "Reset",
    back: "Back",
    search: "Search",
    expand: "Expand",
    collapse: "Collapse",
    theme: "Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    systemTheme: "System",
    selectPlaceholder: "Select…",
    searchPlaceholder: "Search…",
    commandPlaceholder: "Type a command or search…",
    addTag: "Add tag",
    tagInputHint: "Press Enter to add",
    tagLimit: (max) => `Up to ${max} tags`,
    tagExists: (tag) => `“${tag}” is already added`,
    selectDateRange: "Select date range",
    startDate: "Start date",
    endDate: "End date",
    today: "Today",
    rowsPerPage: "Rows per page",
    selectedCount: (count) => `${count} selected`,
    sortAscending: "Ascending",
    sortDescending: "Descending",
    toggleColumns: "Columns",
    firstPage: "First page",
    lastPage: "Last page",
    selectRow: "Select row",
    selectAllRows: "Select all rows",
    trendUp: "Up",
    trendDown: "Down",
    trendFlat: "Flat",
    resize: "Resize",
    copyCode: "Copy code",
    showMore: "Show more",
    showLess: "Show less",
    statusLabel: (status) => ({ online: "Online", offline: "Offline", warning: "Warning", error: "Error", info: "Info", neutral: "Unknown" })[status],
    opensInNewTab: "(opens in a new tab)"
  }
};
const SAMPLES = {
  selectDateTime: { zh: ["开始"], en: ["start"] },
  removeFile: { zh: ["报告.pdf"], en: ["report.pdf"] },
  fileError: { zh: ["报告.pdf", "size"], en: ["report.pdf", "size"] },
  pageSummary: { zh: [2, 5, 48], en: [2, 5, 48] },
  selectedCount: { zh: [3], en: [3] }
};
function show(value, args) {
  if (typeof value !== "function") return { text: String(value) };
  const params = args ?? Array.from({ length: value.length }, () => "…");
  return { text: String(value(...params)), call: `(${params.map((p) => JSON.stringify(p)).join(", ")})` };
}
function LocalePreview() {
  const [code, setCode] = reactExports.useState("zh-CN");
  const locale = code === "en-US" ? enUS : zhCN;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 overflow-hidden rounded-xl border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b bg-surface-subtle/60 py-1.5 ps-4 pe-1.5 dark:bg-surface/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "内置文案随语言切换，示例内容本身不变" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { onValueChange: (value) => setCode(value), value: code, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "aria-label": "界面语言", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "zh-CN", children: "简体中文" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "en-US", children: "English" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UILocaleProvider, { locale, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6 p-6 sm:p-8", lang: code, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationPrevious, { href: "#i18n-demo", onClick: (event) => event.preventDefault() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: "#i18n-demo", onClick: (event) => event.preventDefault(), children: "1" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: "#i18n-demo", isActive: true, onClick: (event) => event.preventDefault(), children: "2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationEllipsis, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationNext, { href: "#i18n-demo", onClick: (event) => event.preventDefault() }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchInput, { "aria-label": code === "en-US" ? "Search members" : "搜索成员", defaultValue: "林" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: "pnpm add @yanqing/ui" })
      ] })
    ] }) })
  ] });
}
function MessagesTable() {
  const { messages } = zhCN;
  const keys = Object.keys(zhCN.messages);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 overflow-x-auto rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[34rem] text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b bg-surface-subtle/60 text-muted-foreground text-xs dark:bg-surface/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-start font-medium", children: "键" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-start font-medium", children: "简体中文" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-start font-medium", children: "English" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y", children: keys.map((key) => {
      const zh = show(messages[key], SAMPLES[key]?.zh);
      const en = show(enUS.messages[key], SAMPLES[key]?.en);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 align-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-[0.8125rem] text-foreground-strong", children: key }),
          zh.call ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-[0.75rem] text-muted-foreground", children: zh.call }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 align-top text-foreground/85", children: zh.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 align-top text-foreground/85", lang: "en", children: en.text })
      ] }, key);
    }) })
  ] }) });
}
function I18nPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        description: "组件内置的文案（关闭、加载中、分页、清除……）默认是简体中文，可以整体切换为英文，也可以只改其中几条。",
        title: "国际化"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "所有内置文案都通过 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "useUILocale()" }),
      " 读取，不依赖浏览器语言。组件上显式传入的参数优先于默认文案，例如 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "aria-label" }),
      "、",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "clearLabel" }),
      "、",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "copyLabel" }),
      "。用户内容、列标题与业务文案由你的应用提供。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "english", children: "切换到英文" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CodeBlock,
      {
        code: `import { UILocaleProvider } from "@yanqing/ui";
import { enUS } from "@yanqing/ui/locales/en-US";

export function Root() {
  return (
    <UILocaleProvider locale={enUS}>
      <App />
    </UILocaleProvider>
  );
}`,
        title: "root.tsx"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "英文词条是单独的入口，只用中文的应用不会把它打包进来。别忘了同时把 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: '<html lang="en">' }),
      " 设成对应语言，读屏软件依赖它选择发音。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "i18n-demo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LocalePreview, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "overrides", children: "覆盖部分文案" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "只想改几条时传 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "messages" }),
      "。它会与上层的语言合并，所以可以在某个区域里再嵌套一层："
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CodeBlock,
      {
        code: `<UILocaleProvider messages={{ noResults: "暂无数据", close: "收起" }}>
  <DataTable … />
</UILocaleProvider>`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Callout, { title: "带参数的文案", children: [
      "少数文案是函数，例如 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "pageSummary(page, pages, total)" }),
      "、",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "selectedCount(count)" }),
      "，覆盖时同样传入函数，便于处理语序与单复数。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "custom-components", children: "在自己的组件里使用" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "封装业务组件时读取同一份文案，界面语言就能保持一致：" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CodeBlock,
      {
        code: `import { useUILocale } from "@yanqing/ui";

export function ClearFilters({ onClear }: { onClear: () => void }) {
  const { code, messages } = useUILocale(); // code: "zh-CN" | "en-US"
  return <button onClick={onClear}>{messages.clear}</button>;
}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { className: "text-[0.875rem] text-muted-foreground", children: [
      "向组件库新增内置文案时，需要同时补齐 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "src/locale.tsx" }),
      " 与 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "src/locales/en-US.ts" }),
      "，两边的键保持一一对应。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "messages", children: "内置文案一览" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "下表直接读取库中的两套词条，带参数的文案以示例参数调用后显示。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesTable, {})
  ] });
}
export {
  I18nPage as default
};
