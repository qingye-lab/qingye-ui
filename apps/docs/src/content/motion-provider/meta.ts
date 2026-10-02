import type { ComponentMeta } from "@/lib/types";

export default {
  title: "动效策略 MotionProvider",
  description:
    "记录用户最近一次使用的输入方式，写到 <html data-ui-input>：键盘操作时组件的过渡立即完成，鼠标与触屏时保留细微的动效。在应用根部挂载一次。",
  category: "工具",
  source: "local",
  exports: ["MotionProvider"],
  keywords: ["motion", "动效", "动画", "键盘", "input modality", "reduced motion", "减少动态效果"],
  api: [
    {
      name: "MotionProvider",
      description:
        "无界面组件。挂载时把 data-ui-input 设为 pointer；捕获到 keydown 改为 keyboard，pointerdown 或 pointermove 改回 pointer；卸载时还原。属性写在 <html> 上，因此也覆盖传送到 body 的浮层。",
      props: [{ name: "children", type: "ReactNode", description: "应用内容。" }],
    },
  ],
  notes: [
    "motion.css 读取这个属性：data-ui-input=\"keyboard\" 时，所有带 data-slot 的组件及 .qy-pressable 的过渡时长归零，带 data-motion 的入场动画停用——连续按方向键时，焦点与选中状态不必等动画。",
    "鼠标与触屏下，.qy-pressable 元素按下时缩放到 0.97（100ms），菜单与选择器浮层从触发点淡入展开。",
    "系统开启“减少动态效果”时，motion.css 只保留透明度与颜色的过渡，去掉位移、缩放与高度动画；这一层不依赖 MotionProvider。",
    "自定义组件想遵循同一策略：给可样式化的元素加 data-slot，或给可按压元素加 qy-pressable 类即可，不要自己监听输入方式。",
    "某次程序触发的变化不需要动画时，在元素上加 data-instant。",
  ],
  design: {
    "methods": [
      "随境取度",
      "进退相承"
    ],
    "whenToUse": [
      "统一让键盘操作即时完成，并让指针操作保留必要过渡。"
    ],
    "avoid": [
      "在多个子树各挂一个 document owner；动画结束触发保存；减少动态效果后状态不可辨。"
    ],
    "composition": [
      "根部一次挂载，document 属性覆盖 Portal；组件通过 data-slot/data-motion 使用公共 motion.css。"
    ],
    "stateOwner": {
      "library": [
        "最近输入方式、监听清理与原文档属性恢复。"
      ],
      "application": [
        "业务状态时机、根部装配和程序变化是否需要动画。"
      ]
    },
    "responsive": [
      "布局变化与动画可被打断；键盘与系统减少动态效果分别检验。"
    ],
    "customization": [
      "项目组合可使用 data-instant，但不再重复监听输入方式。"
    ]
  },
} satisfies ComponentMeta;
