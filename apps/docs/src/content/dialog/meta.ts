import type { ComponentMeta } from "@/lib/types";

export default {
  title: "对话框 Dialog",
  description: "在当前页面之上打开一个模态窗口，用于填写表单、查看详情或完成一个独立的小任务。需要用户二次确认的危险操作改用 AlertDialog。",
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
