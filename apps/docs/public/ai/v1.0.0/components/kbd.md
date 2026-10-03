# 键位 Kbd

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/kbd
Source: packages/ui/src/components/kbd.tsx
Source SHA-256: e81b386c99af334e17849f1ed4d40fc442a375431878d5e0970c18e573395d75

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Kbd
组合原生 kbd 内容；平台键位由应用确定。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

## Keyboard

## Source examples
### 键位
Source: apps/docs/src/content/kbd/demos/01-states.tsx
```tsx
import { Kbd } from "@qingye/ui/components/kbd";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "键位", titleEn: "Keys" };
export default function Demo() { return <Inline><Kbd>Ctrl</Kbd><Kbd>K</Kbd><Kbd aria-label="Command">⌘</Kbd><Kbd>Enter</Kbd></Inline>; }
```
