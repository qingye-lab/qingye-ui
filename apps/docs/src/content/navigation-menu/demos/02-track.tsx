import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@qingye_lab/ui/components/navigation-menu";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "轨道外观", titleEn: "Track appearance" } satisfies DemoMeta;
export default function Demo() {
  return <NavigationMenu aria-label="站点" appearance="track"><NavigationMenuList>
    <NavigationMenuItem value="overview"><NavigationMenuLink href="/components/navigation-menu" active>概览</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem value="tabs"><NavigationMenuLink href="/components/tabs">标签页</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem value="table"><NavigationMenuLink href="/components/table">比较表</NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList></NavigationMenu>;
}
