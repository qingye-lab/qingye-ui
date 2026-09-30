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
  copy: string; copied: string; copyError: string;
  addFiles: string; dropFiles: string; chooseFiles: string; removeFile: (name: string) => string;
  fileError: (name: string, reason: "type" | "size" | "count") => string;
  table: string; noResults: string; searchTable: string; pageSummary: (page: number, pages: number, total: number) => string;
  steps: string; timeline: string; carousel: string; slide: string; previousSlide: string; nextSlide: string;
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
    copy: "复制", copied: "已复制", copyError: "复制失败，请手动复制",
    addFiles: "添加文件", dropFiles: "拖入文件，或选择本地文件", chooseFiles: "选择文件", removeFile: (name) => `移除 ${name}`,
    fileError: (name, reason) => `${name}：${reason === "type" ? "文件类型不支持" : reason === "size" ? "文件过大" : "超出文件数量限制"}`,
    table: "数据表格", noResults: "没有匹配的结果", searchTable: "搜索表格", pageSummary: (page, pages, total) => `第 ${page} / ${pages} 页，共 ${total} 条`,
    steps: "步骤", timeline: "时间线", carousel: "轮播", slide: "幻灯片", previousSlide: "上一张", nextSlide: "下一张",
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
