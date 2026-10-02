import type { ComponentMeta } from "@/lib/types";

export default {
  title: "抽屉 Drawer",
  description: "可拖拽关闭的边缘面板，移动端的首选浮层：支持拖动手柄、吸附高度、嵌套层叠和动作菜单。桌面端的详情面板用 Sheet 即可。",
  design: {
    "methods": [
      "随境取度",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "移动端需要拖动和吸附高度的边缘任务面板，或面向当前对象的动作列表。"
    ],
    "avoid": [
      "拖动手柄不能成为唯一退出；手势关闭不等于业务取消，嵌套不能让父对象失去返回依据。"
    ],
    "composition": [
      "Title 命名对象，Panel 区分可滚动可选取内容，Footer / Close 提供可点出口；动作选项复用 DrawerMenu。"
    ],
    "stateOwner": {
      "library": [
        "管理吸附、滑动、嵌套层次、名称与焦点；动作菜单的危险状态在悬停和焦点时持续可见。"
      ],
      "application": [
        "决定退出条件、草稿保留、请求结果与何时禁止关闭；操作完成依据真实事件。"
      ]
    },
    "responsive": [
      "保证安全区、长内容滚动与可点击关闭；真实滑动手势要在触屏上验证，模拟键盘不替代。"
    ],
    "customization": [
      "position 联动滑动方向，variant 控制边界；抽屉缓动来自公共 drawer 角色。"
    ]
  },
  category: "浮层",
  source: "coss",
  exports: [
    "Drawer",
    "DrawerTrigger",
    "DrawerPopup",
    "DrawerHeader",
    "DrawerTitle",
    "DrawerDescription",
    "DrawerPanel",
    "DrawerFooter",
    "DrawerClose",
  ],
  keywords: ["drawer", "bottom sheet", "抽屉", "底部面板", "动作面板", "action sheet"],
  api: [
    {
      name: "Drawer",
      description: "根组件，管理打开状态、方向和吸附点。",
      props: [
        { name: "position", type: '"bottom" | "top" | "left" | "right"', default: '"bottom"', description: "滑入的边；同时决定滑动关闭的方向。" },
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
        { name: "snapPoints", type: "(number | string)[]", description: "吸附高度：0–1 为视口比例，大于 1 为像素，也可写 \"300px\"、\"20rem\"。" },
        { name: "snapPoint / onSnapPointChange", type: "SnapPoint | null", description: "受控的当前吸附点。" },
        { name: "snapToSequentialPoints", type: "boolean", default: "false", description: "快速甩动时只移动到相邻的吸附点。" },
        { name: "swipeDirection", type: '"down" | "up" | "left" | "right"', description: "覆盖由 position 推断的关闭方向。" },
        { name: "modal", type: 'boolean | "trap-focus"', default: "true", description: "是否锁定页面并限制焦点。" },
      ],
    },
    { name: "DrawerTrigger", description: "打开抽屉的按钮。" },
    {
      name: "DrawerPopup",
      description: "抽屉本体，自带遮罩。嵌套打开时父级自动缩小后退。",
      props: [
        { name: "variant", type: '"default" | "inset" | "straight"', default: '"default"', description: "inset 在宽屏下留出边距并四角圆角；straight 无圆角，适合侧边导航。" },
        { name: "showBar", type: "boolean", default: "false", description: "显示拖动手柄。" },
        { name: "showCloseButton", type: "boolean", default: "false", description: "显示右上角关闭按钮。" },
        { name: "position", type: "同 Drawer", description: "单独覆盖弹出方向。" },
        { name: "closeProps / portalProps", type: "object", description: "透传给内置关闭按钮 / Portal。" },
      ],
    },
    { name: "DrawerHeader / DrawerTitle / DrawerDescription", description: "标题区；标题作为抽屉的可访问名称。" },
    {
      name: "DrawerPanel",
      description: "正文区。",
      props: [
        { name: "scrollable", type: "boolean", default: "true", description: "内容超出时在此滚动；短表单可关闭。" },
        { name: "scrollFade", type: "boolean", default: "true", description: "滚动边缘渐隐。" },
        { name: "allowSelection", type: "boolean", default: "true", description: "允许选中文字；关闭后整块可用于拖动。" },
      ],
    },
    {
      name: "DrawerFooter",
      description: "操作区，自动避让 iOS 底部安全区。",
      props: [{ name: "variant", type: '"default" | "bare"', default: '"default"', description: "default 带分隔线与底色；bare 无背景。" }],
    },
    { name: "DrawerClose", description: "关闭抽屉的按钮。" },
    {
      name: "DrawerMenu",
      description: "抽屉内的动作菜单：DrawerMenuItem、DrawerMenuCheckboxItem（含 switch 变体）、DrawerMenuRadioGroup / DrawerMenuRadioItem、DrawerMenuGroup / DrawerMenuGroupLabel、DrawerMenuSeparator、DrawerMenuTrigger（打开下一级抽屉）。",
    },
    { name: "DrawerSwipeArea", description: "放在屏幕边缘的感应区，从边缘滑动即可拉出抽屉。" },
  ],
  keyboard: [
    { keys: "Esc", description: "关闭最上层抽屉，焦点回到触发器。" },
    { keys: "Tab / Shift + Tab", description: "在抽屉内循环移动焦点。" },
    { keys: "Enter / Space", description: "执行菜单项或切换选项。" },
  ],
  notes: [
    "拖动手柄只是视觉提示（aria-hidden），始终保留可点击的关闭方式：取消按钮、关闭按钮或点击遮罩。",
    "同一操作在桌面用 Menu / Dialog、在移动端用 Drawer 时，用 useMediaQuery(\"max-md\") 切换，内容保持一致。",
    "吸附点从小到大排列，最后一个通常为 1（全高）。",
  ],
} satisfies ComponentMeta;
