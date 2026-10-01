import { r as reactExports, j as jsxRuntimeExports, S as SITE, d as releaseTarball } from "./index-DM02Iz28.js";
import { C as CopyCodeButton, a as CodeView, b as CodeBlock } from "./code-block-DcaGy5kk.js";
import { T as Tabs, a as TabsList, b as TabsTab, c as TabsPanel } from "./tabs-DqRxi0L7.js";
import { P as PageHeader, H as H2, F as Facts, C as Code, a as P, A, c as H3, b as Callout } from "./prose-Boxfwb1Q.js";
import "./copy-CMgYpHr5.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./alert-twlv_qhe.js";
const managers = [
  { id: "pnpm", command: (pkg) => `pnpm add ${pkg}` },
  { id: "npm", command: (pkg) => `npm install ${pkg}` },
  { id: "yarn", command: (pkg) => `yarn add ${pkg}` }
];
function InstallTabs({ pkg }) {
  const [current, setCurrent] = reactExports.useState("pnpm");
  const command = managers.find((manager) => manager.id === current).command(pkg);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Tabs,
    {
      className: "my-5 gap-0 overflow-hidden rounded-xl border bg-surface-subtle dark:bg-surface",
      onValueChange: (value) => setCurrent(value),
      value: current,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 border-b py-1 ps-1.5 pe-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { "aria-label": "包管理器", size: "sm", variant: "underline", children: managers.map((manager) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { className: "font-mono text-xs", value: manager.id, children: manager.id }, manager.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCodeButton, { value: command })
        ] }),
        managers.map((manager) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { value: manager.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeView, { code: manager.command(pkg), lang: "text", wrap: true }) }, manager.id))
      ]
    }
  );
}
const providers = `import { ThemeProvider, ToastProvider, TooltipProvider } from "@yanqing/ui";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <TooltipProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </TooltipProvider>
  </ThemeProvider>,
);`;
const usage = `import { Button, toastManager } from "@yanqing/ui";

export function SaveButton() {
  return (
    <Button onClick={() => toastManager.add({ title: "已保存", type: "success" })}>
      保存
    </Button>
  );
}`;
function InstallationPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        description: "组件库以单个包发布。根据项目是否使用 Tailwind CSS 4 选择一种样式接入方式，再在应用根部挂载 Provider。",
        title: "安装"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "requirements", children: "环境要求" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Facts,
      {
        items: [
          { term: "React", detail: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "React 与 React DOM 19.2 或更高版本。" }) },
          { term: "样式", detail: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Tailwind CSS 4（推荐），或者直接使用预编译的样式表。" }) },
          {
            term: "可选依赖",
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "使用 DataTable 时另装 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "@tanstack/react-table" }),
              "；其余依赖（Base UI、图标等）会随包一起安装。"
            ] })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "install", children: "安装包" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "当前版本 ",
      SITE.version,
      " 通过 GitHub Release 分发。直接安装发布页上的 tarball："
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InstallTabs, { pkg: releaseTarball }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { className: "text-[0.875rem] text-muted-foreground", children: [
      "其他版本见 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: `${SITE.repo}/releases`, children: "Releases" }),
      "。锁定到具体的 tarball 地址可以让每次安装得到完全相同的代码。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "styles", children: "引入样式" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "styles-tailwind", children: "Tailwind CSS 4 项目" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "在全局 CSS 中，紧跟 Tailwind 之后引入组件库的样式入口：" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `@import "tailwindcss";
@import "@yanqing/ui/styles.css";`, lang: "css", title: "src/index.css" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "styles.css" }),
      " 包含三层设计令牌、Tailwind 主题映射、",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "touch-target" }),
      " 与 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "numeric" }),
      " 等工具类、动效策略，以及",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "dark" }),
      " 自定义变体。它通过 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "@source" }),
      " 扫描组件源码，所以只会生成实际用到的类。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "styles-css", children: "不使用 Tailwind 的项目" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "在应用入口导入一次预编译样式表：" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `import "@yanqing/ui/ui.css";`, title: "src/main.tsx" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "ui.css" }),
      " 包含组件所需的全部样式和基础 reset，但不是完整的 Tailwind 工具集；页面自身的布局用你自己的 CSS 编写。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Callout, { tone: "warning", title: "二选一", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "styles.css" }),
      " 与 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "ui.css" }),
      " 不要同时引入，否则同一组样式会以不同顺序出现两次。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "providers", children: "挂载 Provider" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "在应用根部挂载一次。顺序没有强制要求，下面是推荐写法：" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: providers, title: "src/main.tsx" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Facts,
      {
        items: [
          {
            term: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "ThemeProvider" }),
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "管理浅色、深色与跟随系统，在 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "<html>" }),
              " 上切换 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: ".dark" }),
              "，并把选择保存在 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "localStorage" }),
              "（键名",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "yq-theme" }),
              "）。配合 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/theming#dark-mode", children: "首屏脚本" }),
              " 避免闪烁。"
            ] })
          },
          {
            term: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "TooltipProvider" }),
            detail: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "让相邻的提示共享延迟：从一个提示移到下一个时立即出现，不再重新等待。" })
          },
          {
            term: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "ToastProvider" }),
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "渲染通知视口。之后在任意位置调用 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "toastManager.add()" }),
              " 发出通知。"
            ] })
          },
          {
            term: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "UILocaleProvider" }),
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "可选。内置文案默认是简体中文；需要英文或局部改写时使用，见 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/i18n", children: "国际化" }),
              "。"
            ] })
          },
          {
            term: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "MotionProvider" }),
            detail: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "可选。区分键盘与指针输入，让键盘操作跳过过渡、即时响应，见 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/motion#keyboard", children: "动效" }),
              "。"
            ] })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "usage", children: "使用组件" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: usage, title: "save-button.tsx" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "per-component", children: "按组件导入" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "根入口可以被打包工具摇树（包内只有 CSS 声明了副作用）。如果希望依赖关系一目了然，或者打包工具不做摇树，可以从单个组件的入口导入：" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `import { Button } from "@yanqing/ui/components/button";
import { Select, SelectItem, SelectPopup } from "@yanqing/ui/components/select";` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "入口名与源码文件名一致，即 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "@yanqing/ui/components/<name>" }),
      "。每个组件页的“导入”一节都给出了对应路径。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "typescript", children: "TypeScript" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "类型声明随包发布，无需额外安装。组件的属性类型与 Base UI 保持一致，例如 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "MenuPrimitive.Root.Props" }),
      " 可直接用于封装。"
    ] })
  ] });
}
export {
  InstallationPage as default
};
