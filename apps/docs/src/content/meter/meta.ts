import type { ComponentMeta } from "@/lib/types";

export default {
  title: "度量 Meter",
  description: "在已知范围内显示一个静态数值，如存储占用、配额使用率、CPU 负载。表示任务完成进度时用 Progress。",
  category: "数据展示",
  source: "coss",
  exports: ["Meter", "MeterLabel", "MeterValue", "MeterTrack", "MeterIndicator"],
  keywords: ["meter", "度量", "用量", "配额", "quota", "存储", "storage", "占用", "gauge", "使用率"],
  api: [
    {
      name: "Meter",
      description: "根元素（role=\"meter\"）。不传子元素时自动渲染轨道与指示条；需要标签或数值时自行组合各部件。",
      props: [
        { name: "value", type: "number", description: "当前数值，必填；超出范围时按 min / max 截断。" },
        { name: "min", type: "number", default: "0", description: "最小值。" },
        { name: "max", type: "number", default: "100", description: "最大值。" },
        { name: "format", type: "Intl.NumberFormatOptions", description: "MeterValue 与 aria-valuetext 的数字格式，如 { style: \"unit\", unit: \"gigabyte\" }；不传时显示范围内的百分比。" },
        { name: "locale", type: "Intl.LocalesArgument", description: "格式化数字使用的语言，默认取运行环境；货币等格式建议显式传 \"zh-CN\"。" },
        { name: "getAriaValueText", type: "(formattedValue: string, value: number) => string", description: "自定义读屏朗读的文本。" },
      ],
    },
    { name: "MeterLabel", description: "度量名称，自动与 Meter 关联为可访问名称。" },
    {
      name: "MeterValue",
      description: "显示当前数值，默认为按 format 格式化后的文本，使用等宽数字。",
      props: [
        { name: "children", type: "(formattedValue: string, value: number) => ReactNode", description: "自定义显示内容，例如 “12.4 GB / 16 GB”。" },
      ],
    },
    { name: "MeterTrack", description: "轨道，默认 8px 高；用 className 调整高度或圆角。" },
    { name: "MeterIndicator", description: "指示条，默认主色；用 className 换成状态色或分类色。" },
  ],
  notes: [
    "Meter 必须有可访问名称：用 MeterLabel，或在 Meter 上传 aria-label。",
    "按阈值换色时，同时用文字说明状态（如 “偏高”“接近上限”），颜色不是唯一信息。",
    "自定义 MeterValue 显示内容时，用 getAriaValueText 让读屏朗读同样的信息。",
    "Meter 表示静态度量；会随时间推进到 100% 的任务用 Progress。",
  ],
  design: {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "在已知上下界内读出容量、用量或负载的测量值。"
    ],
    "avoid": [
      "用 Meter 表示正在完成的任务；只靠条长和颜色说明接近上限；阈值解释与实际数值不一致。"
    ],
    "composition": [
      "Label 命名测量对象，Value 与单位共同说明事实；阈值信息配文字，自定义值同步 getAriaValueText。"
    ],
    "stateOwner": {
      "library": [
        "meter 原语、数值范围、标签和值的关系。"
      ],
      "application": [
        "测量源、单位、阈值、采样时间与缺测。"
      ]
    },
    "responsive": [
      "数值与标签可换行；条本身适应容器，保留必要文字。"
    ],
    "customization": [
      "min/max/format 定义量纲；主题只调整图形表达，状态规则由应用决定。"
    ]
  },
} satisfies ComponentMeta;
