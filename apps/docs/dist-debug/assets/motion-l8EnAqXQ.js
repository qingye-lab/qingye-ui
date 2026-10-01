import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, f as Menu, g as MenuTrigger, h as MenuPopup, i as MenuItem, k as MenuSeparator, r as reactExports } from "./index-DM02Iz28.js";
import { u as useMediaQuery } from "./use-media-query-CGVr0VA1.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import { T as Tabs, a as TabsList, b as TabsTab, c as TabsPanel } from "./tabs-DqRxi0L7.js";
import { b as CodeBlock } from "./code-block-DcaGy5kk.js";
import { P as PageHeader, a as P, C as Code, A, H as H2, U as Ul } from "./prose-Boxfwb1Q.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { M as MousePointer2 } from "./mouse-pointer-2-DTg3VpSv.js";
import { R as RotateCcw } from "./rotate-ccw-DDqGWf8q.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./copy-CMgYpHr5.js";
import "./alert-twlv_qhe.js";
const __iconNode = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
];
const Keyboard = createLucideIcon("keyboard", __iconNode);
function Stage({ children, caption }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "my-5 overflow-hidden rounded-xl border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-32 flex-wrap items-center justify-center gap-3 p-6 sm:p-8", children }),
    caption ? /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "border-t bg-surface-subtle/60 px-4 py-2.5 text-muted-foreground text-xs leading-relaxed dark:bg-surface/40", children: caption }) : null
  ] });
}
function useInputModality() {
  const [mode, setMode] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    const read = () => setMode(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);
  return mode;
}
function Timeline() {
  const rows = [
    { label: "进入", token: "--qy-duration-fast", ms: 140 },
    { label: "退出", token: "--qy-duration-press", ms: 100 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "my-5 rounded-xl border p-4 sm:p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[2.5rem_minmax(0,1fr)_3.5rem] items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: row.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-foreground/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-foreground/56", style: { width: `${row.ms / 200 * 100}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-end font-mono text-muted-foreground text-xs numeric", children: [
        row.ms,
        "ms"
      ] })
    ] }, row.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-3 text-muted-foreground text-xs", children: "菜单与选择器浮层的进入和退出时长，按同一比例绘制。" })
  ] });
}
const fruits = [
  { label: "龙井", value: "longjing" },
  { label: "碧螺春", value: "biluochun" },
  { label: "铁观音", value: "tieguanyin" },
  { label: "白毫银针", value: "yinzhen" }
];
function StaggerDemo() {
  const [run, setRun] = reactExports.useState(0);
  const items = ["同步设计令牌", "生成组件索引", "构建类型声明", "打包样式表", "写入发布说明"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Stage,
    {
      caption: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "列表使用 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: 'data-motion="stagger"' }),
        "，每项通过 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-index" }),
        " 推迟 40ms，最多累计 8 项。"
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-1.5", "data-motion": "stagger", children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
            style: { "--qy-index": index },
            children: [
              item,
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "完成" })
            ]
          },
          item
        )) }, run),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "self-start", onClick: () => setRun((value) => value + 1), size: "sm", variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { "aria-hidden": "true" }),
          "重播"
        ] })
      ] })
    }
  );
}
function MotionPage() {
  const modality = useInputModality();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        description: "动效只用来说明状态的变化：短、缓出、随时可以被打断。全库的策略集中在 motion.css，组件不各自发明。",
        title: "动效"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "motion.css" }),
      " 随 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "styles.css" }),
      " 一起引入，只补充全局或缺失的部分：按压反馈、选择器与菜单的入场、键盘即时与减少动态效果。组件自带的过渡保留上游调校，时长与缓动见",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/tokens#motion", children: "设计令牌" }),
      "。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "press", children: "按压反馈" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "带 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "qy-pressable" }),
      " 类的元素在按下时缩到 0.97，用时 100ms，松开即回。",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "Button" }),
      " 默认带有它；禁用、加载中的元素不缩放。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stage, { caption: "按住按钮不放，能感到它轻微下沉；松手后立即复位。", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "主要操作" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "次要操作" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: true, variant: "outline", children: "加载中" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "popups", children: "浮层从触发点展开" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "浮层以 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "origin-(--transform-origin)" }),
      " 为原点，从 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "scale-98" }),
      " 与透明开始展开，所以总是像从触发它的按钮里长出来。选择器和菜单上游没有入场动效，由",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "motion.css" }),
      " 补上。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stage, { caption: "分别打开菜单和选择器，注意它们从按钮所在的一侧展开。", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: [
          "更多操作",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "重命名" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "复制链接" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { variant: "destructive", children: "删除" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "longjing", items: fruits, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "选择茶类", className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: fruits.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item.value, children: item.label }, item.value)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "exit", children: "退出比进入快" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "出现时给眼睛一点时间定位，消失时不该让人等。菜单与选择器以 140ms 进入、100ms 退出；动画进行中再次操作会从当前状态继续，而不是排队播放。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "keyboard", children: "键盘操作即时" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "反复按方向键时，每一步都不该等动画。",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "MotionProvider" }),
      " 在 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "<html>" }),
      " 上记录最近一次输入来自键盘还是指针（",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "data-ui-input" }),
      "），键盘输入期间，带 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "data-slot" }),
      " 的组件跳过过渡。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Stage,
      {
        caption: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-x-2 gap-y-1", children: [
          "当前输入方式：",
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
            modality === "keyboard" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, { "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointer2, { "aria-hidden": "true" }),
            modality === "keyboard" ? "键盘" : modality === "pointer" ? "指针" : "未启用 MotionProvider"
          ] }),
          "用鼠标点选标签，指示条会滑动；按 Tab 聚焦后用方向键切换，它会直接跳到位。"
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { className: "w-full max-w-sm", defaultValue: "overview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "overview", children: "概览" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "activity", children: "动态" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "settings", children: "设置" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "px-1 pt-2 text-muted-foreground text-sm", value: "overview", children: "项目概况与关键指标。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "px-1 pt-2 text-muted-foreground text-sm", value: "activity", children: "最近的提交与评论。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "px-1 pt-2 text-muted-foreground text-sm", value: "settings", children: "成员、权限与通知。" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "reduced-motion", children: "减少动态效果" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "系统开启“减少动态效果”后，位移和缩放全部取消，只保留透明度与颜色的变化，状态依然清楚；骨架屏闪光、通知抖动这类装饰性动画停止，加载指示继续转动，因为它在传达“仍在进行”。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { className: "text-[0.875rem] text-muted-foreground", children: [
      "当前系统设置：",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Strong, { children: reduced ? "已开启减少动态效果" : "未开启" }),
      "。在 Chrome 开发者工具的 Rendering 面板中可以模拟这一设置。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "helpers", children: "进场辅助" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "页面内容在导航或数据加载后出现时，可以借用三个属性，而不必自己写关键帧：" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Ul, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: 'data-motion="fade-in"' }),
        "：原地淡入，用于行内反馈。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: 'data-motion="rise-in"' }),
        "：淡入并上移 4px，用于新出现的区块。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: 'data-motion="stagger"' }),
        "：子元素依次上移淡入，配合 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-index" }),
        "。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerDemo, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CodeBlock,
      {
        code: `<ul data-motion="stagger">
  {items.map((item, index) => (
    <li key={item.id} style={{ "--qy-index": index }}>{item.title}</li>
  ))}
</ul>`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "rules", children: "编写组件时的约定" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Ul, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "时长只用令牌：按压 100ms，反馈 140ms，展开与滑动 220ms，抽屉 450ms 配合 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-ease-drawer" }),
        "。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "缓动默认 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-ease-out" }),
        "，不使用回弹；通知的成功脉冲是唯一例外。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "只动画 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "opacity" }),
        "、",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "scale" }),
        "、",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "translate" }),
        "、颜色与必要的 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "height" }),
        "，不动画会引起布局抖动的宽度和位置（指示条除外）。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "程序触发、不该有过渡的变化，在元素上加 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "data-instant" }),
        "。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "键盘即时与减少动态效果由 motion.css 统一处理，组件内不要重复实现。" })
    ] })
  ] });
}
function Strong({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-medium text-foreground-strong", children });
}
export {
  MotionPage as default
};
