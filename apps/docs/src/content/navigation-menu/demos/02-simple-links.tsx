import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@yanqing/ui/components/navigation-menu";
import { useState } from "react";

export const meta = {
  title: "简单链接",
  description: "只有顶层链接时同样适用；active 标记当前页面并设置 aria-current。",
};

const pages = ["概览", "项目", "团队", "设置"];

export default function Demo() {
  const [current, setCurrent] = useState("项目");
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {pages.map((page) => (
          <NavigationMenuItem key={page}>
            <NavigationMenuLink
              active={page === current}
              className={navigationMenuTriggerStyle()}
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setCurrent(page);
              }}
            >
              {page}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
