# ContextMenu

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/context-menu
Source: packages/ui/src/components/context-menu.tsx
Source SHA-256: 576477f81ad788ebfb4c68ebe7a69749a717fceb8536e321ad506f3911684d34

A context-menu enhancement for commands on the current object.

## Decision
Right click is an enhancement; applications also provide a visible Menu using the same real commands.

## Notes
- The visible Menu and context region share commands; no business service is simulated.

## Use and ownership
- An object already has visible actions and may add right-click shortcuts.
- Avoid: Right-click or long press must not be the sole entry for required actions.
- Library: Context opening, closing, and keyboard commands.
- Application: Target objects and corresponding visible actions.

## Composition
- ContextMenu / ContextMenuTrigger: Root and focusable trigger region for the same object.
- ContextMenuPortal / ContextMenuPositioner / ContextMenuPopup: Floating parts belonging to the context root.
- ContextMenuItem / ContextMenuLinkItem / ContextMenuCheckboxItem / ContextMenuRadioItem / ContextMenuSubmenuTrigger: Reuses this library's public Menu parts and sizes.
- ContextMenuGroup / ContextMenuGroupLabel / ContextMenuSeparator / ContextMenuSubmenu / ContextMenuRadioGroup / ContextMenuPrimitive: Groups, separators and public primitives.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

## Current exports
- ContextMenu: function; owner context-menu; PASS; props: ContextMenuProps
- ContextMenuCheckboxItem: function; owner context-menu; PASS; props: MenuCheckboxItemProps
- ContextMenuGroup: function; owner context-menu; PASS; props: MenuGroupProps
- ContextMenuGroupLabel: function; owner context-menu; PASS; props: MenuGroupLabelProps
- ContextMenuItem: function; owner context-menu; PASS; props: MenuItemProps
- ContextMenuLinkItem: function; owner context-menu; PASS; props: MenuLinkItemProps
- ContextMenuPopup: function; owner context-menu; PASS; props: MenuPopupProps
- ContextMenuPortal: const; owner context-menu; UNVERIFIED
- ContextMenuPositioner: function; owner context-menu; PASS; props: MenuPositionerProps
- ContextMenuPrimitive: reexport; owner context-menu; UNVERIFIED
- ContextMenuProps: type; owner context-menu; PASS
- ContextMenuRadioGroup: function; owner context-menu; PASS; props: ContextMenuPrimitive.RadioGroup.Props
- ContextMenuRadioItem: function; owner context-menu; PASS; props: MenuRadioItemProps
- ContextMenuSeparator: function; owner context-menu; PASS; props: MenuSeparatorProps
- ContextMenuSubmenu: const; owner context-menu; UNVERIFIED
- ContextMenuSubmenuTrigger: function; owner context-menu; PASS; props: MenuSubmenuTriggerProps
- ContextMenuTrigger: function; owner context-menu; PASS; props: ContextMenuTriggerProps
- ContextMenuTriggerProps: type; owner context-menu; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ContextMenu / ContextMenuTrigger
Root and focusable trigger region for the same object.
- disabled / onOpenChange: Base UI Root props. A disabled root never opens; details.cancel() may reject a change.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### ContextMenuPortal / ContextMenuPositioner / ContextMenuPopup
Floating parts belonging to the context root.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### ContextMenuItem / ContextMenuLinkItem / ContextMenuCheckboxItem / ContextMenuRadioItem / ContextMenuSubmenuTrigger
Reuses this library's public Menu parts and sizes.
- size / disabled / choice props: Menu part props. Never place another root's Popover parts here; preserve real choices and events.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### ContextMenuGroup / ContextMenuGroupLabel / ContextMenuSeparator / ContextMenuSubmenu / ContextMenuRadioGroup / ContextMenuPrimitive
Groups, separators and public primitives.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

## Keyboard

## Source examples
### 可见入口与右键
Source: apps/docs/src/content/context-menu/demos/01-task.tsx
```tsx
import * as React from "react";
import { ContextMenu, ContextMenuTrigger, ContextMenuPortal, ContextMenuPositioner, ContextMenuPopup, ContextMenuItem } from "@qingye/ui/components/context-menu";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem } from "@qingye/ui/components/menu";
import { Inline, Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可见入口与右键", titleEn: "Visible and context triggers" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false); const label = marked ? "取消标记" : "标记"; const action = () => setMarked(value => !value);
  return <Stack><Inline><ContextMenu><ContextMenuTrigger className="p-(--qy-panel-padding-sm) border border-border">条目 A · {marked ? "已标记" : "未标记"}</ContextMenuTrigger><ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup><ContextMenuItem onClick={action}>{label}</ContextMenuItem></ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal></ContextMenu><Menu><MenuTrigger>条目 A 操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem onClick={action}>{label}</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu></Inline></Stack>;
}
```
