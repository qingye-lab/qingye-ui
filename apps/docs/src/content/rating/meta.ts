import type { ComponentMeta } from "@/lib/types";

export default {
  title: "评分 Rating", titleEn: "Rating",
  description: "在 1 到 max 之间给出一个整数分值，用一排星表示。", descriptionEn: "Give an integer score from 1 to max, shown as a row of stars.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["Rating"],
  keywords: ["rating", "评分", "星", "打分", "star", "评价"],
  api: [
    { name: "Rating", description: "单选组语义的评分：每颗星是一个 radio，选中第 n 颗即分值 n。只读时是一幅图加「n / max」。", descriptionEn: "Rating with radio-group semantics: each star is a radio and choosing the nth means score n. Read-only, it is an image plus \"n / max\".", props: [
      { name: "value / defaultValue", type: "number", default: "0", description: "分值，整数，0 表示未评分；范围 0..max，越界或非整数会抛 RangeError。", descriptionEn: "The score: an integer where 0 means unrated, within 0..max; out of range or non-integers throw a RangeError." },
      { name: "onValueChange", type: "(value: number) => void", description: "分值改变时调用；清除时为 0。", descriptionEn: "Called when the score changes; 0 on clearing." },
      { name: "max", type: "number", default: "5", description: "最高分，也是星的个数；正整数。", descriptionEn: "The highest score and the number of stars; a positive integer." },
      { name: "allowClear", type: "boolean", default: "true", description: "再选当前分值即清除。关闭后评过分只能改不能撤。", descriptionEn: "Choosing the current score again clears it. Off, a score can be changed but not withdrawn." },
      { name: "readOnly", type: "boolean", default: "false", description: "不再是控件：渲染为 role=\"img\"（名称「评分 4 / 5」）加可见的「4 / 5」。", descriptionEn: "No longer a control: rendered as role=\"img\" (named \"Rating 4 of 5\") plus the visible \"4 / 5\"." },
      { name: "disabled", type: "boolean", default: "false", description: "不可操作；不提交。", descriptionEn: "Inert; not submitted." },
      { name: "name", type: "string", description: "原生表单字段名；提交所选分值，未评分时不提交。", descriptionEn: "Native form field name; submits the chosen score and nothing when unrated." },
      { name: "aria-label / aria-labelledby", type: "string", description: "组的名称，默认「评分」；放进带 FieldLabel 的 Field 时由标签命名。", descriptionEn: "The group's name, \"Rating\" by default; in a Field with a FieldLabel the label names it." },
    ] },
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "进入或离开整组；组内只有一个停靠点（已选的星，未评分时是第一颗）。", descriptionEn: "Enter or leave the whole group; it is one tab stop (the chosen star, or the first when unrated)." },
    { keys: "→ / ↓ / ← / ↑", description: "移到相邻的星并选中它。RTL 下左右方向相反。", descriptionEn: "Move to the neighbouring star and choose it. Left and right swap in RTL." },
    { keys: "Space", description: "选中当前的星；它已是当前分值且 allowClear 时清除。", descriptionEn: "Choose the focused star; clear it when it is the current score and allowClear is on." },
  ],
  notes: [
    "星的名称是「n 星」，组的名称是「评分」；读屏读到的是「评分，3 星，已选中」，不依赖颜色。",
    "悬停时预览分值，只影响显示；点击前不改变值。",
    "满星与空星靠形状区分，占位相同，状态变化不改变组件外形。",
  ],
  notesEn: [
    "Stars are named \"n stars\" and the group \"Rating\", so assistive technology reads \"Rating, 3 stars, checked\" without relying on colour.",
    "Hover previews a score for display only; the value does not change before the click.",
    "Filled and empty stars differ in shape and occupy the same space, so state changes never change the component's outline.",
  ],
  decisions: "评分是单选组，不是滑块：分值是有限个互斥的整数，方向键移动即选中。半星没有提供——要更细的刻度就加大 max，而不是引入小数。只读时不保留单选语义，因为一串不能操作的 radio 对读屏是噪音；它是一个结论，所以读成一幅带分值的图。",
  decisionsEn: "Rating is a radio group, not a slider: the score is one of a finite set of mutually exclusive integers, and arrow keys choose as they move. Half stars are not offered: raise max for a finer scale instead of introducing fractions. Read-only does not keep radio semantics, since a row of inert radios is noise to a screen reader; it is a conclusion, so it reads as an image carrying the score.",
  design: {
    methods: ["名实相符", "进退相承"],
    whenToUse: ["让人对一个对象打出有限档位的分", "展示一个已有的评分结果（只读）"],
    avoid: ["连续的数值用 Slider", "两三个互斥的文字选项用 RadioGroup", "是 / 否的判断用 Switch 或 Checkbox"],
    composition: ["FieldLabel + Rating + FieldDescription + FieldError；只读展示可直接放在行内"],
    stateOwner: { library: ["非受控分值、悬停预览、焦点"], application: ["受控分值、评分的含义与提交、invalid"] },
    responsive: ["星的尺寸读填值控件的图标档，随密度；粗指针下命中区扩到触屏目标；本批只做桌面检查"],
    customization: ["className；max；allowClear"],
  },
  designEn: {
    whenToUse: ["Let a person give a score on a finite scale.", "Show an existing rating (read-only)."],
    avoid: ["Use Slider for continuous values.", "Use RadioGroup for two or three mutually exclusive text options.", "Use Switch or Checkbox for yes / no."],
    composition: ["FieldLabel + Rating + FieldDescription + FieldError; the read-only display can sit inline."],
    stateOwner: { library: ["Uncontrolled score, hover preview and focus."], application: ["The controlled score, what the rating means and its submission, invalid."] },
    responsive: ["Star size reads the fill-control icon step and follows density; coarse pointers get the touch target; this batch checked desktop only."],
    customization: ["className; max; allowClear."],
  },
} satisfies ComponentMeta;
