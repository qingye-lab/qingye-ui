import type { ComponentMeta } from "@/lib/types";

export default {
  title: "对话框 Dialog",
  description: "在当前页面之上打开一个模态窗口，用于填写表单、查看详情或完成一个独立的小任务。需要用户二次确认的危险操作改用 AlertDialog。",
  design: {
    "methods": [
      "随境取度",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "在当前对象上完成确有必要独立聚焦的小任务，完成或退出后能合理返回。"
    ],
    "avoid": [
      "不要把每个结果都变成模态；关闭窗口不等于撤销已保存动作或已取消后台请求。"
    ],
    "composition": [
      "Header 标识对象，Panel 承载工作，Footer 承接保存与退出；从 Menu 打开时保留外部 Dialog owner。"
    ],
    "stateOwner": {
      "library": [
        "提供名称关联、焦点限制与返回、关闭原因、滚动正文及内置关闭入口的空间。"
      ],
      "application": [
        "控制未保存内容、异步结果、错误恢复与关闭拦截；业务完成后才更新结果并决定退出。"
      ]
    },
    "responsive": [
      "贴底模式保留可见退出与安全区，长正文在 Panel 滚动；标题不能被关闭按钮覆盖。"
    ],
    "customization": [
      "按任务选择底部贴合与 Footer 边界；showCloseButton 关闭时必须有明确替代退出。"
    ]
  },
  category: "浮层",
  source: "coss",
  exports: [
    "Dialog",
    "DialogTrigger",
    "DialogPopup",
    "DialogHeader",
    "DialogTitle",
    "DialogDescription",
    "DialogPanel",
    "DialogFooter",
    "DialogClose",
  ],
  keywords: ["dialog", "modal", "对话框", "弹窗", "模态框"],
  api: [
    {
      name: "Dialog",
      description: "根组件，管理打开状态。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用；details.reason 可区分 Esc、点击遮罩等来源。" },
        { name: "modal", type: 'boolean | "trap-focus"', default: "true", description: "模态时锁定页面滚动并把焦点限制在对话框内。" },
        { name: "disablePointerDismissal", type: "boolean", default: "false", description: "禁止点击遮罩关闭，适合填写中的表单。" },
        { name: "handle", type: "DialogCreateHandle()", description: "把对话框与外部触发器关联，例如从菜单项打开。" },
      ],
    },
    { name: "DialogTrigger", description: "打开对话框的按钮；用 render 渲染为 Button。" },
    {
      name: "DialogPopup",
      description: "对话框本体，自带遮罩、视口与右上角关闭按钮。别名 DialogContent。",
      props: [
        { name: "showCloseButton", type: "boolean", default: "true", description: "显示右上角关闭按钮。" },
        { name: "bottomStickOnMobile", type: "boolean", default: "true", description: "窄屏时贴底显示，便于单手操作。" },
        { name: "closeProps", type: "DialogClose props", description: "透传给内置关闭按钮。" },
        { name: "initialFocus / finalFocus", type: "RefObject | boolean | fn", description: "打开时聚焦的元素 / 关闭后焦点返回的元素，默认分别为首个可聚焦元素与触发器。" },
        { name: "portalProps", type: "DialogPortal props", description: "例如 container，指定挂载节点。" },
      ],
    },
    { name: "DialogHeader", description: "标题区，包含 DialogTitle 与 DialogDescription。" },
    { name: "DialogTitle", description: "标题，自动作为对话框的可访问名称。" },
    { name: "DialogDescription", description: "补充说明，自动关联为 aria-describedby。" },
    {
      name: "DialogPanel",
      description: "正文区；内容超出时在此区域内滚动，头部与底部保持固定。",
      props: [{ name: "scrollFade", type: "boolean", default: "true", description: "滚动边缘显示渐隐遮罩。" }],
    },
    {
      name: "DialogFooter",
      description: "操作区；窄屏时按钮纵向排列，主按钮在上。",
      props: [{ name: "variant", type: '"default" | "bare"', default: '"default"', description: "default 带分隔线与底色；bare 无背景。" }],
    },
    { name: "DialogClose", description: "关闭对话框的按钮。" },
  ],
  keyboard: [
    { keys: "Esc", description: "关闭当前（最上层）对话框，焦点回到触发器。" },
    { keys: "Tab / Shift + Tab", description: "在对话框内循环移动焦点。" },
    { keys: "Enter / Space", description: "在触发器上打开对话框。" },
  ],
  notes: [
    "每个对话框都要有 DialogTitle；没有可见标题时，用 aria-label 提供名称。",
    "表单放在 <Form className=\"contents\"> 中包住 DialogPanel 与 DialogFooter，提交按钮才能触发提交。",
    "有未保存内容时，在 onOpenChange 中拦截关闭并用 AlertDialog 确认。",
    "嵌套对话框会自动让父级缩小后退，不要叠加超过两层。",
  ],
} satisfies ComponentMeta;
