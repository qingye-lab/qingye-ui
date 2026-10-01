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
        { name: "calendarProps", type: "CalendarProps", description: "透传给 Calendar，如 startMonth、endMonth、showWeekNumber。" },
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
} satisfies ComponentMeta;
