# Pagination

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: b78e074d5c48db899068559434f3002b2eede27c7a4051e9c150011ec25f0469

Page position, real actions and explicit unknown totals.

## Decision
Only current position is derived by comparing root and link page facts. null means an unknown total; no final page or next-page availability is inferred.

## Notes
- No fetching, routing or automatic page window; unknown totals establish no next-page availability.

## Use and ownership
- Results are paged and positions/navigation availability are known.
- Avoid: Use Steps for process progression; never invent a last page when totals are unknown.
- Library: Navigation, lists, current-page semantics, and actual disabling of page entries.
- Application: Page content, current page, known/unknown totals, previous/next availability, and request outcomes.

## Composition
- Pagination: A named nav without generated pages.
- PaginationList / PaginationItem: ul / li organize page actions.
- PaginationLink: An anchor with aria-current=page for the current page.
- PaginationPrevious / PaginationNext: Button compositions with localized direction labels.
- PaginationEllipsis: An omitted-pages marker, not a final page.

## Responsive behavior
- Actions wrap while retaining current-page and total states.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

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
A named nav without generated pages.
- page: number. A confirmed positive page index; omit for zero results.
- totalPages: number | null. Required nonnegative total or null for unknown; explain unknown state visibly.
- aria-label / render / ref / native props: useRender.ComponentProps<nav>. The default name is localized.

### PaginationList / PaginationItem
ul / li organize page actions.
- render / ref / native props: useRender.ComponentProps<ul | li>. Preserve native list structure.

### PaginationLink
An anchor with aria-current=page for the current page.
- page / href / render / ref / native props: { page: number } & useRender.ComponentProps<a>. The application supplies positive page indices and real destinations.

### PaginationPrevious / PaginationNext
Button compositions with localized direction labels.
- disabled / onClick / render / nativeButton / Button props: ButtonProps. The caller supplies disabled facts; render an anchor with nativeButton=false for navigation.

### PaginationEllipsis
An omitted-pages marker, not a final page.
- children / render / native props: useRender.ComponentProps<span>. Use only when omitted pages are known to exist.

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
