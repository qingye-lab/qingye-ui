# 导航菜单 NavigationMenu

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/navigation-menu
Source: packages/ui/src/components/navigation-menu.tsx
Source SHA-256: abc91fdc8bbf4ab987c0cc35f6b9e5e35ba590dd845c7cc556000d16d97acf10

真实链接、可展开的导航分组与面板内的组名、说明。

## Decision
active 是应用提供的页面事实，库不读 URL 或把命令推断成导航。

## Notes
- 链接不因导航未展开而失去真实 href；不内置路由。

## Use and ownership
- 有限目的地需要分组展开。
- Avoid: 当前对象视角用 Tabs；命令用 Menu。
- Library: 导航与展开原语、浮层位置。
- Application: 路由 href、active 与命名。

## Composition
- NavigationMenu / NavigationMenuList / NavigationMenuItem：nav、ul 与稳定 value 的导航项。
- NavigationMenuTrigger / NavigationMenuLink：组触发器与真实链接。
- NavigationMenuGroup / NavigationMenuGroupLabel：面板内的分组与不可操作的组名。
- NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive：同一导航 Root 的内容与浮层。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

## Current exports
- NavigationMenu: function; owner navigation-menu; PASS; props: NavigationMenuProps<Value>
- NavigationMenuContent: function; owner navigation-menu; PASS; props: NavigationMenuContentProps
- NavigationMenuContentProps: type; owner navigation-menu; PASS
- NavigationMenuGroup: function; owner navigation-menu; PASS; props: NavigationMenuGroupProps
- NavigationMenuGroupLabel: function; owner navigation-menu; PASS; props: NavigationMenuGroupLabelProps
- NavigationMenuGroupLabelProps: type; owner navigation-menu; PASS
- NavigationMenuGroupProps: type; owner navigation-menu; PASS
- NavigationMenuItem: function; owner navigation-menu; PASS; props: NavigationMenuItemProps
- NavigationMenuItemProps: type; owner navigation-menu; PASS
- NavigationMenuLink: function; owner navigation-menu; PASS; props: NavigationMenuLinkProps
- NavigationMenuLinkProps: type; owner navigation-menu; PASS
- NavigationMenuList: function; owner navigation-menu; PASS; props: NavigationMenuListProps
- NavigationMenuListProps: type; owner navigation-menu; PASS
- NavigationMenuPopup: function; owner navigation-menu; PASS; props: NavigationMenuPopupProps
- NavigationMenuPopupProps: type; owner navigation-menu; PASS
- NavigationMenuPortal: const; owner navigation-menu; UNVERIFIED
- NavigationMenuPositioner: function; owner navigation-menu; PASS; props: NavigationMenuPositionerProps
- NavigationMenuPositionerProps: type; owner navigation-menu; PASS
- NavigationMenuPrimitive: reexport; owner navigation-menu; UNVERIFIED
- NavigationMenuProps: type; owner navigation-menu; PASS
- NavigationMenuTrigger: function; owner navigation-menu; PASS; props: NavigationMenuTriggerProps
- NavigationMenuTriggerProps: type; owner navigation-menu; PASS
- NavigationMenuViewport: function; owner navigation-menu; PASS; props: NavigationMenuViewportProps
- NavigationMenuViewportProps: type; owner navigation-menu; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### NavigationMenu
- no props declared by this library
- plus 286 inherited (@types/react 275, @base-ui/react 11); not expanded, see the installed declarations

### NavigationMenuContent
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### NavigationMenuGroup
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### NavigationMenuGroupLabel
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### NavigationMenuItem
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### NavigationMenuLink
- `description?`: `React.ReactNode`.
- plus 288 inherited (@types/react 283, @base-ui/react 5); not expanded, see the installed declarations

### NavigationMenuList
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### NavigationMenuPopup
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### NavigationMenuPortal
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### NavigationMenuPositioner
- no props declared by this library
- plus 290 inherited (@types/react 275, @base-ui/react 15); not expanded, see the installed declarations

### NavigationMenuTrigger
- no props declared by this library
- plus 289 inherited (@types/react 284, @base-ui/react 5); not expanded, see the installed declarations

### NavigationMenuViewport
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### NavigationMenu / NavigationMenuList / NavigationMenuItem
nav、ul 与稳定 value 的导航项。
- value / defaultValue / onValueChange: Base UI Root props. 展开分组受控或非受控；取消保留当前值。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### NavigationMenuTrigger / NavigationMenuLink
组触发器与真实链接。
- href / active: native link / boolean. href 指向真实位置；active 写 aria-current=page。
- description（NavigationMenuLink，面板内使用）: ReactNode. 一行浓墨说明，只在能帮读者判断去留时给出；顶栏导航线的单行目的地不接受它。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### NavigationMenuGroup / NavigationMenuGroupLabel
面板内的分组与不可操作的组名。
- render / ref / native props: Base UI part props. 组名不是链接也不是按钮，只识别不操作；组间距比组内更松，没有分组时面板仍是一份紧凑列表。

### NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive
同一导航 Root 的内容与浮层。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard

## Source examples
### 真实目的地与分组
Source: apps/docs/src/content/navigation-menu/demos/01-task.tsx
```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, NavigationMenuGroup, NavigationMenuGroupLabel, NavigationMenuPortal, NavigationMenuPositioner, NavigationMenuPopup, NavigationMenuViewport } from "@qingye_lab/ui/components/navigation-menu";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "真实目的地与分组", titleEn: "Real destinations, grouped" } satisfies DemoMeta;
export default function Demo() {
  return <NavigationMenu aria-label="组件导航"><NavigationMenuList><NavigationMenuItem value="current"><NavigationMenuLink href="/components/navigation-menu" active>导航菜单</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem value="inputs"><NavigationMenuTrigger>输入</NavigationMenuTrigger><NavigationMenuContent>
    <NavigationMenuGroup>
      <NavigationMenuGroupLabel>文本</NavigationMenuGroupLabel>
      <NavigationMenuLink href="/components/input" description="单行文本与附属动作">文本输入</NavigationMenuLink>
      <NavigationMenuLink href="/components/field">字段</NavigationMenuLink>
    </NavigationMenuGroup>
    <NavigationMenuGroup>
      <NavigationMenuGroupLabel>选择</NavigationMenuGroupLabel>
      <NavigationMenuLink href="/components/select">选择框</NavigationMenuLink>
    </NavigationMenuGroup>
  </NavigationMenuContent></NavigationMenuItem><NavigationMenuItem value="table"><NavigationMenuLink href="/components/table">比较表</NavigationMenuLink></NavigationMenuItem></NavigationMenuList><NavigationMenuPortal><NavigationMenuPositioner><NavigationMenuPopup><NavigationMenuViewport /></NavigationMenuPopup></NavigationMenuPositioner></NavigationMenuPortal></NavigationMenu>;
}
```
