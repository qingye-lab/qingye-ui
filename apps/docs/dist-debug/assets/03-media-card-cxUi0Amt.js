import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as AspectRatio } from "./aspect-ratio-CXQy_XBU.js";
import { P as Play } from "./play-_isrQBUt.js";
const meta = { title: "课程卡片", description: "封面按 16:9 占位，叠加播放按钮与时长。" };
const lessons = [
  { title: "设计系统中的间距与节奏", author: "林悦", duration: "12:48", hue: "from-[#e6ddd3] to-[#c9b8a6]" },
  { title: "用 Tailwind CSS 4 构建主题令牌", author: "周屹", duration: "18:05", hue: "from-[#d7e1ea] to-[#a9bccd]" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full max-w-2xl gap-5 sm:grid-cols-2", children: lessons.map((lesson) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AspectRatio, { className: "overflow-hidden rounded-xl border", ratio: 16 / 9, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-linear-to-br ${lesson.hue} transition-[scale] duration-(--qy-duration-slow) group-hover:scale-[1.02]` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 items-center justify-center rounded-full bg-background/88 text-foreground shadow-sm/5 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { "aria-hidden": "true", className: "ms-0.5 size-4.5 fill-current" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-end p-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-black/56 px-1.5 py-0.5 font-medium text-white text-xs numeric backdrop-blur-sm", children: lesson.duration }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-sm", children: lesson.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: lesson.author })
    ] })
  ] }, lesson.title)) });
}
export {
  Demo as default,
  meta
};
