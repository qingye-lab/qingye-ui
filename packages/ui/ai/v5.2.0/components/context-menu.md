# 上下文菜单 ContextMenu

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/context-menu
Source: packages/ui/src/components/context-menu.tsx
Source SHA-256: 735ccc846c990c30f8e0c87be3d494cc5d541b64a59db1c0e736f9616170d67a

当前对象的右键增强命令入口。

## Decision
右键不是唯一入口；应用同时提供可见 Menu，并复用同一组真实命令。

## Notes
- 演示中的可见 Menu 与右键区域共用动作；不模拟业务服务。

## Use and ownership
- 对象已有可见操作入口，可附加右键便捷方式。
- Avoid: 不要只给右键入口或用长按隐藏必须完成的操作。
- Library: 上下文打开、关闭与键盘命令。
- Application: 目标对象与同组可见入口。

## Composition
- ContextMenu / ContextMenuTrigger：同一对象的 Root 与可聚焦触发区域。
- ContextMenuPortal / ContextMenuPositioner / ContextMenuPopup：上下文 Root 自己的浮层。
- ContextMenuSwitchItem：开关式的勾选项，与 MenuSwitchItem 共用实现。
- ContextMenuItem / ContextMenuLinkItem / ContextMenuCheckboxItem / ContextMenuRadioItem / ContextMenuSubmenuTrigger：复用本库 Menu 的公开部位与尺寸。
- ContextMenuGroup / ContextMenuGroupLabel / ContextMenuSeparator / ContextMenuSubmenu / ContextMenuRadioGroup / ContextMenuPrimitive：组、分隔与公开原语。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

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
- ContextMenuSwitchItem: function; owner context-menu; PASS; props: MenuSwitchItemProps
- ContextMenuTrigger: function; owner context-menu; PASS; props: ContextMenuTriggerProps
- ContextMenuTriggerProps: type; owner context-menu; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ContextMenu
- no props declared by this library
- plus 12 inherited (@base-ui/react 12); not expanded, see the installed declarations

### ContextMenuCheckboxItem
- `inset?`: `boolean`.
- `markerPosition?`: `"start" | "end"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 285 inherited (@types/react 273, @base-ui/react 12); not expanded, see the installed declarations

### ContextMenuGroup
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

### ContextMenuGroupLabel
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ContextMenuItem
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- plus 282 inherited (@types/react 273, @base-ui/react 9); not expanded, see the installed declarations

### ContextMenuLinkItem
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 288 inherited (@types/react 282, @base-ui/react 6); not expanded, see the installed declarations

### ContextMenuPopup
- no props declared by this library
- plus 279 inherited (@types/react 273, @base-ui/react 6); not expanded, see the installed declarations

### ContextMenuPortal
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### ContextMenuPositioner
- no props declared by this library
- plus 290 inherited (@types/react 275, @base-ui/react 15); not expanded, see the installed declarations

### ContextMenuRadioGroup
- no props declared by this library
- plus 282 inherited (@types/react 274, @base-ui/react 8); not expanded, see the installed declarations

### ContextMenuRadioItem
- `inset?`: `boolean`.
- `markerPosition?`: `"start" | "end"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 283 inherited (@types/react 273, @base-ui/react 10); not expanded, see the installed declarations

### ContextMenuSeparator
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### ContextMenuSubmenu
- no props declared by this library
- plus 12 inherited (@base-ui/react 12); not expanded, see the installed declarations

### ContextMenuSubmenuTrigger
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 284 inherited (@types/react 273, @base-ui/react 11); not expanded, see the installed declarations

### ContextMenuSwitchItem
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 285 inherited (@types/react 273, @base-ui/react 12); not expanded, see the installed declarations

### ContextMenuTrigger
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ContextMenu / ContextMenuTrigger
同一对象的 Root 与可聚焦触发区域。
- disabled / onOpenChange: Base UI Root props. 禁用根不打开；details.cancel() 可拒绝变化。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### ContextMenuPortal / ContextMenuPositioner / ContextMenuPopup
上下文 Root 自己的浮层。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### ContextMenuSwitchItem
开关式的勾选项，与 MenuSwitchItem 共用实现。
- checked / onCheckedChange / size / inset / disabled: MenuSwitchItemProps. 语义仍是 menuitemcheckbox；槽是装饰，读屏只听到勾选状态。

### ContextMenuItem / ContextMenuLinkItem / ContextMenuCheckboxItem / ContextMenuRadioItem / ContextMenuSubmenuTrigger
复用本库 Menu 的公开部位与尺寸。
- size / disabled / choice props: Menu part props. 不跨 Root 套用 Popover；选择状态与事件保持真实。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### ContextMenuGroup / ContextMenuGroupLabel / ContextMenuSeparator / ContextMenuSubmenu / ContextMenuRadioGroup / ContextMenuPrimitive
组、分隔与公开原语。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard

## Source examples
### 可见入口与右键
Source: apps/docs/src/content/context-menu/demos/01-task.tsx
```tsx
import * as React from "react";
import { ContextMenu, ContextMenuTrigger, ContextMenuPortal, ContextMenuPositioner, ContextMenuPopup, ContextMenuItem } from "@qingye_lab/ui/components/context-menu";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem } from "@qingye_lab/ui/components/menu";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可见入口与右键", titleEn: "Visible and context triggers" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false); const label = marked ? "取消标记" : "标记"; const action = () => setMarked(value => !value);
  return <Stack><Inline><ContextMenu><ContextMenuTrigger className="p-(--qy-panel-padding-sm) border border-border">接入设备 · {marked ? "已标记" : "未标记"}</ContextMenuTrigger><ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup><ContextMenuItem onClick={action}>{label}</ContextMenuItem></ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal></ContextMenu><Menu><MenuTrigger>接入设备操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem onClick={action}>{label}</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu></Inline></Stack>;
}
```

### 开关式勾选项
Source: apps/docs/src/content/context-menu/demos/02-switch.tsx
```tsx
import * as React from "react";
import { ContextMenu, ContextMenuTrigger, ContextMenuPortal, ContextMenuPositioner, ContextMenuPopup, ContextMenuSwitchItem } from "@qingye_lab/ui/components/context-menu";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "开关式勾选项", titleEn: "Switch-style checked item" } satisfies DemoMeta;
export default function Demo() {
  const [muted, setMuted] = React.useState(false);
  return <ContextMenu><ContextMenuTrigger className="p-(--qy-panel-padding-sm) border border-border">接入设备 · {muted ? "已静音" : "未静音"}</ContextMenuTrigger><ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup>
    <ContextMenuSwitchItem checked={muted} onCheckedChange={setMuted} closeOnClick={false}>静音</ContextMenuSwitchItem>
  </ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal></ContextMenu>;
}
```
