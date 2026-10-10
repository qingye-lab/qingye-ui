# 主题 ThemeProvider

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/theme-provider
Source: packages/ui/src/components/theme-provider.tsx
Source SHA-256: fab084ee0f1c2dddefd45b37d32227712e78a4ad970aeb03921a46ce2e469153

管理整个文档的浅色 / 深色 / 跟随系统：记住用户的选择，跟随系统偏好变化，并把结果写到 <html> 上。在应用根部挂载一次，用 useTheme 读写。

## Decision
ThemeProvider 把 data-theme 留给 light 和 dark；项目的品牌标记写在 data-brand，写进 data-theme 的品牌会在切换明暗时被覆盖。

## Notes
- 防止首屏闪烁：React 挂载前页面已经绘制，需要在 <head> 里、样式表之前放一段内联脚本先应用主题。单页应用把 themeScript() 的输出粘贴进 index.html 的 <script>；服务端渲染用 <script dangerouslySetInnerHTML={{ __html: themeScript() }} />。脚本参数必须与 ThemeProvider 一致。
- 主题选择的文案用语言包中的 theme、lightTheme、darkTheme、systemTheme。
- 选择“跟随系统”后，操作系统切换深浅色时页面立即跟随，无需刷新。
- 只在根部挂载一个 ThemeProvider；局部强制深色可在容器上加 .dark 类。
- 服务端与客户端首渲染保持 defaultTheme，挂载后读取真实选择。存储不可用仍可改变外观；卸载清理媒体/存储监听和临时过渡样式。
- 默认 yq-theme 保留已有真实偏好；跨标签页删除或 clear 恢复 defaultTheme。

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
### 按需选择外观
Source: apps/docs/src/content/theme-provider/demos/01-menu.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { useTheme, type Theme } from "@qingye_lab/ui/components/theme-provider";
import { Text } from "@qingye_lab/ui/components/typography";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useId } from "react";

export const meta = { title: "按需选择外观", titleEn: "Choose appearance on demand" };

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const id = useId();
  const Current = resolvedTheme === "dark" ? IconMoon : IconSun;
  return <Popover>
    <PopoverTrigger render={<Button shape="icon" aria-label={messages.theme} variant="quiet" />}><Current aria-hidden="true" /></PopoverTrigger>
    <PopoverPopup>
      <Stack gap="field">
        <PopoverTitle>{messages.theme}</PopoverTitle>
        <NativeSelect id={id} aria-label={messages.theme} value={theme} onChange={event => setTheme(event.target.value as Theme)}>
          <option value="light">{messages.lightTheme}</option>
          <option value="dark">{messages.darkTheme}</option>
          <option value="system">{messages.systemTheme}</option>
        </NativeSelect>
        <Text step="support" className="text-muted-foreground">当前：{resolvedTheme === "dark" ? messages.darkTheme : messages.lightTheme}</Text>
      </Stack>
    </PopoverPopup>
  </Popover>;
}
```

### 外观设置
Source: apps/docs/src/content/theme-provider/demos/02-segmented.tsx
```tsx
import { Label } from "@qingye_lab/ui/components/label";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { Text } from "@qingye_lab/ui/components/typography";
import { Radio, RadioGroup } from "@qingye_lab/ui/components/radio-group";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

export const meta = { title: "外观设置", titleEn: "Appearance settings" };

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: IconSun },
    { value: "dark", label: messages.darkTheme, icon: IconMoon },
    { value: "system", label: messages.systemTheme, icon: IconDeviceDesktop },
  ] as const;
  return <Stack gap="field">
    <fieldset className="min-w-0">
      <legend className="mb-(--qy-field-gap) text-label">{messages.theme}</legend>
      <RadioGroup value={theme} onValueChange={setTheme} aria-label={messages.theme} render={<Inline gap="actions" />}>
        {options.map(({ value, label, icon: Icon }) => <Label key={value}>
          <Inline gap="field" render={<span />}>
            <Radio value={value} aria-label={label} />
            <Icon aria-hidden="true" className="size-(--qy-control-md-icon)" />
            <Text render={<span />}>{label}</Text>
          </Inline>
        </Label>)}
      </RadioGroup>
    </fieldset>
    <Text step="support" className="text-muted-foreground">当前：{resolvedTheme === "dark" ? messages.darkTheme : messages.lightTheme}</Text>
  </Stack>;
}
```

### 防闪烁脚本
Source: apps/docs/src/content/theme-provider/demos/03-head-script.tsx
```tsx
import { themeScript } from "@qingye_lab/ui/components/theme-provider";

export const meta = {
  title: "防闪烁脚本",
  titleEn: "Anti-flash script",
  description:
    "防闪烁脚本放在 <head> 中的样式表之前，参数与 ThemeProvider 一致。",
};

export default function Demo() {
  return (
    <pre className="w-full max-w-xl overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-muted p-4 font-mono text-muted-foreground text-caption leading-relaxed [font-variant-ligatures:none]">
      {`<script>${themeScript({ storageKey: "yq-theme" })}</script>`}
    </pre>
  );
}
```
