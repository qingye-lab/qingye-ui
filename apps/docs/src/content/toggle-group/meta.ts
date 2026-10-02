import type { ComponentMeta } from "@/lib/types";

export default {
  title: "切换按钮组 ToggleGroup",
  description: "一组共享状态的 Toggle：单选用于视图或对齐方式，多选用于文字格式等可叠加的选项。",
  design: {
    "methods": [
      "名实相符",
      "相成相制",
      "随境取度"
    ],
    "whenToUse": [
      "选择单个视图或叠加多个格式，选项围绕同一设置对象。"
    ],
    "avoid": [
      "按钮组的按下状态不能代替标签面板关系；单选是否允许清空由真实任务决定。"
    ],
    "composition": [
      "多个 ToggleGroupItem 共用 value 和 variant；outline 可用 Separator 表达连续边界。"
    ],
    "stateOwner": {
      "library": [
        "维护单选或多选值、pressed 状态、方向键焦点与布局方向；焦点移动与执行选择分开。"
      ],
      "application": [
        "决定选项含义、必须保留的选择与实际格式或视图结果。"
      ]
    },
    "responsive": [
      "orientation=vertical 在 default 与 outline 都纵向排列；触屏下检查相邻命中区而非仅整组尺寸。"
    ],
    "customization": [
      "组级 size 与 variant 建立一致关系；不通过子项颜色覆盖假装一个业务结果。"
    ]
  },
  category: "通用",
  source: "coss",
  exports: ["ToggleGroup", "ToggleGroupItem", "ToggleGroupSeparator"],
  keywords: ["toggle group", "按钮组", "切换", "对齐", "视图切换"],
  api: [
    {
      name: "ToggleGroup",
      description: "基于 Base UI ToggleGroup。outline 时子项拼接成一组，共用圆角与边框。",
      props: [
        { name: "value / defaultValue", type: "string[]", description: "受控 / 非受控的选中值。" },
        { name: "onValueChange", type: "(value: string[], details) => void", description: "选中值变化时调用。" },
        { name: "multiple", type: "boolean", default: "false", description: "允许同时按下多项。" },
        { name: "variant", type: '"default" | "outline"', default: '"default"', description: "传递给所有子项。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "传递给所有子项。" },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "排列方向，同时决定方向键。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用整组。" },
      ],
    },
    {
      name: "ToggleGroupItem",
      description: "组内的一项，接受 Toggle 的全部属性。",
      props: [
        { name: "value", type: "string", description: "该项的值。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用单项。" },
      ],
    },
    {
      name: "ToggleGroupSeparator",
      description: "outline 组内的分隔线；纵向组传 orientation=\"horizontal\"。",
    },
  ],
  keyboard: [
    { keys: "Tab", description: "焦点进入组内当前项，再按离开整组。" },
    { keys: "← → / ↑ ↓", description: "在组内移动焦点（随 orientation）。" },
    { keys: "Home / End", description: "移到第一项 / 最后一项。" },
    { keys: "Enter / Space", description: "按下或抬起当前项。" },
  ],
  notes: [
    "仅图标的子项提供 aria-label；需要说明时可包一层 Tooltip。",
    "单选组至少保留一项选中时，在 onValueChange 中忽略空数组。",
  ],
} satisfies ComponentMeta;
