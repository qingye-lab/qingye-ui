"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

export type UILocaleMessages = {
  buttonWaiting: string; buttonInProgress: string; buttonUnknown: string; buttonFailed: string; inputClear: string;
  close: string; loading: string; readOnly: string; breadcrumb: string; more: string;
  dismissFileRejection: (name: string) => string;
  toastSuccess: string;
  toastResultUnknown: string; toastResultUnknownDescription: string;
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
  fileError: (name: string, reason: "type" | "size" | "count") => string;
  fileProgress: (name: string) => string;
  table: string; chartData: string; sparklineSummary: (label: string, first: string, last: string, min: string, max: string) => string; sparklineEmpty: (label: string) => string; proportionRest: string; statDelta: (direction: "up" | "down" | "flat", amount: string, period: string) => string; statDeltaFlat: string; proportionShare: (value: string, percent: string) => string;
  scatterPointColumn: string; heatmapCell: (rowLabel: string, columnLabel: string, value: string) => string; heatmapUnavailable: (rowLabel: string, columnLabel: string, stateLabel: string) => string; heatmapScaleFrom: string; heatmapScaleTo: string;
  steps: string; stepComplete: string; stepCurrent: string; stepUpcoming: string; stepError: string; timeline: string;
  // General actions
  clear: string; cancel: string; confirm: string; apply: string; reset: string; back: string; search: string; expand: string; collapse: string;
  // Theme
  theme: string; lightTheme: string; darkTheme: string; systemTheme: string;
  // Selection and input
  selectPlaceholder: string; addTag: string; tagExists: (tag: string) => string;
  // Dates
  selectDateRange: string; today: string; previousMonth: string; nextMonth: string; month: string; year: string; selectedDate: string;
  // Tables
  selectedCount: (count: number) => string; sortAscending: string; sortDescending: string; selectRow: string;
  filterUnapplied: string; bulkVersion: string; treeEmpty: string;
  confirmContentChanged: string; confirmReviewLatest: string;
  // Data display
  resize: string; copyCode: string;
  statusLabel: (status: "online" | "offline" | "warning" | "error" | "info" | "neutral" | "pending" | "in-progress" | "unknown") => string;
  toc: string;
  unreadCount: (count: number) => string;
};

export type UILocale = { code: string; messages: UILocaleMessages };

export const zhCN: UILocale = {
  code: "zh-CN",
  messages: {
    buttonWaiting: "等待中", buttonInProgress: "进行中", buttonUnknown: "结果未知", buttonFailed: "操作失败", inputClear: "清空输入",
    close: "关闭", loading: "正在加载", readOnly: "只读", breadcrumb: "面包屑导航", more: "更多",
    dismissFileRejection: (name) => `忽略 ${name} 的拒绝提示`,
    toastSuccess: "成功",
    toastResultUnknown: "操作结果尚未确认", toastResultUnknownDescription: "请核对结果。",
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
    fileError: (name, reason) => `${name}：${reason === "type" ? "文件类型不支持" : reason === "size" ? "文件过大" : "超出文件数量限制"}`,
    fileProgress: (name) => `${name} 上传进度`,
    table: "数据表格", chartData: "查看数据", sparklineSummary: (label, first, last, min, max) => `${label}：从 ${first} 到 ${last}，最低 ${min}，最高 ${max}`, sparklineEmpty: label => `${label}：没有可用的数值`, proportionRest: "其余", statDelta: (direction, amount, period) => direction === "flat" ? `${period}持平` : `${period}${direction === "up" ? "增加" : "减少"} ${amount}`, statDeltaFlat: "持平", proportionShare: (value, percent) => `${value}（${percent}）`,
    scatterPointColumn: "数据点", heatmapCell: (rowLabel, columnLabel, value) => `${rowLabel}${columnLabel}：${value}`, heatmapUnavailable: (rowLabel, columnLabel, stateLabel) => `${rowLabel}${columnLabel}：${stateLabel}`, heatmapScaleFrom: "最低", heatmapScaleTo: "最高",
    steps: "步骤", stepComplete: "已完成", stepCurrent: "进行中", stepUpcoming: "未开始", stepError: "出错", timeline: "时间线",
    clear: "清除", cancel: "取消", confirm: "确认", apply: "应用", reset: "重置", back: "返回", search: "搜索", expand: "展开", collapse: "收起",
    theme: "主题", lightTheme: "浅色", darkTheme: "深色", systemTheme: "跟随系统",
    selectPlaceholder: "请选择", addTag: "添加标签", tagExists: (tag) => `“${tag}”已添加`,
    selectDateRange: "选择日期范围", today: "今天", previousMonth: "上个月", nextMonth: "下个月", month: "月份", year: "年份", selectedDate: "已选择",
    selectedCount: (count) => `已选 ${count} 项`, sortAscending: "升序", sortDescending: "降序", selectRow: "选择此行",
    filterUnapplied: "条件尚未应用", bulkVersion: "版本", treeEmpty: "没有条目",
    confirmContentChanged: "对象、版本或变更已改变，请重新阅读。", confirmReviewLatest: "重新阅读",
    resize: "调整大小", copyCode: "复制代码",
    statusLabel: (status) => ({ online: "在线", offline: "离线", warning: "警告", error: "异常", info: "提示", neutral: "未知", pending: "等待中", "in-progress": "进行中", unknown: "结果未知" })[status],
    toc: "本页目录",
    unreadCount: (count) => `${count} 条未读`,
  },
};

const LocaleContext = createContext<UILocale>(zhCN);
export type UILocaleProviderProps = { children: ReactNode; locale?: UILocale; messages?: Partial<UILocaleMessages> };

export function UILocaleProvider({ children, locale, messages }: UILocaleProviderProps) {
  const parent = useContext(LocaleContext);
  const base = locale ?? parent;
  const value = useMemo(() => messages ? { ...base, messages: { ...base.messages, ...messages } } : base, [base, messages]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useUILocale(): UILocale { return useContext(LocaleContext); }
