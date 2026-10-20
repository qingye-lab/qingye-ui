# ThemeProvider

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/theme-provider
Source: packages/ui/src/components/theme-provider.tsx
Source SHA-256: cec0ce7f796c059c282ede1011646f364fb646b0106e2ecd65a22dc8b8dfd1d5

Remember the user's choice of light, dark, or system mode for the whole document. ThemeProvider follows system preference changes and applies the resolved mode to <html>. Mount it once at the app root and use useTheme to read or change the mode.

## Decision
ThemeProvider reserves data-theme for light and dark. Store the project's brand identifier in data-brand; if ThemeProvider uses data-theme, it overwrites any brand identifier in that attribute when the mode changes.

## Notes
- Prevent first-paint flashing with an inline head script before stylesheets, since painting precedes React mounting. In SPAs paste themeScript() into index.html script; SSR uses script dangerouslySetInnerHTML={{__html:themeScript()}}. Options must match ThemeProvider.
- Strict CSP: pass the request nonce to both <ThemeProvider nonce={nonce}> and the first-paint <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript() }} />; themeScript() returns only the script body. Without a nonce the browser drops the temporary transition style and surfaces fade instead of changing together.
- Theme choice labels use locale theme/lightTheme/darkTheme/systemTheme.
- System choice follows OS light/dark changes immediately without reloading.
- Mount one root ThemeProvider. Local forced-dark content may add a .dark container class.
- Server/client first renders retain defaultTheme, then read actual choices after mount. Appearance can change without storage; unmount cleans media/storage listeners and temporary transition styles.
- The default yq-theme key retains actual existing preferences. Cross-tab deletion/clear restores defaultTheme.

## Use and ownership
- The whole application shares light/dark/system choices applied consistently at first paint.
- Avoid: Brand in data-theme, multiple Providers competing for html, or differing Script/Provider persistence keys.
- Library: Applying appearance, storage tolerance, system preferences, and cross-tab synchronization.
- Application: Brand data-brand, density data-density, choice entries, and the central theme.

## Composition
- One root Provider paired with identically configured themeScript; useTheme distinguishes chosen theme from actual resolvedTheme.

## Responsive behavior
- Theme switching retains objects, inputs, and focus; check actual controls, popups, and surfaces in both modes.

## Customization
- attribute selects class or appearance data-theme; storageKey sets preference scope and brand stays separate.

## Current exports
- ResolvedTheme: type; owner theme-provider; PASS
- Theme: type; owner theme-provider; PASS
- ThemeProvider: function; owner theme-provider; PASS; props: ThemeProviderProps
- ThemeProviderProps: type; owner theme-provider; PASS
- themeScript: function; owner theme-provider; PASS; props: ThemeScriptOptions
- ThemeScriptOptions: type; owner theme-provider; PASS
- useTheme: function; owner theme-provider; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ThemeProvider
- `attribute?`: `"class" | "data-theme"`. How the theme is written to `<html>`: a `.dark` class or `data-theme`.
- `children`: `React.ReactNode`.
- `defaultTheme?`: `"light" | "dark" | "system"`. Used when nothing is stored yet.
- `disableTransitionOnChange?`: `boolean`. Suppress CSS transitions for one frame while the theme flips, so every surface changes together instead of fading at different speeds.
- `nonce?`: `string`. CSP nonce for the one `<style>` this provider injects while the theme flips. Needed when `style-src` has no `'unsafe-inline'`; without it the browser drops that style and surfaces fade instead of changing together. The first-paint `<script>` is rendered by you: give that tag the same nonce.
- `storageKey?`: `string | null`. localStorage key. Set to `null` to skip persistence.

### themeScript
- `attribute?`: `"class" | "data-theme"`. How the theme is written to `<html>`: a `.dark` class or `data-theme`.
- `defaultTheme?`: `"light" | "dark" | "system"`. Used when nothing is stored yet.
- `storageKey?`: `string | null`. localStorage key. Set to `null` to skip persistence.

### useTheme
- takes no props

## Dependencies and providers
- Runtime: react
- Optional peers: none recorded
- Prevent first-paint flashing with an inline head script before stylesheets, since painting precedes React mounting. In SPAs paste themeScript() into index.html script; SSR uses script dangerouslySetInnerHTML={{__html:themeScript()}}. Options must match ThemeProvider.
- Strict CSP: pass the request nonce to both <ThemeProvider nonce={nonce}> and the first-paint <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript() }} />; themeScript() returns only the script body. Without a nonce the browser drops the temporary transition style and surfaces fade instead of changing together.
- Mount one root ThemeProvider. Local forced-dark content may add a .dark container class.
- Required providers: ThemeProvider
- Locale: does not read UILocale
- Context ThemeContext: without a provider throws; provided by ThemeProvider

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ThemeProvider
Theme context switches html .dark/.light classes or data-theme and synchronizes color-scheme.
- defaultTheme: "light" | "dark" | "system"; default "system". Used when no choice was saved.
- storageKey: string | null; default "yq-theme". The localStorage key; null disables persistence. Other tabs' changes synchronize automatically.
- attribute: "class" | "data-theme"; default "class". Write .dark classes or data-theme=dark; styles support both.
- disableTransitionOnChange: boolean; default true. Pause transitions during switching so surfaces change together rather than fading at different speeds.
- nonce: string. Under a strict CSP (style-src without 'unsafe-inline'), the nonce applied to the temporary <style> injected while the theme flips. You render the first-paint <script> yourself; give it the same nonce.

### useTheme
Returns {theme,resolvedTheme,setTheme}. theme is the user's choice, possibly system; resolvedTheme is the actual light/dark mode. Requires ThemeProvider.

### themeScript
Creates inline pre-paint script source with the same storageKey, attribute, and defaultTheme as ThemeProvider.

## Keyboard

## Source examples
### 外观选择
Source: apps/docs/src/content/theme-provider/demos/01-menu.tsx
```tsx
import { useTheme, type Theme } from "@qingye_lab/ui/components/theme-provider";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

export const meta = { title: "外观选择", titleEn: "Appearance choice" };

export default function Demo() {
  const { theme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: IconSun },
    { value: "dark", label: messages.darkTheme, icon: IconMoon },
    { value: "system", label: messages.systemTheme, icon: IconDeviceDesktop },
  ] as const;
  return <SegmentedControl aria-label={messages.theme} value={theme} onValueChange={next => setTheme(next as Theme)}>
    {options.map(({ value, label, icon: Icon }) => <SegmentedControlItem key={value} value={value}>
      <Inline gap="field" render={<span />}><Icon aria-hidden="true" />{label}</Inline>
    </SegmentedControlItem>)}
  </SegmentedControl>;
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

### 按需选择外观
Source: apps/docs/src/content/theme-provider/demos/04-popover.tsx
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
