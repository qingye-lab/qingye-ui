# NavigationMenu

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/navigation-menu
Source: packages/ui/src/components/navigation-menu.tsx
Source SHA-256: a29ac0a115bd1732a7a0c452313dbf9f1d14865eb2224f82741f9f481767d613

Real links and expandable navigation groups.

## Decision
Active is an application-owned page fact; the library never infers it from URLs or turns commands into navigation.

## Notes
- Links retain real href values; no router is built in.

## Use and ownership
- A finite set of destinations needs grouped disclosure.
- Avoid: Use Tabs for views of the current object and Menu for commands.
- Library: Navigation/disclosure primitives and popup positioning.
- Application: Route hrefs, active facts, and names.

## Composition
- NavigationMenu / NavigationMenuList / NavigationMenuItem: A nav, ul and navigation items with stable values.
- NavigationMenuTrigger / NavigationMenuLink: Group triggers and real links.
- NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive: Content and floating parts belonging to one navigation root.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

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
A nav, ul and navigation items with stable values.
- value / defaultValue / onValueChange: Base UI Root props. Expanded groups may be controlled or uncontrolled; cancellation retains the current value.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### NavigationMenuTrigger / NavigationMenuLink
Group triggers and real links.
- href / active: native link / boolean. Href identifies a real destination; active writes aria-current=page.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive
Content and floating parts belonging to one navigation root.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

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
