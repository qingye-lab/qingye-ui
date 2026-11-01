# 标记 Badge

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/badge
Source: packages/ui/src/components/badge.tsx
Source SHA-256: 66ce5024d8e432327ddecdc8ae5c1d05c62b636f6af042a2a8c895793156a326

短标记，保留内容名称而不推断状态。

## Decision
状态事实使用 StatusDot，不让标记宣布成功。

## Notes
- tone 与 StatusDot 的状态类别是同一组值、同一色相；哪个状态属于哪一类，见 StatusDot。

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Badge
- `tone?`: `"info" | "warning" | "danger" | "success"`. 状态类别（随类赋彩）：只有标记确实表达这一类事实时才给。给出时自带强调。
- `variant?`: `"neutral" | "emphasis"`. neutral 只把这段文字分出来；emphasis 要读者注意到它，但不归入任何状态类别。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
import { Badge } from "@qingye_lab/ui/components/badge";
import { Inline } from "@qingye_lab/ui/components/layout";

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
