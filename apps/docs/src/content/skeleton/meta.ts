import type { ComponentMeta } from "@/lib/types";

export default {
  title: "骨架屏 Skeleton", titleEn: "Skeleton",
  description: "内容到达之前，先摆出它将占的位置与行数。", descriptionEn: "Hold the place and row count content will take until it arrives.",
  category: "反馈", layer: "primitive", source: "local",
  exports: ["Skeleton", "SkeletonLine", "SkeletonBlock"],
  keywords: ["skeleton", "loading", "placeholder", "shimmer", "骨架", "加载", "占位", "加载中"],
  decisions: "骨架只表达「正在加载」，不表达进度，也不替应用决定何时结束；到达、失败或为空时换成真内容或 Empty，不让占位一直留着。",
  decisionsEn: "A skeleton says only that content is loading; it carries no progress and does not decide when loading ends. On arrival, failure or an empty result it is replaced by the real content or Empty, never left in place.",
  design: {
    methods: ["名实相符", "布白有用", "进退相承"],
    whenToUse: ["首次加载的内容区域，形状已知、几行几块可预期。"],
    avoid: ["刷新时保留已有内容，不退回骨架。", "加载失败或结果为空时改用 Empty，不让占位冒充内容。", "不确定形状或时间极短的等待，用按钮的 in-progress。"],
    composition: ["Skeleton 包住一组 SkeletonLine / SkeletonBlock，摆成真实内容的版式；到达后整体换掉，版面不跳。"],
    stateOwner: {
      library: ["一句名称（跟随语言）、形状对辅助技术隐藏、脉动与减动。"],
      application: ["何时开始与结束、内容的真实形状、失败与为空的处置。"],
    },
    responsive: ["宽度由所在容器决定，行宽用 className 表达；行高固定为一材。"],
    customization: ["className 调整行宽与块高；label 写明对象，如「正在加载成员」。"],
  },
  designEn: {
    whenToUse: ["The first load of a region whose shape is known: how many rows and blocks to expect."],
    avoid: ["Refreshing keeps existing content and does not fall back to a skeleton.", "A failed or empty result uses Empty; a placeholder never stands in for content.", "A wait of unknown shape or very short duration uses a Button's in-progress."],
    composition: ["Skeleton wraps SkeletonLine / SkeletonBlock laid out like the real content; on arrival the whole is replaced and the page does not jump."],
    stateOwner: {
      library: ["One localized name, shapes hidden from assistive technology, the pulse and its reduced-motion form."],
      application: ["When loading starts and ends, the real shape of the content, and how failure and emptiness are handled."],
    },
    responsive: ["Width follows the container; express row width with className. Row height is one module."],
    customization: ["className adjusts row width and block height; label names the object, e.g. “Loading members”."],
  },
  api: [
    { name: "Skeleton", description: "外层 status，内含一句名称；形状放在其中。", descriptionEn: "The outer status, holding one name; shapes sit inside.", props: [
      { name: "label", type: "string", description: "替代默认的「正在加载」，写明对象。", descriptionEn: "Replaces the default “Loading”, naming the object." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "current public component props", description: "属性、事件与 ref 透传实际元素；样式由 className/style 调整。", descriptionEn: "Forward attributes, events and refs to the actual element; adjust presentation through className/style." },
    ] },
    { name: "SkeletonLine", description: "一行文字的位置，占一材；宽度由 className 给出。", descriptionEn: "The place of one text line, one module high; width comes from className.", props: [
      { name: "className", type: "string", default: "w-full", description: "行宽，例如 w-2/3。", descriptionEn: "Row width, e.g. w-2/3." },
    ] },
    { name: "SkeletonBlock", description: "整块内容（图、图表、表格）的位置；高度由 className 给出。", descriptionEn: "The place of a whole block (image, chart, table); height comes from className.", props: [
      { name: "className", type: "string", default: "h-[5 材]", description: "块高，例如 h-40。", descriptionEn: "Block height, e.g. h-40." },
    ] },
  ],
} satisfies ComponentMeta;
