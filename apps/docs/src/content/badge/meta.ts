import type { ComponentMeta } from "@/lib/types";

export default {
  title: "徽章 Badge",
  description: "标注状态、类别或数量的小标签。用于列表、表格和标题旁的辅助信息，不承载主要操作。",
  category: "数据展示",
  source: "coss",
  exports: ["Badge"],
  keywords: ["badge", "徽章", "标签", "tag", "状态", "status", "计数", "count", "chip"],
  api: [
    {
      name: "Badge",
      description: "默认渲染 <span>；通过 render 可渲染为链接或按钮，此时获得悬停、焦点环与触屏点击区。",
      props: [
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "info" | "success" | "warning" | "error" | "destructive"',
          default: '"default"',
          description: "视觉样式。info / success / warning / error 为浅底语义色，default 与 destructive 为实色。",
        },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "尺寸；移动端略高，≥640px 回到桌面尺寸。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素，例如 <a href> 或 <button type=\"button\">。" },
      ],
    },
    {
      name: "badgeVariants",
      description: "生成徽章类名的 cva 函数，接收 { variant, size, className }，用于把徽章样式套到其他元素上。",
    },
  ],
  keyboard: [
    { keys: "Tab", description: "渲染为链接或按钮时，移动焦点到徽章。" },
    { keys: "Enter", description: "打开链接徽章。" },
    { keys: "Enter / Space", description: "触发按钮徽章。" },
  ],
  notes: [
    "颜色不能是唯一信息：保留状态文字，圆点与图标加 aria-hidden=\"true\"。",
    "列表、表格里大量出现的状态用 outline + 圆点或浅底语义色；实色 default、destructive 只留给少数需要强调的标记。",
    "计数加 numeric 使用等宽数字，超过上限显示 “99+”，避免宽度跳动。",
    "需要点击时用 render 渲染为 <a> 或 <button>，不要在 <span> 上绑定 onClick；仅含图标的可点击徽章要提供 aria-label。",
  ],
} satisfies ComponentMeta;
