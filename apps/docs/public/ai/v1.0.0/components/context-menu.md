# 上下文菜单 ContextMenu

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/context-menu
Source: packages/ui/src/components/context-menu.tsx
Source SHA-256: 576477f81ad788ebfb4c68ebe7a69749a717fceb8536e321ad506f3911684d34

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
- ContextMenuTrigger: function; owner context-menu; PASS; props: ContextMenuTriggerProps
- ContextMenuTriggerProps: type; owner context-menu; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ContextMenu / ContextMenuTrigger
同一对象的 Root 与可聚焦触发区域。
- disabled / onOpenChange: Base UI Root props. 禁用根不打开；details.cancel() 可拒绝变化。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### ContextMenuPortal / ContextMenuPositioner / ContextMenuPopup
上下文 Root 自己的浮层。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

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
