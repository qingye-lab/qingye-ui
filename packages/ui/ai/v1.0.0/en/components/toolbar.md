# Toolbar

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/toolbar
Source: packages/ui/src/components/toolbar.tsx
Source SHA-256: 2cb3aa0977b43eb4eb9857dc5102b6c53efb2cfadbd272efd91a3caa547f3332

Actual groups, arrow-key focus and operable actions.

## Decision
Base UI Toolbar owns roving focus and group disabling. Buttons compose current Button; links retain navigation; action names and selection facts belong to the application.

## Notes
- Use Toolbar for persistent related operations; ordinary button collections may use ButtonGroup.

## Use and ownership
- Persistent related actions need one keyboard entry with arrow navigation.
- Avoid: Use ButtonGroup for ordinary adjacent actions and links for destinations.
- Library: Base UI roving focus, orientation, group disabling, and event guards.
- Application: Action names, actual selected/disabled states, and execution outcomes.

## Composition
- Toolbar: Base UI Toolbar.Root.
- ToolbarGroup: Name and disable related actions together.
- ToolbarButton: An actual command that composes Button by default.
- ToolbarLink / ToolbarSeparator: A real anchor and orientation-aware group separator.

## Responsive behavior
- Horizontal actions may wrap; vertical layouts use corresponding arrows.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- Toolbar: function; owner toolbar; PASS; props: ToolbarProps
- ToolbarButton: function; owner toolbar; PASS; props: ToolbarButtonProps
- ToolbarButtonProps: type; owner toolbar; PASS
- ToolbarGroup: function; owner toolbar; PASS; props: ToolbarGroupProps
- ToolbarGroupProps: type; owner toolbar; PASS
- ToolbarLink: function; owner toolbar; PASS; props: ToolbarLinkProps
- ToolbarLinkProps: type; owner toolbar; PASS
- ToolbarPrimitive: reexport; owner toolbar; UNVERIFIED
- ToolbarProps: type; owner toolbar; PASS
- ToolbarSeparator: function; owner toolbar; PASS; props: ToolbarSeparatorProps
- ToolbarSeparatorProps: type; owner toolbar; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Toolbar
Base UI Toolbar.Root.
- orientation / loopFocus / disabled / aria-label / render / ref: ToolbarPrimitive.Root.Props; default orientation="horizontal", loopFocus=true. The application names the toolbar; orientation sets the arrow-key axis.

### ToolbarGroup
Name and disable related actions together.
- disabled / aria-label / render / ref / native props: ToolbarPrimitive.Group.Props. Disabled state reaches actual controls inside the group.

### ToolbarButton
An actual command that composes Button by default.
- size / variant: ButtonProps[size | variant]; default size="md", variant="quiet". Reuse foundation size and surface presets.
- disabled / focusableWhenDisabled / render / ref / nativeButton: ToolbarPrimitive.Button.Props. Custom renders must supply a valid button or mature trigger and retain the focus and event chain.

### ToolbarLink / ToolbarSeparator
A real anchor and orientation-aware group separator.
- href / orientation / render / ref / primitive props: ToolbarPrimitive.Link.Props | ToolbarPrimitive.Separator.Props. Links navigate; separators generate no command.

## Keyboard
- Tab / Shift+Tab: Enter or leave the whole toolbar.
- Arrow keys / Home / End: Base UI moves focus along the toolbar orientation.
- Enter / Space: Activate the actual command.

## Source examples
### 命令、分组与焦点
Source: apps/docs/src/content/toolbar/demos/01-format.tsx
```tsx
import { useState } from "react";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from "@qingye_lab/ui/components/toolbar";
import { Text } from "@qingye_lab/ui/components/typography";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "命令、分组与焦点", titleEn: "Commands, groups and focus" } satisfies DemoMeta;
export default function Demo() {
  const [strong, setStrong] = useState(false);
  return <Stack><Toolbar aria-label="文本操作"><ToolbarGroup aria-label="格式"><ToolbarButton aria-pressed={strong} onClick={() => setStrong(!strong)}>加粗</ToolbarButton><ToolbarButton disabled={!strong} onClick={() => setStrong(false)}>恢复</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarLink href="/components/typography">文字</ToolbarLink></Toolbar><Text step={strong ? "body-strong" : "body"}>一段文字</Text></Stack>;
}
```
