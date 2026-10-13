# 分页 Pagination

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: b78e074d5c48db899068559434f3002b2eede27c7a4051e9c150011ec25f0469

页位置、真实入口与明确的未知总数。

## Decision
只从 root page 与 link page 相等推导当前位置。总页数 null 表示未知；不创建末页或推断下一页存在。

## Notes
- 不请求数据、保存路由或自动截取页码；未知总数不证明有无下一页。

## Use and ownership
- 结果按页呈现，页位置和方向可用性已知。
- Avoid: 过程进度用 Steps；不确定结果总数时不伪造末页。
- Library: 页入口的导航、列表、当前页语义与真实禁用。
- Application: 页内容、当前页、总数或未知、前后页可用性与请求结果。

## Composition
- Pagination：有名称的 nav，不生成页码。
- PaginationList / PaginationItem：ul / li 组织页面入口。
- PaginationLink：a，匹配当前页时 aria-current=page。
- PaginationPrevious / PaginationNext：复用 Button 与本地化方向名称。
- PaginationEllipsis：省略页名称，不代表末页。

## Responsive behavior
- 动作可换行，保留当前页与总数状态。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- Pagination: function; owner pagination; PASS; props: PaginationProps
- PaginationEllipsis: function; owner pagination; PASS; props: PaginationEllipsisProps
- PaginationEllipsisProps: type; owner pagination; PASS
- PaginationItem: function; owner pagination; PASS; props: PaginationItemProps
- PaginationItemProps: type; owner pagination; PASS
- PaginationLink: function; owner pagination; PASS; props: PaginationLinkProps
- PaginationLinkProps: type; owner pagination; PASS
- PaginationList: function; owner pagination; PASS; props: PaginationListProps
- PaginationListProps: type; owner pagination; PASS
- PaginationNext: function; owner pagination; PASS; props: PaginationNextProps
- PaginationNextProps: type; owner pagination; PASS
- PaginationPrevious: function; owner pagination; PASS; props: PaginationPreviousProps
- PaginationPreviousProps: type; owner pagination; PASS
- PaginationProps: type; owner pagination; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Pagination
- `page?`: `number`.
- `totalPages`: `number | null`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### PaginationEllipsis
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### PaginationItem
- no props declared by this library
- plus 282 inherited (@types/react 281, @base-ui/react 1); not expanded, see the installed declarations

### PaginationLink
- `page`: `number`.
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### PaginationList
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### PaginationNext
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### PaginationPrevious
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context PageContext: without a provider nullable; provided by Pagination

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Pagination
有名称的 nav，不生成页码。
- page: number. 应用确认的当前正整数页码，零结果可省略。
- totalPages: number | null. 必填非负整数总页数或 null=未知；在内容中明确未知状态。
- aria-label / render / ref / native props: useRender.ComponentProps<nav>. 默认名称来自 locale。

### PaginationList / PaginationItem
ul / li 组织页面入口。
- render / ref / native props: useRender.ComponentProps<ul | li>. 保留原生列表结构。

### PaginationLink
a，匹配当前页时 aria-current=page。
- page / href / render / ref / native props: { page: number } & useRender.ComponentProps<a>. 应用提供正整数页码与真实目标。

### PaginationPrevious / PaginationNext
复用 Button 与本地化方向名称。
- disabled / onClick / render / nativeButton / Button props: ButtonProps. 应用明确禁用；导航可 render 为 a 并设 nativeButton=false。

### PaginationEllipsis
省略页名称，不代表末页。
- children / render / native props: useRender.ComponentProps<span>. 仅在已知有省略页时提供。

## Keyboard

## Source examples
### 已知总页数
Source: apps/docs/src/content/pagination/demos/01-pages.tsx
```tsx
import { useState } from "react";
import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "已知总页数", titleEn: "Known total" } satisfies DemoMeta;

const total = 5;

export default function Demo() {
  const [page, setPage] = useState(2);
  return <Pagination page={page} totalPages={total}>
    <PaginationList>
      <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
      {Array.from({ length: total }, (_, index) => index + 1).map(number => <PaginationItem key={number}>
        <PaginationLink page={number} href={`#page-${number}`} onClick={event => { event.preventDefault(); setPage(number); }}>{number}</PaginationLink>
      </PaginationItem>)}
      <PaginationItem><PaginationNext disabled={page === total} onClick={() => setPage(page + 1)} /></PaginationItem>
    </PaginationList>
  </Pagination>;
}
```

### 页数较多
Source: apps/docs/src/content/pagination/demos/02-ellipsis.tsx
```tsx
import { useState } from "react";
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页数较多", titleEn: "Many pages" } satisfies DemoMeta;

const total = 12;

// 首末页与当前页前后各一页；被省略的部分用省略号，不伪造页码。
function visible(page: number) {
  const numbers = [1, page - 1, page, page + 1, total].filter((number, index, all) => number >= 1 && number <= total && all.indexOf(number) === index).sort((a, b) => a - b);
  return numbers.flatMap((number, index) => index > 0 && number - numbers[index - 1]! > 1 ? ["gap", number] as const : [number] as const);
}

export default function Demo() {
  const [page, setPage] = useState(6);
  return <Pagination page={page} totalPages={total}>
    <PaginationList>
      <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
      {visible(page).map((entry, index) => <PaginationItem key={entry === "gap" ? `gap-${index}` : entry}>
        {entry === "gap" ? <PaginationEllipsis /> : <PaginationLink page={entry} href={`#page-${entry}`} onClick={event => { event.preventDefault(); setPage(entry); }}>{entry}</PaginationLink>}
      </PaginationItem>)}
      <PaginationItem><PaginationNext disabled={page === total} onClick={() => setPage(page + 1)} /></PaginationItem>
    </PaginationList>
  </Pagination>;
}
```

### 总数未知
Source: apps/docs/src/content/pagination/demos/03-unknown.tsx
```tsx
import { useState } from "react";
import { Pagination, PaginationItem, PaginationList, PaginationNext, PaginationPrevious } from "@qingye_lab/ui/components/pagination";
import { Text } from "@qingye_lab/ui/components/typography";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "总数未知", titleEn: "Unknown total" } satisfies DemoMeta;

export default function Demo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={null}>
    <PaginationList>
      <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
      <PaginationItem><Text step="support">第 {page} 页</Text></PaginationItem>
      <PaginationItem><PaginationNext onClick={() => setPage(page + 1)} /></PaginationItem>
    </PaginationList>
  </Pagination>;
}
```
