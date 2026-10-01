const e=`import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@qingye/ui/components/menu";
import { Fragment } from "react";

export const meta = {
  title: "窄屏折叠",
  description: "宽屏显示完整路径；窄于 640px 时中间层收进省略菜单，当前页过长时截断。",
};

const middle = ["设备管理", "华东机房", "机柜 A-12"];

export default function Demo() {
  return (
    <Breadcrumb className="w-full max-w-xl">
      <BreadcrumbList className="flex-nowrap *:shrink-0">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">控制台</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="sm:hidden">
          <Menu>
            <MenuTrigger
              aria-label="显示更多路径"
              className="flex size-6 items-center justify-center rounded-md outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent"
            >
              <BreadcrumbEllipsis />
            </MenuTrigger>
            <MenuPopup align="start">
              {middle.map((name) => (
                <MenuItem key={name} render={<a href="#" />}>
                  {name}
                </MenuItem>
              ))}
            </MenuPopup>
          </Menu>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="sm:hidden" />
        {middle.map((name) => (
          <Fragment key={name}>
            <BreadcrumbItem className="hidden sm:inline-flex">
              <BreadcrumbLink href="#">{name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block" />
          </Fragment>
        ))}
        <BreadcrumbItem className="min-w-0 shrink!">
          <BreadcrumbPage className="truncate">服务器 hz-a12-07（Ubuntu 24.04）</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
`;export{e as default};
