# 面包屑 Breadcrumb

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/breadcrumb
Source: packages/ui/src/components/breadcrumb.tsx
Source SHA-256: f741b953915c493d9f3590a8b00da8ba538a23cfb9ecee07ef80fc469e176d2b

显示当前页面在层级中的位置，并可逐级返回。放在页面标题上方，层级较深时把中间层收进省略菜单。

## Use and ownership
- 显示当前页面在层级中的位置，并可逐级返回。放在页面标题上方，层级较深时把中间层收进省略菜单。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Breadcrumb: function; owner breadcrumb; PASS; props: React.ComponentProps<"nav">
- BreadcrumbEllipsis: function; owner breadcrumb; PASS; props: React.ComponentProps<"span">
- BreadcrumbItem: function; owner breadcrumb; PASS; props: React.ComponentProps<"li">
- BreadcrumbLink: function; owner breadcrumb; PASS; props: useRender.ComponentProps<"a">
- BreadcrumbList: function; owner breadcrumb; PASS; props: React.ComponentProps<"ol">
- BreadcrumbPage: function; owner breadcrumb; PASS; props: React.ComponentProps<"span">
- BreadcrumbSeparator: function; owner breadcrumb; PASS; props: React.ComponentProps<"li">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Breadcrumb
<nav> 容器，默认 aria-label 来自语言包（“面包屑导航”）。

### BreadcrumbList
<ol> 列表，自动换行。

### BreadcrumbItem
<li> 单项。

### BreadcrumbLink
可点击的上级页面。
- render: ReactElement. 替换为路由库的链接组件，例如 <Link to="/projects" />。

### BreadcrumbPage
当前页，不可点击，带 aria-current="page"。

### BreadcrumbSeparator
分隔符，对辅助技术隐藏；默认是右箭头，从右到左布局时自动翻转。
- children: ReactNode. 自定义分隔符，例如斜线图标。

### BreadcrumbEllipsis
省略号图标，通常作为菜单触发器的内容，承载被折叠的中间层级。

## Keyboard
- Tab: 依次聚焦各级链接；当前页不可聚焦。
- Enter: 打开链接或省略菜单。

## Source examples
### 默认
Source: apps/docs/src/content/breadcrumb/demos/01-default.tsx
```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";

export const meta = { title: "默认" };

export default function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">工作台</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">项目</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>青烟官网改版</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### 省略菜单
Source: apps/docs/src/content/breadcrumb/demos/02-ellipsis-menu.tsx
```tsx
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@qingye/ui/components/menu";

export const meta = {
  title: "省略菜单",
  description: "层级较深时，把中间层收进菜单。",
};

export default function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">工作台</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <MenuTrigger
              aria-label="显示更多路径"
              className="flex size-6 items-center justify-center rounded-md outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent"
            >
              <BreadcrumbEllipsis />
            </MenuTrigger>
            <MenuPopup align="start">
              <MenuItem render={<a href="#" />}>项目</MenuItem>
              <MenuItem render={<a href="#" />}>青烟官网改版</MenuItem>
              <MenuItem render={<a href="#" />}>设计稿</MenuItem>
            </MenuPopup>
          </Menu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">首页</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>v3 评审稿</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### 带图标
Source: apps/docs/src/content/breadcrumb/demos/03-icons.tsx
```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { FileTextIcon, FolderIcon, HomeIcon } from "lucide-react";

export const meta = { title: "带图标", description: "图标放在文字前，尺寸 4，仅首页可只用图标。" };

export default function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink aria-label="首页" href="#">
            <HomeIcon className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="inline-flex items-center gap-1.5" href="#">
            <FolderIcon className="size-4" />
            产品文档
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="inline-flex items-center gap-1.5">
            <FileTextIcon className="size-4" />
            接口鉴权说明
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### 自定义分隔符
Source: apps/docs/src/content/breadcrumb/demos/04-separator.tsx
```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { SlashIcon } from "lucide-react";

export const meta = { title: "自定义分隔符", description: "斜线更接近文件路径与代码仓库的习惯。" };

export default function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">qingye-lab</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon className="-rotate-12" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">qingye-ui</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon className="-rotate-12" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-mono text-[0.8125rem]">packages/ui</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### 窄屏折叠
Source: apps/docs/src/content/breadcrumb/demos/05-responsive.tsx
```tsx
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
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
```

