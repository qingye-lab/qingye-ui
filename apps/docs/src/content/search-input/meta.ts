import type { ComponentMeta } from "@/lib/types";

export default {
  title: "搜索框 SearchInput",
  description: "带搜索图标、清除按钮与快捷键提示的搜索输入框，用于列表筛选、全局搜索。",
  category: "表单",
  source: "local",
  exports: ["SearchInput"],
  keywords: ["search", "搜索", "筛选", "清除", "⌘K"],
  api: [
    {
      name: "SearchInput",
      description: "基于 InputGroup，渲染 <input type=\"search\">。className 作用于外框，其余属性透传给 <input>。",
      props: [
        { name: "value / defaultValue", type: "string", description: "受控 / 非受控的搜索词。" },
        { name: "onValueChange", type: "(value: string) => void", description: "输入或清除时调用。" },
        { name: "onClear", type: "() => void", description: "通过清除按钮或 Esc 清空后调用。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "输入框尺寸，清除按钮随之调整。" },
        { name: "shortcut", type: "ReactNode", description: "为空时显示在末端的提示，例如 <Kbd>⌘K</Kbd>；有内容时让位给清除按钮。" },
        { name: "loading", type: "boolean", default: "false", description: "用 Spinner 替换搜索图标。" },
        { name: "clearLabel", type: "string", default: "locale: clearSearch", description: "清除按钮的可访问名称。" },
        { name: "placeholder", type: "string", default: "locale: searchPlaceholder", description: "占位文字。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Esc", description: "有内容时清空；再按一次交给外层（如关闭弹窗）。" },
    { keys: "Tab", description: "从输入框移到清除按钮。" },
    { keys: "Enter / Space", description: "在清除按钮上清空，并把焦点还给输入框。" },
  ],
  notes: [
    "没有可见标签时提供 aria-label，例如“搜索订单”。",
    "shortcut 只是提示，不注册快捷键；在应用里监听按键并给输入框加 aria-keyshortcuts。",
    "对远程搜索做防抖时，loading 只在请求进行中开启，避免图标频繁闪动。",
  ],
} satisfies ComponentMeta;
