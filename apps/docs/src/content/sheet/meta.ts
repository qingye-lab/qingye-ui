import type { ComponentMeta } from "@/lib/types";

export default {
  title: "侧边面板 Sheet",
  description: "从屏幕边缘滑入的模态面板，适合在不离开列表的情况下查看详情、编辑记录或设置筛选条件。需要拖拽手势或吸附高度时改用 Drawer。",
  design: {
    "methods": [
      "随境取度",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "从列表进入详情、筛选或短编辑任务，同时保持返回当前列表的依据。"
    ],
    "avoid": [
      "面板关闭不能冒充放弃草稿或取消请求；不要把宽屏任务直接塞进窄面板。"
    ],
    "composition": [
      "Header 保留对象与退出，Panel 滚动工作内容，Footer 承接保存或应用；拖动需求交给 Drawer。"
    ],
    "stateOwner": {
      "library": [
        "管理边缘展开、名称、焦点限制与返回、关闭入口及正文滚动。"
      ],
      "application": [
        "管理对象、草稿、提交状态、错误恢复和关闭时是否保留工作。"
      ]
    },
    "responsive": [
      "窄屏保持内容宽度与退出空间；长标题避让内置 Close，底部操作避开安全区。"
    ],
    "customization": [
      "side 与 variant 改变停靠边界而非任务语义；表面与进入退出通过公共主题和动效调整。"
    ]
  },
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
