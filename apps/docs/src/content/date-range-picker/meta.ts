import type { ComponentMeta } from "@/lib/types";

export default {
  title: "日期范围选择 DateRangePicker",
  description:
    "在一个弹层里选择开始与结束日期：第一次点击定起点，第二次点击定终点并立即生效。适合报表、订单筛选等按时间段查询的场景，可配合快捷范围。",
  category: "日期与时间",
  source: "local",
  exports: ["DateRangePicker"],
  keywords: ["date range", "range picker", "日期范围", "时间段", "起止日期", "筛选"],
  api: [
    {
      name: "DateRangePicker",
      description: "触发器与 DatePicker 相同；其余按钮属性（id、aria-*、onBlur……）作用于触发器。",
      props: [
        { name: "value / defaultValue", type: "{ from?: Date; to?: Date } | null", description: "受控 / 非受控的范围。" },
        { name: "onValueChange", type: "(value: DateRangeValue | null) => void", description: "选定完整范围或清除时回调；只选了起点不会触发。" },
        { name: "presets", type: "{ label: string; value: DateRangeValue | (() => DateRangeValue) }[]", description: "快捷范围，桌面端显示在日历左侧，窄屏显示在顶部。用函数时在点击那一刻计算，保证“今天”始终准确。" },
        { name: "startName / endName", type: "string", description: "以本地 YYYY-MM-DD 提交开始、结束日期的隐藏字段名。" },
        { name: "numberOfMonths", type: "number", default: "宽度 ≥ 768px 为 2，否则为 1", description: "并排显示的月份数。" },
        { name: "clearable", type: "boolean", default: "true", description: "选定后在触发器末端显示清除按钮；聚焦触发器时 Backspace 也可清除。" },
        { name: "disabledDates", type: "Matcher | Matcher[]", description: "不可选的日期，例如 { after: new Date() }。" },
        { name: "formatDate / formatRange", type: "(date) => string / ({ from, to }) => string", description: "自定义触发器中的日期文案。默认中文只写一次年份：2026年9月1日 – 9月30日。" },
        { name: "open / defaultOpen / onOpenChange", type: "boolean / (open) => void", description: "受控 / 非受控的弹层开关。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "触发器尺寸，与 Select 一致。" },
        { name: "calendarProps", type: "RangeCalendarProps", description: "范围模式的日历属性，如 startMonth、endMonth、min、max、excludeDisabled；min/max 按两端间的自然日跨度约束。日历选择与快捷范围遵守相同限制。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "在触发器上打开弹层；在日期上选择起点或终点。" },
    { keys: "← → ↑ ↓", description: "按天、按周移动焦点；选择终点时会预览范围。" },
    { keys: "Page Up / Page Down", description: "切换到上一月 / 下一月。" },
    { keys: "Backspace / Delete", description: "聚焦触发器时清除已选范围。" },
    { keys: "Esc", description: "关闭弹层，放弃未完成的选择。" },
  ],
  notes: [
    "只选了起点就关闭弹层时，原有的范围保持不变，不会留下半个范围。",
    "隐藏字段输出本地日期，不受时区影响；服务端按自然日处理即可。",
    "快捷范围由业务方传入，组件不预设文案，便于按场景调整（例如“上个季度”）。",
  ],
  design: {
    "methods": [
      "名实相符",
      "进退相承"
    ],
    "whenToUse": [
      "明确起止日期的筛选或区间输入，只有完整范围才能提交。"
    ],
    "avoid": [
      "半选结束日就修改正式值；关闭后保留过期 anchor；快捷范围绕过禁用或跨度限制。"
    ],
    "composition": [
      "anchor 是库内临时选择，完整 range 是正式值；关闭放弃半选。日历与 preset 共用端点/min/max/excludeDisabled 规则。"
    ],
    "stateOwner": {
      "library": [
        "半选工作、预览、约束一致性、开关和清除。"
      ],
      "application": [
        "业务范围、快捷值、禁用事实、表单校验和查询请求。"
      ]
    },
    "responsive": [
      "窄屏单月与横向快捷项，宽屏按容量显示两月；长范围仍保留完整可访问值。"
    ],
    "customization": [
      "calendarProps 的 min/max 按自然日跨度，excludeDisabled 明确决定能否跨禁用日；导航月界限不代替 disabledDates。"
    ]
  },
} satisfies ComponentMeta;
