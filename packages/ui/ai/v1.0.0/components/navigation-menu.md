# 导航菜单 NavigationMenu

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/navigation-menu
Source: packages/ui/src/components/navigation-menu.tsx
Source SHA-256: a29ac0a115bd1732a7a0c452313dbf9f1d14865eb2224f82741f9f481767d613

真实链接与可展开的导航分组。

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
- NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive：同一导航 Root 的内容与浮层。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

## Current exports
- NavigationMenu: function; owner navigation-menu; PASS; props: NavigationMenuProps<Value>
- NavigationMenuContent: function; owner navigation-menu; PASS; props: NavigationMenuContentProps
- NavigationMenuContentProps: type; owner navigation-menu; PASS
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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NavigationMenu / NavigationMenuList / NavigationMenuItem
nav、ul 与稳定 value 的导航项。
- value / defaultValue / onValueChange: Base UI Root props. 展开分组受控或非受控；取消保留当前值。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### NavigationMenuTrigger / NavigationMenuLink
组触发器与真实链接。
- href / active: native link / boolean. href 指向真实位置；active 写 aria-current=page。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive
同一导航 Root 的内容与浮层。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard

## Source examples
### 真实目的地
Source: apps/docs/src/content/navigation-menu/demos/01-task.tsx
```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, NavigationMenuPortal, NavigationMenuPositioner, NavigationMenuPopup, NavigationMenuViewport } from "@qingye/ui/components/navigation-menu";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "真实目的地", titleEn: "Real destinations" } satisfies DemoMeta;
export default function Demo() {
  return <NavigationMenu aria-label="组件导航"><NavigationMenuList><NavigationMenuItem value="current"><NavigationMenuLink href="/components/navigation-menu" active>导航菜单</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem value="inputs"><NavigationMenuTrigger>输入</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="/components/input">文本输入</NavigationMenuLink><NavigationMenuLink href="/components/field">字段</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem><NavigationMenuItem value="table"><NavigationMenuLink href="/components/table">比较表</NavigationMenuLink></NavigationMenuItem></NavigationMenuList><NavigationMenuPortal><NavigationMenuPositioner><NavigationMenuPopup><NavigationMenuViewport /></NavigationMenuPopup></NavigationMenuPositioner></NavigationMenuPortal></NavigationMenu>;
}
```
