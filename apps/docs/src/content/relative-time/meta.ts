import type { ComponentMeta } from "@/lib/types";

export default {
  title: "相对时间 RelativeTime",
  titleEn: "RelativeTime",
  description: "把一个时刻说成「3 分钟前」，同时保留可核对的绝对时间；全部实例共用一个刷新计时器。",
  descriptionEn: "States a moment as \"3 minutes ago\" while keeping the exact time checkable; every instance shares one refresh timer.",
  category: "日期与时间", layer: "primitive", source: "local", exports: ["RelativeTime"],
  keywords: ["relative-time", "time ago", "timeago", "relative time", "相对时间", "几分钟前", "刚刚", "时间", "time"],
  decisions: "相对说法不精确到日历，需要核对的读者要看绝对时间：绝对时间在悬停提示和读屏文字里，不会只放在 title。传了 now 就不再刷新，不要在要随时间变化的界面里固定它。",
  decisionsEn: "A relative phrase is not calendar-exact, so a reader who must verify needs the absolute time: it is in the hover tooltip and the screen-reader text, never only in title. Passing now stops refreshing; do not pin it in a view that must follow the clock.",
  design: {
    methods: ["名实相符", "随境取度"],
    whenToUse: ["列表、表格与说明里“多久以前发生”比“几点几分”更有用的时刻。", "同一界面多处出现的相对时间，需要同一套文案与刷新节奏。"],
    avoid: ["需要精确核对的时刻（审计、截止日）单独写出绝对时间，不只靠相对说法。", "不要为它再套一个 Tooltip 或自己写计时器。"],
    composition: ["元素固定是 time，机器可读的 dateTime 由 value 给出；语言取自 UILocaleProvider。", "嵌在句子、表格单元格或描述列表里，字号字重跟随所在行。"],
    stateOwner: {
      library: ["相对文字、绝对时间、dateTime、共享计时器与档位。"],
      application: ["要说明的时刻 value；测试或静态渲染时的固定参照 now。"],
    },
    responsive: ["文字随所在行换行；悬停提示只给指针，触屏与键盘读者的绝对时间由读屏文字和页面语境承担。"],
    customization: ["className、ref、ARIA 与事件透传到 time；不提供 render，元素语义固定。"],
  },
  designEn: {
    whenToUse: ["Moments in lists, tables and prose where \"how long ago\" matters more than the clock time.", "Relative times that recur across a view and need one wording and one refresh cadence."],
    avoid: ["Write the absolute time separately where exact checking matters (audits, deadlines); do not rely on the relative phrase alone.", "Do not wrap it in another Tooltip or write your own timer."],
    composition: ["The element is always time; the machine-readable dateTime comes from value; the language comes from UILocaleProvider.", "Sits inside a sentence, table cell or description list and follows the row's size and weight."],
    stateOwner: {
      library: ["Relative text, absolute time, dateTime, the shared timer and its tiers."],
      application: ["The moment to describe (value); a fixed reference (now) for tests or static rendering."],
    },
    responsive: ["Text wraps with its row; the hover tooltip is for pointers, and touch or keyboard readers get the absolute time from the screen-reader text and page context."],
    customization: ["className, ref, ARIA and events pass through to time; there is no render because the element's semantics are fixed."],
  },
  notes: [
    "不足一分钟统一说“现在”，之后按分钟、小时、日、月、年向零截断；月按 30 日、年按 365 日近似（预设）。",
    "刷新按距离现在的远近分三档：一分钟内每 10 秒、一小时内每 30 秒、更久每 5 分钟（预设）。刷新只改文字，不设 aria-live，读屏不会因此播报。",
    "value 无法解析成时间（无效的 Date、不是时间的字符串、NaN）会抛出带说明的错误。",
  ],
  notesEn: [
    "Under one minute reads \"now\"; after that the phrase truncates toward zero by minute, hour, day, month and year. A month is approximated as 30 days and a year as 365 days (presets).",
    "Refreshing has three tiers by distance from now: every 10 seconds within a minute, every 30 seconds within an hour, every 5 minutes beyond (presets). Refreshing only changes the text and sets no aria-live, so nothing is announced.",
    "A value that cannot be parsed as a time (an invalid Date, a non-time string, NaN) throws a descriptive error.",
  ],
  api: [
    {
      name: "RelativeTime",
      description: "渲染 time：相对文字可见，绝对时间在悬停提示与仅读屏文字里。", descriptionEn: "Renders a time element: the relative text is visible; the absolute time is in the hover tooltip and the screen-reader-only text.",
      props: [
        { name: "value", type: "Date | string | number", description: "要说明的时刻：Date、ISO 8601 字符串或毫秒时间戳，必填。", descriptionEn: "Required moment to describe: a Date, an ISO 8601 string or a millisecond timestamp." },
        { name: "now", type: "Date | string | number", description: "固定的参照时刻。给出后不自动刷新，供测试与静态渲染。", descriptionEn: "A fixed reference moment. When given, nothing refreshes; for tests and static rendering." },
        { name: "ref / 原生属性", nameEn: "ref / native props", type: "React.ComponentProps<\"time\">", description: "id、ARIA、data 属性与事件透传到 time 元素；dateTime 与 children 由组件给出。", descriptionEn: "id, ARIA, data attributes and events pass through to the time element; dateTime and children are set by the component." },
      ],
    },
  ],
} satisfies ComponentMeta;
