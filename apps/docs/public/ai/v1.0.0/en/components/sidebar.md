# Sidebar

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: 492cabf9207da7da4f7619fddf89ba897fc440a79e179b2ffdf29d1f29af9674

Persistent navigation, an icon rail when collapsed, and an expandable sub-level.

## Decision
Collapsing produces an icon rail, not a hidden panel: navigation and links stay mounted, names switch to visually hidden (accessible name unchanged) with a Tooltip restoring a visible name; a sub-level's inline panel becomes a Popover over the same content in the rail, and its open/closed memory survives collapsing. Active and routes are explicit application facts.

## Notes
- Applications choose the expanded width; the collapsed rail's width is given by the library as one fill control height plus insets on both sides, and a visible Toggle is always available.

## Use and ownership
- Persistent navigation beside a workspace.
- Avoid: Use Drawer for a narrow-screen overlay; no built-in business directory.
- Library: Collapsing, nav semantics, and focus return.
- Application: Actual destinations, active state, and layout width.

## Composition
- Sidebar / SidebarToggle: An aside and reversible toggle.
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
- SidebarGroup: function; owner sidebar; PASS; props: SidebarGroupProps
- SidebarGroupLabel: function; owner sidebar; PASS; props: SidebarGroupLabelProps
- SidebarGroupLabelProps: type; owner sidebar; PASS
- SidebarGroupProps: type; owner sidebar; PASS
- SidebarLink: function; owner sidebar; PASS; props: SidebarLinkProps
- SidebarLinkProps: type; owner sidebar; PASS
- SidebarProps: type; owner sidebar; PASS
- SidebarSub: function; owner sidebar; PASS; props: SidebarSubProps
- SidebarSubContent: function; owner sidebar; PASS; props: SidebarSubContentProps
- SidebarSubContentProps: type; owner sidebar; PASS
- SidebarSubProps: type; owner sidebar; PASS
- SidebarSubTrigger: function; owner sidebar; PASS; props: SidebarSubTriggerProps
- SidebarSubTriggerProps: type; owner sidebar; PASS
- SidebarToggle: function; owner sidebar; PASS; props: SidebarToggleProps
- SidebarToggleProps: type; owner sidebar; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Sidebar / SidebarToggle
An aside and reversible toggle.
- collapsed / defaultCollapsed / onCollapsedChange: boolean / callback. Expanded by default; details.cancel() rejects a change.
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
import { LayoutPanelLeftIcon, ListTreeIcon, SquareStackIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可逆导航与二级", titleEn: "Reversible navigation with a sub-level" } satisfies DemoMeta;
export default function Demo() {
  return <Sidebar className="w-full max-w-sm"><SidebarToggle /><SidebarContent aria-label="组件侧栏"><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="/components/sidebar" active icon={<LayoutPanelLeftIcon aria-hidden="true" />}>侧栏导航</SidebarLink><SidebarSub defaultOpen><SidebarSubTrigger icon={<SquareStackIcon aria-hidden="true" />}>视角标签</SidebarSubTrigger><SidebarSubContent><SidebarLink href="/components/tabs">标签页</SidebarLink><SidebarLink href="/components/segmented-control">分段控件</SidebarLink></SidebarSubContent></SidebarSub><SidebarLink href="/components/tree" icon={<ListTreeIcon aria-hidden="true" />}>层级集合</SidebarLink></SidebarGroup></SidebarContent></Sidebar>;
}
```
