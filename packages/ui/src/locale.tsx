"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

export type UILocaleMessages = {
  close: string; loading: string; breadcrumb: string; more: string;
  pagination: string; previousPage: string; nextPage: string; morePages: string;
  sidebar: string; sidebarDescription: string; toggleSidebar: string;
  showOptions: string; clearSelection: string; remove: string;
  decrease: string; increase: string; numberInput: string;
  notifications: string; closeNotification: string;
  selectDate: string; clearDate: string; selectDateTime: (label: string) => string; time: string; done: string;
  showPassword: string; hidePassword: string; clearSearch: string;
  copy: string; copied: string; copyError: string; copyFailed: string;
  addFiles: string; dropFiles: string; chooseFiles: string; removeFile: (name: string) => string;
  fileError: (name: string, reason: "type" | "size" | "count") => string;
  selectDateTimePlaceholder: string; now: string; dropFilesActive: string; fileProgress: (name: string) => string; fileCount: (count: number) => string;
  table: string; noResults: string; searchTable: string; pageSummary: (page: number, pages: number, total: number) => string;
  steps: string; stepComplete: string; stepCurrent: string; stepUpcoming: string; stepError: string; timeline: string; carousel: string; slide: string; slideOf: (index: number, total: number) => string; previousSlide: string; nextSlide: string;
  // General actions
  clear: string; cancel: string; confirm: string; apply: string; reset: string; back: string; search: string; expand: string; collapse: string;
  // Theme
  theme: string; lightTheme: string; darkTheme: string; systemTheme: string;
  // Selection and input
  selectPlaceholder: string; searchPlaceholder: string; commandPlaceholder: string; addTag: string; tagInputHint: string; tagLimit: (max: number) => string; tagExists: (tag: string) => string;
  // Dates
  selectDateRange: string; startDate: string; endDate: string; today: string;
  // Tables
  rowsPerPage: string; selectedCount: (count: number) => string; sortAscending: string; sortDescending: string; toggleColumns: string; firstPage: string; lastPage: string; selectRow: string; selectAllRows: string;
  // Data display
  trendUp: string; trendDown: string; trendFlat: string; resize: string; copyCode: string; showMore: string; showLess: string;
  statusLabel: (status: "online" | "offline" | "warning" | "error" | "info" | "neutral") => string; opensInNewTab: string;
};

export type UILocale = { code: "zh-CN" | "en-US"; messages: UILocaleMessages };

export const zhCN: UILocale = {
  code: "zh-CN",
  messages: {
    close: "关闭", loading: "正在加载", breadcrumb: "面包屑导航", more: "更多",
    pagination: "分页", previousPage: "上一页", nextPage: "下一页", morePages: "更多页",
    sidebar: "工作区导航", sidebarDescription: "工作区主导航", toggleSidebar: "切换侧栏",
    showOptions: "展开选项", clearSelection: "清除选择", remove: "移除",
    decrease: "减少", increase: "增加", numberInput: "数值输入",
    notifications: "操作提示", closeNotification: "关闭提示",
    selectDate: "选择日期", clearDate: "清除日期", selectDateTime: (label) => `选择${label}日期和时间`, time: "时间", done: "完成",
    showPassword: "显示密码", hidePassword: "隐藏密码", clearSearch: "清除搜索",
    copy: "复制", copied: "已复制", copyError: "复制失败，请手动复制", copyFailed: "复制失败",
    addFiles: "添加文件", dropFiles: "拖入文件，或选择本地文件", chooseFiles: "选择文件", removeFile: (name) => `移除 ${name}`,
    fileError: (name, reason) => `${name}：${reason === "type" ? "文件类型不支持" : reason === "size" ? "文件过大" : "超出文件数量限制"}`,
    selectDateTimePlaceholder: "选择日期和时间", now: "此刻", dropFilesActive: "松开即可添加", fileProgress: (name) => `${name} 上传进度`, fileCount: (count) => `${count} 个文件`,
    table: "数据表格", noResults: "没有匹配的结果", searchTable: "搜索表格", pageSummary: (page, pages, total) => `第 ${page} / ${pages} 页，共 ${total} 条`,
    steps: "步骤", stepComplete: "已完成", stepCurrent: "进行中", stepUpcoming: "未开始", stepError: "出错", timeline: "时间线", carousel: "轮播", slide: "幻灯片", slideOf: (index, total) => `第 ${index} 张，共 ${total} 张`, previousSlide: "上一张", nextSlide: "下一张",
    clear: "清除", cancel: "取消", confirm: "确认", apply: "应用", reset: "重置", back: "返回", search: "搜索", expand: "展开", collapse: "收起",
    theme: "主题", lightTheme: "浅色", darkTheme: "深色", systemTheme: "跟随系统",
    selectPlaceholder: "请选择", searchPlaceholder: "搜索…", commandPlaceholder: "输入命令或搜索…", addTag: "添加标签", tagInputHint: "按回车添加", tagLimit: (max) => `最多添加 ${max} 个标签`, tagExists: (tag) => `“${tag}”已添加`,
    selectDateRange: "选择日期范围", startDate: "开始日期", endDate: "结束日期", today: "今天",
    rowsPerPage: "每页行数", selectedCount: (count) => `已选 ${count} 项`, sortAscending: "升序", sortDescending: "降序", toggleColumns: "显示列", firstPage: "第一页", lastPage: "最后一页", selectRow: "选择此行", selectAllRows: "选择全部行",
    trendUp: "上升", trendDown: "下降", trendFlat: "持平", resize: "调整大小", copyCode: "复制代码", showMore: "展开更多", showLess: "收起",
    statusLabel: (status) => ({ online: "在线", offline: "离线", warning: "警告", error: "异常", info: "提示", neutral: "未知" })[status], opensInNewTab: "（在新标签页中打开）",
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
