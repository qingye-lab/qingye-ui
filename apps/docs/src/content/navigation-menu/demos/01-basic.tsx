import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuLinkDescription, NavigationMenuLinkIcon, NavigationMenuLinkTitle, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@yanqing/ui/components/navigation-menu";
import { BarChart3Icon, BookOpenIcon, LayersIcon, ShieldCheckIcon, WorkflowIcon, ZapIcon } from "lucide-react";

export const meta = {
  title: "基础用法",
  description: "在两个触发器之间移动，弹层会平滑改变尺寸，内容沿移动方向切换。",
};

const products = [
  { icon: BarChart3Icon, title: "数据看板", description: "实时查看核心指标，自定义图表与告警。" },
  { icon: WorkflowIcon, title: "自动化流程", description: "把重复操作编排成流程，按条件自动触发。" },
  { icon: LayersIcon, title: "设计系统", description: "统一组件、令牌与文档，团队协作更顺畅。" },
  { icon: ShieldCheckIcon, title: "权限与审计", description: "细粒度角色管理，所有操作留痕可查。" },
];

const resources = [
  { title: "快速上手", description: "十分钟完成安装并搭建第一个页面。" },
  { title: "最佳实践", description: "表单、表格与空状态的推荐写法。" },
  { title: "更新日志", description: "每个版本的新功能与破坏性变更。" },
];

export default function Demo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>产品</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-0.5 sm:w-[34rem] sm:grid-cols-2">
              {products.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink href="#">
                    <NavigationMenuLinkIcon>
                      <item.icon />
                    </NavigationMenuLinkIcon>
                    <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                    <NavigationMenuLinkDescription>{item.description}</NavigationMenuLinkDescription>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>资源</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 sm:w-[30rem] sm:grid-cols-[11rem_1fr]">
              <NavigationMenuLink
                className="flex flex-col items-start justify-end gap-1 bg-muted/72 p-4 hover:bg-muted"
                href="#"
              >
                <ZapIcon aria-hidden="true" className="mb-6 size-5 opacity-80" />
                <NavigationMenuLinkTitle>青云 UI 2.0</NavigationMenuLinkTitle>
                <NavigationMenuLinkDescription className="line-clamp-3">
                  全新主题令牌与深色模式，现已发布。
                </NavigationMenuLinkDescription>
              </NavigationMenuLink>
              <ul className="grid gap-0.5">
                {resources.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#">
                      <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                      <NavigationMenuLinkDescription>{item.description}</NavigationMenuLinkDescription>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
            <BookOpenIcon aria-hidden="true" />
            文档
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="max-sm:hidden">
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
            定价
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
