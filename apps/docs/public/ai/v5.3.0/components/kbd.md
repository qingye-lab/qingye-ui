# 键位 Kbd

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/kbd
Source: packages/ui/src/components/kbd.tsx
Source SHA-256: a7fd414dd93120240d7eb2c1508627c3b2130c780ede7f079f4bd4ea04e7ec2f

用原生键位元素显示真实快捷键。

## Decision
Kbd 不注册键盘监听，不是可点击入口。

## Use and ownership
- 说明实际可用的键位。
- Avoid: Kbd 不注册键盘监听，不是可点击入口。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- 组合原生 kbd 内容；平台键位由应用确定。

## Responsive behavior
- 实际键位保持原生展示，长键位名称允许换行；不建立点击或触摸入口。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- Kbd: function; owner kbd; PASS; props: KbdProps
- KbdProps: type; owner kbd; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Kbd
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Kbd
组合原生 kbd 内容；平台键位由应用确定。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

## Keyboard

## Source examples
### 键位
Source: apps/docs/src/content/kbd/demos/01-states.tsx
```tsx
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "键位", titleEn: "Keys" };
export default function Demo() { return <Inline><Kbd>Ctrl</Kbd><Kbd>K</Kbd><Kbd><span aria-hidden="true">⌘</span><span className="sr-only">Command</span></Kbd><Kbd>Enter</Kbd></Inline>; }
```
