# 导航菜单 NavigationMenu

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/navigation-menu
Source: packages/ui/src/components/navigation-menu.tsx
Source SHA-256: be2d825f83e9e9999c30201fd09a696b4a9171a8243d6757bedc1c405cf44159

网站顶部的主导航：顶层触发器展开内容面板，面板之间切换时弹层平滑改变尺寸、内容沿移动方向淡入。适合官网与文档站；手机上建议改用 Sheet 抽屉菜单。

## Use and ownership
- 让网站导航地址及其必要分类可直达，面板提供目标选择依据。
- Avoid: 不能为了面板效果强迫高频地址逐层探索；内容容量由任务决定，不机械限制为六条链接。
- Library: 管理真实链接的 aria-current、触发面板、焦点与共享定位；内容与退出保持可达。
- Application: 维护信息架构、实际路由、权限和进入目标后的返回依据。

## Composition
- 直接目标用 Link，分类用 Trigger + Content；需要移动导航时复用 Sheet，完整地址保持一致。

## Responsive behavior
- 触屏不依赖 hover；长标题与描述保留辨认信息，面板超过可用范围时调整布局或提供滚动。

## Customization
- 共享外观只表达分类与当前页；集中主题调整表面，side / align 依据实际导航对象选择。

## Current exports
- NavigationMenu: function; owner navigation-menu; PASS; props: NavigationMenuPrimitive.Root.Props & {
  /** Renders the default `NavigationMenuViewport`. Set `false` to place your own. */
  viewport?: boolean;
}
- NavigationMenuContent: function; owner navigation-menu; PASS; props: NavigationMenuPrimitive.Content.Props
- NavigationMenuItem: function; owner navigation-menu; PASS; props: NavigationMenuPrimitive.Item.Props
- NavigationMenuLink: function; owner navigation-menu; PASS; props: NavigationMenuPrimitive.Link.Props
- NavigationMenuLinkDescription: function; owner navigation-menu; PASS; props: React.ComponentProps<"span">
- NavigationMenuLinkIcon: function; owner navigation-menu; PASS; props: React.ComponentProps<"span">
- NavigationMenuLinkTitle: function; owner navigation-menu; PASS; props: React.ComponentProps<"span">
- NavigationMenuList: function; owner navigation-menu; PASS; props: NavigationMenuPrimitive.List.Props
- NavigationMenuPrimitive: reexport; owner navigation-menu; UNVERIFIED
- NavigationMenuTrigger: function; owner navigation-menu; PASS; props: NavigationMenuPrimitive.Trigger.Props
- navigationMenuTriggerStyle: const; owner navigation-menu; UNVERIFIED
- NavigationMenuViewport: function; owner navigation-menu; PASS; props: NavigationMenuPrimitive.Popup.Props & {
  side?: NavigationMenuPrimitive.Positioner.Props["side"];
  align?: NavigationMenuPrimitive.Positioner.Props["align"];
  sideOffset?: NavigationMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: NavigationMenuPrimitive.Positioner.Props["alignOffset"];
  collisionPadding?: NavigationMenuPrimitive.Positioner.Props["collisionPadding"];
  portalProps?: NavigationMenuPrimitive.Portal.Props;
}

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NavigationMenu
根部件，渲染 <nav>，并默认附带一个 NavigationMenuViewport。
- value / defaultValue / onValueChange: any | null. 当前展开的项（受控 / 非受控）；null 表示收起。
- delay / closeDelay: number; default 50 / 50. 悬停打开 / 关闭前的等待毫秒数。
- viewport: boolean; default true. 设为 false 后可自行放置 NavigationMenuViewport 以调整对齐。

### NavigationMenuList
顶层项的列表（<ul>）。

### NavigationMenuItem
一个顶层项（<li>）；value 用于受控模式。

### NavigationMenuTrigger
展开面板的按钮，箭头在展开时旋转 180°。

### NavigationMenuContent
面板内容，激活时移入弹层；宽度由内容决定，最大不超过屏幕宽度减 2rem。

### NavigationMenuLink
面板中的链接；通过 render 接入路由库的 Link。
- active: boolean; default false. 当前页面，设置 aria-current="page" 并显示选中底色。
- closeOnClick: boolean; default false. 点击后收起面板。
- render: ReactElement. 例如 <NextLink href="/docs" />。

### NavigationMenuLinkIcon · NavigationMenuLinkTitle · NavigationMenuLinkDescription
富链接的图标块、标题与两行以内的说明，放在 NavigationMenuLink 内自动排成两列。

### navigationMenuTriggerStyle
顶层触发器的样式函数；给顶层的普通链接加上 className={navigationMenuTriggerStyle()} 以保持一致。

### NavigationMenuViewport
承载面板的弹层。
- align: "start" | "center" | "end"; default "start". 相对当前触发器的对齐方式。
- sideOffset: number; default 8. 与触发器的距离；间隙内保持悬停不中断。

## Keyboard
- Tab: 在顶层项之间移动；面板展开时进入面板内的链接。
- Enter / Space: 展开或收起当前触发器的面板。
- ← / →: 在顶层项之间移动。
- ↓: 从触发器进入已展开的面板。
- Esc: 收起面板，焦点回到触发器。

## Source examples
### 基础用法
Source: apps/docs/src/content/navigation-menu/demos/01-basic.tsx
```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuLinkDescription, NavigationMenuLinkIcon, NavigationMenuLinkTitle, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@qingye/ui/components/navigation-menu";
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
                <NavigationMenuLinkTitle>Qingye UI</NavigationMenuLinkTitle>
                <NavigationMenuLinkDescription className="line-clamp-3">
                  组件、主题与使用示例。
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
```

### 简单链接
Source: apps/docs/src/content/navigation-menu/demos/02-simple-links.tsx
```tsx
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@qingye/ui/components/navigation-menu";
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
```

### 响应式
Source: apps/docs/src/content/navigation-menu/demos/03-responsive.tsx
```tsx
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
```

