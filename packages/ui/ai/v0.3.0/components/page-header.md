# 页头 PageHeader

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/page-header
Source: packages/ui/src/components/page-header.tsx
Source SHA-256: 61b9f90ef9dbaa3677e84b2929f6e70e83ae3464bff917dc26d2407adfd2fbf1

页面顶部的标题区：可选面包屑、返回按钮、标题、描述、元信息与操作。操作在空间足够时与标题同行，空间不足时换到下方。

## Use and ownership
- 页面顶部的标题区：可选面包屑、返回按钮、标题、描述、元信息与操作。操作在空间足够时与标题同行，空间不足时换到下方。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- PageHeader: function; owner page-header; PASS; props: useRender.ComponentProps<"header">
- PageHeaderActions: function; owner page-header; PASS; props: useRender.ComponentProps<"div">
- PageHeaderBack: function; owner page-header; PASS; props: ButtonProps
- PageHeaderContent: function; owner page-header; PASS; props: useRender.ComponentProps<"div">
- PageHeaderDescription: function; owner page-header; PASS; props: useRender.ComponentProps<"p">
- PageHeaderMeta: function; owner page-header; PASS; props: useRender.ComponentProps<"div">
- PageHeaderNav: function; owner page-header; PASS; props: useRender.ComponentProps<"div">
- PageHeaderTitle: function; owner page-header; PASS; props: useRender.ComponentProps<"h1">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### PageHeader
<header> 容器。直接放入的 Breadcrumb 会占满一行。布局按自身宽度换行，与视口无关，放在侧栏布局中同样适用。

### PageHeaderNav
占满一行的导航区，放面包屑以外的返回链接、页签等。

### PageHeaderBack
标题左侧的返回按钮（outline 小图标按钮），aria-label 默认取 locale.back。接受 Button 的全部属性。
- render: ReactElement. 渲染为链接时传 render={<a href="…" />} 并设置 nativeButton={false}。
- onClick: () => void. 例如调用 history.back()。

### PageHeaderContent
标题、描述、元信息的纵向容器，占据剩余宽度。

### PageHeaderTitle
<h1>，移动端 20px、桌面 24px，600 字重。

### PageHeaderDescription
一两句说明，弱化色，最宽 72 个字符。

### PageHeaderMeta
元信息行：Badge、StatusDot、创建时间等，自动换行。

### PageHeaderActions
操作区；主操作放在最后（最靠右）。

## Keyboard
- Tab: 依次聚焦面包屑链接、返回按钮与操作按钮。

## Source examples
### 基础
Source: apps/docs/src/content/page-header/demos/01-basic.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { DownloadIcon, PlusIcon } from "lucide-react";

export const meta = { title: "基础", description: "标题、描述与操作；窄屏时操作换到下方。" };

export default function Demo() {
  return (
    <PageHeader className="w-full">
      <PageHeaderContent>
        <PageHeaderTitle>设备管理</PageHeaderTitle>
        <PageHeaderDescription>查看各门店终端的在线状态、固件版本与告警，支持批量重启和升级。</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="outline">
          <DownloadIcon aria-hidden="true" />
          导出
        </Button>
        <Button>
          <PlusIcon aria-hidden="true" />
          添加设备
        </Button>
      </PageHeaderActions>
    </PageHeader>
  );
}
```

### 面包屑与元信息
Source: apps/docs/src/content/page-header/demos/02-breadcrumb.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { Button } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderMeta, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { StatusDot } from "@qingye/ui/components/status-dot";
import { CalendarIcon, MoreHorizontalIcon, RotateCwIcon } from "lucide-react";

export const meta = { title: "面包屑与元信息", description: "Breadcrumb 直接放入即占满一行；元信息放状态、标签与时间。" };

export default function Demo() {
  return (
    <PageHeader className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#stores">门店</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#xh-001">徐汇漕溪北路店</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>前台收银机</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeaderContent>
        <PageHeaderTitle>前台收银机</PageHeaderTitle>
        <PageHeaderDescription>SUNMI T2s · 序列号 T2S-8F3A-21C7-0049</PageHeaderDescription>
        <PageHeaderMeta>
          <StatusDot pulse status="online">
            在线
          </StatusDot>
          <Badge variant="outline">固件 4.2.1</Badge>
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon aria-hidden="true" />
            2023-04-18 接入
          </span>
        </PageHeaderMeta>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="outline">
          <RotateCwIcon aria-hidden="true" />
          重启
        </Button>
        <Button aria-label="更多操作" size="icon" variant="outline">
          <MoreHorizontalIcon aria-hidden="true" />
        </Button>
      </PageHeaderActions>
    </PageHeader>
  );
}
```

### 返回按钮
Source: apps/docs/src/content/page-header/demos/03-back.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderBack, PageHeaderContent, PageHeaderDescription, PageHeaderMeta, PageHeaderTitle } from "@qingye/ui/components/page-header";

export const meta = {
  title: "返回按钮",
  description: "PageHeaderBack 放在标题左侧；渲染为链接时设置 nativeButton={false}。",
};

export default function Demo() {
  return (
    <PageHeader className="w-full border-b pb-6">
      <PageHeaderBack nativeButton={false} render={<a href="#orders" />} />
      <PageHeaderContent>
        <PageHeaderTitle>订单 SO-20260930-004817</PageHeaderTitle>
        <PageHeaderDescription>2026-09-30 14:26 下单 · 小程序 · 自提</PageHeaderDescription>
        <PageHeaderMeta>
          <Badge variant="success">已支付</Badge>
          <Badge variant="warning">待出餐</Badge>
        </PageHeaderMeta>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="destructive-outline">退款</Button>
        <Button>标记出餐</Button>
      </PageHeaderActions>
    </PageHeader>
  );
}
```

### 按容器换行
Source: apps/docs/src/content/page-header/demos/04-narrow.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { PlusIcon } from "lucide-react";

export const meta = {
  title: "按容器换行",
  description: "放在窄容器（如侧栏布局的内容区）中时，操作按自身宽度换行，与视口无关。",
};

export default function Demo() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-dashed p-4">
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>优惠券</PageHeaderTitle>
          <PageHeaderDescription>进行中 12 个，本月已核销 3,286 张。</PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button size="sm">
            <PlusIcon aria-hidden="true" />
            新建优惠券
          </Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  );
}
```

