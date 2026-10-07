"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

export type UILocaleMessages = {
  buttonWaiting: string; buttonInProgress: string; buttonUnknown: string; buttonFailed: string; inputClear: string;
  close: string; loading: string; readOnly: string; breadcrumb: string; more: string;
  retryFile: (name: string) => string; dismissFileRejection: (name: string) => string; fileUploadInvalid: string;
  dataTableResultUnknown: string; dataTableResultStale: string;
  toastSuccess: string;
  toastResultUnknown: string; toastResultUnknownDescription: string;
  timelineStatus: (status: "primary" | "success" | "warning" | "error" | "info") => string;
  pagination: string; previousPage: string; nextPage: string; morePages: string;
  sidebar: string; sidebarDescription: string; toggleSidebar: string;
  showOptions: string; clearSelection: string; remove: string;
  decrease: string; increase: string; numberInput: string;
  otpLengthExceeded: (length: number) => string; tagEmpty: string; removeTag: (tag: string) => string;
  notifications: string; closeNotification: string;
  selectDate: string; clearDate: string; selectDateTime: (label: string) => string; time: string; done: string;
  showPassword: string; hidePassword: string; clearSearch: string;
  copy: string; copied: string; copyError: string; copyFailed: string; language: string;
  addFiles: string; dropFiles: string; chooseFiles: string; removeFile: (name: string) => string;
  fileError: (name: string, reason: "type" | "size" | "count") => string;
  selectDateTimePlaceholder: string; now: string; dropFilesActive: string; fileProgress: (name: string) => string; fileCount: (count: number) => string;
  table: string; chartData: string; sparklineSummary: (label: string, first: string, last: string, min: string, max: string) => string; sparklineEmpty: (label: string) => string; proportionRest: string; statDelta: (direction: "up" | "down" | "flat", amount: string, period: string) => string; statDeltaFlat: string; proportionShare: (value: string, percent: string) => string; noResults: string; searchTable: string; pageSummary: (page: number, pages: number, total: number) => string;
  scatterPointColumn: string; heatmapCell: (rowLabel: string, columnLabel: string, value: string) => string; heatmapUnavailable: (rowLabel: string, columnLabel: string, stateLabel: string) => string; heatmapScaleFrom: string; heatmapScaleTo: string;
  loadFailed: string; retry: string;
  steps: string; stepComplete: string; stepCurrent: string; stepUpcoming: string; stepError: string; timeline: string;
  // General actions
  clear: string; cancel: string; confirm: string; apply: string; reset: string; back: string; search: string; expand: string; collapse: string;
  // Theme
  theme: string; lightTheme: string; darkTheme: string; systemTheme: string;
  // Selection and input
  selectPlaceholder: string; searchPlaceholder: string; commandPlaceholder: string; addTag: string; tagInputHint: string; tagLimit: (max: number) => string; tagExists: (tag: string) => string;
  // Dates
  selectDateRange: string; startDate: string; endDate: string; today: string; previousMonth: string; nextMonth: string; month: string; year: string; selectedDate: string;
  // Tables
  rowsPerPage: string; selectedCount: (count: number) => string; sortAscending: string; sortDescending: string; toggleColumns: string; firstPage: string; lastPage: string; selectRow: string; selectAllRows: string;
  filterUnapplied: string; bulkVersion: string; treeEmpty: string;
  confirmContentChanged: string; confirmReviewLatest: string;
  // Data display
  trendUp: string; trendDown: string; trendFlat: string; resize: string; copyCode: string; showMore: string; showLess: string;
  statusLabel: (status: "online" | "offline" | "warning" | "error" | "info" | "neutral" | "pending" | "in-progress" | "unknown") => string; opensInNewTab: string;
  toc: string;
  unreadCount: (count: number) => string;
};

export type UILocale = { code: string; messages: UILocaleMessages };

export const zhCN: UILocale = {
  code: "zh-CN",
  messages: {
    buttonWaiting: "等待中", buttonInProgress: "进行中", buttonUnknown: "结果未知", buttonFailed: "操作失败", inputClear: "清空输入",
    close: "关闭", loading: "正在加载", readOnly: "只读", breadcrumb: "面包屑导航", more: "更多",
    retryFile: (name) => `重试 ${name}`, dismissFileRejection: (name) => `忽略 ${name} 的拒绝提示`, fileUploadInvalid: "文件选择或上传存在错误",
    dataTableResultUnknown: "当前查询结果尚未确认", dataTableResultStale: "已忽略此前查询的响应",
    toastSuccess: "成功",
    toastResultUnknown: "操作结果尚未确认", toastResultUnknownDescription: "请核对结果。",
    timelineStatus: (status) => ({ primary: "重点", success: "成功", warning: "警告", error: "失败", info: "提示" })[status],
    pagination: "分页", previousPage: "上一页", nextPage: "下一页", morePages: "更多页",
    sidebar: "工作区导航", sidebarDescription: "工作区主导航", toggleSidebar: "切换侧栏",
    showOptions: "展开选项", clearSelection: "清除选择", remove: "移除",
    decrease: "减少", increase: "增加", numberInput: "数值输入",
    otpLengthExceeded: (length) => `最多输入 ${length} 个字符；本次输入未添加`, tagEmpty: "请输入非空标签", removeTag: (tag) => `移除 ${tag}`,
    notifications: "操作提示", closeNotification: "关闭提示",
    selectDate: "选择日期", clearDate: "清除日期", selectDateTime: (label) => `选择${label}日期和时间`, time: "时间", done: "完成",
    showPassword: "显示密码", hidePassword: "隐藏密码", clearSearch: "清除搜索",
    copy: "复制", copied: "已复制", copyError: "复制失败，请手动复制", copyFailed: "复制失败", language: "语言",
    addFiles: "添加文件", dropFiles: "拖入文件，或选择本地文件", chooseFiles: "选择文件", removeFile: (name) => `移除 ${name}`,
    fileError: (name, reason) => `${name}：${reason === "type" ? "文件类型不支持" : reason === "size" ? "文件过大" : "超出文件数量限制"}`,
    selectDateTimePlaceholder: "选择日期和时间", now: "此刻", dropFilesActive: "松开即可添加", fileProgress: (name) => `${name} 上传进度`, fileCount: (count) => `${count} 个文件`,
    table: "数据表格", chartData: "查看数据", sparklineSummary: (label, first, last, min, max) => `${label}：从 ${first} 到 ${last}，最低 ${min}，最高 ${max}`, sparklineEmpty: label => `${label}：没有可用的数值`, proportionRest: "其余", statDelta: (direction, amount, period) => direction === "flat" ? `${period}持平` : `${period}${direction === "up" ? "增加" : "减少"} ${amount}`, statDeltaFlat: "持平", proportionShare: (value, percent) => `${value}（${percent}）`, noResults: "没有匹配的结果", searchTable: "搜索表格", pageSummary: (page, pages, total) => `第 ${page} / ${pages} 页，共 ${total} 条`,
    scatterPointColumn: "数据点", heatmapCell: (rowLabel, columnLabel, value) => `${rowLabel}${columnLabel}：${value}`, heatmapUnavailable: (rowLabel, columnLabel, stateLabel) => `${rowLabel}${columnLabel}：${stateLabel}`, heatmapScaleFrom: "最低", heatmapScaleTo: "最高",
    loadFailed: "数据加载失败", retry: "重试",
    steps: "步骤", stepComplete: "已完成", stepCurrent: "进行中", stepUpcoming: "未开始", stepError: "出错", timeline: "时间线",
    clear: "清除", cancel: "取消", confirm: "确认", apply: "应用", reset: "重置", back: "返回", search: "搜索", expand: "展开", collapse: "收起",
    theme: "主题", lightTheme: "浅色", darkTheme: "深色", systemTheme: "跟随系统",
    selectPlaceholder: "请选择", searchPlaceholder: "搜索…", commandPlaceholder: "输入命令或搜索…", addTag: "添加标签", tagInputHint: "按回车添加", tagLimit: (max) => `最多添加 ${max} 个标签`, tagExists: (tag) => `“${tag}”已添加`,
    selectDateRange: "选择日期范围", startDate: "开始日期", endDate: "结束日期", today: "今天", previousMonth: "上个月", nextMonth: "下个月", month: "月份", year: "年份", selectedDate: "已选择",
    rowsPerPage: "每页行数", selectedCount: (count) => `已选 ${count} 项`, sortAscending: "升序", sortDescending: "降序", toggleColumns: "显示列", firstPage: "第一页", lastPage: "最后一页", selectRow: "选择此行", selectAllRows: "选择全部行",
    filterUnapplied: "条件尚未应用", bulkVersion: "版本", treeEmpty: "没有条目",
    confirmContentChanged: "对象、版本或变更已改变，请重新阅读。", confirmReviewLatest: "重新阅读",
    trendUp: "上升", trendDown: "下降", trendFlat: "持平", resize: "调整大小", copyCode: "复制代码", showMore: "展开更多", showLess: "收起",
    statusLabel: (status) => ({ online: "在线", offline: "离线", warning: "警告", error: "异常", info: "提示", neutral: "未知", pending: "等待中", "in-progress": "进行中", unknown: "结果未知" })[status], opensInNewTab: "（在新标签页中打开）",
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
