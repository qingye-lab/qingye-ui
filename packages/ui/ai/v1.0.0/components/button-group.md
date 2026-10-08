# 动作组 ButtonGroup

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/button-group
Source: packages/ui/src/components/button-group.tsx
Source SHA-256: 9f0a747d831063539d4d418ab221b3a0c356fb710148c1c0e83f514905a39914

为同一范围的动作提供共同名称与间隔。

## Decision
共同名称说明范围，每个按钮仍说明自己的动作。ButtonGroup 不选择按钮、不传播禁用，也不建立工具栏键盘行为。

## Use and ownership
- 几个动作属于同一可命名的范围。
- Avoid: 用动作组替代单选、多选或工具栏。
- Library: 原生 group 角色与动作间隔。
- Application: 范围、名称与各动作状态。

## Composition
- 复用 Group 和 action-gap；成员使用 Button，真实状态仍在成员处表达。

## Responsive behavior
- 横向默认换行，也可纵向；不合并成员轮廓。

## Customization
- className 与 render 属于组；不统一改写子按钮。

## Current exports
- ButtonGroup: function; owner button-group; PASS; props: ButtonGroupProps
- ButtonGroupProps: type; owner button-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ButtonGroup
默认 role=group 的开放动作关系。
- aria-label / aria-labelledby: string. 动作范围的共同名称，不替代按钮名称。
- orientation: "horizontal" | "vertical"; default "horizontal". 布局方向。
- align / wrap / render / ref / 原生属性: ButtonGroupProps. 沿用 Group 的组合入口，间隔默认 action-gap。

## Keyboard
- Tab / Shift+Tab: 依次访问每个可用按钮，禁用按钮不进入焦点顺序。

## Source examples
### 动作范围
Source: apps/docs/src/content/button-group/demos/01-actions.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";

export const meta = { title: "动作范围", titleEn: "Action scope" };
export default function Demo() {
  return <ButtonGroup aria-label="编辑"><Button>应用</Button><Button variant="bordered">重置</Button><Button variant="quiet" disabled>撤销</Button></ButtonGroup>;
}
```

### 纵向
Source: apps/docs/src/content/button-group/demos/02-vertical.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";

export const meta = { title: "纵向", titleEn: "Vertical" };
export default function Demo() {
  return <ButtonGroup aria-label="编辑" orientation="vertical" align="start"><Button>应用</Button><Button variant="bordered">重置</Button></ButtonGroup>;
}
```
