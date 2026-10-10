# NavigationMenu

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/navigation-menu
Source: packages/ui/src/components/navigation-menu.tsx
Source SHA-256: 556a511e65cc132455dc7682ff20bbc397bcce73ba677a2806b9b7e360067781

Real links, expandable navigation groups, and in-panel group names with descriptions.

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
- NavigationMenuGroup / NavigationMenuGroupLabel: In-panel grouping and a non-interactive group name.
- NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive: Content and floating parts belonging to one navigation root.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
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
- description（NavigationMenuLink，面板内使用）: ReactNode. One muted description line, given only when it helps the reader decide; a single-line top-bar destination does not accept it.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### NavigationMenuGroup / NavigationMenuGroupLabel
In-panel grouping and a non-interactive group name.
- render / ref / native props: Base UI part props. The group name is neither a link nor a button; it identifies and does not act. Spacing between groups is looser than within one, and a panel with no groups stays a compact list.

### NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive
Content and floating parts belonging to one navigation root.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

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
