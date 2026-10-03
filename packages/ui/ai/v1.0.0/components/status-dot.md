# 状态 StatusDot

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/status-dot
Source: packages/ui/src/components/status-dot.tsx
Source SHA-256: 590294f7c1634e157f5983792a592ef5adc93c77bc60336e2b45e01fe3b43227

让状态色与可见名称同时表达事实。

## Decision
不把等待、进行中或结果未知混成同一事实。

## Use and ownership
- 表达对象的真实状态。
- Avoid: 不把等待、进行中或结果未知混成同一事实。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- 名称默认走 locale；label 可附上明确对象，图形不单独成为 Spinner。

## Responsive behavior
- 状态名称允许长中英文换行；图形尺寸独立，不代替名称。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- StatusDot: function; owner status-dot; PASS; props: StatusDotProps
- StatusDotProps: type; owner status-dot; PASS
- StatusDotStatus: type; owner status-dot; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### StatusDot
名称默认走 locale；label 可附上明确对象，图形不单独成为 Spinner。
- status: "online" | "offline" | "warning" | "error" | "info" | "neutral" | "pending" | "in-progress" | "unknown". 应用给出的实际状态，必填。
- label: string. 替代默认 locale 名称，需继续表达对象状态。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

## Keyboard

## Source examples
### 状态
Source: apps/docs/src/content/status-dot/demos/01-states.tsx
```tsx
import { StatusDot } from "@qingye/ui/components/status-dot";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "状态", titleEn: "States" };
export default function Demo() { return <Inline>{(["online","offline","pending","in-progress","unknown","warning","error"] as const).map(status => <StatusDot key={status} status={status} />)}</Inline>; }
```
