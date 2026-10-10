# ButtonGroup

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/button-group
Source: packages/ui/src/components/button-group.tsx
Source SHA-256: 9f0a747d831063539d4d418ab221b3a0c356fb710148c1c0e83f514905a39914

Give actions in one scope a shared name and spacing.

## Decision
The shared name identifies the scope; each button still names its action. ButtonGroup adds no selection, disabled propagation or toolbar keyboard behavior.

## Use and ownership
- Several actions share a named scope.
- Avoid: Replacing single/multiple selection or a toolbar with an action group.
- Library: Native group semantics and action spacing.
- Application: Scope, name, and each action's state.

## Composition
- Use Group and action-gap; Button members retain their own actual states.

## Responsive behavior
- Horizontal groups wrap by default; vertical groups are available. Member contours stay independent.

## Customization
- className and render belong to the group; do not rewrite every child Button.

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
An open action relationship with role=group by default.
- aria-label / aria-labelledby: string. The shared scope name, separate from action names.
- orientation: "horizontal" | "vertical"; default "horizontal". Layout direction.
- align / wrap / render / ref / native props: ButtonGroupProps. Uses Group composition props with action spacing.

## Keyboard
- Tab / Shift+Tab: Visit each available action; disabled actions leave the tab order.

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
