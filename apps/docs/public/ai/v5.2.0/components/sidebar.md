# 侧栏导航 Sidebar

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: 864f6f002a0eff2017e4734fba6a479f17e55b424e6cbeee7f6f97e0e7597b54

长期导航、收起为图标 rail 与二级子级。

## Decision
收起是图标 rail，不是隐藏：导航与链接保持挂载，名称切到视觉隐藏（可访问名称不变），用 Tooltip 补足可见名称；二级子级展开态用内嵌面板，rail 态换成同一组内容的 Popover，开合记忆不因侧栏收起而改变。active 与路由由应用明确提供。

## Notes
- 展开宽度默认读 --qy-sidebar-width（两侧内缘 + 条目内缩 + 一枚图标 + 间隔 + 12 个汉字的标签容量；12 字是预设），调用方的 w-* 仍可覆盖；收起宽度由库按一个填值控件高加两侧内缩给出，始终保留可见 Toggle。
- 当前项用圆角的面标出，比悬停面深一级，并加中等字重：悬停是一级清染，当前是一级清墨，指针经过的行不会和当前项长得一样；字重是不靠颜色的第二信号。当前项不画线（用户裁决：直线与圆角面不在同一项上并用）；二级条目左侧的引导线只表达归属，当前项不加深它。
- 二级入口的展开记号收起时朝内、展开时朝下，与 Tree 的分支同一画法；父项没有图标时，引导线从父项文字的起笔垂下。
- 当前项是选中面（--qy-sidebar-current = --qy-surface-selected）：墨的透明叠合，叠在侧栏自己的底上总深一级，项目改 --qy-sidebar 时不必另设。
- 末位的账户入口不另设部件：MenuTrigger 的 render 交给 SidebarLink，SidebarLink 再 render 为 button（icon 放 Avatar，名称写在 MenuTrigger 的 children）。名称是按钮的可访问名称，所以 Avatar 加 aria-hidden；收起时只剩头像，名称由 Tooltip 摆出。
- 收起的窄轨里，二级子级与条目名称的浮层朝内联结束侧（inline-end）打开：ltr 在右，rtl 在左；窄轨二级入口与展开态一样把传入的 aria-*、data-*、事件交给触发元素。侧栏本身贴哪一边由应用的布局决定，切换按钮的图标在 rtl 下水平镜像。
- 侧栏最多两级（SidebarSub 下一层），第三级不进侧栏：在 SidebarSub 里再放 SidebarSub 会在开发期直接抛错（与本库其他结构契约一致，而不是悄悄多缩进一层）。第三级放在内容区，用 Tabs 或页内次级导航承载，必要时用 Breadcrumb 交代位置。见「二级导航与内容区 Tabs」。
- 带 SidebarGroupLabel 的 SidebarGroup 成为 role=group，名称取自标签；没有标签的分组只是排布。调用方自己给 aria-label 或 aria-labelledby 时以调用方为准。
- 窄屏用 drawer：同一份 children 在窄屏进入抽屉，由 SidebarDrawerTrigger 打开；抽屉里当前项照常标出，点去往新页面的条目（含客户端路由里 preventDefault 的链接）后关闭，不关的是带 aria-haspopup 的条目（如账户菜单）。服务端渲染按「够宽」输出，窄屏客户端挂载后换成抽屉。见「窄屏：抽屉承载侧栏」。

## Use and ownership
- 工作面旁的长期导航。
- Avoid: 不内置业务目录；第三级导航不进侧栏，放在内容区的 Tabs。
- Library: 收起、nav 语义与焦点返回。
- Application: 真实目的地、active 和布局宽度。

## Composition
- Sidebar / SidebarToggle：侧栏容器（不产生地标，导航地标由内部的 nav 给出）与可逆开关。
- SidebarDrawerTrigger：窄屏打开侧栏抽屉的图标按钮，名称「打开工作区导航」。放在 Workspace 里任何位置（通常是 WorkspaceHeader 的第一项）；宽屏隐去，不占位也不进 Tab 顺序。
- SidebarHeader / SidebarTitle：第一行：身份在前，SidebarToggle 在后。收起为 rail 时上下叠放并居中，名称留给辅助技术。
- SidebarFooter：末位槽，贴列底；放本人或账户入口。
- SidebarContent / SidebarGroup / SidebarGroupLabel：原生 nav 与导航组。
- SidebarLink：真实页面链接。
- SidebarSub / SidebarSubTrigger / SidebarSubContent：可展开的二级目的地：展开态是内嵌面板，rail 态换成同一组链接的 Popover，悬停或聚焦都能打开。

## Responsive behavior
- 宽屏侧栏在原位，可收起为图标 rail；窄屏（< 40rem）用 drawer 收进抽屉，由 WorkspaceHeader 里的 SidebarDrawerTrigger 打开。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

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
侧栏容器（不产生地标，导航地标由内部的 nav 给出）与可逆开关。
- collapsed / defaultCollapsed / onCollapsedChange: boolean / callback. 默认展开；details.cancel() 拒绝变化。
- drawer / drawerHandle: boolean / SidebarDrawerHandle; default false. 窄屏（< 40rem）把侧栏收进从起始侧滑出的抽屉，由 SidebarDrawerTrigger 打开；更宽时仍在原位，不按宽度自动收起，中等宽度要收成 rail 由应用控制 collapsed。抽屉里是同一份 children：当前项照常标出，点去往新页面的条目后关闭，SidebarToggle 换成关闭按钮。在 Workspace 里 handle 由外壳持有，省略 drawerHandle；不在 Workspace 里时用 createSidebarDrawerHandle() 创建并同时交给 Sidebar 与 SidebarDrawerTrigger。两者都没有会抛错。抽屉代码在第一次变窄时才加载，宽屏首屏不带它。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### SidebarDrawerTrigger
窄屏打开侧栏抽屉的图标按钮，名称「打开工作区导航」。放在 Workspace 里任何位置（通常是 WorkspaceHeader 的第一项）；宽屏隐去，不占位也不进 Tab 顺序。
- handle: SidebarDrawerHandle. 不在 Workspace 里时，与 Sidebar 的 drawerHandle 相同。
- render / native props: Drawer trigger props. 默认渲染为 quiet 图标按钮；aria-expanded 由抽屉给出。

### SidebarHeader / SidebarTitle
第一行：身份在前，SidebarToggle 在后。收起为 rail 时上下叠放并居中，名称留给辅助技术。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### SidebarFooter
末位槽，贴列底；放本人或账户入口。
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
        <SidebarContent aria-label="窄屏侧栏导航" className="mt-(--qy-field-group-gap)">
          <SidebarGroup>
            <SidebarGroupLabel>{en ? "Pages" : "页面"}</SidebarGroupLabel>
            {pages.map(item => <SidebarLink key={item.id} render={<button type="button" onClick={() => setPage(item.id)} />} active={page === item.id} icon={item.icon}>{item.name}</SidebarLink>)}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader><SidebarDrawerTrigger /><WorkspaceTitle level={3}>{pages.find(item => item.id === page)?.name}</WorkspaceTitle></WorkspaceHeader>
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
        <SidebarContent aria-label="两级侧栏导航">
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
