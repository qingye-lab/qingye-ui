import type { ComponentMeta } from "@/lib/types";

export default {
  title: "动效策略 MotionProvider",
  titleEn: "MotionProvider",
  description: "在应用根部记录输入方式，键盘操作跳过过渡。",
  descriptionEn: "Record input modality at the application root and skip transitions for keyboard input.",
  category: "工具",
  layer: "foundation",
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
    "只在应用根部挂载一次；示例复用本站根部的 MotionProvider。",
    "motion.css 读取 data-ui-input；键盘下过渡时长归零，指针下保留过渡。",
    "系统减少动态效果由 motion.css 处理，独立于输入方式。",
    "data-instant 让当前元素跳过过渡；自定义部位使用 data-slot 或 qy-pressable 接入公共策略。",
  ],
  notesEn: [
    "Mount once at the application root. These demos reuse the site's root MotionProvider.",
    "motion.css reads data-ui-input, skipping transitions for keyboard input and retaining them for pointer input.",
    "motion.css handles the system reduced-motion preference independently of input modality.",
    "data-instant skips an element's transition. Custom parts use data-slot or qy-pressable for the shared policy.",
  ],
  decisions: "键盘与减少动态效果会跳过部分过渡。状态直接更新，不依赖动画结束。",
  decisionsEn: "Keyboard and reduced-motion policies skip some transitions. Update state directly, independently of animation completion.",
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
