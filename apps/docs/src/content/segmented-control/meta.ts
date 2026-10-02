import type { ComponentMeta } from "@/lib/types";

export default {
  title: "分段控件 Segmented Control",
  description:
    "一组并排的互斥选项的外观。它只是一套样式，套在语义合适的原语上：表单取值用 RadioGroup，切换视图或筛选用 ToggleGroup，跳转地址用导航链接，切换面板用 Tabs。",
  design: {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "为并列短选项提供共享外观，同时保留其原本的值、模式或地址语义。"
    ],
    "avoid": [
      "外观相同不代表交互相同；不能给导航链接套上 tab 或 radio 的虚假状态。"
    ],
    "composition": [
      "表单值用 RadioGroup，保持模式用 ToggleGroup，地址用 a / Link，面板关系用 Tabs。"
    ],
    "stateOwner": {
      "library": [
        "提供轨道、选项尺寸和 checked / pressed / aria-current 的状态样式，不创建状态机。"
      ],
      "application": [
        "选择语义原语、定义选项与对象关系并决定选中值的真实效果。"
      ]
    },
    "responsive": [
      "选项超出容量时调整组合而不挤压文字与命中区；按所用原语验证方向键和触屏。"
    ],
    "customization": [
      "state 必须匹配原语实际输出属性；集中修改轨道和选中表面角色，不复制到消费页面。"
    ]
  },
  category: "通用",
  source: "coss",
  exports: ["segmentedControlRootClassName", "segmentedControlItemVariants"],
  keywords: ["segmented", "分段", "分段控件", "切换", "单选", "视图切换"],
  api: [
    {
      name: "segmentedControlRootClassName",
      description: "容器样式：底板、内边距与间距。放在 RadioGroup、ToggleGroup 或 <nav> 内的容器上。",
    },
    {
      name: "segmentedControlItemVariants",
      description: "选项样式（cva），传入尺寸与状态来源，返回类名。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "选项高度，移动端自动加高 4px。" },
        { name: "state", type: '"checked" | "pressed" | "current"', description: "选中样式读取哪个属性：Radio 用 checked，Toggle 用 pressed，链接用 current（aria-current）。" },
        { name: "className", type: "string", description: "追加的类名，例如 grow 让选项等分宽度。" },
      ],
    },
    {
      name: "segmentedControlItemLayoutClassName",
      description: "只含图标与间距的布局类，供自定义选项复用（Tabs 也在用）。",
    },
  ],
  keyboard: [
    { keys: "Tab", description: "焦点进入选中的选项（RadioGroup）或第一个选项（ToggleGroup）。" },
    { keys: "← / →", description: "RadioGroup 中移动并选中；ToggleGroup 中只移动焦点。" },
    { keys: "Space / Enter", description: "ToggleGroup 中切换获得焦点的选项。" },
  ],
  notes: [
    "先按交互选原语，再套样式：外观相同不是用 Tabs 或 ToggleGroup 的理由。",
    "选项通常 2–4 个、文字简短；更多选项改用 Select。",
    "给容器一个 aria-label，说明这组选项在选什么。",
    "仅图标的选项必须有 aria-label；粗指针下点击区域自动扩大到 44px。",
  ],
} satisfies ComponentMeta;
