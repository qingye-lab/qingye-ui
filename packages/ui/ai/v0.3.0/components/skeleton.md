# 骨架屏 Skeleton

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/skeleton
Source: packages/ui/src/components/skeleton.tsx
Source SHA-256: 00761f6db239c68e2f0c2fea3d84cef399f3840688fa286d9697136547781159

内容加载时先画出与真实布局一致的占位块，减少等待感和加载完成时的跳动。适合列表、卡片、表格等结构已知的区域。

## Use and ownership
- 内容加载时先画出与真实布局一致的占位块，减少等待感和加载完成时的跳动。适合列表、卡片、表格等结构已知的区域。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Skeleton: function; owner skeleton; PASS; props: React.ComponentProps<"div">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Skeleton
一个带扫光动画的占位 <div>，默认 rounded-sm。尺寸与形状全部由 className 决定，如 h-4 w-32、size-10 rounded-full。透传所有 <div> 属性。

## Keyboard

## Source examples
### 列表
Source: apps/docs/src/content/skeleton/demos/01-list.tsx
```tsx
import { Skeleton } from "@qingye/ui/components/skeleton";

export const meta = { title: "列表", description: "圆形头像加两行文字；每行宽度略有不同，更接近真实内容。" };

const rows = [
  { title: "w-28", subtitle: "w-44" },
  { title: "w-20", subtitle: "w-52" },
  { title: "w-24", subtitle: "w-36" },
];

export default function Demo() {
  return (
    <div aria-busy="true" className="flex w-full max-w-sm flex-col gap-5">
      <span className="sr-only">正在加载成员列表</span>
      {rows.map((row, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className={`h-4 ${row.title}`} />
            <Skeleton className={`h-3 ${row.subtitle}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 卡片
Source: apps/docs/src/content/skeleton/demos/02-card.tsx
```tsx
import { Card, CardFooter, CardHeader, CardPanel } from "@qingye/ui/components/card";
import { Skeleton } from "@qingye/ui/components/skeleton";

export const meta = { title: "卡片", description: "沿用 Card 的结构，只把内容换成占位块。" };

export default function Demo() {
  return (
    <Card aria-busy="true" className="w-full max-w-sm">
      <span className="sr-only">正在加载文章</span>
      <CardHeader className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>
      <CardPanel className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardPanel>
      <CardFooter className="gap-2">
        <Skeleton className="h-8 w-20 rounded-lg sm:h-7" />
        <Skeleton className="h-8 w-16 rounded-lg sm:h-7" />
      </CardFooter>
    </Card>
  );
}
```

### 表格行
Source: apps/docs/src/content/skeleton/demos/03-table.tsx
```tsx
import { Skeleton } from "@qingye/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "表格行", description: "表头照常显示，只有表体用占位；数字列的占位同样靠右。" };

const widths = ["w-24", "w-32", "w-20", "w-28"];

export default function Demo() {
  return (
    <Table aria-busy="true">
      <TableHeader>
        <TableRow>
          <TableHead>设备</TableHead>
          <TableHead>门店</TableHead>
          <TableHead className="text-end">今日订单</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {widths.map((width) => (
          <TableRow key={width}>
            <TableCell>
              <Skeleton className={`h-4 ${width}`} />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="ms-auto h-4 w-10" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 加载切换
Source: apps/docs/src/content/skeleton/demos/04-toggle.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { Card, CardFooter, CardHeader, CardPanel } from "@qingye/ui/components/card";
import { Skeleton } from "@qingye/ui/components/skeleton";
import { RotateCwIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const meta = {
  title: "加载切换",
  description: "骨架与真实内容尺寸一致，加载完成时卡片高度不变。",
};

export default function Demo() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <Card aria-busy={loading} className="w-full">
        <CardHeader className="flex items-center gap-3">
          {loading ? (
            <>
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
              <span className="sr-only">正在加载</span>
            </>
          ) : (
            <>
              <Avatar size="lg">
                <AvatarFallback>林</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">林晓雯</span>
                <span className="text-muted-foreground text-xs">产品经理 · 增长组</span>
              </div>
            </>
          )}
        </CardHeader>
        <CardPanel>
          {loading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="line-clamp-2 text-sm">负责会员中心的增长实验，最近在推进新人礼包与积分商城的改版。</p>
          )}
        </CardPanel>
        <CardFooter>
          {loading ? <Skeleton className="h-8 w-20 rounded-lg sm:h-7" /> : <Button size="sm" variant="outline">发消息</Button>}
        </CardFooter>
      </Card>
      <Button size="sm" variant="ghost" disabled={loading} onClick={() => setLoading(true)}>
        <RotateCwIcon aria-hidden="true" />
        重新加载
      </Button>
    </div>
  );
}
```

