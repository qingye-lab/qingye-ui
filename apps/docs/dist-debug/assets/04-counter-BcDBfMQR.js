import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Carousel, a as CarouselContent, b as CarouselItem, d as CarouselPrevious, e as CarouselNext, u as useCarousel } from "./carousel-DgH4Ozs0.js";
import "./chevron-left-CtqcxRzh.js";
const meta = {
  title: "自定义计数",
  description: "用 useCarousel 读取位置，onIndexChange 同步外部状态；defaultIndex 指定初始位置。"
};
const steps = [
  { title: "连接代码仓库", text: "授权 GitHub 或 GitLab，选择要部署的仓库。" },
  { title: "确认构建设置", text: "自动识别框架，也可以手动修改构建命令。" },
  { title: "配置环境变量", text: "密钥只在构建与运行时注入，不会出现在日志里。" },
  { title: "部署上线", text: "每次推送自动部署，任意版本一键回滚。" }
];
function Counter() {
  const { index, count } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "numeric text-muted-foreground text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: index + 1 }),
    " / ",
    count
  ] });
}
function Demo() {
  const [current, setCurrent] = reactExports.useState(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Carousel, { "aria-label": "上手指南", className: "w-full max-w-sm", defaultIndex: 1, onIndexChange: setCurrent, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { children: steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-36 flex-col justify-center gap-1.5 rounded-xl border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: step.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: step.text })
    ] }) }, step.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-muted-foreground text-xs", children: [
      "当前步骤：",
      steps[current]?.title
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
