# 成组布局 Group

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/group
Source: packages/ui/src/components/group.tsx
Source SHA-256: 8b91bd767da9aaf6fe2b64f18a15137f42ef6d58fc2fc0a407ededa4dedb3af1

按共同关系安排成员的方向与间隔。

## Decision
Group 只组织位置。字段共同问题用 Fieldset，动作范围用 ButtonGroup；成员名称与状态仍各自成立。

## Use and ownership
- 多个成员共享一个布局关系。
- Avoid: 用布局容器冒充字段、工具栏或选择集合。
- Library: 方向、换行和既有间隔角色。
- Application: 成员、名称、范围和状态。

## Composition
- 横向复用 Inline，纵向复用 Stack；语义由原生 render 或显式 role 承担。

## Responsive behavior
- 横向默认换行，按文档顺序保留成员。

## Customization
- gap 复用 layout 的五个关系角色；无默认围合。

## Current exports
- Group: function; owner group; PASS; props: GroupProps
- GroupProps: type; owner group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Group
默认无角色的开放布局。
- orientation: "horizontal" | "vertical"; default "horizontal". 布局方向；不改变 DOM 顺序。
- gap: "field" | "fields" | "actions" | "panel" | "section"; default "panel". 既有关系间隔。
- align / wrap: InlineProps. 沿用 layout 公共入口；wrap 仅适用于横向。
- render / ref / 原生属性: InlineProps. 原生语义、事件、ARIA 与样式透传。

## Keyboard

## Source examples
### 横向与纵向
Source: apps/docs/src/content/group/demos/01-directions.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Group } from "@qingye/ui/components/group";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "横向与纵向", titleEn: "Horizontal and vertical" };
export default function Demo() {
  return <Stack gap="panel"><Group gap="actions"><Button variant="bordered">一</Button><Button variant="bordered">二</Button></Group><Group orientation="vertical" gap="actions" align="start"><Button variant="bordered">一</Button><Button variant="bordered">二</Button></Group></Stack>;
}
```
