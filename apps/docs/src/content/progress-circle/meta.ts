import type { ComponentMeta } from "@/lib/types";

export default {
  title: "环形进度 ProgressCircle",
  description: "以圆环展示任务完成度或占用率，适合空间紧凑处（卡片角落、列表行）或需要在中心显示数值的场景。",
  category: "反馈",
  source: "local",
  exports: ["ProgressCircle"],
  keywords: ["progress", "circle", "ring", "radial", "进度", "环形", "圆环", "加载"],
  api: [
    {
      name: "ProgressCircle",
      description: "基于 Base UI Progress，输出 role=\"progressbar\" 与 aria-valuenow / valuemin / valuemax / valuetext。",
      props: [
        { name: "value", type: "number | null", description: "当前值；null 为不确定进度，显示旋转的圆弧。" },
        { name: "min / max", type: "number", default: "0 / 100", description: "取值范围。" },
        { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "16 / 24 / 40 / 64 / 96px；xs、sm 不显示中心文字。" },
        { name: "strokeWidth", type: "number", description: "环的粗细（px，按标称尺寸计），默认随尺寸增长但增长得更慢，大环依然轻盈。" },
        { name: "status", type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: "进度弧的颜色；轨道始终是半透明中性色。" },
        { name: "showValue", type: "boolean", default: "false", description: "在中心显示格式化后的百分比。" },
        { name: "children", type: "ReactNode", description: "自定义中心内容；内容超出百分比时配合 getAriaValueText，因为进度条内部文字不会被读出。" },
        { name: "format / locale / getAriaValueText", type: "Intl.NumberFormatOptions / string / function", description: "数值格式与读屏文本，见 Base UI Progress。不确定进度时读作「正在加载」。" },
      ],
    },
  ],
  notes: [
    "给每个进度环一个可访问名称：aria-label，或 aria-labelledby 指向旁边的标题。",
    "进度为 0 时不画进度弧（圆头线帽在 0 时会留下一个点）。",
    "不确定进度在减少动态效果时放慢旋转而不是停止，与 Spinner 一致，避免看起来像卡死。",
  ],
  design: {
    "methods": [
      "名实相符",
      "随境取度"
    ],
    "whenToUse": [
      "在紧凑位置表达任务进度，与任务名称和操作邻接。"
    ],
    "avoid": [
      "环颜色被当作成功结论；只读到无名的百分比；中心内容包含必要操作却放进 progressbar。"
    ],
    "composition": [
      "外围文本命名任务；value=null 表示未知。自定义中心内容通过 getAriaValueText 同步有意义的状态。"
    ],
    "stateOwner": {
      "library": [
        "环几何、不确定弧、progressbar 语义与中心表达。"
      ],
      "application": [
        "真实进度、任务范围、结果和取消/重试操作。"
      ]
    },
    "responsive": [
      "小环省略中心数字时，附近仍要能读取进度；大环不为装饰压缩工作面。"
    ],
    "customization": [
      "size/strokeWidth 按识别需要选择，status 只增强状态表达。"
    ]
  },
} satisfies ComponentMeta;
