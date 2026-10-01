import { Button } from "@qingye/ui/components/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuLinkDescription, NavigationMenuLinkTitle, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@qingye/ui/components/navigation-menu";
import { Sheet, SheetHeader, SheetPanel, SheetPopup, SheetTitle, SheetTrigger } from "@qingye/ui/components/sheet";
import { MenuIcon } from "lucide-react";

export const meta = {
  title: "响应式",
  description: "≥640px 显示导航菜单；更窄时换成抽屉菜单，链接平铺、点按区域更大。缩小窗口查看效果。",
};

const solutions = [
  { title: "电商零售", description: "商品、订单与会员一体化运营。" },
  { title: "企业服务", description: "审批、合同与客户成功的协同工作台。" },
  { title: "教育培训", description: "课程排期、学员管理与学习数据分析。" },
];

const links = ["客户案例", "定价", "联系我们"];

export default function Demo() {
  return (
    <header className="flex w-full max-w-2xl items-center justify-between gap-4 rounded-xl border px-3 py-2">
      <span className="font-semibold text-sm">青云</span>
      <NavigationMenu className="max-sm:hidden">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>解决方案</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-80 gap-0.5">
                {solutions.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#">
                      <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                      <NavigationMenuLinkDescription>{item.description}</NavigationMenuLinkDescription>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {links.map((link) => (
            <NavigationMenuItem key={link}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                {link}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger render={<Button aria-label="打开导航" className="sm:hidden" size="icon" variant="ghost" />}>
          <MenuIcon />
        </SheetTrigger>
        <SheetPopup side="right">
          <SheetHeader>
            <SheetTitle>导航</SheetTitle>
          </SheetHeader>
          <SheetPanel>
            <nav aria-label="主导航" className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <p className="px-2 font-medium text-muted-foreground text-xs">解决方案</p>
                {solutions.map((item) => (
                  <a className="flex min-h-11 items-center rounded-md px-2 text-base hover:bg-accent" href="#" key={item.title}>
                    {item.title}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {links.map((link) => (
                  <a className="flex min-h-11 items-center rounded-md px-2 text-base hover:bg-accent" href="#" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            </nav>
          </SheetPanel>
        </SheetPopup>
      </Sheet>
    </header>
  );
}
