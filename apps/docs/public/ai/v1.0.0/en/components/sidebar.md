# Sidebar

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: 0c6075becf42680a09312f73e073e4c01b8d341fb26a55b8ac22a407ad8a3df9

Persistent navigation with reversible collapse.

## Decision
Collapse changes visibility while retaining mounted navigation; active and routes are explicit application facts.

## Notes
- Applications choose width and collapse policy; keep a visible Toggle available.

## Use and ownership
- Persistent navigation beside a workspace.
- Avoid: Use Drawer for a narrow-screen overlay; no built-in business directory.
- Library: Collapsing, nav semantics, and focus return.
- Application: Actual destinations, active state, and layout width.

## Composition
- Sidebar / SidebarToggle: An aside and reversible toggle.
- SidebarContent / SidebarGroup / SidebarGroupLabel: A native nav and navigation groups.
- SidebarLink: A real page link.

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
- href / active: native anchor / boolean. Active explicitly writes aria-current; collapsing focused content returns focus to Toggle.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

## Keyboard

## Source examples
### 可逆导航
Source: apps/docs/src/content/sidebar/demos/01-task.tsx
```tsx
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarToggle } from "@qingye/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可逆导航", titleEn: "Reversible navigation" } satisfies DemoMeta;
export default function Demo() { return <Sidebar className="w-full max-w-sm"><SidebarToggle /><SidebarContent aria-label="组件侧栏"><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="/components/sidebar" active>侧栏导航</SidebarLink><SidebarLink href="/components/tabs">视角标签</SidebarLink><SidebarLink href="/components/tree">层级集合</SidebarLink></SidebarGroup></SidebarContent></Sidebar>; }
```
