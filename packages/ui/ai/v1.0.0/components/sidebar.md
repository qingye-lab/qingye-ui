# 侧栏导航 Sidebar

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: 0c6075becf42680a09312f73e073e4c01b8d341fb26a55b8ac22a407ad8a3df9

长期导航与可逆收起。

## Decision
收起只改变导航可见性，保留挂载；active 与路由由应用明确提供。

## Notes
- 应用决定宽度与收起策略；始终保留可见 Toggle。

## Use and ownership
- 工作面旁的长期导航。
- Avoid: 窄屏弹层抽屉用 Drawer；不内置业务目录。
- Library: 收起、nav 语义与焦点返回。
- Application: 真实目的地、active 和布局宽度。

## Composition
- Sidebar / SidebarToggle：aside 与可逆开关。
- SidebarContent / SidebarGroup / SidebarGroupLabel：原生 nav 与导航组。
- SidebarLink：真实页面链接。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

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
aside 与可逆开关。
- collapsed / defaultCollapsed / onCollapsedChange: boolean / callback. 默认展开；details.cancel() 拒绝变化。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### SidebarContent / SidebarGroup / SidebarGroupLabel
原生 nav 与导航组。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### SidebarLink
真实页面链接。
- href / active: native anchor / boolean. active 显式写 aria-current；收起焦点内容会返回 Toggle。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

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
