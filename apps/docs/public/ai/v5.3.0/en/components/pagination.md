# Pagination

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: 6b4c3df196a315eb41ef9873ba55c26015781f71d73fe28557fedb9dd1120379

Page position, real actions and explicit unknown totals.

## Decision
PaginationPattern renders one row of range summary, page window and page-size selection, showing only controls that can change the result; page and pageSize change in one notification and totals that decrease correct the page. Unknown totals require explicit hasNextPage. Retain the primitive parts for link navigation and custom anatomy.

## Notes
- With a single page, PaginationPattern drops the page window while the range summary and page-size select stay on the row, so content does not jump; it does not show a row of disabled page buttons, because they correspond to nothing the reader can do.
- The standard composition does not fetch or route. When controlled value exceeds the known total it presents the corrected page and emits total-change once; applications update state and requests. Unknown totals establish no next-page availability.
- For cursor pagination use useCursorPagination: call reset() when filters or sorting change. DataTablePattern server mode accepts totalCount: null with hasNextPage; a sorting change returns it to page 1 by itself, so call reset() at the same time to clear the cursors.
- Since 5.2.0: the PaginationPattern and DataTablePattern pager uses one row and icon page buttons with unchanged props; a single page, zero results or a cursor first page without a next page collapse controls or render nothing, so tests that relied on always-present buttons need updating. Custom complete UILocale objects add paginationRange; paginationSummary is deprecated and goes in the next major.

## Use and ownership
- Results are paged and positions/navigation availability are known.
- Avoid: Use Steps for process progression; never invent a last page when totals are unknown.
- Library: Navigation, lists, current-page semantics, and actual disabling of page entries.
- Application: Page content, current page, known/unknown totals, previous/next availability, and request outcomes.

## Composition
- PaginationPattern: Standard composition for local page actions.
- useCursorPagination: Cursor pagination memory: remembers the cursors already walked and allows returning to any read page. Returns { cursor, value, paginationProps, setNextCursor, reset }. cursor is what to request for the current page, null on page 1; value is the corrected page and page size. paginationProps is { value, onValueChange, totalCount: null, hasNextPage } to spread onto PaginationPattern; hasNextPage means a next-page cursor has been registered, so nothing renders before data arrives and registers it, consistent with unknown totals; a page-size change returns to page 1 and discards the registered cursors. setNextCursor(next, fromPage?) registers the next-page cursor once data arrives; null or undefined marks this page as the last. fromPage defaults to the current page; pass the originating page when the request returns after paging away, and results beyond an unregistered page are ignored. Re-registering a page invalidates the later ones. Cursors compare with Object.is, so an unchanged one is a no-op and safe to call in an effect. reset() is for filters or sorting changing the result set: it clears all cursors and returns to page 1, keeping the page size, with no notification when already on page 1. A request sent before reset or a page-size change that returns afterwards belongs to the old result set; fromPage cannot catch it, so drop it in the request layer (for example by keying requests on the filters and page size).
- Pagination: A named nav without generated pages.
- PaginationList / PaginationItem: ul / li organize page actions.
- PaginationLink: An anchor with aria-current=page for the current page.
- PaginationPrevious / PaginationNext: Button compositions that display localized Previous page / Next page text when children are omitted. Icon-only replacements must provide a direction name through aria-label, aria-labelledby or sr-only text, and hide decorative icons.
- PaginationEllipsis: An omitted-pages marker, not a final page.

## Responsive behavior
- Wide screens use one row: summary first, pages and page size at the end. Narrow screens keep five page slots and give the page row its own line.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- CursorPagination: type; owner pagination; PASS
- CursorPaginationChangeDetails: type; owner pagination; PASS
- CursorPaginationOptions: type; owner pagination; PASS
- CursorPaginationProps: type; owner pagination; PASS
- normalizePaginationValue: function; owner pagination; PASS; props: PaginationValue
- Pagination: function; owner pagination; PASS; props: PaginationProps
- PaginationChangeDetails: type; owner pagination; PASS
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
- PaginationPattern: function; owner pagination; PASS; props: PaginationPatternProps
- PaginationPatternProps: type; owner pagination; PASS
- PaginationPrevious: function; owner pagination; PASS; props: PaginationPreviousProps
- PaginationPreviousProps: type; owner pagination; PASS
- PaginationProps: type; owner pagination; PASS
- PaginationValue: type; owner pagination; PASS
- useCursorPagination: function; owner pagination; PASS; props: CursorPaginationOptions

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

### PaginationPattern
- `busy?`: `boolean`. 正在取数（例如 DataTablePattern busy）。与 disabled 的区别：翻页被挡住，但按钮保持可聚焦—— 原生 disabled 会让刚按下的那个按钮立刻丢掉焦点，键盘用户被甩到页面顶部。页大小选择改为只读（同样留住焦点）。
- `defaultValue?`: `PaginationValue`.
- `disabled?`: `boolean`.
- `hasNextPage?`: `boolean`.
- `onValueChange?`: `(value: PaginationValue, details: PaginationChangeDetails) => void`.
- `pageSizeOptions?`: `readonly number[]`. Omit to hide the page-size control. Values must be distinct positive integers.
- `totalCount`: `number`.
- `value?`: `PaginationValue`.
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

### PaginationPrevious
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### useCursorPagination
- `defaultValue?`: `PaginationValue`.
- `onValueChange?`: `(value: PaginationValue, details: CursorPaginationChangeDetails) => void`.
- `value?`: `PaginationValue`.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context PageContext: without a provider nullable; provided by Pagination

## Curated API
Written descriptions; the list above is the type-resolved fact.

### PaginationPattern
Standard composition for local page actions.
- value / defaultValue / onValueChange: PaginationValue / (value, { reason }) => void. Atomically updates { page, pageSize }; page starts at 1. Reasons are page, page-size and total-change. A page-size change also returns to page 1.
- totalCount / hasNextPage: number | null / boolean. A nonnegative total determines pages and corrects the current page when it decreases. A single page leaves only the range summary; zero results read "0 results". null requires explicit hasNextPage and never invents a final page; page 1 without a next page renders nothing.
- pageSizeOptions / disabled / busy: readonly number[] / boolean / boolean. Omit options to hide the page-size control; candidates are distinct positive integers. When the total fits the smallest candidate the control is omitted, since changing it would not change the result. disabled blocks local actions without inferring request state. busy also blocks paging but keeps buttons focusable (native disabled would drop focus from the button just pressed) and makes the page-size control read-only; DataTablePattern passes its busy to it.
- aria-label / render / ref / native nav props: PaginationProps. Forwarded to nav; accessible page names, previous/next icon-button names, the range summary (paginationRange) and page-size labels come from locale.

### useCursorPagination
Cursor pagination memory: remembers the cursors already walked and allows returning to any read page. Returns { cursor, value, paginationProps, setNextCursor, reset }. cursor is what to request for the current page, null on page 1; value is the corrected page and page size. paginationProps is { value, onValueChange, totalCount: null, hasNextPage } to spread onto PaginationPattern; hasNextPage means a next-page cursor has been registered, so nothing renders before data arrives and registers it, consistent with unknown totals; a page-size change returns to page 1 and discards the registered cursors. setNextCursor(next, fromPage?) registers the next-page cursor once data arrives; null or undefined marks this page as the last. fromPage defaults to the current page; pass the originating page when the request returns after paging away, and results beyond an unregistered page are ignored. Re-registering a page invalidates the later ones. Cursors compare with Object.is, so an unchanged one is a no-op and safe to call in an effect. reset() is for filters or sorting changing the result set: it clears all cursors and returns to page 1, keeping the page size, with no notification when already on page 1. A request sent before reset or a page-size change that returns afterwards belongs to the old result set; fromPage cannot catch it, so drop it in the request layer (for example by keying requests on the filters and page size).
- value / defaultValue / onValueChange: PaginationValue / (value, { reason }) => void. The same controlled/uncontrolled pattern as PaginationPattern. reason additionally includes reset (reset() returning to page 1). A controlled page beyond the read range is corrected to the furthest read page and emitted once as total-change. The cursors themselves are always held by the hook.

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
Button compositions that display localized Previous page / Next page text when children are omitted. Icon-only replacements must provide a direction name through aria-label, aria-labelledby or sr-only text, and hide decorative icons.
- disabled / onClick / render / nativeButton / Button props: ButtonProps. The caller supplies disabled facts; render an anchor with nativeButton=false for navigation.

### PaginationEllipsis
An omitted-pages marker, not a final page.
- children / render / native props: useRender.ComponentProps<span>. Use only when omitted pages are known to exist.

## Keyboard

## Source examples
### 页码与每页条数
Source: apps/docs/src/content/pagination/demos/01-pages.tsx
```tsx
import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页码与每页条数", titleEn: "Pages and page size" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern aria-label="分页：已知总数" totalCount={95} defaultValue={{ page: 2, pageSize: 20 }} pageSizeOptions={[20, 50, 100]} />;
}
```

### 页数较多
Source: apps/docs/src/content/pagination/demos/02-ellipsis.tsx
```tsx
import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页数较多", titleEn: "Many pages" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern aria-label="分页：折叠的页码" totalCount={120} defaultValue={{ page: 6, pageSize: 10 }} />;
}
```

### 总数未知
Source: apps/docs/src/content/pagination/demos/03-unknown.tsx
```tsx
import { PaginationPattern, type PaginationValue } from "@qingye_lab/ui/components/pagination";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "总数未知", titleEn: "Unknown total" } satisfies DemoMeta;

export default function Demo() {
  const [value, setValue] = React.useState<PaginationValue>({ page: 1, pageSize: 20 });
  return <PaginationPattern aria-label="分页：总数未知" totalCount={null} hasNextPage={value.page < 4} value={value} onValueChange={setValue} />;
}
```

### 游标分页
Source: apps/docs/src/content/pagination/demos/04-cursor.tsx
```tsx
import { PaginationPattern, useCursorPagination } from "@qingye_lab/ui/components/pagination";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "游标分页", titleEn: "Cursor pagination" } satisfies DemoMeta;

const items = Array.from({ length: 53 }, (_, index) => `条目 ${String(index + 1).padStart(2, "0")}`);
/** 假数据源：游标是下一页第一条的下标，只能顺着上一页的结果拿到。 */
function fetchPage(cursor: string | null, pageSize: number) {
  const start = cursor === null ? 0 : Number(cursor);
  const end = start + pageSize;
  return { rows: items.slice(start, end), next: end < items.length ? String(end) : null };
}

export default function Demo() {
  const { cursor, value, paginationProps, setNextCursor } = useCursorPagination({ defaultValue: { page: 1, pageSize: 10 } });
  const { rows, next } = fetchPage(cursor, value.pageSize);
  React.useEffect(() => { setNextCursor(next); }, [next, setNextCursor]);
  return (
    <div className="flex flex-col gap-(--qy-panel-gap)">
      <ul className="m-0 list-none p-0 text-body">{rows.map(row => <li key={row}>{row}</li>)}</ul>
      <PaginationPattern aria-label="分页：游标" pageSizeOptions={[10, 25]} {...paginationProps} />
    </div>
  );
}
```
