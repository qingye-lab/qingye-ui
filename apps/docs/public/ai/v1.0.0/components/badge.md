# 标记 Badge

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/badge
Source: packages/ui/src/components/badge.tsx
Source SHA-256: b242907ef4830b800cce0154c41b225bee52164ba08e8d5ee2671c3e5f115c9f

短标记，保留内容名称而不推断状态。

## Decision
状态事实使用 StatusDot，不让标记宣布成功。

## Use and ownership
- 短分类、注记或强调标记。
- Avoid: 状态事实使用 StatusDot，不让标记宣布成功。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- className、style 与 render 属于标记；标记没有尺寸档，与它标注的那段文字同大。

## Responsive behavior
- 标记随所处文字缩放；短标记可换行，不吞掉内容。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- Badge: function; owner badge; PASS; props: BadgeProps
- BadgeProps: type; owner badge; PASS
- BadgeTone: type; owner badge; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Badge
className、style 与 render 属于标记；标记没有尺寸档，与它标注的那段文字同大。
- variant: "neutral" | "emphasis"; default "neutral". neutral 是浓墨的字；emphasis 是焦墨加中等字重，要读者注意但不归入状态类别，所以不用色相。
- tone: "info" | "success" | "warning" | "danger". 调用方声明的状态类别：该状态的文字色加中等字重。组件不从文字猜类别。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

## Keyboard

## Source examples
### 标记
Source: apps/docs/src/content/badge/demos/01-states.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Inline } from "@qingye/ui/components/layout";

export const meta = { title: "标记", titleEn: "Markers" };

// 标记没有尺寸档：它标注哪段文字就与哪段文字同大（用户裁决 2026-10-05）。
export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      <Inline><Badge>草稿</Badge><Badge>已完成</Badge><Badge variant="emphasis">重点</Badge><Badge tone="warning">即将过期</Badge><Badge tone="danger">同步失败</Badge></Inline>
      <p className="text-support text-muted-foreground">与紧凑文字同行时 <Badge>待确认</Badge></p>
    </div>
  );
}
```
