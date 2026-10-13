# Menu

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/menu
Source: packages/ui/src/components/menu.tsx
Source SHA-256: 7e809d20421035b742ce559db282b0d5281a5799551875652cfac3bdbbe75166

Temporary commands and choices related to the current task.

## Decision
Menu items execute commands; LinkItem navigates. Disabled items remain discoverable and may receive focus, but cannot execute.

## Notes
- Dangerous actions require explicit consequences and separate protection; Root, Portal, Positioner and Popup share one context.

## Use and ownership
- One object or workspace has temporary commands.
- Avoid: Use NavigationMenu/Sidebar for persistent navigation and Select for value input.
- Library: Keyboard, opening, focus return, and cancellation.
- Application: Commands, selected values, disabled reasons, and danger consequences.

## Composition
- Menu / MenuSubmenu: Public Base UI command roots and submenus.
- MenuTrigger / MenuPositioner / MenuPopup / MenuPortal: Trigger and floating parts owned by the same root.
- MenuItem / MenuLinkItem / MenuCheckboxItem / MenuRadioItem / MenuSubmenuTrigger: Commands, true navigation, checked choices, radio choices and submenus.
- MenuGroup / MenuGroupLabel / MenuSeparator / MenuRadioGroup / MenuPrimitive: Group semantics and the public primitive namespace.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

## Current exports
- Menu: function; owner menu; PASS; props: MenuProps<Payload>
- MenuCheckboxItem: function; owner menu; PASS; props: MenuCheckboxItemProps
- MenuCheckboxItemProps: type; owner menu; PASS
- MenuGroup: function; owner menu; PASS; props: MenuGroupProps
- MenuGroupLabel: function; owner menu; PASS; props: MenuGroupLabelProps
- MenuGroupLabelProps: type; owner menu; PASS
- MenuGroupProps: type; owner menu; PASS
- MenuItem: function; owner menu; PASS; props: MenuItemProps
- MenuItemProps: type; owner menu; PASS
- MenuLinkItem: function; owner menu; PASS; props: MenuLinkItemProps
- MenuLinkItemProps: type; owner menu; PASS
- MenuPopup: function; owner menu; PASS; props: MenuPopupProps
- MenuPopupProps: type; owner menu; PASS
- MenuPortal: const; owner menu; UNVERIFIED
- MenuPositioner: function; owner menu; PASS; props: MenuPositionerProps
- MenuPositionerProps: type; owner menu; PASS
- MenuPrimitive: reexport; owner menu; UNVERIFIED
- MenuProps: type; owner menu; PASS
- MenuRadioGroup: function; owner menu; PASS; props: MenuRadioGroupProps
- MenuRadioGroupProps: type; owner menu; PASS
- MenuRadioItem: function; owner menu; PASS; props: MenuRadioItemProps
- MenuRadioItemProps: type; owner menu; PASS
- MenuSeparator: function; owner menu; PASS; props: MenuSeparatorProps
- MenuSeparatorProps: type; owner menu; PASS
- MenuSubmenu: const; owner menu; UNVERIFIED
- MenuSubmenuTrigger: function; owner menu; PASS; props: MenuSubmenuTriggerProps
- MenuSubmenuTriggerProps: type; owner menu; PASS
- MenuTrigger: function; owner menu; PASS; props: MenuTriggerProps
- MenuTriggerProps: type; owner menu; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Menu
- no props declared by this library
- plus 16 inherited (@base-ui/react 16); not expanded, see the installed declarations

### MenuCheckboxItem
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 285 inherited (@types/react 273, @base-ui/react 12); not expanded, see the installed declarations

### MenuGroup
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

### MenuGroupLabel
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### MenuItem
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 282 inherited (@types/react 273, @base-ui/react 9); not expanded, see the installed declarations

### MenuLinkItem
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 288 inherited (@types/react 282, @base-ui/react 6); not expanded, see the installed declarations

### MenuPopup
- no props declared by this library
- plus 279 inherited (@types/react 273, @base-ui/react 6); not expanded, see the installed declarations

### MenuPortal
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### MenuPositioner
- no props declared by this library
- plus 290 inherited (@types/react 275, @base-ui/react 15); not expanded, see the installed declarations

### MenuRadioGroup
- no props declared by this library
- plus 282 inherited (@types/react 274, @base-ui/react 8); not expanded, see the installed declarations

### MenuRadioItem
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 283 inherited (@types/react 273, @base-ui/react 10); not expanded, see the installed declarations

### MenuSeparator
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### MenuSubmenu
- no props declared by this library
- plus 12 inherited (@base-ui/react 12); not expanded, see the installed declarations

### MenuSubmenuTrigger
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 284 inherited (@types/react 273, @base-ui/react 11); not expanded, see the installed declarations

### MenuTrigger
- no props declared by this library
- plus 294 inherited (@types/react 283, @base-ui/react 11); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Dangerous actions require explicit consequences and separate protection; Root, Portal, Positioner and Popup share one context.
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Menu / MenuSubmenu
Public Base UI command roots and submenus.
- open / defaultOpen / onOpenChange: Base UI Root props. Applications may control open state; details.cancel() retains the current state.

### MenuTrigger / MenuPositioner / MenuPopup / MenuPortal
Trigger and floating parts owned by the same root.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.
- side / align / style: Base UI Positioner props. Shared popup layering targets the Positioner; caller style merges last.

### MenuItem / MenuLinkItem / MenuCheckboxItem / MenuRadioItem / MenuSubmenuTrigger
Commands, true navigation, checked choices, radio choices and submenus.
- size: xs | sm | md | lg | xl; default md. Reuses all five Button sizes; disabled items may receive focus but cannot execute.
- checked / value / onCheckedChange: Base UI choice props. Checkbox items read checked, radio items read value; choices follow caller facts and primitive cancellation.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### MenuGroup / MenuGroupLabel / MenuSeparator / MenuRadioGroup / MenuPrimitive
Group semantics and the public primitive namespace.
- value / defaultValue / onValueChange: Base UI MenuRadioGroup props. The radio group's current value lives on MenuRadioGroup.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

## Keyboard
- ↑ / ↓ / Home / End: Move focus within the menu.
- Enter / Space / Escape: Execute an enabled command or close and return to the trigger.

## Source examples
### 命令菜单
Source: apps/docs/src/content/menu/demos/01-task.tsx
```tsx
import * as React from "react";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem, MenuCheckboxItem, MenuSeparator } from "@qingye_lab/ui/components/menu";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "命令菜单", titleEn: "Command menu" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false);
  return <Menu><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
    <MenuItem>重命名</MenuItem><MenuItem>复制</MenuItem>
    <MenuSeparator />
    <MenuCheckboxItem checked={marked} onCheckedChange={setMarked}>标记</MenuCheckboxItem>
  </MenuPopup></MenuPositioner></MenuPortal></Menu>;
}
```

### 当前条目的命令
Source: apps/docs/src/content/menu/demos/02-commands.tsx
```tsx
import * as React from "react";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem, MenuCheckboxItem, MenuSeparator } from "@qingye_lab/ui/components/menu";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "当前条目的命令", titleEn: "Commands for the current item" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false); const [items, setItems] = React.useState(["权限与角色", "接入设备"]);
  return <Stack><Inline><Menu><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem disabled={items[0] === "接入设备"} onClick={() => setItems(value => ["接入设备", ...value.filter(item => item !== "接入设备")])}>移到首位</MenuItem><MenuItem disabled>恢复</MenuItem><MenuSeparator /><MenuCheckboxItem checked={marked} onCheckedChange={setMarked}>标记接入设备</MenuCheckboxItem></MenuPopup></MenuPositioner></MenuPortal></Menu></Inline><p className="m-0 text-body">接入设备 · {marked ? "已标记" : "未标记"}</p><ol className="m-0 text-body">{items.map(item => <li key={item}>{item}</li>)}</ol></Stack>;
}
```
