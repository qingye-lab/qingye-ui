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
  design: {
    "methods": [
      "名实相符",
      "相成相制",
      "随境取度"
    ],
    "whenToUse": [
      "页面内持续可见的状态、后果或修复入口，与相关对象邻接。"
    ],
    "avoid": [
      "所有初始信息都 assertive 播报；同一个问题既重复 Alert 又 Toast；长说明挤掉修复动作。"
    ],
    "composition": [
      "Title 说当前事实，Description 只保留修复所需细节，Action 承接对象。默认 role=alert，普通信息需显式选择 status 或移除 role。"
    ],
    "stateOwner": {
      "library": [
        "提示部位、语义变体、动作换行和原生属性透传。"
      ],
      "application": [
        "紧迫性、role 选择、持续问题、权限和恢复动作。"
      ]
    },
    "responsive": [
      "窄屏动作占整行，长说明允许换行；关键后果不藏 Tooltip，实测文字与边界对比。"
    ],
    "customization": [
      "variant 只是视觉语义，role 与紧迫性单独判断，样式不能代替错误事实。"
    ]
  },
} satisfies ComponentMeta;
