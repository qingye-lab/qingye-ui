# 状态 StatusDot

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/status-dot
Source: packages/ui/src/components/status-dot.tsx
Source SHA-256: 460a2c7c93aa7bbf779ca0c9ad7e6f47f2d7fc13190afd17b95f4717319e3c74

让状态色与可见名称同时表达事实。

## Decision
不把等待、进行中或结果未知混成同一事实。

## Notes
- 不为紧急状态加呼吸或闪烁：库里的循环动画只表示进行中；紧急程度由类别色和名称表达。
- 状态名对应固定的类别：在线是成功，异常是危险，警告和结果未知是警示，提示、等待中、进行中是信息；离线和 neutral 不施彩。同一类别在 Badge 里是同一色相。
- 结果未知要读者去核实，归警示：它既不是失败，也不是成功。neutral 是没有归类的状态，用 label 写出它到底是什么。

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### StatusDot
- `label?`: `string`.
- `status`: `"neutral" | "info" | "warning" | "pending" | "error" | "unknown" | "online" | "offline" | "in-progress"`.
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "状态", titleEn: "States" };
export default function Demo() { return <Inline>{(["online","offline","pending","in-progress","unknown","warning","error"] as const).map(status => <StatusDot key={status} status={status} />)}</Inline>; }
```
