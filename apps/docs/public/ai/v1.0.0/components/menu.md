# 命令菜单 Menu

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/menu
Source: packages/ui/src/components/menu.tsx
Source SHA-256: f465cbfa11005ef6f41a52e9f092368bea25f42369fcc4ed189b1cebadaf1710

与当前任务相关的临时命令和选择。

## Decision
Menu 执行动作，LinkItem 导航。禁用不等于隐藏；原语可让禁用项聚焦，但禁止执行。

## Notes
- 危险操作需显式后果与独立保护；Root/Portal/Positioner/Popup 属于同一上下文。

## Use and ownership
- 同一对象或工作面有一组临时命令。
- Avoid: 长期导航用 NavigationMenu 或 Sidebar；多个值输入用 Select。
- Library: 键盘、打开、焦点返回与取消。
- Application: 命令、选择值、禁用原因与危险后果。

## Composition
- Menu / MenuSubmenu：公开 Base UI 命令根与子菜单。
- MenuTrigger / MenuPositioner / MenuPopup / MenuPortal：触发器与同一 Root 所属的浮层。
- MenuItem / MenuLinkItem / MenuCheckboxItem / MenuRadioItem / MenuSubmenuTrigger：动作、真实导航、勾选、单选与下级命令。
- MenuGroup / MenuGroupLabel / MenuSeparator / MenuRadioGroup / MenuPrimitive：组语义与底层公开原语。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- 危险操作需显式后果与独立保护；Root/Portal/Positioner/Popup 属于同一上下文。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Menu / MenuSubmenu
公开 Base UI 命令根与子菜单。
- open / defaultOpen / onOpenChange: Base UI Root props. 应用可控制打开；details.cancel() 保留原状态。

### MenuTrigger / MenuPositioner / MenuPopup / MenuPortal
触发器与同一 Root 所属的浮层。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。
- side / align / style: Base UI Positioner props. 共享 popup 层级写在 Positioner；调用方 style 最后合并。

### MenuItem / MenuLinkItem / MenuCheckboxItem / MenuRadioItem / MenuSubmenuTrigger
动作、真实导航、勾选、单选与下级命令。
- size: xs | sm | md | lg | xl; default md. 复用 Button 五档；禁用项可聚焦但不能执行。
- checked / value / onCheckedChange / onValueChange: Base UI choice props. 选择由调用方事实与原语取消协议确认。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### MenuGroup / MenuGroupLabel / MenuSeparator / MenuRadioGroup / MenuPrimitive
组语义与底层公开原语。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard
- ↑ / ↓ / Home / End: 在菜单中移动焦点。
- Enter / Space / Escape: 执行可用命令或关闭并返回入口。

## Source examples
### 当前条目的命令
Source: apps/docs/src/content/menu/demos/01-task.tsx
```tsx
import * as React from "react";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem, MenuCheckboxItem, MenuSeparator } from "@qingye/ui/components/menu";
import { Inline, Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "当前条目的命令", titleEn: "Commands for the current item" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false); const [items, setItems] = React.useState(["权限与角色", "接入设备"]);
  return <Stack><Inline><Menu><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem disabled={items[0] === "接入设备"} onClick={() => setItems(value => ["接入设备", ...value.filter(item => item !== "接入设备")])}>移到首位</MenuItem><MenuItem disabled>恢复</MenuItem><MenuSeparator /><MenuCheckboxItem checked={marked} onCheckedChange={setMarked}>标记接入设备</MenuCheckboxItem></MenuPopup></MenuPositioner></MenuPortal></Menu></Inline><p className="m-0 text-body">接入设备 · {marked ? "已标记" : "未标记"}</p><ol className="m-0 text-body">{items.map(item => <li key={item}>{item}</li>)}</ol></Stack>;
}
```
