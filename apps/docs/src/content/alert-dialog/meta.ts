import type { ComponentMeta } from "@/lib/types";

export default {
  title: "警示对话框 AlertDialog",
  description: "打断当前操作、要求用户明确回应的对话框，用于删除、撤销权限等不可逆操作的二次确认。点击遮罩不会关闭。",
  design: {
    "methods": [
      "名实相符",
      "相成相制",
      "进退相承"
    ],
    "whenToUse": [
      "对具体对象和具体不可逆后果要求明确回应，如永久删除或撤销权限。"
    ],
    "avoid": [
      "确认不应成为每次操作的例行阻碍；请求发出与完成、结果未知必须分开表达。"
    ],
    "composition": [
      "Title 点明对象，Description 只说明必要后果，取消与执行动作并列，初始焦点按风险显式设置。"
    ],
    "stateOwner": {
      "library": [
        "提供 alertdialog 名称与说明关联、焦点限制、遮罩不关闭和明确选择出口。"
      ],
      "application": [
        "决定确认条件、操作范围、危险请求、失败或未知状态，以及何时允许关闭或重试。"
      ]
    },
    "responsive": [
      "贴底操作保留安全区；长后果说明不能让取消与执行动作不可达。"
    ],
    "customization": [
      "视觉强弱跟随当前风险；destructive 指向真实危险动作，取消不被默认焦点顺序意外弱化。"
    ]
  },
  category: "浮层",
  source: "coss",
  exports: [
    "AlertDialog",
    "AlertDialogTrigger",
    "AlertDialogPopup",
    "AlertDialogHeader",
    "AlertDialogTitle",
    "AlertDialogDescription",
    "AlertDialogFooter",
    "AlertDialogClose",
  ],
  keywords: ["alert dialog", "confirm", "确认框", "二次确认", "删除确认"],
  api: [
    {
      name: "AlertDialog",
      description: "根组件，管理打开状态。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
        { name: "handle", type: "AlertDialogCreateHandle()", description: "与外部触发器关联。" },
      ],
    },
    { name: "AlertDialogTrigger", description: "打开确认框的按钮。" },
    {
      name: "AlertDialogPopup",
      description: "确认框本体，自带遮罩；不含右上角关闭按钮，用户必须做出选择。别名 AlertDialogContent。",
      props: [
        { name: "bottomStickOnMobile", type: "boolean", default: "true", description: "窄屏时贴底显示。" },
        { name: "initialFocus", type: "RefObject | boolean | fn", description: "打开时聚焦的元素，默认为第一个按钮（通常是“取消”）。" },
        { name: "portalProps", type: "AlertDialogPortal props", description: "指定挂载节点等。" },
      ],
    },
    { name: "AlertDialogHeader", description: "标题区；窄屏居中，宽屏左对齐。" },
    { name: "AlertDialogTitle", description: "标题，用问句直接说明后果。" },
    { name: "AlertDialogDescription", description: "说明影响范围与能否撤销。" },
    {
      name: "AlertDialogFooter",
      description: "操作区；取消放在前，确认放在后。",
      props: [{ name: "variant", type: '"default" | "bare"', default: '"default"', description: "default 带分隔线与底色；bare 无背景。" }],
    },
    { name: "AlertDialogClose", description: "关闭按钮；用 render 渲染为“取消”或确认按钮。" },
  ],
  keyboard: [
    { keys: "Esc", description: "取消并关闭，焦点回到触发器。" },
    { keys: "Tab / Shift + Tab", description: "在按钮之间循环移动焦点。" },
    { keys: "Enter / Space", description: "执行当前聚焦的按钮。" },
  ],
  notes: [
    "标题写成问句并点明对象，例如“删除 3 台设备？”；按钮文案写具体动作，不要只写“确定”。",
    "默认焦点落在“取消”，避免误按回车直接执行危险操作。",
    "确认按钮用 destructive 样式；需要异步执行时保持打开并显示 loading，完成后再关闭。",
  ],
} satisfies ComponentMeta;
