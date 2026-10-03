# 工具组 Toolbar

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/toolbar
Source: packages/ui/src/components/toolbar.tsx
Source SHA-256: d80386fcf2930e25cd4960c619e07bf42b8ad63394213936ebe0286ad0aaebff

真实分组、方向键焦点与可执行操作。

## Decision
Base UI Toolbar 接管 roving focus 与组禁用；按钮默认组合当前 Button，链接保留导航，应用提供操作名称与选中事实。

## Notes
- 只为持续的相关操作使用 Toolbar；普通多个按钮可以用 ButtonGroup。

## Use and ownership
- 持续的相关操作需要一个键盘进入点与方向键导航。
- Avoid: 普通并列按钮用 ButtonGroup；目的地集合用导航链接。
- Library: Base UI roving focus、方向、组禁用与事件保护。
- Application: 操作名称、真实选中/禁用状态及执行结果。

## Composition
- Toolbar：Base UI Toolbar.Root。
- ToolbarGroup：命名与禁用一组相关操作。
- ToolbarButton：真实命令；默认组合 Button。
- ToolbarLink / ToolbarSeparator：真实 a 与方向相关组分界。

## Responsive behavior
- 横向操作可换行，垂直方向使用对应方向键。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- Toolbar: function; owner toolbar; PASS; props: ToolbarProps
- ToolbarButton: function; owner toolbar; PASS; props: ToolbarButtonProps
- ToolbarButtonProps: type; owner toolbar; PASS
- ToolbarGroup: function; owner toolbar; PASS; props: ToolbarGroupProps
- ToolbarGroupProps: type; owner toolbar; PASS
- ToolbarLink: function; owner toolbar; PASS; props: ToolbarLinkProps
- ToolbarLinkProps: type; owner toolbar; PASS
- ToolbarPrimitive: reexport; owner toolbar; UNVERIFIED
- ToolbarProps: type; owner toolbar; PASS
- ToolbarSeparator: function; owner toolbar; PASS; props: ToolbarSeparatorProps
- ToolbarSeparatorProps: type; owner toolbar; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Toolbar
Base UI Toolbar.Root。
- orientation / loopFocus / disabled / aria-label / render / ref: ToolbarPrimitive.Root.Props; default orientation="horizontal", loopFocus=true. 应用为工具组命名；方向决定键盘移动轴。

### ToolbarGroup
命名与禁用一组相关操作。
- disabled / aria-label / render / ref / native props: ToolbarPrimitive.Group.Props. 禁用事实传给组内真实操作。

### ToolbarButton
真实命令；默认组合 Button。
- size / variant: ButtonProps[size | variant]; default size="md", variant="quiet". 复用基础层尺寸和表面预设。
- disabled / focusableWhenDisabled / render / ref / nativeButton: ToolbarPrimitive.Button.Props. 自定义 render 时提供合法按钮或成熟触发器，保留焦点与事件链。

### ToolbarLink / ToolbarSeparator
真实 a 与方向相关组分界。
- href / orientation / render / ref / primitive props: ToolbarPrimitive.Link.Props | ToolbarPrimitive.Separator.Props. 链接导航；分隔符不生成操作。

## Keyboard
- Tab / Shift+Tab: 进入或离开整个工具组。
- 方向键 / Home / End: 由 Base UI 按方向移动焦点。
- Enter / Space: 执行实际命令。

## Source examples
### 命令、分组与焦点
Source: apps/docs/src/content/toolbar/demos/01-format.tsx
```tsx
import { useState } from "react";
import { Stack } from "@qingye/ui/components/layout";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from "@qingye/ui/components/toolbar";
import { Text } from "@qingye/ui/components/typography";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "命令、分组与焦点", titleEn: "Commands, groups and focus" } satisfies DemoMeta;
export default function Demo() {
  const [strong, setStrong] = useState(false);
  return <Stack><Toolbar aria-label="文本操作"><ToolbarGroup aria-label="格式"><ToolbarButton aria-pressed={strong} onClick={() => setStrong(!strong)}>加粗</ToolbarButton><ToolbarButton disabled={!strong} onClick={() => setStrong(false)}>恢复</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarLink href="/components/typography">文字</ToolbarLink></Toolbar><Text step={strong ? "body-strong" : "body"}>一段文字</Text></Stack>;
}
```
