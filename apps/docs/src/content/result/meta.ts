import type { ComponentMeta } from "@/lib/types";

export default {
  title: "结果 Result", titleEn: "Result",
  description: "一次操作的结局：标记、标题、说明与去向。", descriptionEn: "The outcome of one action: a mark, a title, an explanation and where to go next.",
  category: "反馈", layer: "pattern", source: "local", exports: ["Result", "ResultTitle", "ResultDescription", "ResultActions"],
  keywords: ["result", "outcome", "success page", "error page", "结果", "提交成功", "操作失败", "没有权限"],
  decisions: "与 Empty 的分工：Empty 说「这里还没有内容」，是一块区域的状态（零结果、未知、不适用）；Result 说「刚才那件事的结局」，是一次动作的回执，类别由事件决定，并总带着下一步的去向。与 Alert 的分工：Alert 是在场对象旁的一句提示，不占版面；Result 取代该处内容，独占一块。类别除色相外还有形状不同的图标和只给读屏的前缀；去掉图标不等于去掉类别。不自动宣告，是否读出由应用按真实事件决定。",
  decisionsEn: "Versus Empty: Empty says \"there is no content here yet\" and is the state of a region (zero results, unknown, not applicable); Result says \"how that thing ended\" and is the receipt of an action, its tone decided by the event and always paired with where to go next. Versus Alert: Alert is a line beside an object that is still present and takes no layout; Result replaces that content and occupies its own block. Tone has a differently shaped icon and a screen-reader-only prefix besides hue; removing the icon does not remove the tone. It never announces itself; the application decides from the real event whether to speak it.",
  design: { methods: ["名实相符", "相成相制"], whenToUse: ["一次提交、保存或申请结束后，需要独占一块告诉用户结局和下一步。"], avoid: ["区域里本来就没有内容用 Empty；对象仍在、只需旁注一句用 Alert。"], composition: ["标记、标题、说明、动作自上而下，左对齐；动作复用公共控件。"], stateOwner: { library: ["类别的色相、图标与读屏前缀，及各部分的间隔。"], application: ["结局的事实、tone、文案、role 与去向。"] }, responsive: ["标题、说明与动作完整换行；不居中，不加框。"], customization: ["icon 可换成自己的节点或 false；没有权限这类非成败结果用 neutral 或 warning 加自己的 icon。"] },
  designEn: { whenToUse: ["After a submission, save or request ends, a whole block must say how it ended and what comes next."], avoid: ["Use Empty when a region simply has no content; use Alert when the object remains and a side note is enough."], composition: ["Mark, title, description and actions run top to bottom, start-aligned; actions compose public controls."], stateOwner: { library: ["Tone hue, icon and screen-reader prefix, and spacing between parts."], application: ["The outcome's facts, tone, copy, role and next destination."] }, responsive: ["Title, description and actions wrap fully; not centered, not boxed."], customization: ["icon may be your own node or false; for non-success/failure outcomes such as no permission, use neutral or warning with your own icon."] },
  api: [
    { name: "Result", description: "div，类别由调用方声明。", descriptionEn: "A div whose tone the caller declares.", props: [
      { name: "tone", type: '"neutral" | "info" | "success" | "warning" | "danger"', default: '"neutral"', description: "结局的类别，按真实事件声明；组件不从文字猜成败。", descriptionEn: "The outcome's category, declared from the real event; the component never guesses from text." },
      { name: "icon", type: "React.ReactNode | false", description: "省略时按 tone 给默认图标（neutral 没有）；传节点则替换；false 不放标记。", descriptionEn: "Defaults to the tone's icon (neutral has none); a node replaces it; false removes the mark." },
      { name: "children / render / ref / native props", type: "useRender.ComponentProps<div>", description: "不自动成为 alert 或 status。", descriptionEn: "Not automatically an alert or status." },
    ] },
    { name: "ResultTitle", description: "复用 Heading。", descriptionEn: "A Heading composition.", props: [{ name: "level / step / Heading props", type: "HeadingProps", description: "标题层级由文档关系决定。", descriptionEn: "Document relationships determine heading level." }] },
    { name: "ResultDescription / ResultActions", description: "p 说明与 div 去向。", descriptionEn: "p explanation and div destinations.", props: [{ name: "children / render / ref / native props", type: "useRender.ComponentProps<p | div>", description: "动作复用公共组件。", descriptionEn: "Compose public controls for actions." }] },
  ],
  notes: ["非成败的结局（例如没有权限）没有单独的 status；用 tone 加自己的 icon。"], notesEn: ["Outcomes that are neither success nor failure (such as no permission) have no dedicated status; use tone plus your own icon."],
} satisfies ComponentMeta;
