import type { ComponentMeta } from "@/lib/types";

export default {
  title: "日历 Calendar", titleEn: "Calendar",
  description: "在当地日历中导航年月，选择单日、多个日期或日期范围。", descriptionEn: "Navigate a local calendar and select a day, multiple dates, or a range.",
  category: "日期与时间", source: "local", layer: "pattern",
  exports: ["Calendar", "CalendarPrimitive", "formatLocalDate", "parseLocalDate"],
  keywords: ["calendar", "日历", "日期", "range"],
  decisions: "日历的 Date 按当地年月日解释。范围是否允许同日、哪些日期不可选由调用方声明，库不添加业务时长规则。",
  decisionsEn: "Dates use local year, month, and day. The caller declares same-day rules and unavailable dates; the library adds no business duration rules.",
  api: [{ name: "Calendar", description: "复用安装版 DayPicker 的日期、年月、键盘与选择语义。", descriptionEn: "Uses the installed DayPicker date, month navigation, keyboard, and selection semantics.", props: [
    { name: "mode / selected / onSelect / required", type: "DayPickerProps discriminated union", description: "single、multiple、range 各按公开原语类型组合；选中值归调用方，required 限制原语取消选择。", descriptionEn: "Use the public single, multiple, or range union. The caller owns selection; required limits deselection." },
    { name: "month / defaultMonth / onMonthChange", type: "Date / Date / (month: Date) => void", description: "受控或非受控年月导航；未指定时采用 DayPicker 当前月份默认值。", descriptionEn: "Controlled or uncontrolled month navigation; the primitive defaults to the current month." },
    { name: "disabled / hidden / startMonth / endMonth", type: "DayPicker public props", description: "明确不可选日期、隐藏日期与导航范围。disabled 不替调用方纠正已有选中值。", descriptionEn: "Declare unavailable days, hidden days, and navigation bounds. disabled does not repair an existing selection." },
    { name: "min / max / excludeDisabled", type: "range mode: number / number / boolean", description: "范围长度与跨禁用日期的规则由调用方显式声明。默认允许同日完整范围。", descriptionEn: "The caller declares range length and disabled-day rules. Same-day complete ranges are allowed by default." },
    { name: "locale / labels / formatters", type: "DayPicker public props", description: "默认按 UILocale 的中文/英文提供日期语言与名称；其他日期语言可传 DayPicker locale。", descriptionEn: "Chinese/English date language and names follow UILocale. Supply a DayPicker locale for other date languages." },
    { name: "render / ref / className / style / classNames / components", type: "div composition / DayPicker public props", description: "根出口支持组合；classNames/components 显式覆写实际部位。替换 Root 时由调用方保留 ref 与语义。", descriptionEn: "Compose the root and override public parts. A custom Root must preserve refs and semantics." },
  ] }, { name: "formatLocalDate / parseLocalDate", description: "本地年月日与 YYYY-MM-DD 互转；无效日期拒绝，不经 UTC 移日。", descriptionEn: "Convert local date fields to and from YYYY-MM-DD. Reject invalid dates without UTC shifts." }, { name: "CalendarPrimitive", description: "安装版 @daypicker/react 命名空间。", descriptionEn: "The installed @daypicker/react namespace." }],
  keyboard: [
    { keys: "Arrow keys / Home / End", description: "由日期原语在真实日历网格中移动焦点。", descriptionEn: "The date primitive moves focus through the calendar grid." },
    { keys: "PageUp / PageDown", description: "按日期原语规则导航年月。", descriptionEn: "Navigate months using the primitive's calendar rules." },
    { keys: "Enter / Space", description: "选择聚焦日期，遵守 disabled 与当前选择模式。", descriptionEn: "Select the focused day within the declared mode and disabled rules." },
  ],
  notes: ["本组件不生成原生表单值；用 DatePicker 或在调用方序列化选中日期。", "一个月、caption label 与 nav after 是默认布局选择，可通过公共 props 改动。", "表面、颜色、圆角与尺寸角色沿用当前主题预设；选中与焦点信号来自真实状态。"],
  notesEn: ["Calendar does not create native form fields. Use DatePicker or serialize selection in the application.", "One month, label captions, and navigation after the caption are default layout choices exposed through public props.", "Surfaces, colors, corners, and size roles use the current theme presets; selection and focus reflect real state."],
  design: { methods: ["名实相符", "相成相制", "进退相承"], whenToUse: ["需要查看当地年月日并选择日期"], avoid: ["具有时区或时间点意义的值先在应用确定规则"], composition: ["Calendar 或 Field + DatePicker"], stateOwner: { library: ["日期网格、键盘、非受控导航"], application: ["选中日期、范围、年月约束与无效事实"] }, responsive: ["一套几何，跟随密度轴，紧凑不缩小文字；窄屏 +4px，粗指针实体单元命中"], customization: ["CalendarProps、classNames、components 与集中主题角色"] }, designEn: {"whenToUse":["View local calendar dates and select a date."],"avoid":["The application must establish rules for zoned values or instants first."],"composition":["Calendar or Field + DatePicker."],"stateOwner":{"library":["Date grid, keyboard behavior, and uncontrolled navigation."],"application":["Selected dates, ranges, month/year constraints, and invalid facts."]},"responsive":["One geometry following the density axis; compact tightens the container, never the text; narrow-screen +4px, and actual coarse-pointer cell targets."],"customization":["CalendarProps, classNames, components, and central theme roles."]},
} satisfies ComponentMeta;
