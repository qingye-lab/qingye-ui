import type { ComponentMeta } from "@/lib/types";

export default {
  title: "日期选择器 DatePicker",
  description: "表单中的单个日期字段：外观与 Select 一致，点开后在日历中挑选，表单提交本地日期 YYYY-MM-DD。",
  category: "日期与时间",
  source: "local",
  exports: ["DatePicker", "DatePickerTrigger", "DatePickerClear", "formatLocalDate", "parseLocalDate"],
  keywords: ["date picker", "日期选择", "日期", "选择日期", "datepicker"],
  api: [
    {
      name: "DatePicker",
      description: "触发器 + 弹出日历 + 隐藏表单值。id、aria-*、onBlur 等其余属性透传到触发器按钮。",
      props: [
        { name: "value / defaultValue", type: "Date | null", default: "null", description: "受控 / 非受控的日期。" },
        { name: "onValueChange", type: "(value: Date | null) => void", description: "选中或清除时调用。" },
        { name: "open / defaultOpen / onOpenChange", type: "boolean / (open) => void", description: "受控 / 非受控的弹出状态。" },
        { name: "name", type: "string", description: "提交字段名；值为本地日期 YYYY-MM-DD，未选时为空字符串。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "与 Select、Input 同一套尺寸。" },
        { name: "placeholder", type: "string", default: "选择日期", description: "未选择时的占位文字。" },
        { name: "clearable", type: "boolean", default: "true", description: "选中后在末端显示清除按钮，也可在触发器上按 Backspace / Delete 清除。" },
        { name: "clearLabel", type: "string", default: "清除日期", description: "清除按钮的无障碍名称。" },
        { name: "disabledDates", type: "Matcher | Matcher[]", description: "不可选的日期，例如 { before: new Date() }。" },
        { name: "formatDate", type: "(date: Date) => string", description: "触发器上的显示格式；默认按 UI 语言输出中等长度日期。" },
        { name: "calendarProps", type: "CalendarProps", description: "透传给 Calendar，例如 captionLayout、startMonth、endMonth。" },
        { name: "aria-invalid", type: "boolean", description: "显示错误边框；配合 FieldError 说明原因。" },
        { name: "disabled / required", type: "boolean", description: "禁用；required 以 aria-required 暴露。" },
      ],
    },
    {
      name: "DatePickerTrigger",
      description: "外观同 SelectTrigger 的按钮，末端是日历图标。用 PopoverTrigger 的 render 组合出范围、时间等其他日期控件。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "尺寸。" },
        { name: "placeholder", type: "ReactNode", description: "children 为空时显示，使用占位色。" },
        { name: "icon", type: "ReactNode | null", description: "替换末端图标；null 表示不显示。" },
      ],
    },
    { name: "DatePickerClear", description: "叠放在触发器末端的清除按钮，需自行提供 aria-label。" },
    { name: "datePickerTriggerVariants", description: "触发器的 cva 样式，供自建日期控件复用。" },
    { name: "formatLocalDate / parseLocalDate", description: "Date 与本地 YYYY-MM-DD 字符串互转，不受时区影响；无效输入返回 undefined。" },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "打开日历，焦点落在已选日期或今天。" },
    { keys: "方向键 / PageUp / PageDown", description: "在日历中按天、按周、按月移动。" },
    { keys: "Enter", description: "选中日期并关闭，焦点回到触发器。" },
    { keys: "Esc", description: "关闭日历，不改变值。" },
    { keys: "Backspace / Delete", description: "焦点在触发器上时清除已选日期（clearable 时）。" },
  ],
  notes: [
    "表单值始终是本地日期 YYYY-MM-DD，不含时区，服务端按日期而非时间点处理。",
    "与可见标签关联时，给 DatePicker 传 id 并让 Label 的 htmlFor 指向它；已选日期会作为描述读出。",
    "需要选择时间时用 DateTimePicker；需要起止日期时用 DateRangePicker。",
  ],
  design: {
    "methods": [
      "名实相符",
      "进退相承"
    ],
    "whenToUse": [
      "表单中选择一个自然日，显示与提交同一日期事实。"
    ],
    "avoid": [
      "用 UTC 截断改变自然日；把 required 的隐藏字段当原生表单校验；名称遮住已选值。"
    ],
    "composition": [
      "标签关联 trigger，选中值加入可访问描述；Calendar 选择后关闭，Clear 让值为空并返回字段。"
    ],
    "stateOwner": {
      "library": [
        "日选择、值格式、开关、清除和焦点返回。"
      ],
      "application": [
        "可选日期、必填校验、字段名称、提交和错误恢复。"
      ]
    },
    "responsive": [
      "字段值可视觉截断但保留完整可访问内容；弹层需要容纳单月与触屏格。"
    ],
    "customization": [
      "formatDate 只改显示，name 的 YYYY-MM-DD 保持自然日提交；尺寸与其他表单控件一致。"
    ]
  },
} satisfies ComponentMeta;
