import type { ComponentMeta } from "@/lib/types";

export default {
  title: "警告提示 Alert",
  description: "嵌在页面内容中的状态说明，持续显示直到问题解决，例如配额将满、同步失败、需要补充资料。临时反馈用 Toast，需要用户立即确认用 AlertDialog。",
  category: "反馈",
  source: "coss",
  exports: ["Alert", "AlertTitle", "AlertDescription", "AlertAction"],
  keywords: ["alert", "callout", "banner", "警告", "提示条", "通知栏"],
  api: [
    {
      name: "Alert",
      description: "容器，带 role=\"alert\"。第一个子元素为图标时自动对齐成两栏。",
      props: [
        { name: "variant", type: '"default" | "info" | "success" | "warning" | "error" | "destructive"', default: '"default"', description: "语义颜色；destructive 与 error 相同，便于从 shadcn 迁移。" },
      ],
    },
    { name: "AlertTitle", description: "标题，一句话说明发生了什么。" },
    { name: "AlertDescription", description: "补充说明与下一步建议，可包含多段文字或列表。" },
    { name: "AlertAction", description: "操作按钮组；宽屏时在右侧居中，窄屏时换到文字下方。" },
  ],
  notes: [
    "颜色不是唯一信息：始终配合图标与明确的标题文字。",
    "role=\"alert\" 会让读屏器立即播报；页面加载时就存在、并不紧急的说明，可改为 role=\"status\" 或去掉 role。",
    "操作按钮用 xs / sm 尺寸，最多两个；主要操作放在最后。",
  ],
} satisfies ComponentMeta;
