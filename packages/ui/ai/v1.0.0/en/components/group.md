# Group

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/group
Source: packages/ui/src/components/group.tsx
Source SHA-256: 8b91bd767da9aaf6fe2b64f18a15137f42ef6d58fc2fc0a407ededa4dedb3af1

Arrange related members with a direction and a spacing role.

## Decision
Group arranges position. Use Fieldset for a shared field question and ButtonGroup for an action scope; member names and states stay independent.

## Use and ownership
- Several members share a layout relationship.
- Avoid: Layout containers impersonating fields, toolbars, or selection collections.
- Library: Direction, wrapping, and existing gap roles.
- Application: Members, names, scope, and state.

## Composition
- Horizontal uses Inline and vertical uses Stack; native render or an explicit role supplies semantics.

## Responsive behavior
- Horizontal layout wraps by default, retaining document order.

## Customization
- gap uses layout's five relationship roles; there is no default enclosure.

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
An open layout with no default role.
- orientation: "horizontal" | "vertical"; default "horizontal". Layout direction without changing DOM order.
- gap: "field" | "fields" | "actions" | "panel" | "section"; default "panel". An existing spacing role.
- align / wrap: InlineProps. Uses layout public props; wrap applies horizontally.
- render / ref / native props: InlineProps. Forwards native semantics, events, ARIA and styling.

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
