import type { ComponentMeta } from "@/lib/types";

export default {
  title: "侧边面板 Sheet",
  description: "从屏幕边缘滑入的模态面板，适合在不离开列表的情况下查看详情、编辑记录或设置筛选条件。需要拖拽手势或吸附高度时改用 Drawer。",
  category: "浮层",
  source: "coss",
  exports: [
    "Sheet",
    "SheetTrigger",
    "SheetPopup",
    "SheetHeader",
    "SheetTitle",
    "SheetDescription",
    "SheetPanel",
    "SheetFooter",
    "SheetClose",
  ],
  keywords: ["sheet", "side panel", "侧边栏", "抽屉", "面板"],
  api: [
    {
      name: "Sheet",
      description: "根组件，基于 Dialog，管理打开状态。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
        { name: "modal", type: 'boolean | "trap-focus"', default: "true", description: "是否锁定页面并限制焦点。" },
      ],
    },
    { name: "SheetTrigger", description: "打开面板的按钮。" },
    {
      name: "SheetPopup",
      description: "面板本体，自带遮罩与关闭按钮。别名 SheetContent。",
      props: [
        { name: "side", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "滑入的边。" },
        { name: "variant", type: '"default" | "inset"', default: '"default"', description: "inset 在宽屏下与屏幕边缘留出间距并加圆角。" },
        { name: "showCloseButton", type: "boolean", default: "true", description: "显示右上角关闭按钮。" },
        { name: "closeProps", type: "SheetClose props", description: "透传给内置关闭按钮。" },
        { name: "portalProps", type: "SheetPortal props", description: "指定挂载节点等。" },
      ],
    },
    { name: "SheetHeader", description: "标题区。" },
    { name: "SheetTitle", description: "标题，作为面板的可访问名称。" },
    { name: "SheetDescription", description: "补充说明。" },
    {
      name: "SheetPanel",
      description: "正文区，内容超出时在此滚动。",
      props: [{ name: "scrollFade", type: "boolean", default: "true", description: "滚动边缘渐隐。" }],
    },
    {
      name: "SheetFooter",
      description: "操作区。",
      props: [{ name: "variant", type: '"default" | "bare"', default: '"default"', description: "default 带分隔线与底色；bare 无背景。" }],
    },
    { name: "SheetClose", description: "关闭面板的按钮。" },
  ],
  keyboard: [
    { keys: "Esc", description: "关闭面板，焦点回到触发器。" },
    { keys: "Tab / Shift + Tab", description: "在面板内循环移动焦点。" },
  ],
  notes: [
    "左右两侧用于详情与编辑，宽度上限 28rem；顶部、底部适合短内容，如通知或快捷设置。",
    "窄屏下左右面板会留出 3rem 露出页面，提示用户仍在原页面之上。",
    "需要移动端拖拽关闭、吸附点时使用 Drawer。",
  ],
} satisfies ComponentMeta;
