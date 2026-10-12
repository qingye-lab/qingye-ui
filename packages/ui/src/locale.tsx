"use client";

import { DirectionProvider } from "@base-ui/react/direction-provider";
import { createContext, useContext, useMemo, type ReactNode } from "react";

export type UILocaleMessages = {
  buttonWaiting: string; buttonInProgress: string; buttonUnknown: string; buttonFailed: string; inputClear: string;
  close: string; loading: string; readOnly: string; breadcrumb: string; more: string;
  dismissFileRejection: (name: string) => string;
  toastSuccess: string;
  pagination: string; previousPage: string; nextPage: string; morePages: string;
  sidebar: string;
  showOptions: string; clearSelection: string; remove: string;
  decrease: string; increase: string; numberInput: string;
  otpLengthExceeded: (length: number) => string; tagEmpty: string; removeTag: (tag: string) => string;
  notifications: string; closeNotification: string;
  selectDate: string; clearDate: string; selectDateTime: string; time: string;
  showPassword: string; clearSearch: string;
  copy: string; copied: string; copyError: string; language: string;
  dropFiles: string; chooseFiles: string; removeFile: (name: string) => string;
  fileError: (name: string, reason: "type" | "size" | "count" | "directory") => string;
  fileRejectedWith: (name: string, message: string) => string;
  tagLimit: (max: number) => string; addTagWithLimit: (max: number) => string; tagDraftPending: (tag: string) => string;
  fileProgress: (name: string) => string;
  table: string; chartData: string; sparklineSummary: (label: string, first: string, last: string, min: string, max: string) => string; sparklineEmpty: (label: string) => string; sparklineBand: (label: string, from: string, to: string, position?: "above" | "below" | "within") => string; proportionRest: string; statDelta: (direction: "up" | "down" | "flat", amount: string, period: string) => string; statDeltaFlat: string; proportionShare: (value: string, percent: string) => string;
  scatterPointColumn: string; heatmapCell: (rowLabel: string, columnLabel: string, value: string) => string; heatmapUnavailable: (rowLabel: string, columnLabel: string, stateLabel: string) => string; heatmapScaleFrom: string; heatmapScaleTo: string; heatmapLevelled: (value: string, level: string) => string;
  chartEvent: string; chartReferences: string; chartBandPosition: (position: "above" | "below" | "within", amount: string, label: string) => string;
  chartTotal: string; chartTotalPartial: string; chartShareAxis: (valueLabel: string) => string;
  steps: string; stepComplete: string; stepCurrent: string; stepUpcoming: string; stepError: string; timeline: string;
  // General actions
  clear: string; cancel: string; confirm: string; apply: string; reset: string; back: string; search: string; expand: string; collapse: string;
  // Theme
  theme: string; lightTheme: string; darkTheme: string; systemTheme: string;
  // Selection and input
  selectPlaceholder: string; addTag: string; tagExists: (tag: string) => string;
  // Dates
  selectDateRange: string; today: string; previousMonth: string; nextMonth: string; month: string; year: string; selectedDate: string;
  startDate: string; endDate: string; dateRangePresets: string;
  // Tables
  selectedCount: (count: number) => string; sortAscending: string; sortDescending: string; selectRow: string;
  filterUnapplied: string; bulkVersion: string; treeEmpty: string;
  confirmContentChanged: string; confirmReviewLatest: string;
  // Data display
  resize: string; copyCode: string;
  statusLabel: (status: "online" | "offline" | "warning" | "error" | "info" | "neutral" | "pending" | "in-progress" | "unknown") => string;
  toc: string;
  unreadCount: (count: number) => string;
  resultCount: (count: number) => string;
};

export type UILocale = { code: string; messages: UILocaleMessages };

export const zhCN: UILocale = {
  code: "zh-CN",
  messages: {
    buttonWaiting: "等待中", buttonInProgress: "进行中", buttonUnknown: "结果未知", buttonFailed: "操作失败", inputClear: "清空输入",
    close: "关闭", loading: "正在加载", readOnly: "只读", breadcrumb: "面包屑导航", more: "更多",
    dismissFileRejection: (name) => `忽略 ${name} 的拒绝提示`,
    toastSuccess: "成功",
    pagination: "分页", previousPage: "上一页", nextPage: "下一页", morePages: "更多页",
    sidebar: "工作区导航",
    showOptions: "展开选项", clearSelection: "清除选择", remove: "移除",
    decrease: "减少", increase: "增加", numberInput: "数值输入",
    otpLengthExceeded: (length) => `最多输入 ${length} 个字符；本次输入未添加`, tagEmpty: "请输入非空标签", removeTag: (tag) => `移除 ${tag}`,
    notifications: "操作提示", closeNotification: "关闭提示",
    selectDate: "选择日期", clearDate: "清除日期", selectDateTime: "选择日期和时间", time: "时间",
    showPassword: "显示密码", clearSearch: "清除搜索",
    copy: "复制", copied: "已复制", copyError: "复制失败，请手动复制", language: "语言",
    dropFiles: "拖入文件，或选择本地文件", chooseFiles: "选择文件", removeFile: (name) => `移除 ${name}`,
    fileError: (name, reason) => `${name}：${reason === "type" ? "文件类型不支持" : reason === "size" ? "文件过大" : reason === "directory" ? "不支持文件夹" : "超出文件数量限制"}`,
    fileRejectedWith: (name, message) => `${name}：${message}`,
    tagLimit: max => `最多 ${max} 个标签`, addTagWithLimit: max => `添加标签（最多 ${max} 个）`, tagDraftPending: tag => `“${tag}”尚未添加，请先添加或清除再提交`,
    fileProgress: (name) => `${name} 上传进度`,
    table: "数据表格", chartData: "查看数据", sparklineSummary: (label, first, last, min, max) => `${label}：从 ${first} 到 ${last}，最低 ${min}，最高 ${max}`, sparklineEmpty: label => `${label}：没有可用的数值`, sparklineBand: (label, from, to, position) => `；${label}：${from} 至 ${to}${position ? `，当前${{ above: "高于目标", below: "低于目标", within: "在目标内" }[position]}` : ""}`, proportionRest: "其余", statDelta: (direction, amount, period) => direction === "flat" ? `${period}持平` : `${period}${direction === "up" ? "增加" : "减少"} ${amount}`, statDeltaFlat: "持平", proportionShare: (value, percent) => `${value}（${percent}）`,
    scatterPointColumn: "数据点", heatmapCell: (rowLabel, columnLabel, value) => `${rowLabel} ${columnLabel}：${value}`, heatmapUnavailable: (rowLabel, columnLabel, stateLabel) => `${rowLabel} ${columnLabel}：${stateLabel}`, heatmapScaleFrom: "最低", heatmapScaleTo: "最高", heatmapLevelled: (value, level) => `${value}，${level}`,
    chartEvent: "事件", chartReferences: "参照", chartBandPosition: (position, amount, label) => position === "within" ? `在${label}内` : `${position === "above" ? "高于" : "低于"}${label} ${amount}`,
    chartTotal: "合计", chartTotalPartial: "缺项，未合计", chartShareAxis: valueLabel => `${valueLabel}占比`,
    steps: "步骤", stepComplete: "已完成", stepCurrent: "进行中", stepUpcoming: "未开始", stepError: "出错", timeline: "时间线",
    clear: "清除", cancel: "取消", confirm: "确认", apply: "应用", reset: "重置", back: "返回", search: "搜索", expand: "展开", collapse: "收起",
    theme: "主题", lightTheme: "浅色", darkTheme: "深色", systemTheme: "跟随系统",
    selectPlaceholder: "请选择", addTag: "添加标签", tagExists: (tag) => `“${tag}”已添加`,
    selectDateRange: "选择日期范围", today: "今天", previousMonth: "上个月", nextMonth: "下个月", month: "月份", year: "年份", selectedDate: "已选择",
    startDate: "开始日期", endDate: "结束日期", dateRangePresets: "常用范围",
    selectedCount: (count) => `已选 ${count} 项`, sortAscending: "升序", sortDescending: "降序", selectRow: "选择此行",
    filterUnapplied: "条件尚未应用", bulkVersion: "版本", treeEmpty: "没有条目",
    confirmContentChanged: "对象、版本或变更已改变，请重新阅读。", confirmReviewLatest: "重新阅读",
    resize: "调整大小", copyCode: "复制代码",
    statusLabel: (status) => ({ online: "在线", offline: "离线", warning: "警告", error: "异常", info: "提示", neutral: "未知", pending: "等待中", "in-progress": "进行中", unknown: "结果未知" })[status],
    toc: "本页目录",
    unreadCount: (count) => `${count} 条未读`,
    resultCount: (count) => `找到 ${count} 项`,
  },
};

/** 书写方向。取值与 HTML `dir`、Base UI `DirectionProvider` 的 `direction` 一致。 */
export type UIDirection = "ltr" | "rtl";
/** `useUILocale()` 的返回值：区域加上解析后的书写方向。`zhCN` 之类的区域对象本身不带方向，方向由代码推出或由 Provider 给定。 */
export type ResolvedUILocale = UILocale & { dir: UIDirection };

// 回退表，只在运行环境没有 `Intl.Locale` 的文本方向时使用。出处：Unicode CLDR 中 layout 的
// characterOrder 为 right-to-left 的语言与文字（ICU 随 CLDR 分发）。表是**最小子集**——只收常见的，不求穷尽；
// 逐项已用 Node 24 / ICU 的 `new Intl.Locale(code).getTextInfo()` 核对，漏掉的语言在支持 Intl 的环境里仍由 Intl 判对。
// 先看文字子标签（ku-Latn 是 ltr，ku-Arab 是 rtl），没有文字子标签才看语言。
const RTL_SCRIPTS = new Set(["arab", "hebr", "thaa", "syrc", "nkoo", "adlm"]);
const RTL_LANGUAGES = new Set(["ar", "he", "iw", "fa", "prs", "ur", "ps", "sd", "ug", "yi", "dv", "ckb", "ks", "syr"]);

type TextInfoLocale = Intl.Locale & { getTextInfo?: () => { direction?: string }; textInfo?: { direction?: string } };

/**
 * 由区域代码推出书写方向。优先问平台（`Intl.Locale` 的 `getTextInfo()`，旧实现是 `textInfo` 属性），
 * 平台没有答案时退回上面的最小表；不认识的代码一律 `ltr`。
 */
export function getLocaleDirection(code: string): UIDirection {
  let locale: TextInfoLocale;
  try { locale = new Intl.Locale(code); } catch { return "ltr"; }
  try {
    const info = typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;
    if (info?.direction === "rtl" || info?.direction === "ltr") return info.direction;
  } catch { /* 回退到表 */ }
  const script = locale.script?.toLowerCase();
  if (script) return RTL_SCRIPTS.has(script) ? "rtl" : "ltr";
  return RTL_LANGUAGES.has(locale.language.toLowerCase()) ? "rtl" : "ltr";
}

const LocaleContext = createContext<ResolvedUILocale>({ ...zhCN, dir: "ltr" });
export type UILocaleProviderProps = {
  children: ReactNode; locale?: UILocale; messages?: Partial<UILocaleMessages>;
  /**
   * 书写方向。省略时由 `locale.code` 推出；只传 `dir` 不传 `locale` 时沿用外层的区域。
   * Provider 只把方向交给 Base UI 的 `DirectionProvider`（浮层、方向键、滑块按它判断）和 `useUIDirection()`，
   * **不渲染包裹元素，也不改写 `<html dir>`**——后者是应用的事，须与这里给的值一致。
   */
  dir?: UIDirection;
};

export function UILocaleProvider({ children, locale, messages, dir }: UILocaleProviderProps) {
  const parent = useContext(LocaleContext);
  const code = locale?.code ?? parent.code;
  const base = locale ?? parent;
  // 给了新的 locale 就按它的代码重新推方向；沿用外层 locale 时沿用外层的方向。
  const direction = dir ?? (locale ? getLocaleDirection(locale.code) : parent.dir);
  const value = useMemo<ResolvedUILocale>(() => ({ code, messages: messages ? { ...base.messages, ...messages } : base.messages, dir: direction }), [code, base, messages, direction]);
  return <LocaleContext.Provider value={value}><DirectionProvider direction={direction}>{children}</DirectionProvider></LocaleContext.Provider>;
}

export function useUILocale(): ResolvedUILocale { return useContext(LocaleContext); }
/** 当前书写方向（`"ltr"` 或 `"rtl"`）；与交给 Base UI `DirectionProvider` 的是同一个值。 */
export function useUIDirection(): UIDirection { return useContext(LocaleContext).dir; }
