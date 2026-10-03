import type { ComponentMeta } from "@/lib/types";

export default {
  title: "主题 ThemeProvider",
  titleEn: "ThemeProvider",
  description:
    "管理整个文档的浅色 / 深色 / 跟随系统：记住用户的选择，跟随系统偏好变化，并把结果写到 <html> 上。在应用根部挂载一次，用 useTheme 读写。",
  descriptionEn: "Remember the user's choice of light, dark, or system mode for the whole document. ThemeProvider follows system preference changes and applies the resolved mode to <html>. Mount it once at the app root and use useTheme to read or change the mode.",
  category: "工具",
  layer: "foundation",
  source: "local",
  exports: ["ThemeProvider", "useTheme", "themeScript"],
  keywords: ["theme", "主题", "深色模式", "dark mode", "浅色", "跟随系统", "color scheme"],
  api: [
    {
      name: "ThemeProvider",
      description: "主题上下文。在 <html> 上切换 .dark / .light 类（或 data-theme 属性），并同步 color-scheme。", descriptionEn: "Theme context switches html .dark/.light classes or data-theme and synchronizes color-scheme.",
      props: [
        { name: "defaultTheme", type: '"light" | "dark" | "system"', default: '"system"', description: "没有保存过选择时使用。", descriptionEn: "Used when no choice was saved." },
        { name: "storageKey", type: "string | null", default: '"yq-theme"', description: "保存到 localStorage 的键；传 null 不保存。其他标签页修改后会自动同步。", descriptionEn: "The localStorage key; null disables persistence. Other tabs' changes synchronize automatically." },
        { name: "attribute", type: '"class" | "data-theme"', default: '"class"', description: "写入方式：.dark 类，或 data-theme=\"dark\"。两者样式都已支持。", descriptionEn: "Write .dark classes or data-theme=dark; styles support both." },
        { name: "disableTransitionOnChange", type: "boolean", default: "true", description: "切换瞬间暂停过渡，所有表面同时变色，而不是以不同速度渐变。", descriptionEn: "Pause transitions during switching so surfaces change together rather than fading at different speeds." },
      ],
    },
    {
      name: "useTheme",
      description: "返回 { theme, resolvedTheme, setTheme }。theme 是用户的选择（可能为 system），resolvedTheme 是实际生效的 light 或 dark。必须在 ThemeProvider 内使用。", descriptionEn: "Returns {theme,resolvedTheme,setTheme}. theme is the user's choice, possibly system; resolvedTheme is the actual light/dark mode. Requires ThemeProvider.",
    },
    {
      name: "themeScript",
      description: "生成首屏前执行的内联脚本源码，参数与 ThemeProvider 相同（storageKey、attribute、defaultTheme）。", descriptionEn: "Creates inline pre-paint script source with the same storageKey, attribute, and defaultTheme as ThemeProvider.",
    },
  ],
  notes: [
    "防止首屏闪烁：React 挂载前页面已经绘制，需要在 <head> 里、样式表之前放一段内联脚本先应用主题。单页应用把 themeScript() 的输出粘贴进 index.html 的 <script>；服务端渲染用 <script dangerouslySetInnerHTML={{ __html: themeScript() }} />。脚本参数必须与 ThemeProvider 一致。",
    "主题选择的文案用语言包中的 theme、lightTheme、darkTheme、systemTheme。",
    "选择“跟随系统”后，操作系统切换深浅色时页面立即跟随，无需刷新。",
    "只在根部挂载一个 ThemeProvider；局部强制深色可在容器上加 .dark 类。",
    "服务端与客户端首渲染保持 defaultTheme，挂载后读取真实选择。存储不可用仍可改变外观；卸载清理媒体/存储监听和临时过渡样式。",
    "默认 yq-theme 保留已有真实偏好；跨标签页删除或 clear 恢复 defaultTheme。",
  ], notesEn: ["Prevent first-paint flashing with an inline head script before stylesheets, since painting precedes React mounting. In SPAs paste themeScript() into index.html script; SSR uses script dangerouslySetInnerHTML={{__html:themeScript()}}. Options must match ThemeProvider.","Theme choice labels use locale theme/lightTheme/darkTheme/systemTheme.","System choice follows OS light/dark changes immediately without reloading.","Mount one root ThemeProvider. Local forced-dark content may add a .dark container class.","Server/client first renders retain defaultTheme, then read actual choices after mount. Appearance can change without storage; unmount cleans media/storage listeners and temporary transition styles.","The default yq-theme key retains actual existing preferences. Cross-tab deletion/clear restores defaultTheme."],
  decisions: "ThemeProvider 把 data-theme 留给 light 和 dark；项目的品牌标记写在 data-brand，写进 data-theme 的品牌会在切换明暗时被覆盖。",
  decisionsEn: "ThemeProvider reserves data-theme for light and dark. Store the project's brand identifier in data-brand; if ThemeProvider uses data-theme, it overwrites any brand identifier in that attribute when the mode changes.",
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
  }, designEn: {"whenToUse":["The whole application shares light/dark/system choices applied consistently at first paint."],"avoid":["Brand in data-theme, multiple Providers competing for html, or differing Script/Provider persistence keys."],"composition":["One root Provider paired with identically configured themeScript; useTheme distinguishes chosen theme from actual resolvedTheme."],"stateOwner":{"library":["Applying appearance, storage tolerance, system preferences, and cross-tab synchronization."],"application":["Brand data-brand, density data-density, choice entries, and the central theme."]},"responsive":["Theme switching retains objects, inputs, and focus; check actual controls, popups, and surfaces in both modes."],"customization":["attribute selects class or appearance data-theme; storageKey sets preference scope and brand stays separate."]},
} satisfies ComponentMeta;
