# 主题 ThemeProvider

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/theme-provider
Source: packages/ui/src/components/theme-provider.tsx
Source SHA-256: 7b0b37626ab5203a847354abfd607dbd0369fe3472a3e4cbb9a9062f38a6c822

管理整个文档的浅色 / 深色 / 跟随系统：记住用户的选择，跟随系统偏好变化，并把结果写到 <html> 上。在应用根部挂载一次，用 useTheme 读写。

## Use and ownership
- 全应用共同选择浅色、深色或跟随系统，并在首屏一致应用。
- Avoid: 把品牌写进 data-theme；多个 Provider 竞争同一 html；Script 与 Provider 的持久化键不同。
- Library: 明暗应用、存储容错、系统偏好和跨标签页同步。
- Application: 品牌 data-brand、密度 data-density、主题选择入口与集中主题。

## Composition
- 根部一个 Provider 与同选项 themeScript 配对；useTheme 分别展示用户选择与实际 resolvedTheme。

## Responsive behavior
- 主题切换保持对象、输入和焦点；真实控件、浮层与表面都检查明暗组合。

## Customization
- attribute 只选 class 或明暗 data-theme，storageKey 决定偏好范围，品牌单独配置。

## Current exports
- ResolvedTheme: type; owner theme-provider; PASS
- Theme: type; owner theme-provider; PASS
- ThemeProvider: function; owner theme-provider; PASS; props: ThemeProviderProps
- ThemeProviderProps: type; owner theme-provider; PASS
- themeScript: function; owner theme-provider; PASS; props: ThemeScriptOptions
- ThemeScriptOptions: type; owner theme-provider; PASS
- useTheme: function; owner theme-provider; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: react
- Optional peers: none recorded
- 防止首屏闪烁：React 挂载前页面已经绘制，需要在 <head> 里、样式表之前放一段内联脚本先应用主题。单页应用把 themeScript() 的输出粘贴进 index.html 的 <script>；服务端渲染用 <script dangerouslySetInnerHTML={{ __html: themeScript() }} />。脚本参数必须与 ThemeProvider 一致。
- 只在根部挂载一个 ThemeProvider；局部强制深色可在容器上加 .dark 类。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ThemeProvider
主题上下文。在 <html> 上切换 .dark / .light 类（或 data-theme 属性），并同步 color-scheme。
- defaultTheme: "light" | "dark" | "system"; default "system". 没有保存过选择时使用。
- storageKey: string | null; default "yq-theme". 保存到 localStorage 的键；传 null 不保存。其他标签页修改后会自动同步。
- attribute: "class" | "data-theme"; default "class". 写入方式：.dark 类，或 data-theme="dark"。两者样式都已支持。
- disableTransitionOnChange: boolean; default true. 切换瞬间暂停过渡，所有表面同时变色，而不是以不同速度渐变。

### useTheme
返回 { theme, resolvedTheme, setTheme }。theme 是用户的选择（可能为 system），resolvedTheme 是实际生效的 light 或 dark。必须在 ThemeProvider 内使用。

### themeScript
生成首屏前执行的内联脚本源码，参数与 ThemeProvider 相同（storageKey、attribute、defaultTheme）。

## Keyboard

## Source examples
### 主题菜单
Source: apps/docs/src/content/theme-provider/demos/01-menu.tsx
```tsx
import type { Theme } from "@qingye/ui/components/theme-provider";
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuPopup, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@qingye/ui/components/menu";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { useUILocale } from "@qingye/ui/locale";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export const meta = {
  title: "主题菜单",
  description: "顶栏里最常见的形式：图标显示当前生效的主题，菜单里三选一。文案来自语言包。",
};

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: SunIcon },
    { value: "dark", label: messages.darkTheme, icon: MoonIcon },
    { value: "system", label: messages.systemTheme, icon: MonitorIcon },
  ] as const;
  const Current = resolvedTheme === "dark" ? MoonIcon : SunIcon;

  return (
    <Menu>
      <MenuTrigger render={<Button aria-label={messages.theme} size="icon" variant="outline" />}>
        <Current />
      </MenuTrigger>
      <MenuPopup className="min-w-36">
        <MenuRadioGroup onValueChange={(value) => setTheme(value as Theme)} value={theme}>
          {options.map(({ value, label, icon: Icon }) => (
            <MenuRadioItem key={value} value={value}>
              <span className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 opacity-72" />
                {label}
              </span>
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
}
```

### 设置页中的分段选择
Source: apps/docs/src/content/theme-provider/demos/02-segmented.tsx
```tsx
import type { Theme } from "@qingye/ui/components/theme-provider";
import { RadioGroupPrimitive, RadioPrimitive } from "@qingye/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { useUILocale } from "@qingye/ui/locale";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export const meta = {
  title: "设置页中的分段选择",
  description: "设置页里直接平铺三个选项；下方显示用户的选择与实际生效的主题。",
};

const item = segmentedControlItemVariants({ state: "checked" });

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  return (
    <div className="flex flex-col items-center gap-3">
      <RadioGroupPrimitive
        aria-label={messages.theme}
        className={segmentedControlRootClassName}
        onValueChange={(value) => setTheme(value as Theme)}
        value={theme}
      >
        <RadioPrimitive.Root className={item} value="light">
          <SunIcon />
          {messages.lightTheme}
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="dark">
          <MoonIcon />
          {messages.darkTheme}
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="system">
          <MonitorIcon />
          {messages.systemTheme}
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>
      <p className="text-muted-foreground text-xs">
        theme = <code className="font-mono text-foreground">{theme}</code>，resolvedTheme ={" "}
        <code className="font-mono text-foreground">{resolvedTheme}</code>
      </p>
    </div>
  );
}
```

### 防闪烁脚本
Source: apps/docs/src/content/theme-provider/demos/03-head-script.tsx
```tsx
import { themeScript } from "@qingye/ui/components/theme-provider";

export const meta = {
  title: "防闪烁脚本",
  description:
    "themeScript() 生成的源码，放进 index.html 的 <head>、样式表之前；参数与 ThemeProvider 保持一致。",
};

export default function Demo() {
  return (
    <pre className="w-full max-w-xl overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-muted p-4 font-mono text-muted-foreground text-xs leading-relaxed [font-variant-ligatures:none]">
      {`<script>${themeScript({ storageKey: "yq-theme" })}</script>`}
    </pre>
  );
}
```

