import type { ComponentMeta } from "@/lib/types";
export default {
  title: "分隔线 Separator", titleEn: "Separator",
  description: "在已有内容组之间表达分界，可选择语义分隔或装饰线。", descriptionEn: "Express a boundary between content groups as a semantic separator or decorative line.",
  category: "布局", layer: "foundation", source: "local", exports: ["Separator"], keywords: ["separator", "分界", "decorative", "装饰"],
  decisions: "标题与间距足够表达关系时不加线。Separator 没有拖动、按钮或面板调整行为。", decisionsEn: "Omit a line when headings and spacing already express the relation. Separator has no drag, button, or panel-resizing behavior.",
  design: {
    methods: ["名实相符", "布白有用"], whenToUse: ["两组内容确需可辨认分界。"], avoid: ["每两行画线；把静态分界当拖动入口。"],
    composition: ["标题说明内容范围；有文字的 FieldSeparator 使用装饰线避免重复语义。"],
    stateOwner: {library: ["Base UI 分隔原语、方向、装饰选择。"], application: ["分界位置与辅助技术是否需要感知。"]},
    responsive: ["长轴跟随容器；竖线依实际行布局拉伸。"], customization: ["强边界颜色与 1px 线条为表达预设；className 最后合并，render 与原生属性透传。"],
  }, designEn: {"whenToUse":["Two content groups need a discernible boundary."],"avoid":["Lines between every pair of rows or static boundaries impersonating drag entries."],"composition":["Headings explain scope; text FieldSeparator uses decorative lines to avoid repeated semantics."],"stateOwner":{"library":["Base UI separator primitive, orientation, and decorative choice."],"application":["Boundary placement and whether assistive technology needs it."]},"responsive":["The long axis follows its container; vertical lines stretch with actual row layout."],"customization":["Strong boundary color and 1px lines are presets. External classes merge last; render/native props forward."]},
  api: [
    {name: "Separator", description: "基于 Base UI Separator；默认 role=separator。", descriptionEn: "Based on Base UI Separator; role=separator by default.", props: [
      {name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "横向跨容器；纵向在 flex 行里拉伸。", descriptionEn: "Horizontal spans the container; vertical stretches in a flex row."},
      {name: "decorative", type: "boolean", default: "false", description: "true 时 role=presentation 且 aria-hidden=true。", descriptionEn: "When true, uses role=presentation and aria-hidden=true."},
      {name: "className / style / render / ref", type: "Base UI Separator props", description: "作用于分界本身；样式支持方向状态函数。", descriptionEn: "Applied to the separator; styles support orientation state functions."},
    ]},
    {name: "SeparatorPrimitive", description: "Base UI 原语出口。", descriptionEn: "Base UI primitive outlet."},
  ],
  keyboard: [{keys: "无", keysEn: "None", description: "静态分隔不进入键盘焦点顺序。", descriptionEn: "A static separator does not enter the tab order."}],
  notes: ["装饰线不承担辅助技术语义。需要拖动改变尺寸时使用具有调整行为的控件。", "必要非文本边界与真实承载面的对比至少 3:1；图片与未知承载面另行验证。"],
  notesEn: ["Decorative lines carry no assistive-technology semantics. Use a control with resize behavior when dragging must change dimensions.", "Necessary non-text boundaries need at least 3:1 contrast against the real carrier. Images and unknown carriers need separate checks."],
} satisfies ComponentMeta;
