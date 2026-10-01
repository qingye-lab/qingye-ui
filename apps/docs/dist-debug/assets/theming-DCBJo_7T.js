import { j as jsxRuntimeExports, u as useTheme, r as reactExports, B as Button, e as cn } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { S as Slider } from "./slider-si_iHGt9.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
import { T as ToggleGroup, a as ToggleGroupItem } from "./toggle-group-CNf3Y3ya.js";
import { b as CodeBlock } from "./code-block-DcaGy5kk.js";
import { P as PageHeader, H as H2, F as Facts, C as Code, a as P, A, b as Callout, c as H3 } from "./prose-Boxfwb1Q.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./separator-CcYO5Zxi.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldControl-CFc5_9rC.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./valueToPercent-B3zKfIMz.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
import "./copy-CMgYpHr5.js";
import "./alert-twlv_qhe.js";
const BRANDS = [
  { id: "neutral", label: "中性" },
  {
    id: "indigo",
    label: "靛蓝",
    light: { primary: "oklch(0.51 0.18 268)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.62 0.14 268)" },
    dark: { primary: "oklch(0.72 0.13 268)", foreground: "oklch(0.21 0.04 268)", ring: "oklch(0.6 0.12 268)" }
  },
  {
    id: "teal",
    label: "青绿",
    light: { primary: "oklch(0.5 0.09 190)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.64 0.09 190)" },
    dark: { primary: "oklch(0.76 0.1 185)", foreground: "oklch(0.22 0.03 190)", ring: "oklch(0.6 0.08 190)" }
  },
  {
    id: "ochre",
    label: "赭石",
    light: { primary: "oklch(0.52 0.13 50)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.66 0.12 55)" },
    dark: { primary: "oklch(0.77 0.12 65)", foreground: "oklch(0.23 0.04 55)", ring: "oklch(0.62 0.1 60)" }
  },
  {
    id: "rose",
    label: "胭脂",
    light: { primary: "oklch(0.52 0.18 12)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.66 0.14 12)" },
    dark: { primary: "oklch(0.74 0.14 12)", foreground: "oklch(0.22 0.05 12)", ring: "oklch(0.6 0.12 12)" }
  }
];
const DEFAULT_RADIUS = 0.625;
function radiusVars(radius) {
  const r = `${radius}rem`;
  return {
    "--qy-radius": r,
    "--qy-radius-xs": `max(0rem, calc(${r} - 0.375rem))`,
    "--qy-radius-sm": `max(0rem, calc(${r} - 0.25rem))`,
    "--qy-radius-md": `max(0rem, calc(${r} - 0.125rem))`,
    "--qy-radius-lg": r,
    "--qy-radius-xl": `calc(${r} + 0.25rem)`,
    "--qy-radius-2xl": `calc(${r} + 0.375rem)`,
    "--radius": r
  };
}
function cssFor(brand, radius, compact) {
  const root = [];
  const dark = [];
  if (brand.light && brand.dark) {
    root.push(`--qy-primary: ${brand.light.primary};`, `--qy-primary-foreground: ${brand.light.foreground};`, `--qy-ring: ${brand.light.ring};`);
    dark.push(`--qy-primary: ${brand.dark.primary};`, `--qy-primary-foreground: ${brand.dark.foreground};`, `--qy-ring: ${brand.dark.ring};`);
  }
  if (radius !== DEFAULT_RADIUS) root.push(`--qy-radius: ${radius}rem;`);
  const blocks = [`@import "tailwindcss";`, `@import "@yanqing/ui/styles.css";`];
  if (root.length) blocks.push(`
:root {
${root.map((line) => `  ${line}`).join("\n")}
}`);
  if (dark.length) blocks.push(`
.dark {
${dark.map((line) => `  ${line}`).join("\n")}
}`);
  if (compact) blocks.push(`
/* 在 <body> 或某个容器上：data-density="compact" */`);
  if (!root.length && !dark.length && !compact) blocks.push(`
/* 默认主题：无需覆盖 */`);
  return blocks.join("\n");
}
const rows = [
  { name: "季度报告.pdf", owner: "林晚", size: "2.4 MB", status: "已发布" },
  { name: "品牌规范 v3", owner: "周屿", size: "18.0 MB", status: "审核中" },
  { name: "访谈纪要", owner: "陈默", size: "312 KB", status: "草稿" }
];
function ThemeBench() {
  const { resolvedTheme } = useTheme();
  const [brandId, setBrandId] = reactExports.useState("indigo");
  const [radius, setRadius] = reactExports.useState(DEFAULT_RADIUS);
  const [compact, setCompact] = reactExports.useState(false);
  const densityId = reactExports.useId();
  const brand = BRANDS.find((item) => item.id === brandId) ?? BRANDS[0];
  const palette = resolvedTheme === "dark" ? brand.dark : brand.light;
  const style = reactExports.useMemo(
    () => ({
      ...palette ? { "--qy-primary": palette.primary, "--qy-primary-foreground": palette.foreground, "--qy-ring": palette.ring } : {},
      ...radiusVars(radius)
    }),
    [palette, radius]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 overflow-hidden rounded-2xl border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 border-b bg-surface-subtle/60 p-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-8 dark:bg-surface/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-muted-foreground text-xs", id: "brand-label", children: "品牌色" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToggleGroup,
          {
            "aria-labelledby": "brand-label",
            className: "flex-wrap",
            onValueChange: (value) => value[0] && setBrandId(value[0]),
            size: "sm",
            value: [brandId],
            variant: "outline",
            children: BRANDS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroupItem, { className: "gap-1.5 px-2", value: item.id, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: "size-3 rounded-full border border-foreground/10",
                  style: { background: (resolvedTheme === "dark" ? item.dark : item.light)?.primary ?? "var(--qy-neutral-800)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: item.label })
            ] }, item.id))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-48 flex-1 flex-col gap-2 sm:max-w-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-muted-foreground text-xs", id: "radius-label", children: "圆角 --qy-radius" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground text-xs numeric", children: [
            radius.toFixed(3).replace(/0+$/, "").replace(/\.$/, ""),
            "rem"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            "aria-labelledby": "radius-label",
            max: 1,
            min: 0.25,
            onValueChange: (value) => setRadius(Array.isArray(value) ? value[0] : value),
            step: 0.125,
            value: radius
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:pb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: compact, id: densityId, onCheckedChange: setCompact }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: densityId, children: "紧凑密度" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]", "data-density": compact ? "compact" : void 0, style, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "邀请成员" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "lin.wan@example.com", type: "email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true }),
          "发送欢迎邮件"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "发送邀请" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "取消" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "3 个席位" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("min-w-0 overflow-hidden rounded-xl border"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { density: compact ? "compact" : "default", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "ps-3", children: "文件" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "负责人" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "pe-3 text-end", children: "状态" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "ps-3 font-medium", children: row.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: row.owner }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "pe-3 text-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: row.status === "已发布" ? "success" : row.status === "审核中" ? "warning" : "secondary", children: row.status }) })
        ] }, row.name)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { className: "my-0 rounded-none border-0", code: cssFor(brand, radius, compact), lang: "css", title: "对应的 CSS" }) })
  ] });
}
const headScript = `<script>
  // 在首帧绘制前应用已保存的主题，避免浅色闪烁。
  try {
    var t = localStorage.getItem("yq-theme");
    var dark = t === "dark" || ((!t || t === "system") && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
<\/script>`;
const useThemeSnippet = `import { useTheme } from "@yanqing/ui";

export function ThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // theme: "light" | "dark" | "system"；resolvedTheme 是实际生效的那一个
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      当前：{theme}
    </button>
  );
}`;
function ThemingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        description: "组件只读取语义令牌。改动几个 CSS 变量就能换品牌色、圆角和密度；深色模式是同一组名字的另一套取值。",
        title: "主题"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "layers", children: "三层令牌" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Facts,
      {
        items: [
          {
            term: "原语",
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "tokens/primitives.css" }),
              "：原始色板，不带含义，例如 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-neutral-800" }),
              "。数值与 Tailwind 4 色板一致。组件从不直接引用这一层。"
            ] })
          },
          {
            term: "语义",
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "tokens/semantic.css" }),
              "：界面谈论的角色，例如 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-primary" }),
              "、",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-border" }),
              "、",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-danger" }),
              "。浅色与深色是同名变量的两套绑定。"
            ] })
          },
          {
            term: "组件",
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "tokens/components.css" }),
              "：字号、间距、圆角、控件高度、密度与动效。让你不改源码就能把表格调密、把控件调圆、把动效调慢。"
            ] })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "theme.css" }),
      " 把语义令牌映射为 Tailwind 工具类：",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "bg-primary" }),
      " 直接读取 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "var(--qy-primary)" }),
      "，因此切换主题不需要重新编译。另有一组不带前缀的兼容变量（",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--background" }),
      "、",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--card" }),
      "……）供 shadcn 风格的代码使用，它们总是指向 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-*" }),
      "，不要直接覆盖。完整取值见",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/tokens", children: "设计令牌" }),
      "。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "playground", children: "试一试" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "选择一种品牌色、拖动圆角、打开紧凑密度。下方的 CSS 会同步更新，可以直接复制到项目里。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeBench, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "brand", children: "品牌色" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "在引入 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "styles.css" }),
      " 之后覆盖语义令牌。浅色写在 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: ":root" }),
      "，深色写在 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: ".dark" }),
      "："
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: cssFor(BRANDS[1], DEFAULT_RADIUS, false), lang: "css", title: "src/index.css" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Callout, { tone: "warning", title: "检查对比度", children: [
      "主色与它的前景色之间至少要有 4.5:1 的对比度，浅色和深色都要验证。状态色（",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-danger" }),
      " 等）的浅色填充由实色自动派生，改了实色，填充随之变化。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "radius", children: "圆角" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "所有圆角都从 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-radius" }),
      "（默认 0.625rem）派生：菜单项用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "md" }),
      "，控件和浮层用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "lg" }),
      "，卡片和弹窗用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "2xl" }),
      "，嵌套圆角保持“外层减间距”。在 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: ":root" }),
      " 上改这一个变量即可整体变圆或变方。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `:root {
  --qy-radius: 0.5rem;
}`, lang: "css" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { className: "text-[0.875rem] text-muted-foreground", children: [
      "派生令牌在声明它们的 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: ":root" }),
      " 上求值。如果只想让某个区域使用不同圆角，需要在那个容器上同时声明 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-radius-sm" }),
      " 到",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-radius-2xl" }),
      "，上面的示例就是这样做的。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "density", children: "密度" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "数据密集的界面可以在 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "<body>" }),
      " 或任意容器上加 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: 'data-density="compact"' }),
      "：表格行高从 48px 降到 40px，面板内边距与区块间距随之收紧，顶栏高度变为 48px。单个表格也可以用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: '<Table density="compact">' }),
      " 单独调整。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `<main data-density="compact">
  <Table>…</Table>
</main>` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "dark-mode", children: "深色模式" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "ThemeProvider" }),
      " 在 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "<html>" }),
      " 上切换 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: ".dark" }),
      " 类（也可以用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: 'attribute="data-theme"' }),
      " 改为属性），并把用户的选择存进",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "localStorage" }),
      "。切换瞬间会暂停一帧过渡，让所有表面同时变色。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "head-script", children: "首屏脚本" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "React 挂载之前页面已经开始绘制。把下面的脚本放进 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "<head>" }),
      "，在首帧之前读出保存的主题，就不会出现浅色闪烁："
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: headScript, lang: "html", title: "index.html" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { className: "text-[0.875rem] text-muted-foreground", children: [
      "修改了 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "storageKey" }),
      " 或 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "attribute" }),
      " 时，脚本里的键名与写法要一起改。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "use-theme", children: "读取与切换" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: useThemeSnippet }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "scoped", children: "局部深色" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "语义令牌也绑定在 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: ".dark" }),
      " 类本身上，所以给任意容器加 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: 'className="dark"' }),
      "，其中的组件就按深色渲染，适合深色的代码区或预览框。"
    ] })
  ] });
}
export {
  ThemingPage as default
};
