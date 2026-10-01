import type { ComponentMeta } from "@/lib/types";

export default {
  title: "右键菜单 ContextMenu",
  description: "在区域上点击右键（触屏长按）时出现的操作菜单，用于文件、卡片、表格行等对象的快捷操作。它是加速手段：同样的操作必须在界面其他位置也能完成。",
  category: "浮层",
  source: "coss",
  exports: [
    "ContextMenu",
    "ContextMenuTrigger",
    "ContextMenuPopup",
    "ContextMenuItem",
    "ContextMenuSeparator",
    "ContextMenuShortcut",
  ],
  keywords: ["context menu", "right click", "右键菜单", "上下文菜单", "长按"],
  api: [
    {
      name: "ContextMenu",
      description: "根组件。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
        { name: "disabled", type: "boolean", default: "false", description: "停用右键菜单，恢复浏览器默认菜单。" },
      ],
    },
    { name: "ContextMenuTrigger", description: "响应右键与长按的区域，渲染为 <div>。" },
    {
      name: "ContextMenuPopup",
      description: "菜单浮层，出现在指针位置。别名 ContextMenuContent。",
      props: [{ name: "side / align / sideOffset / alignOffset", type: "同 MenuPopup", description: "相对指针的定位。" }],
    },
    {
      name: "ContextMenuItem",
      description: "菜单项。",
      props: [
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "危险操作。" },
        { name: "inset", type: "boolean", default: "false", description: "与带图标的项对齐。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用。" },
      ],
    },
    { name: "ContextMenuLinkItem", description: "渲染为 <a> 的导航项。" },
    { name: "ContextMenuCheckboxItem", description: "可勾选的项，支持 variant=\"switch\"。" },
    { name: "ContextMenuRadioGroup / ContextMenuRadioItem", description: "单选组。" },
    { name: "ContextMenuGroup / ContextMenuGroupLabel", description: "分组与组标题。别名 ContextMenuLabel。" },
    { name: "ContextMenuSeparator / ContextMenuShortcut", description: "分隔线 / 快捷键提示。" },
    { name: "ContextMenuSub / ContextMenuSubTrigger / ContextMenuSubPopup", description: "子菜单。别名 ContextMenuSubContent。" },
  ],
  keyboard: [
    { keys: "Shift + F10 / 菜单键", description: "在聚焦的触发区域上打开菜单（取决于浏览器与系统）。" },
    { keys: "↑ / ↓", description: "在菜单项之间移动。" },
    { keys: "→ / ←", description: "打开 / 关闭子菜单。" },
    { keys: "Enter / Space", description: "执行当前项。" },
    { keys: "Esc", description: "关闭菜单。" },
  ],
  notes: [
    "右键菜单不易被发现，也难以用键盘或读屏器触达：其中每个操作都要在可见的按钮或 Menu 中另有入口。",
    "触屏设备上长按触发；菜单项在粗指针下最小高度 44px。",
    "菜单项与 Menu 一致，可以直接复用同一套操作定义。",
  ],
} satisfies ComponentMeta;
