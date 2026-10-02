# 徽章 Badge

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/badge
Source: packages/ui/src/components/badge.tsx
Source SHA-256: 2bebdb0486fa3873ef918a3977c893bb0e02d9e052fd48e6b76465c617842a74

标注状态、类别或数量的小标签。用于列表、表格和标题旁的辅助信息，不承载主要操作。

## Use and ownership
- 标注状态、类别或数量的小标签。用于列表、表格和标题旁的辅助信息，不承载主要操作。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Badge: function; owner badge; PASS; props: BadgeProps
- BadgeProps: interface; owner badge; PASS
- badgeVariants: const; owner badge; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Badge
默认渲染 <span>；通过 render 可渲染为链接或按钮，此时获得悬停、焦点环与触屏点击区。
- variant: "default" | "secondary" | "outline" | "info" | "success" | "warning" | "error" | "destructive"; default "default". 视觉样式。info / success / warning / error 为浅底语义色，default 与 destructive 为实色。
- size: "sm" | "default" | "lg"; default "default". 尺寸；移动端略高，≥640px 回到桌面尺寸。
- render: ReactElement | (props) => ReactElement. 替换渲染元素，例如 <a href> 或 <button type="button">。

### badgeVariants
生成徽章类名的 cva 函数，接收 { variant, size, className }，用于把徽章样式套到其他元素上。

## Keyboard
- Tab: 渲染为链接或按钮时，移动焦点到徽章。
- Enter: 打开链接徽章。
- Enter / Space: 触发按钮徽章。

## Source examples
### 样式
Source: apps/docs/src/content/badge/demos/01-variants.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";

export const meta = {
  title: "样式",
  description: "实色用于少量需要强调的标记；浅底语义色适合在列表中大量出现的状态。",
};

export default function Demo() {
  return (
    <>
      <Badge>新功能</Badge>
      <Badge variant="secondary">草稿</Badge>
      <Badge variant="outline">v2.4.0</Badge>
      <Badge variant="info">处理中</Badge>
      <Badge variant="success">已完成</Badge>
      <Badge variant="warning">待审核</Badge>
      <Badge variant="error">构建失败</Badge>
      <Badge variant="destructive">已停用</Badge>
    </>
  );
}
```

### 尺寸
Source: apps/docs/src/content/badge/demos/02-sizes.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";

export const meta = { title: "尺寸", description: "移动端自动加高，≥640px 回到桌面尺寸。" };

export default function Demo() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Badge size="sm" variant="outline">小</Badge>
        <Badge variant="outline">默认</Badge>
        <Badge size="lg" variant="outline">大</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge size="sm">测试版</Badge>
        <Badge>测试版</Badge>
        <Badge size="lg">测试版</Badge>
      </div>
    </>
  );
}
```

### 带图标
Source: apps/docs/src/content/badge/demos/03-icons.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { BadgeCheckIcon, CircleCheckIcon, CircleXIcon, ClockIcon, GitBranchIcon, TriangleAlertIcon } from "lucide-react";

export const meta = { title: "带图标", description: "图标放在文字前，尺寸随徽章自动调整。" };

export default function Demo() {
  return (
    <>
      <Badge variant="outline">
        <BadgeCheckIcon aria-hidden="true" />
        已认证
      </Badge>
      <Badge variant="secondary">
        <GitBranchIcon aria-hidden="true" />
        main
      </Badge>
      <Badge variant="info">
        <ClockIcon aria-hidden="true" />
        排队中
      </Badge>
      <Badge variant="success">
        <CircleCheckIcon aria-hidden="true" />
        已部署
      </Badge>
      <Badge variant="warning">
        <TriangleAlertIcon aria-hidden="true" />
        证书 7 天后过期
      </Badge>
      <Badge variant="error">
        <CircleXIcon aria-hidden="true" />
        构建失败
      </Badge>
    </>
  );
}
```

### 状态圆点
Source: apps/docs/src/content/badge/demos/04-dot.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";

export const meta = {
  title: "状态圆点",
  description: "outline 加一个彩色圆点，比整块底色更克制，适合表格和设备列表。",
};

export default function Demo() {
  return (
    <>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
        运行中
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-warning" />
        维护中
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-destructive" />
        故障
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-muted-foreground/64" />
        已停止
      </Badge>
    </>
  );
}
```

### 计数
Source: apps/docs/src/content/badge/demos/05-count.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";

export const meta = { title: "计数", description: "加 numeric 使用等宽数字；超过上限显示 99+。" };

export default function Demo() {
  return (
    <>
      <Badge className="numeric">3</Badge>
      <Badge variant="secondary" className="numeric">24</Badge>
      <Badge variant="destructive" className="numeric">99+</Badge>
      <Button variant="outline">
        待审批
        <Badge size="sm" variant="secondary" className="numeric">12</Badge>
      </Button>
      <Button variant="outline">
        未读消息
        <Badge size="sm" variant="destructive" className="numeric">5</Badge>
      </Button>
    </>
  );
}
```

### 作为链接或按钮
Source: apps/docs/src/content/badge/demos/06-interactive.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { XIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "作为链接或按钮",
  description: "通过 render 渲染为 <a> 或 <button>，获得悬停、焦点环与 44px 触屏点击区。",
};

const initialFilters = ["华东区", "已付款", "本月"];

export default function Demo() {
  const [filters, setFilters] = useState(initialFilters);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">话题</span>
        <Badge render={<a href="#design-system" />} variant="outline">#设计系统</Badge>
        <Badge render={<a href="#a11y" />} variant="outline">#无障碍</Badge>
        <Badge render={<a href="#dark-mode" />} variant="outline">#深色模式</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">筛选</span>
        {filters.map((filter) => (
          <Badge
            key={filter}
            render={
              <button
                type="button"
                aria-label={`移除筛选条件：${filter}`}
                onClick={() => setFilters(filters.filter((item) => item !== filter))}
              />
            }
            variant="secondary"
          >
            {filter}
            <XIcon aria-hidden="true" />
          </Badge>
        ))}
        {filters.length === 0 ? (
          <Button size="xs" variant="ghost" onClick={() => setFilters(initialFilters)}>
            恢复默认筛选
          </Button>
        ) : null}
      </div>
    </div>
  );
}
```

### 组合：订单状态
Source: apps/docs/src/content/badge/demos/07-orders.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Frame } from "@qingye/ui/components/frame";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "组合：订单状态", description: "表格状态列统一用 outline + 圆点，颜色之外始终保留文字。" };

const orders = [
  { id: "YQ-20481", customer: "上海云杉科技", status: "已完成", amount: "¥12,800.00" },
  { id: "YQ-20480", customer: "杭州白鹭文化", status: "已发货", amount: "¥3,260.00" },
  { id: "YQ-20479", customer: "北京青柠餐饮", status: "待付款", amount: "¥980.00" },
  { id: "YQ-20478", customer: "深圳星图电子", status: "支付失败", amount: "¥15,000.00" },
  { id: "YQ-20477", customer: "成都知行教育", status: "已退款", amount: "¥4,500.00" },
];

const dot: Record<string, string> = {
  已完成: "bg-success",
  已发货: "bg-info",
  待付款: "bg-warning",
  支付失败: "bg-destructive",
  已退款: "bg-muted-foreground/64",
};

export default function Demo() {
  return (
    <Frame className="w-full">
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>客户</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-end">金额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="font-medium">{order.customer}</div>
                <div className="mt-1 text-muted-foreground text-xs numeric">{order.id}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${dot[order.status]}`} />
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-end numeric">{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Frame>
  );
}
```

