# 命令菜单 Menu

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/menu
Source: packages/ui/src/components/menu.tsx
Source SHA-256: 917bc69f5bd14aaee1175e12782bb07e84c8a77a5790dfd805bcd43ae43f336e

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
- MenuMarkerPosition: type; owner menu; PASS
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
- `inset?`: `boolean`.
- `markerPosition?`: `"start" | "end"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 285 inherited (@types/react 273, @base-ui/react 12); not expanded, see the installed declarations

### MenuGroup
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

### MenuGroupLabel
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### MenuItem
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 282 inherited (@types/react 273, @base-ui/react 9); not expanded, see the installed declarations

### MenuLinkItem
- `inset?`: `boolean`.
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
- `inset?`: `boolean`.
- `markerPosition?`: `"start" | "end"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 283 inherited (@types/react 273, @base-ui/react 10); not expanded, see the installed declarations

### MenuSeparator
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### MenuSubmenu
- no props declared by this library
- plus 12 inherited (@base-ui/react 12); not expanded, see the installed declarations

### MenuSubmenuTrigger
- `inset?`: `boolean`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 284 inherited (@types/react 273, @base-ui/react 11); not expanded, see the installed declarations

### MenuTrigger
- no props declared by this library
- plus 294 inherited (@types/react 283, @base-ui/react 11); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- 危险操作需显式后果与独立保护；Root/Portal/Positioner/Popup 属于同一上下文。
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
- inset: boolean. 在逻辑起点为同档图标与字段间隔留位，使无图标命令与前导标记的文字列对齐；默认 false。MenuGroupLabel 也支持 size/inset。
- markerPosition: start | end. 仅勾选与单选项，控制实际标记的逻辑位置；默认 end 保持现有外观。状态与键盘语义不变。
- checked / value / onCheckedChange: Base UI choice props. 勾选项读 checked，单选项读 value；选择由调用方事实与原语取消协议确认。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### MenuGroup / MenuGroupLabel / MenuSeparator / MenuRadioGroup / MenuPrimitive
组语义与底层公开原语。
- value / defaultValue / onValueChange: Base UI MenuRadioGroup props. 单选组的当前值在 MenuRadioGroup 上。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard
- ↑ / ↓ / Home / End: 在菜单中移动焦点。
- Enter / Space / Escape: 执行可用命令或关闭并返回入口。

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

### 前导标记与紧凑命令
Source: apps/docs/src/content/menu/demos/03-leading-markers.tsx
```tsx
import { Menu, MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { IconListCheck } from "@tabler/icons-react";

export const meta = { title: "前导标记与紧凑命令", titleEn: "Leading marks and compact commands" };
export default function Demo() {
  return <Menu><MenuTrigger>显示选项</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
    <MenuGroup><MenuGroupLabel size="sm" inset>内容</MenuGroupLabel>
      <MenuItem size="sm"><IconListCheck aria-hidden="true" /><span>检查显示</span></MenuItem>
      <MenuCheckboxItem size="sm" markerPosition="start" defaultChecked closeOnClick={false}>显示说明</MenuCheckboxItem>
      <MenuCheckboxItem size="sm" markerPosition="start" closeOnClick={false}>显示编号</MenuCheckboxItem>
      <MenuItem size="sm" inset>重置显示</MenuItem>
    </MenuGroup><MenuSeparator />
    <MenuRadioGroup defaultValue="current"><MenuRadioItem size="sm" value="current" markerPosition="start" closeOnClick={false}>当前范围</MenuRadioItem><MenuRadioItem size="sm" value="all" markerPosition="start" closeOnClick={false}>全部范围</MenuRadioItem></MenuRadioGroup>
  </MenuPopup></MenuPositioner></MenuPortal></Menu>;
}
```
