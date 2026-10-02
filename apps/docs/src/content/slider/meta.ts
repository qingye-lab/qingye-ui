import type { ComponentMeta } from "@/lib/types";

export default {
  title: "滑块 Slider",
  description: "在连续或分级的数值范围内拖动取值，适合音量、阈值、价格区间这类近似值；需要精确输入时配合 NumberField。",
  category: "表单",
  source: "coss",
  exports: ["Slider", "SliderValue"],
  keywords: ["slider", "滑块", "范围", "range"],
  design: {
    "methods": [
      "布白有用",
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "调整连续或分级的近似数值，范围关系比逐字输入更重要。"
    ],
    "avoid": [
      "不能只靠滑块位置表达精确值；范围的两个滑块必须分别命名。"
    ],
    "composition": [
      "SliderValue 展示当前值；精确任务配 NumberField，共享同一受控值。"
    ],
    "stateOwner": {
      "library": [
        "范围、步长、方向键与拖动、按滑块命名和本地化数值。"
      ],
      "application": [
        "单位、业务范围、请求触发时机和保存结果。"
      ]
    },
    "responsive": [
      "轨道保留调整空间与粗指针命中区；竖向滑块由宿主提供实际高度。"
    ],
    "customization": [
      "getAriaLabel 区分上下界，getAriaValueText 表达单位；format 默认跟随 UI locale。"
    ]
  },
  api: [
    {
      name: "Slider",
      description: "Base UI Slider；根据值的数量自动渲染一个或两个滑块。",
      props: [
        { name: "value / defaultValue / onValueChange", type: "number | number[]", description: "受控 / 非受控的值；数组表示范围。" },
        { name: "onValueCommitted", type: "(value) => void", description: "拖动结束或键盘调整后调用，适合触发请求。" },
        { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "范围与步长。" },
        { name: "largeStep", type: "number", default: "10", description: "PageUp / PageDown 与 Shift + 方向键的步长。" },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "方向；竖向时需给父元素设定高度。" },
        { name: "format", type: "Intl.NumberFormatOptions", description: "SliderValue 与读屏使用的数字格式。" },
        { name: "getAriaLabel", type: "(index: number) => string", description: "每个滑块的无障碍名称；范围滑块必须区分「最低」「最高」。" },
        { name: "getAriaValueText", type: "(formatted, value, index) => string", description: "读屏时朗读的值，例如「¥1,200」。" },
        { name: "disabled / name", type: "boolean / string", description: "禁用与表单字段名。" },
      ],
    },
    { name: "SliderValue", description: "当前值的文字显示，放在 Slider 内部。" },
  ],
  keyboard: [
    { keys: "← → / ↑ ↓", description: "按 step 调整。" },
    { keys: "Shift + 方向键 / PageUp / PageDown", description: "按 largeStep 调整。" },
    { keys: "Home / End", description: "跳到最小 / 最大值。" },
  ],
  notes: [
    "点击区域在轨道上下各扩展 8px（触屏 20px），细轨道也容易点中。",
    "没有可见标签时提供 aria-label；有标签时把 FieldLabel 放进 Field。",
  ],
} satisfies ComponentMeta;
