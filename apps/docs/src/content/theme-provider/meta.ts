import type { ComponentMeta } from "@/lib/types";

export default {
  title: "主题 ThemeProvider",
  description:
    "管理整个文档的浅色 / 深色 / 跟随系统：记住用户的选择，跟随系统偏好变化，并把结果写到 <html> 上。在应用根部挂载一次，用 useTheme 读写。",
  category: "工具",
  source: "local",
  exports: ["ThemeProvider", "useTheme", "themeScript"],
  keywords: ["theme", "主题", "深色模式", "dark mode", "浅色", "跟随系统", "color scheme"],
  api: [
    {
      name: "ThemeProvider",
      description: "主题上下文。在 <html> 上切换 .dark / .light 类（或 data-theme 属性），并同步 color-scheme。",
      props: [
        { name: "defaultTheme", type: '"light" | "dark" | "system"', default: '"system"', description: "没有保存过选择时使用。" },
        { name: "storageKey", type: "string | null", default: '"yq-theme"', description: "保存到 localStorage 的键；传 null 不保存。其他标签页修改后会自动同步。" },
        { name: "attribute", type: '"class" | "data-theme"', default: '"class"', description: "写入方式：.dark 类，或 data-theme=\"dark\"。两者样式都已支持。" },
        { name: "disableTransitionOnChange", type: "boolean", default: "true", description: "切换瞬间暂停过渡，所有表面同时变色，而不是以不同速度渐变。" },
      ],
    },
    {
      name: "useTheme",
      description: "返回 { theme, resolvedTheme, setTheme }。theme 是用户的选择（可能为 system），resolvedTheme 是实际生效的 light 或 dark。必须在 ThemeProvider 内使用。",
    },
    {
      name: "themeScript",
      description: "生成首屏前执行的内联脚本源码，参数与 ThemeProvider 相同（storageKey、attribute、defaultTheme）。",
    },
  ],
  notes: [
    "防止首屏闪烁：React 挂载前页面已经绘制，需要在 <head> 里、样式表之前放一段内联脚本先应用主题。单页应用把 themeScript() 的输出粘贴进 index.html 的 <script>；服务端渲染用 <script dangerouslySetInnerHTML={{ __html: themeScript() }} />。脚本参数必须与 ThemeProvider 一致。",
    "主题菜单的文案用语言包中的 theme、lightTheme、darkTheme、systemTheme。",
    "选择“跟随系统”后，操作系统切换深浅色时页面立即跟随，无需刷新。",
    "只在根部挂载一个 ThemeProvider；局部强制深色可在容器上加 .dark 类。",
  ],
  design: {
    "methods": [
      "名实相符",
      "随境取度"
    ],
    "whenToUse": [
      "全应用共同选择浅色、深色或跟随系统，并在首屏一致应用。"
    ],
    "avoid": [
      "把品牌写进 data-theme；多个 Provider 竞争同一 html；Script 与 Provider 的持久化键不同。"
    ],
    "composition": [
      "根部一个 Provider 与同选项 themeScript 配对；useTheme 分别展示用户选择与实际 resolvedTheme。"
    ],
    "stateOwner": {
      "library": [
        "明暗应用、存储容错、系统偏好和跨标签页同步。"
      ],
      "application": [
        "品牌 data-brand、密度 data-density、主题选择入口与集中主题。"
      ]
    },
    "responsive": [
      "主题切换保持对象、输入和焦点；真实控件、浮层与表面都检查明暗组合。"
    ],
    "customization": [
      "attribute 只选 class 或明暗 data-theme，storageKey 决定偏好范围，品牌单独配置。"
    ]
  },
} satisfies ComponentMeta;
