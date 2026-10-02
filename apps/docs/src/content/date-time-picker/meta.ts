import type { ComponentMeta } from "@/lib/types";

export default {
  title: "日期时间选择器 DateTimePicker",
  description: "同时选择日期与时刻，例如预约、发布时间。触发器与 DatePicker 一致，弹层底部输入时间。",
  category: "日期与时间",
  source: "local",
  exports: ["DateTimePicker", "formatLocalDateTime", "parseLocalDateTime"],
  keywords: ["datetime", "date time picker", "日期时间", "时间选择", "预约时间"],
  api: [
    {
      name: "DateTimePicker",
      description: "值是本地时间字符串 YYYY-MM-DDTHH:mm（step 小于 60 时带秒），与 <input type=\"datetime-local\"> 相同。其余属性透传到触发器按钮。",
      props: [
        { name: "value / defaultValue", type: "string", default: '""', description: "受控 / 非受控的值；空字符串表示未选择。" },
        { name: "onValueChange", type: "(value: string) => void", description: "选日期、改时间、点「此刻」或清除时调用。" },
        { name: "open / defaultOpen / onOpenChange", type: "boolean / (open) => void", description: "受控 / 非受控的弹出状态。" },
        { name: "label", type: "string", description: "字段名，用于弹层的无障碍名称，如「开始」→「选择开始日期和时间」。" },
        { name: "name", type: "string", description: "提交字段名；值无效时提交空字符串。" },
        { name: "step", type: "number", default: "60", description: "时间粒度（秒）；小于 60 时显示并提交秒。" },
        { name: "defaultTime", type: "string", default: '"00:00"', description: "先选日期时使用的时间。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "与 Select、Input 同一套尺寸。" },
        { name: "clearable", type: "boolean", default: "true", description: "有值时在末端显示清除按钮。" },
        { name: "disabledDates", type: "Matcher | Matcher[]", description: "不可选的日期。" },
        { name: "formatValue", type: "(date: Date) => string", description: "触发器上的显示格式。" },
        { name: "disabled / readOnly / required / aria-invalid", type: "boolean", description: "禁用、只读（不打开弹层）、必填与错误状态。" },
      ],
    },
    { name: "formatLocalDateTime", description: "Date → 本地 YYYY-MM-DDTHH:mm:ss.sss。截取前 16 位即为分钟精度。" },
    { name: "parseLocalDateTime", description: "本地日期时间字符串 → Date；格式或日期无效时返回 undefined。" },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "打开弹层，焦点落在已选日期或今天。" },
    { keys: "方向键 / PageUp / PageDown", description: "在日历中移动；Enter 选中日期，弹层保持打开。" },
    { keys: "Tab", description: "从日历移到时间输入、「此刻」与「完成」。" },
    { keys: "↑ / ↓", description: "在时间输入中调整时、分。" },
    { keys: "Esc", description: "关闭弹层，焦点回到触发器。" },
  ],
  notes: [
    "值不含时区；需要时间点（UTC）时在提交前自行换算。",
    "选择日期不会关闭弹层，方便接着调整时间；点「完成」或按 Esc 关闭。",
  ],
  design: {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "在同一字段选择一个本地日期与时间，便于连续调整。"
    ],
    "avoid": [
      "选择日期就宣称预约成功；此刻或改时间绕过禁用日；Esc 被叫作撤销已生效的值。"
    ],
    "composition": [
      "日历保留时刻，时间输入保留日期；此刻与时间编辑遵守 disabledDates；完成和 Esc 只是关闭，选择按当前 API 即时通知应用。"
    ],
    "stateOwner": {
      "library": [
        "日期/时间组合、输入限制、开关、只读、清除与本地解析。"
      ],
      "application": [
        "时区换算、预约可用性、真实提交、后端校验与失败恢复。"
      ]
    },
    "responsive": [
      "窄屏核对日历和时间/此刻/完成同排容量，命中区不因 footer 紧凑缩小。"
    ],
    "customization": [
      "step/defaultTime/formatValue 调整时间表达；需要确认才提交时应用另存草稿，不假定库已有事务。"
    ]
  },
} satisfies ComponentMeta;
