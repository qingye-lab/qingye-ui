import type { ComponentMeta } from "@/lib/types";

export default {
  title: "数字输入框 NumberField",
  description: "输入与步进数值，支持范围、步长、格式化（货币、百分比、单位）与拖动调整，适合数量、价格、阈值。",
  category: "表单",
  source: "coss",
  exports: ["NumberField", "NumberFieldGroup", "NumberFieldDecrement", "NumberFieldInput", "NumberFieldIncrement", "NumberFieldScrubArea"],
  keywords: ["number", "数字", "数量", "步进", "stepper", "金额"],
  design: {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "精确输入数量、金额或阈值，步进按钮为重复调整提供入口。"
    ],
    "avoid": [
      "格式化文本不是提交值；拖动标签不能成为唯一的调整方法。"
    ],
    "composition": [
      "输入与增减按钮共享边界，焦点仍定位到实际部件；FieldLabel 或 root aria-label 命名输入。"
    ],
    "stateOwner": {
      "library": [
        "本地化解析、范围、步长、按键与尺寸角色。"
      ],
      "application": [
        "业务单位、允许范围、草稿和提交结果。"
      ]
    },
    "responsive": [
      "输入可收缩而增减动作保留；内部高度扣除外框边界，与同尺寸 Input 对齐。"
    ],
    "customization": [
      "size 消费已有 --qy-control-*；format 与 locale 负责显示和解析。"
    ]
  },
  api: [
    {
      name: "NumberField",
      description: "基于 Base UI NumberField。数字格式默认跟随 UILocaleProvider 的语言。",
      props: [
        { name: "value / defaultValue", type: "number | null", description: "受控 / 非受控的值。" },
        { name: "onValueChange", type: "(value: number | null, details) => void", description: "值变化时调用。" },
        { name: "min / max", type: "number", description: "取值范围，超出时步进按钮自动禁用。" },
        { name: "step / smallStep / largeStep", type: "number", default: "1 / 0.1 / 10", description: "普通、Alt、Shift 下的步长。" },
        { name: "format", type: "Intl.NumberFormatOptions", description: "显示格式，如货币、百分比、单位。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "尺寸。" },
        { name: "disabled / readOnly / required", type: "boolean", description: "状态。" },
      ],
    },
    { name: "NumberFieldGroup", description: "外框，包裹按钮与输入框，承载边框与焦点环。" },
    { name: "NumberFieldInput", description: "输入框，居中显示等宽数字。" },
    { name: "NumberFieldDecrement / NumberFieldIncrement", description: "步进按钮；可访问名称来自 locale（减少 / 增加）。" },
    {
      name: "NumberFieldScrubArea",
      description: "可拖动调整数值的标签区域。",
      props: [{ name: "label", type: "string", description: "标签文字（必填，同时作为输入框的标签）。" }],
    },
  ],
  keyboard: [
    { keys: "↑ / ↓", description: "按 step 增减。" },
    { keys: "Shift + ↑ / ↓", description: "按 largeStep 增减。" },
    { keys: "Alt + ↑ / ↓", description: "按 smallStep 增减。" },
    { keys: "Home / End", description: "跳到最小值 / 最大值（设置了 min / max 时）。" },
  ],
  notes: [
    "放在 Field 中并配 FieldLabel；单独使用时给 NumberField 传 aria-label。",
    "单位、货币优先用 format 处理，输入时会被正确解析；需要固定前后缀文字时放进 InputGroup。",
  ],
} satisfies ComponentMeta;
