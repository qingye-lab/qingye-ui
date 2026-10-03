# 标记 Badge

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/badge
Source: packages/ui/src/components/badge.tsx
Source SHA-256: 531a868f9e27b52394e0a5bce3089f9a51ef10ae16be266f1701362062c339a5

短标记，保留内容名称而不推断状态。

## Decision
状态事实使用 StatusDot，不让标记宣布成功。

## Use and ownership
- 短分类、注记或强调标记。
- Avoid: 状态事实使用 StatusDot，不让标记宣布成功。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- className、style 与 render 属于标记；五档使用同名文字。

## Responsive behavior
- 五档文字沿用同名文字角色；短标记可换行，不吞掉内容。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- Badge: function; owner badge; PASS; props: BadgeProps
- BadgeProps: type; owner badge; PASS
- BadgeSize: type; owner badge; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Badge
className、style 与 render 属于标记；五档使用同名文字。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "sm". 同名文字档，字形围合使用 badge padding。
- variant: "neutral" | "emphasis"; default "neutral". 视觉强调，不编码请求状态或权限。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

## Keyboard

## Source examples
### 标记
Source: apps/docs/src/content/badge/demos/01-states.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "标记", titleEn: "Markers" };
export default function Demo() {
  return <Inline>{(["xs","sm","md","lg","xl"] as const).map(size => <Badge key={size} size={size}>{size}</Badge>)}<Badge variant="emphasis">重点</Badge></Inline>;
}
```
