import type { ComponentMeta } from "@/lib/types";

export default {
  title: "日期输入 DatePicker", titleEn: "DatePicker",
  description: "编辑一个当地日期，或展开日历选择。", descriptionEn: "Edit one local date or choose it from a calendar.",
  category: "日期与时间", source: "local", layer: "pattern", exports: ["DatePicker"], keywords: ["date", "日期", "input", "calendar"],
  decisions: "value 是调用方持有的当地 Date。输入和日历选择只请求变更；清除请求 undefined，Escape 关闭日历并保留已接受值。",
  decisionsEn: "The caller owns the local Date. Input and calendar selection request changes; clearing requests undefined. Escape closes the calendar and preserves accepted values.",
  api: [{ name: "DatePicker", description: "当前 Input、Button、Popover、Calendar 的单日期组合。", descriptionEn: "A single-date composition of Input, Button, Popover, and Calendar.", props: [
    { name: "value / onValueChange", type: "Date | undefined / (value, event) => void", description: "受控日期；调用方接受回调才改变事实，undefined 表示空。有效年份为 1–9999。", descriptionEn: "Controlled date; only an accepted callback changes the value. undefined means empty. Valid years are 1–9999." },
    { name: "name / form", type: "string", description: "真实 date input 参与原生 FormData；Field name 可提供共同命名。序列化为当地 YYYY-MM-DD。", descriptionEn: "The real date input submits local YYYY-MM-DD. Field can provide its name; form associates an external form." },
    { name: "disabled / readOnly", type: "boolean", default: "false", description: "阻止输入与附属选择/清除；Field 禁用同样约束动作。只读值提交，禁用值不提交。", descriptionEn: "Block input and auxiliary changes. Field disabled also blocks actions. Read-only values submit; disabled values do not." },
    { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "输入、按钮和日历使用同一 control/text 档。", descriptionEn: "Input, actions, and calendar share one control/text profile." },
    { name: "inputProps", type: "Input props except owned value/type/name/form/state", description: "ref/render/ARIA/events/min/max/step/required 属于真实 date input。onChange 的 preventDefault 或 preventBaseUIHandler 可取消请求。", descriptionEn: "ref, render, ARIA, events, min, max, step, and required reach the real date input. onChange can cancel a request." },
    { name: "calendarProps", type: "CalendarProps except mode/selected/onSelect/required", description: "控制日期禁用、导航边界、locale 等；mode 与确认值由组合持有。native min/max/step 与日历 disabled/范围需调用方同步。", descriptionEn: "Configure disabled dates, navigation bounds, and locale. The composition owns mode and selection. Synchronize native min/max/step with calendar rules in the caller." },
    { name: "render / ref / className / style / ARIA / events", type: "div composition props", description: "属于组合根；实际输入出口放在 inputProps。", descriptionEn: "Applied to the composition root. Use inputProps for the actual input outlet." },
  ] }],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "经过日期输入、日历展开与清除动作。", descriptionEn: "Move through the date input, calendar trigger, and clear action." }, { keys: "Calendar keys", description: "展开后由 Calendar 管理日期网格键盘。", descriptionEn: "Calendar owns date-grid keyboard interaction while open." }, { keys: "Escape", description: "关闭展开并返回触发入口。", descriptionEn: "Close the popup and return to its trigger." }],
  notes: ["日期输入的本地显示格式由浏览器决定，提交值固定 YYYY-MM-DD。", "日历选择完成后关闭；调用方拒绝变更时原日期仍保留。", "没有自动修正越界值或推断提交成功；用 FieldError 表达调用方已知错误。"],
  notesEn: ["The browser chooses the displayed date format; submission uses YYYY-MM-DD.", "Calendar selection closes the popup. Rejected controlled changes preserve the prior date.", "The component does not repair bounds or infer submission success. Express known errors with FieldError."],
  design: { methods: ["名实相符", "相成相制", "进退相承"], composition: ["Field + FieldLabel + DatePicker + FieldDescription / FieldError"], stateOwner: { library: ["展开、日历焦点"], application: ["日期、约束、错误、提交结果"] }, responsive: ["五档 control 与同名文字，内部边框焦点；粗指针使用库内触摸目标"], customization: ["inputProps、calendarProps、根 render/ref 和现有主题角色"] }, designEn: {"composition":["Field + FieldLabel + DatePicker + FieldDescription / FieldError"],"stateOwner":{"library":["Opening and calendar focus."],"application":["Dates, constraints, errors, and submission outcomes."]},"responsive":["Five matching control/text profiles with internal border focus; coarse pointers use the library's touch target."],"customization":["inputProps, calendarProps, root render/refs, and existing theme roles."]},
} satisfies ComponentMeta;
