# Sidebar

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: 864f6f002a0eff2017e4734fba6a479f17e55b424e6cbeee7f6f97e0e7597b54

Persistent navigation, an icon rail when collapsed, and an expandable sub-level.

## Decision
Collapsing produces an icon rail, not a hidden panel: navigation and links stay mounted, names switch to visually hidden (accessible name unchanged) with a Tooltip restoring a visible name; a sub-level's inline panel becomes a Popover over the same content in the rail, and its open/closed memory survives collapsing. Active and routes are explicit application facts.

## Notes
- The expanded width defaults to --qy-sidebar-width (side insets + item padding + one icon + the gap + room for a 12-character label; 12 is a preset), and a caller's w-* still overrides it; the collapsed rail's width is one fill control height plus insets on both sides, and a visible Toggle is always available.
- The current item is marked by a rounded surface one step deeper than the hover surface, plus medium weight: hover is one wash step, current is one ink step, so a row under the pointer never looks like the current one, and the weight is a second cue that does not rely on colour. The current item carries no line (user ruling: a straight line and a rounded surface are never combined on one item); the guide line beside a sub-level only expresses membership and the current item does not deepen it.
- The sub-level chevron points inward when closed and down when open, the same mark as a Tree branch; when the parent has no icon, the guide line drops from the start of its text.
- The current item uses the selected surface (--qy-sidebar-current = --qy-surface-selected): a translucent ink wash that always sits one step darker than the sidebar's own ground, so a project that changes --qy-sidebar need not set it.
- The account entry at the end needs no part of its own: MenuTrigger renders a SidebarLink, and the SidebarLink renders a button (an Avatar as icon, the name as the MenuTrigger's children). The name is the button's accessible name, so the Avatar is aria-hidden; in the rail only the avatar remains and a Tooltip restores the name.
- In the collapsed rail, the sub-level and item-name overlays open toward the inline end: right in ltr, left in rtl. The rail's sub-level entry forwards passed aria-*, data-*, and events to its trigger just as the expanded one does. The application's layout decides which edge the sidebar sits on; the toggle icon mirrors horizontally in rtl.
- A sidebar has at most two levels (one under SidebarSub); the third level does not go in the sidebar. A SidebarSub inside another SidebarSub throws during development (matching the library's other structural contracts, rather than quietly indenting one more level). Put the third level in the content area, carried by Tabs or an in-page secondary nav, with a Breadcrumb to say where you are. See "Sub-level navigation with Tabs in the content".
- A SidebarGroup with a SidebarGroupLabel is a role=group named by that label; a group without one is only layout. A caller's aria-label or aria-labelledby takes precedence.
- Narrow screens use drawer: the same children move into a drawer opened by SidebarDrawerTrigger; the current item is marked there as usual, and activating an item that goes to a new page (including client-router links that preventDefault) closes it, except items with aria-haspopup (such as an account menu). Server rendering outputs the wide form and a narrow client swaps in the drawer after mounting. See "Narrow screens: a drawer carries the sidebar".

## Use and ownership
- Persistent navigation beside a workspace.
- Avoid: No built-in business directory; third-level navigation goes in content-area Tabs, not the sidebar.
- Library: Collapsing, nav semantics, and focus return.
- Application: Actual destinations, active state, and layout width.

## Composition
- Sidebar / SidebarToggle: The sidebar container (no landmark of its own; the inner nav is the landmark) and a reversible toggle.
- SidebarDrawerTrigger: The icon button that opens the sidebar drawer on narrow screens, named "Open workspace navigation". Place it anywhere inside a Workspace (usually first in WorkspaceHeader); it is hidden at wide widths and leaves neither space nor a Tab stop.
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
- createSidebarDrawerHandle: function; owner external; PASS
- Sidebar: function; owner sidebar; PASS; props: SidebarProps
- SidebarChangeDetails: interface; owner sidebar; PASS
- SidebarContent: function; owner sidebar; PASS; props: SidebarContentProps
- SidebarContentProps: type; owner sidebar; PASS
- SidebarDrawerHandle: interface; owner external; PASS
- SidebarDrawerTrigger: function; owner sidebar; PASS; props: SidebarDrawerTriggerProps
- SidebarDrawerTriggerProps: type; owner sidebar; PASS
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
- `drawer?`: `boolean`. 窄屏（< 40rem，与全库同一个点）把侧栏收进一个从起始侧滑出的抽屉，由 SidebarDrawerTrigger 打开；更宽时仍是原位的侧栏。 断点固定、不开放配置（用户裁决 2026-10-31）：SidebarDrawerTrigger 的 sm:hidden 与它是同一个点。 40rem 以上一律是原位侧栏，库不按宽度自动收起；中等宽度要不要收成 rail 由应用用 collapsed / defaultCollapsed 决定。 抽屉里就是同一份 children：当前项照常标出，点去往新页面的条目后抽屉关闭。服务端渲染按「够宽」输出，窄屏客户端挂载后换成抽屉。
- `drawerHandle?`: `SidebarDrawerHandle`. 抽屉与它的触发按钮之间的关联。在 Workspace 里省略即可（外壳持有一个）；不在 Workspace 里时，用 createSidebarDrawerHandle() 创建并同时交给 SidebarDrawerTrigger。
- `onCollapsedChange?`: `(collapsed: boolean, details: SidebarChangeDetails) => void`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarContent
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SidebarDrawerTrigger
- `className?`: `string`.
- `data-slot?`: `string`.
- `handle?`: `SidebarDrawerHandle`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

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
- Context GroupLabelContext: without a provider nullable; provided by SidebarGroup
- Context InSubPanel: without a provider default-value; provided by SidebarSubContent
- Context InSubTree: without a provider default-value; provided by SidebarSub
- Context SidebarContext: without a provider throws; provided by SidebarSubContent, sidebar
- Context SidebarHandleContext: without a provider nullable
- Context SidebarSubLabelContext: without a provider nullable; provided by SidebarSub
- Context SubTriggerHasIcon: without a provider default-value; provided by SidebarSub

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Sidebar / SidebarToggle
The sidebar container (no landmark of its own; the inner nav is the landmark) and a reversible toggle.
- collapsed / defaultCollapsed / onCollapsedChange: boolean / callback. Expanded by default; details.cancel() rejects a change.
- drawer / drawerHandle: boolean / SidebarDrawerHandle; default false. Below 40rem the sidebar moves into a drawer that slides in from the inline start, opened by SidebarDrawerTrigger; at wider widths it stays in place and never collapses on its own: to show the rail at medium widths, the app controls collapsed. The drawer holds the same children: the current item is marked as usual, navigating closes it, and SidebarToggle becomes a close button. Inside a Workspace the shell holds the handle, so omit drawerHandle; outside one, create it with createSidebarDrawerHandle() and give it to both Sidebar and SidebarDrawerTrigger. Missing both throws. The drawer code loads the first time the layout narrows, so wide first screens do not carry it.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### SidebarDrawerTrigger
The icon button that opens the sidebar drawer on narrow screens, named "Open workspace navigation". Place it anywhere inside a Workspace (usually first in WorkspaceHeader); it is hidden at wide widths and leaves neither space nor a Tab stop.
- handle: SidebarDrawerHandle. Outside a Workspace, the same handle as Sidebar's drawerHandle.
- render / native props: Drawer trigger props. Renders as a quiet icon button by default; aria-expanded comes from the drawer.

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

### 窄屏：抽屉承载侧栏
Source: apps/docs/src/content/sidebar/demos/04-narrow.tsx
```tsx
import * as React from "react";
import { IconDatabase, IconLayoutDashboard, IconSettings } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarDrawerTrigger, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarLink, SidebarTitle, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import { Workspace, WorkspaceContent, WorkspaceHeader, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "窄屏：抽屉承载侧栏", titleEn: "Narrow screens: a drawer carries the sidebar", flush: true } satisfies DemoMeta;

// 窄屏（< 40rem）时侧栏进入抽屉，WorkspaceHeader 里出现打开它的按钮；更宽时就是原位的侧栏。
export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const pages = [
    { id: "overview", name: en ? "Overview" : "概览", icon: <IconLayoutDashboard aria-hidden="true" /> },
    { id: "collections", name: en ? "Collections" : "集合", icon: <IconDatabase aria-hidden="true" /> },
    { id: "settings", name: en ? "Settings" : "设置", icon: <IconSettings aria-hidden="true" /> },
  ];
  const [page, setPage] = React.useState("collections");
  return <div className="h-[calc(20*var(--qy-cai))]">
    <Workspace>
      <Sidebar drawer>
        <SidebarHeader><SidebarTitle render={<h2 />}>{en ? "Qingye" : "青野工作区"}</SidebarTitle><SidebarToggle /></SidebarHeader>
        <SidebarContent className="mt-(--qy-field-group-gap)">
          <SidebarGroup>
            <SidebarGroupLabel>{en ? "Pages" : "页面"}</SidebarGroupLabel>
            {pages.map(item => <SidebarLink key={item.id} render={<button type="button" onClick={() => setPage(item.id)} />} active={page === item.id} icon={item.icon}>{item.name}</SidebarLink>)}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader><SidebarDrawerTrigger /><WorkspaceTitle level={4}>{pages.find(item => item.id === page)?.name}</WorkspaceTitle></WorkspaceHeader>
        <WorkspaceContent render={<div />} />
      </WorkspaceSurface>
    </Workspace>
  </div>;
}
```

### 二级导航与内容区 Tabs
Source: apps/docs/src/content/sidebar/demos/05-levels.tsx
```tsx
import * as React from "react";
import { IconDatabase, IconSettings } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger } from "@qingye_lab/ui/components/sidebar";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { Workspace, WorkspaceContent, WorkspaceHeader, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "二级导航与内容区 Tabs", titleEn: "Sub-level navigation with Tabs in the content", flush: true } satisfies DemoMeta;

// 侧栏到二级为止：第三级是「通知」这一页里的并列视角，放在内容区的 Tabs，不再往侧栏里缩。
export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const t = (zh: string, enText: string) => en ? enText : zh;
  const [page, setPage] = React.useState("notifications");
  const link = (id: string, name: string) => <SidebarLink render={<button type="button" onClick={() => setPage(id)} />} active={page === id}>{name}</SidebarLink>;
  return <div className="h-[calc(20*var(--qy-cai))]">
    <Workspace>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarLink render={<button type="button" onClick={() => setPage("collections")} />} active={page === "collections"} icon={<IconDatabase aria-hidden="true" />}>{t("集合", "Collections")}</SidebarLink>
            <SidebarSub defaultOpen>
              <SidebarSubTrigger icon={<IconSettings aria-hidden="true" />}>{t("设置", "Settings")}</SidebarSubTrigger>
              <SidebarSubContent>{link("account", t("账户", "Account"))}{link("notifications", t("通知", "Notifications"))}</SidebarSubContent>
            </SidebarSub>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader><WorkspaceTitle level={4}>{page === "account" ? t("账户", "Account") : page === "notifications" ? t("通知", "Notifications") : t("集合", "Collections")}</WorkspaceTitle></WorkspaceHeader>
        <WorkspaceContent render={<div />} className="p-(--qy-page-gutter)">
          {page === "notifications" && <Tabs defaultValue="mail">
            <TabsList aria-label={t("通知渠道", "Channel")}><TabsTab value="mail">{t("邮件", "Email")}</TabsTab><TabsTab value="push">{t("推送", "Push")}</TabsTab><TabsTab value="digest">{t("摘要", "Digest")}</TabsTab></TabsList>
            <TabsPanel value="mail">{t("邮件", "Email")}</TabsPanel><TabsPanel value="push">{t("推送", "Push")}</TabsPanel><TabsPanel value="digest">{t("摘要", "Digest")}</TabsPanel>
          </Tabs>}
        </WorkspaceContent>
      </WorkspaceSurface>
    </Workspace>
  </div>;
}
```
