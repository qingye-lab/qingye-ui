# 分页 Pagination

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: 08d499db60d491c44a49d85693c3a83af27ae2d7dd784fb03afb0839d04fa9a6

在多页列表之间跳转。页数多时用省略号收起中间页；移动端改用“第 3 / 12 页”加前后翻页的紧凑形式。

## Use and ownership
- 在可定位的多页内容之间前进、后退与直达，当前页有明确标识。
- Avoid: 禁用首页上一页或末页下一页时，不得因路由组件自带目的地再次恢复导航；页数未知不能显示成零页。
- Library: 提供导航名称、当前页、禁用目的地与激活阻止，省略页说明保留给辅助技术。
- Application: 维护页数、数据请求、已加载内容、筛选与页码关系；失败时保留可继续操作的旧内容。

## Composition
- 用真实 href / 路由链接保留分享与浏览器返回；与总数和每页条数组成列表底栏。

## Responsive behavior
- 窄屏可用当前页 / 总页数与前后翻页；隐藏可见文字仍保留前后动作名称。

## Customization
- size 调整几何，render 接入路由链接并获得相同样式；disabled 改为无 href 原生链接占位，保留标签、名称、className 与 style。

## Current exports
- Pagination: function; owner pagination; PASS; props: React.ComponentProps<"nav">
- PaginationContent: function; owner pagination; PASS; props: React.ComponentProps<"ul">
- PaginationEllipsis: function; owner pagination; PASS; props: React.ComponentProps<"span">
- PaginationItem: function; owner pagination; PASS; props: React.ComponentProps<"li">
- PaginationLink: function; owner pagination; PASS; props: PaginationLinkProps
- PaginationLinkProps: type; owner pagination; PASS
- PaginationNext: function; owner pagination; PASS; props: React.ComponentProps<typeof PaginationLink>
- PaginationPrevious: function; owner pagination; PASS; props: React.ComponentProps<typeof PaginationLink>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Pagination
<nav> 容器，默认 aria-label 来自语言包（“分页”）。

### PaginationContent
<ul> 列表，横向排列页码。

### PaginationItem
<li> 单项。

### PaginationLink
页码链接，样式来自 Button，数字等宽。
- isActive: boolean; default false. 当前页：outline 样式并带 aria-current="page"。
- disabled: boolean; default false. 不可用：输出无 href 的原生链接占位、退出 Tab 顺序并阻止激活；自定义路由组件也不会重新生成目的地。
- size: Button size; default "icon". 按钮尺寸，页码默认为正方形。
- render: ReactElement | render function. 接入转发属性的路由 Link，仍提供页码样式。禁用时保留该元素的内容、名称与样式，以原生链接占位取代路由组件。

### PaginationPrevious
上一页；窄屏只显示箭头，文字来自语言包，可用 children 覆盖。接受 PaginationLink 的全部属性。

### PaginationNext
下一页；同上。

### PaginationEllipsis
省略号，表示被收起的页码，对辅助技术读作“更多页”。

## Keyboard
- Tab: 依次聚焦上一页、各页码与下一页；禁用项被跳过。
- Enter: 跳转到聚焦的页。

## Source examples
### 默认
Source: apps/docs/src/content/pagination/demos/01-default.tsx
```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";

export const meta = { title: "默认", description: "页码少时全部列出；首页禁用“上一页”。" };

export default function Demo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled href="?page=0" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="?page=2" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

### 省略号
Source: apps/docs/src/content/pagination/demos/02-ellipsis.tsx
```tsx
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { type MouseEvent, useState } from "react";

export const meta = {
  title: "省略号",
  description: "保留首尾与当前页，宽屏显示相邻页码。点击页码试试。",
};

const total = 20;

/** 1 … 5 6 7 … 20 */
function pages(current: number): (number | "gap")[] {
  const near = [current - 1, current, current + 1].filter((p) => p > 1 && p < total);
  const list: (number | "gap")[] = [1];
  if (near[0]! > 2) list.push("gap");
  list.push(...near);
  if (near[near.length - 1]! < total - 1) list.push("gap");
  list.push(total);
  return list;
}

export default function Demo() {
  const [page, setPage] = useState(6);
  const go = (next: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(next);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} href={`?page=${page - 1}`} onClick={go(page - 1)} />
        </PaginationItem>
        {pages(page).map((p, i) =>
          p === "gap" ? (
            <PaginationItem key={`gap-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p} className={p !== 1 && p !== total && p !== page ? "max-sm:hidden" : undefined}>
              <PaginationLink href={`?page=${p}`} isActive={p === page} onClick={go(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext disabled={page === total} href={`?page=${page + 1}`} onClick={go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

### 紧凑
Source: apps/docs/src/content/pagination/demos/03-compact.tsx
```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { type MouseEvent, useState } from "react";

export const meta = {
  title: "紧凑",
  description: "移动端或空间有限时，只保留前后翻页与当前位置。",
};

const total = 12;

export default function Demo() {
  const [page, setPage] = useState(3);
  const go = (next: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(next);
  };
  return (
    <Pagination>
      <PaginationContent className="gap-3">
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} href={`?page=${page - 1}`} onClick={go(page - 1)} />
        </PaginationItem>
        <PaginationItem aria-live="polite" className="numeric text-muted-foreground text-sm">
          第 <span className="font-medium text-foreground">{page}</span> / {total} 页
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled={page === total} href={`?page=${page + 1}`} onClick={go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

### 每页条数
Source: apps/docs/src/content/pagination/demos/04-page-size.tsx
```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { type MouseEvent, useState } from "react";

export const meta = {
  title: "每页条数",
  description: "列表底栏：每页条数、范围说明与翻页。窄屏时换行，页码只保留前后翻页。",
};

const total = 236;
const sizes = [10, 20, 50];

export default function Demo() {
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(total / size);
  const from = (page - 1) * size + 1;
  const to = Math.min(page * size, total);
  const go = (next: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(next);
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 text-muted-foreground text-sm">
      <div className="flex items-center gap-2">
        <span>每页</span>
        <Select
          items={sizes.map((n) => ({ label: `${n} 条`, value: n }))}
          onValueChange={(value) => {
            setSize(value as number);
            setPage(1);
          }}
          value={size}
        >
          <SelectTrigger aria-label="每页条数" className="w-auto min-w-24" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {sizes.map((n) => (
              <SelectItem key={n} value={n}>
                {n} 条
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <span className="numeric">
          {from}–{to}，共 {total} 条
        </span>
      </div>
      <Pagination className="ms-auto me-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled={page === 1} href={`?page=${page - 1}`} onClick={go(page - 1)} />
          </PaginationItem>
          {[1, 2, 3].map((p) =>
            p <= pageCount ? (
              <PaginationItem className="max-sm:hidden" key={p}>
                <PaginationLink href={`?page=${p}`} isActive={p === page} onClick={go(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ) : null,
          )}
          <PaginationItem>
            <PaginationNext disabled={page === pageCount} href={`?page=${page + 1}`} onClick={go(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
```

