import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { N as NavigationMenu, a as NavigationMenuList, b as NavigationMenuItem, e as NavigationMenuLink, n as navigationMenuTriggerStyle } from "./navigation-menu-SXg5wGUX.js";
import "./chevron-down-DlWyuvnt.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
const meta = {
  title: "简单链接",
  description: "只有顶层链接时同样适用；active 标记当前页面并设置 aria-current。"
};
const pages = ["概览", "项目", "团队", "设置"];
function Demo() {
  const [current, setCurrent] = reactExports.useState("项目");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuList, { children: pages.map((page) => /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    NavigationMenuLink,
    {
      active: page === current,
      className: navigationMenuTriggerStyle(),
      href: "#",
      onClick: (event) => {
        event.preventDefault();
        setCurrent(page);
      },
      children: page
    }
  ) }, page)) }) });
}
export {
  Demo as default,
  meta
};
