import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, NavigationMenuGroup, NavigationMenuGroupLabel, NavigationMenuPortal, NavigationMenuPositioner, NavigationMenuPopup, NavigationMenuViewport } from "@qingye/ui/components/navigation-menu";
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
