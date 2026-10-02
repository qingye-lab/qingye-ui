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
  design: {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "在对象旁标注状态、类别或计数，帮助扫读和比较。"
    ],
    "avoid": [
      "用实色标签代替所有操作；仅颜色表达状态；对长状态名称无条件截断。"
    ],
    "composition": [
      "Badge 保留状态文字；真正可点击的标签用 render 生成链接或 button，主要动作使用 Button。"
    ],
    "stateOwner": {
      "library": [
        "视觉变体、样式部位、可点击元素的焦点与触摸扩展。"
      ],
      "application": [
        "状态事实、计数上限、操作范围和可访问名称。"
      ]
    },
    "responsive": [
      "短标签保持整词；长名称先缩短真实名称或允许布局换行，别挤掉同列数据。"
    ],
    "customization": [
      "variant 表达当下强调程度，语义文字不因主题变更；数字使用 numeric。"
    ]
  },
} satisfies ComponentMeta;
