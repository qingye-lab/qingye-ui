# Sidebar

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: 9925f959754e4462b4b2f9524f0847c72a00790f93db79811fc5ad1b74dc8ef3

Persistent navigation, an icon rail when collapsed, and an expandable sub-level.

## Decision
Collapsing produces an icon rail, not a hidden panel: navigation and links stay mounted, names switch to visually hidden (accessible name unchanged) with a Tooltip restoring a visible name; a sub-level's inline panel becomes a Popover over the same content in the rail, and its open/closed memory survives collapsing. Active and routes are explicit application facts.

## Notes
- Applications choose the expanded width; the collapsed rail's width is given by the library as one fill control height plus insets on both sides, and a visible Toggle is always available.
- The current item is marked by its rounded filled surface alone, with no line and no change of font weight (user ruling, 2026-10-12: one boundary mechanism per region). The guide line beside a sub-level only expresses membership; the current item does not deepen it.
- The current item uses the selected surface (--qy-sidebar-current = --qy-surface-selected): a translucent ink wash that always sits one step darker than the sidebar's own ground, so a project that changes --qy-sidebar need not set it.
- The account entry at the end needs no part of its own: MenuTrigger renders a SidebarLink, and the SidebarLink renders a button (an Avatar as icon, the name as the MenuTrigger's children). The name is the button's accessible name, so the Avatar is aria-hidden; in the rail only the avatar remains and a Tooltip restores the name.
- In the collapsed rail, the sub-level and item-name overlays open toward the inline end: right in ltr, left in rtl. The rail's sub-level entry forwards passed aria-*, data-*, and events to its trigger just as the expanded one does. The application's layout decides which edge the sidebar sits on; the toggle icon mirrors horizontally in rtl.

## Use and ownership
- Persistent navigation beside a workspace.
- Avoid: Use Drawer for a narrow-screen overlay; no built-in business directory.
- Library: Collapsing, nav semantics, and focus return.
- Application: Actual destinations, active state, and layout width.

## Composition
- Sidebar / SidebarToggle: An aside and reversible toggle.
- SidebarHeader / SidebarTitle: The first row: identity first, SidebarToggle last. In the rail they stack and centre, and the title stays for assistive technology.
- SidebarFooter: The end slot, pinned to the bottom of the column; holds the account entry.
- SidebarContent / SidebarGroup / SidebarGroupLabel: A native nav and navigation groups.
- SidebarLink: A real page link.
- SidebarSub / SidebarSubTrigger / SidebarSubContent: An expandable sub-level of destinations: an inline panel when expanded, and a Popover over the same links in the rail, reachable by hover or focus.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

## Current exports
- Sidebar: function; owner sidebar; PASS; props: SidebarProps
- SidebarChangeDetails: interface; owner sidebar; PASS
- SidebarContent: function; owner sidebar; PASS; props: SidebarContentProps
- SidebarContentProps: type; owner sidebar; PASS
- SidebarFooter: function; owner sidebar; PASS; props: SidebarFooterProps
- SidebarFooterProps: type; owner sidebar; PASS
- SidebarGroup: function; owner sidebar; PASS; props: SidebarGroupProps
- SidebarGroupLabel: function; owner sidebar; PASS; props: SidebarGroupLabelProps
- SidebarGroupLabelProps: type; owner sidebar; PASS
- SidebarGroupProps: type; owner sidebar; PASS
- SidebarHeader: function; owner sidebar; PASS; props: SidebarHeaderProps
- SidebarHeaderProps: type; owner sidebar; PASS
- SidebarLink: function; owner sidebar; PASS; props: SidebarLinkProps
- SidebarLinkProps: type; owner sidebar; PASS
- SidebarProps: type; owner sidebar; PASS
- SidebarSub: function; owner sidebar; PASS; props: SidebarSubProps
- SidebarSubContent: function; owner sidebar; PASS; props: SidebarSubContentProps
- SidebarSubContentProps: type; owner sidebar; PASS
- SidebarSubProps: type; owner sidebar; PASS
- SidebarSubTrigger: function; owner sidebar; PASS; props: SidebarSubTriggerProps
- SidebarSubTriggerProps: type; owner sidebar; PASS
- SidebarTitle: function; owner sidebar; PASS; props: SidebarTitleProps
- SidebarTitleProps: type; owner sidebar; PASS
- SidebarToggle: function; owner sidebar; PASS; props: SidebarToggleProps
- SidebarToggleProps: type; owner sidebar; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Sidebar
- `collapsed?`: `boolean`.
- `defaultCollapsed?`: `boolean`.
- `onCollapsedChange?`: `(collapsed: boolean, details: SidebarChangeDetails) => void`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarContent
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarFooter
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarGroup
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarGroupLabel
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarHeader
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarLink
- `active?`: `boolean`.
- `count?`: `number`.
- `icon?`: `React.ReactNode`.
- `max?`: `number`.
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### SidebarSub
- `children`: `React.ReactNode`.
- plus 281 inherited (@types/react 274, @base-ui/react 7); not expanded, see the installed declarations

### SidebarSubContent
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### SidebarSubTrigger
- `icon?`: `React.ReactNode`.
- plus 289 inherited (@types/react 285, @base-ui/react 4); not expanded, see the installed declarations

### SidebarTitle
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarToggle
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context SidebarContext: without a provider throws; provided by Sidebar, SidebarSubContent
- Context SidebarSubLabelContext: without a provider nullable; provided by SidebarSub

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Sidebar / SidebarToggle
An aside and reversible toggle.
- collapsed / defaultCollapsed / onCollapsedChange: boolean / callback. Expanded by default; details.cancel() rejects a change.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### SidebarHeader / SidebarTitle
The first row: identity first, SidebarToggle last. In the rail they stack and centre, and the title stays for assistive technology.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### SidebarFooter
The end slot, pinned to the bottom of the column; holds the account entry.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### SidebarContent / SidebarGroup / SidebarGroupLabel
A native nav and navigation groups.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### SidebarLink
A real page link.
- href / active: native anchor / boolean. Active explicitly writes aria-current; focus only falls back to Toggle when its location truly becomes unreachable after collapsing (for example, focus was inside a sub-level that the rail replaces).
- icon: ReactNode. The only visible identifier in the rail; a link without an icon has nothing to show once collapsed. The name (children) is only visually hidden (sr-only) in the rail — the accessible name is unchanged, and a Tooltip restores a sighted label.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### SidebarSub / SidebarSubTrigger / SidebarSubContent
An expandable sub-level of destinations: an inline panel when expanded, and a Popover over the same links in the rail, reachable by hover or focus.
- SidebarSub：open / defaultOpen / onOpenChange: boolean / callback. The same open state serves both the expanded panel and the rail's Popover; the remembered open/closed state survives collapsing even though the rail swaps in a Popover.
- SidebarSubTrigger：icon: ReactNode. Same split as SidebarLink's icon; in the rail the button no longer toggles the inline panel, only opening the Popover, so collapsing never silently changes an open state the user never chose.

## Keyboard

## Source examples
### 可逆导航与二级
Source: apps/docs/src/content/sidebar/demos/01-task.tsx
```tsx
import { IconLayoutSidebar, IconListTree, IconStack2 } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可逆导航与二级", titleEn: "Reversible navigation with a sub-level" } satisfies DemoMeta;
export default function Demo() {
  return <Sidebar className="w-full max-w-sm"><SidebarToggle /><SidebarContent aria-label="组件侧栏"><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="/components/sidebar" active icon={<IconLayoutSidebar aria-hidden="true" />}>侧栏导航</SidebarLink><SidebarSub defaultOpen><SidebarSubTrigger icon={<IconStack2 aria-hidden="true" />}>视角标签</SidebarSubTrigger><SidebarSubContent><SidebarLink href="/components/tabs">标签页</SidebarLink><SidebarLink href="/components/segmented-control">分段控件</SidebarLink></SidebarSubContent></SidebarSub><SidebarLink href="/components/tree" icon={<IconListTree aria-hidden="true" />}>层级集合</SidebarLink></SidebarGroup></SidebarContent></Sidebar>;
}
```

### 当前位置
Source: apps/docs/src/content/sidebar/demos/02-current.tsx
```tsx
import { IconLayoutSidebar, IconListTree, IconStack2 } from "@tabler/icons-react";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Sidebar, SidebarContent, SidebarGroup, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "当前位置", titleEn: "Current location" } satisfies DemoMeta;

function Links({ current }: { current: "sidebar" | "tabs" }) {
  return <SidebarGroup>
    <SidebarLink href="/components/sidebar" active={current === "sidebar"} icon={<IconLayoutSidebar aria-hidden="true" />}>侧栏导航</SidebarLink>
    <SidebarSub defaultOpen>
      <SidebarSubTrigger icon={<IconStack2 aria-hidden="true" />}>视角标签</SidebarSubTrigger>
      <SidebarSubContent>
        <SidebarLink href="/components/tabs" active={current === "tabs"}>标签页</SidebarLink>
        <SidebarLink href="/components/segmented-control">分段控件</SidebarLink>
      </SidebarSubContent>
    </SidebarSub>
    <SidebarLink href="/components/tree" icon={<IconListTree aria-hidden="true" />}>层级集合</SidebarLink>
  </SidebarGroup>;
}

export default function Demo() {
  return <Inline gap="section" align="start" className="w-full">
    <Sidebar className="w-full max-w-xs"><SidebarToggle /><SidebarContent aria-label="当前位置在二级"><Links current="tabs" /></SidebarContent></Sidebar>
    <Sidebar defaultCollapsed><SidebarToggle /><SidebarContent aria-label="收起时的当前位置"><Links current="sidebar" /></SidebarContent></Sidebar>
  </Inline>;
}
```

### 标识与账户入口
Source: apps/docs/src/content/sidebar/demos/03-identity.tsx
```tsx
import { IconLayoutSidebar, IconListTree } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarLink, SidebarTitle, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "标识与账户入口", titleEn: "Identity and account entry" } satisfies DemoMeta;
export default function Demo() {
  return <Sidebar aria-label="标识与账户" className="min-h-96 w-full max-w-xs">
    <SidebarHeader>
      <span aria-hidden="true" className="grid size-(--qy-control-xs) shrink-0 place-items-center rounded-(--qy-radius-xs) bg-foreground text-support-strong text-surface">青</span>
      <SidebarTitle>青野工作区</SidebarTitle>
      <SidebarToggle />
    </SidebarHeader>
    <SidebarContent aria-label="标识与账户导航" className="mt-(--qy-field-group-gap) flex-1">
      <SidebarGroup>
        <SidebarLink href="/components/sidebar" active icon={<IconLayoutSidebar aria-hidden="true" />}>侧栏导航</SidebarLink>
        <SidebarLink href="/components/tree" icon={<IconListTree aria-hidden="true" />}>层级集合</SidebarLink>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <Menu>
        <MenuTrigger render={<SidebarLink icon={<Avatar size="sm" label="陈致远" aria-hidden="true"><AvatarFallback>陈</AvatarFallback></Avatar>} render={<button type="button" />} />}>陈致远</MenuTrigger>
        <MenuPortal><MenuPositioner side="top" align="start"><MenuPopup>
          <MenuItem>账户</MenuItem>
          <MenuSeparator />
          <MenuItem>退出登录</MenuItem>
        </MenuPopup></MenuPositioner></MenuPortal>
      </Menu>
    </SidebarFooter>
  </Sidebar>;
}
```
