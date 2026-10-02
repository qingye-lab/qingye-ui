import type { ComponentMeta } from "@/lib/types";

export default {
  title: "日历 Calendar",
  description: "内联展示的月历，支持单选、范围和多选。需要放进表单字段时用 DatePicker。",
  category: "日期与时间",
  source: "coss",
  exports: ["Calendar"],
  keywords: ["calendar", "日历", "日期", "月历", "date"],
  api: [
    {
      name: "Calendar",
      description: "基于 DayPicker 10。月份、星期与无障碍标签跟随 UILocaleProvider，而不是浏览器语言。",
      props: [
        { name: "mode", type: '"single" | "range" | "multiple"', default: '"single"', description: "选择模式。" },
        { name: "selected", type: "Date | DateRange | Date[]", description: "受控的选中值，类型随 mode 变化。" },
        { name: "onSelect", type: "(value, triggerDate, modifiers, event) => void", description: "选择变化时调用。" },
        { name: "numberOfMonths", type: "number", default: "1", description: "并排显示的月份数；窄屏下纵向堆叠。" },
        { name: "captionLayout", type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"', default: '"label"', description: "标题区改为月份 / 年份下拉，配合 startMonth、endMonth 限定范围。" },
        { name: "disabled", type: "Matcher | Matcher[]", description: "不可选的日期，例如 { before: today } 或 { dayOfWeek: [0, 6] }。" },
        { name: "showOutsideDays", type: "boolean", default: "true", description: "显示相邻月份补位的日期。" },
        { name: "defaultMonth", type: "Date", description: "初始显示的月份。" },
        { name: "min / max", type: "number", description: "range / multiple 模式下的最少、最多天数。" },
        { name: "locale", type: "DayPicker Locale", description: "覆盖由 UI 语言推导的日期语言包。" },
      ],
    },
  ],
  keyboard: [
    { keys: "← → ↑ ↓", description: "按天 / 按周移动焦点。" },
    { keys: "Home / End", description: "移动到本周第一天 / 最后一天。" },
    { keys: "PageUp / PageDown", description: "切换到上个月 / 下个月；加 Shift 按年切换。" },
    { keys: "Enter / Space", description: "选中焦点所在日期。" },
  ],
  notes: [
    "日历只负责挑选；在表单中收集日期用 DatePicker，它会提交 YYYY-MM-DD。",
    "今天以日期下方的小圆点标出，不占用选中态的颜色。",
    "触屏设备上每个日期格放大到 44px。",
  ],
  design: {
    "methods": [
      "名实相符",
      "展开有据"
    ],
    "whenToUse": [
      "需要持续可见的自然日选择，或作为日期字段弹层内的选择工作面。"
    ],
    "avoid": [
      "将月份导航边界误当作可选日期约束；用今天的标记冒充选中；只靠颜色区分禁用日。"
    ],
    "composition": [
      "用 selected/onSelect 表达当前选择，用 disabled/min/max 表达限制；单字段提交复用 DatePicker。"
    ],
    "stateOwner": {
      "library": [
        "月历原语、日期焦点、语言、选中和禁用部位。"
      ],
      "application": [
        "日期限制、已选值、时区解释和业务提交。"
      ]
    },
    "responsive": [
      "多个月份在窄屏纵向排列；触屏格遵守命中目标，不能为了排下两月压缩日期格。"
    ],
    "customization": [
      "classNames/components 可修改部位，但保留日历按钮名称、键盘行为和真实状态。"
    ]
  },
} satisfies ComponentMeta;
