# 侧栏导航 Sidebar

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: a02db68627ad2040187d6d11629fe57fca3dea50b217161484adc6611e5b7763

长期导航、收起为图标 rail 与二级子级。

## Decision
收起是图标 rail，不是隐藏：导航与链接保持挂载，名称切到视觉隐藏（可访问名称不变），用 Tooltip 补足可见名称；二级子级展开态用内嵌面板，rail 态换成同一组内容的 Popover，开合记忆不因侧栏收起而改变。active 与路由由应用明确提供。

## Notes
- 应用决定展开宽度；收起宽度由库按一个填值控件高加两侧内缩给出，始终保留可见 Toggle。

## Use and ownership
- 工作面旁的长期导航。
- Avoid: 窄屏弹层抽屉用 Drawer；不内置业务目录。
- Library: 收起、nav 语义与焦点返回。
- Application: 真实目的地、active 和布局宽度。

## Composition
- Sidebar / SidebarToggle：aside 与可逆开关。
- SidebarContent / SidebarGroup / SidebarGroupLabel：原生 nav 与导航组。
- SidebarLink：真实页面链接。
- SidebarSub / SidebarSubTrigger / SidebarSubContent：可展开的二级目的地：展开态是内嵌面板，rail 态换成同一组链接的 Popover，悬停或聚焦都能打开。

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
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
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
- href / active: native anchor / boolean. active 显式写 aria-current；焦点所在之处收起后真的不可达时，才会回退到 Toggle（例如焦点原本在一个二级子级里，侧栏收起换成 rail）。
- icon: ReactNode. 收起为 rail 时唯一可见的识别物；没有图标的条目收起后没有可展示的内容。名称（children）在 rail 下只是视觉隐藏（sr-only），可访问名称不变，并由 Tooltip 把名称重新摆给看得见的人。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### SidebarSub / SidebarSubTrigger / SidebarSubContent
可展开的二级目的地：展开态是内嵌面板，rail 态换成同一组链接的 Popover，悬停或聚焦都能打开。
- SidebarSub：open / defaultOpen / onOpenChange: boolean / callback. 展开态与 rail 态共用同一个开合状态；rail 下即使换成 Popover，用户的开合记忆也不因收起/展开侧栏而改变。
- SidebarSubTrigger：icon: ReactNode. 与 SidebarLink 的 icon 同一分工；rail 下按钮不再承担内嵌展开，只作为 Popover 入口，避免收起侧栏悄悄改变用户没点开过的展开记忆。

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
