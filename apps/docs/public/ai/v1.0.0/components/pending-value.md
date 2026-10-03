# 结果未知 PendingValue

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/pending-value
Source: packages/ui/src/components/pending-value.tsx
Source SHA-256: dfec9ff84e6dc8e1a1700d2f81a72e0b7939b719b796a1ea06f689c289122fb8

保留对象与原值，表达写入结果未知。

## Decision
不把未知当失败，不默认重试危险写入。

## Use and ownership
- 写入已发生但缺少可靠结果。
- Avoid: 不把未知当失败，不默认重试危险写入。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- 原值放 children，核实或恢复入口放 actions；都由应用提供。

## Responsive behavior
- 对象、原值与未知结果文字允许换行；动作复用已有 Group 和调用方真实入口。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- PendingValue: function; owner pending-value; PASS; props: PendingValueProps
- PendingValueProps: type; owner pending-value; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### PendingValue
原值放 children，核实或恢复入口放 actions；都由应用提供。
- label: string. 必填非空对象名称。
- children: ReactNode. 原值；0 保持0，缺席不代填0。
- actions: ReactNode. 应用已有的核实/恢复入口，组件不发请求。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

## Keyboard

## Source examples
### 保留原值
Source: apps/docs/src/content/pending-value/demos/01-states.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { PendingValue } from "@qingye/ui/components/pending-value";
export const meta = { title: "保留原值", titleEn: "Original value retained" };
export default function Demo() { return <PendingValue label="值" actions={<Button variant="bordered">核实</Button>}>{0}</PendingValue>; }
```
