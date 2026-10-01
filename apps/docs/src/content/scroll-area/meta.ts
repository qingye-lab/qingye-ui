import type { ComponentMeta } from "@/lib/types";

export default {
  title: "滚动区域 Scroll Area",
  description: "在固定尺寸的区域内滚动内容，滚动条纤细且只在悬停或滚动时出现，可选边缘渐隐提示还有更多内容。",
  category: "布局",
  source: "coss",
  exports: ["ScrollArea", "ScrollBar"],
  keywords: ["scroll", "scroll area", "滚动", "滚动条", "overflow"],
  api: [
    {
      name: "ScrollArea",
      description: "根组件，内含视口、内容、纵横两条滚动条。尺寸由外部决定（如 h-72 或父级 flex）。",
      props: [
        { name: "scrollFade", type: "boolean", default: "false", description: "在有更多内容的一侧显示 1.5rem 渐隐遮罩。" },
        { name: "scrollbarGutter", type: "boolean", default: "false", description: "出现滚动条时为它预留空间，避免盖住内容。" },
        { name: "fill", type: "boolean", default: "false", description: "让内容撑满视口，适合内部再做 flex 布局。" },
        { name: "overscrollContain", type: "boolean", default: "false", description: "滚动到边界时不带动外层页面。" },
        { name: "clampContentMinWidth", type: "boolean", default: "true", description: "限制内容最小宽度为 0，避免长内容意外撑出横向滚动。横向滚动场景内容自身需给出宽度（如 w-max）。" },
      ],
    },
    { name: "ScrollBar", description: "单独的滚动条，ScrollArea 已内置纵横两条，一般无需手动使用。" },
  ],
  keyboard: [
    { keys: "Tab", description: "视口可获得焦点（显示焦点环），之后用方向键、PageUp / PageDown 滚动。" },
  ],
  notes: [
    "内容不多时直接用 overflow-auto 即可；需要统一的细滚动条或渐隐边缘时再用 ScrollArea。",
    "横向滚动时给内容 w-max（或固定宽度），否则内容会被压缩到视口宽度。",
  ],
} satisfies ComponentMeta;
