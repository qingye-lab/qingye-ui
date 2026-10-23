# Pagination

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: fccd85311f94413442c87843b53a939f262f9aa0b8d9147e90f16bf5511ecdb4

Page position, real actions and explicit unknown totals.

## Decision
PaginationPattern provides page windows, page-size selection and correction after totals decrease; page and pageSize change in one notification. Unknown totals require explicit hasNextPage. Retain the primitive parts for link navigation and custom anatomy.

## Notes
- The standard composition does not fetch or route. When controlled value exceeds the known total it presents the corrected page and emits total-change once; applications update state and requests. Unknown totals establish no next-page availability.

## Use and ownership
- Results are paged and positions/navigation availability are known.
- Avoid: Use Steps for process progression; never invent a last page when totals are unknown.
- Library: Navigation, lists, current-page semantics, and actual disabling of page entries.
- Application: Page content, current page, known/unknown totals, previous/next availability, and request outcomes.

## Composition
- PaginationPattern: Standard composition for local page actions.
- Pagination: A named nav without generated pages.
- PaginationList / PaginationItem: ul / li organize page actions.
- PaginationLink: An anchor with aria-current=page for the current page.
- PaginationPrevious / PaginationNext: Button compositions that display localized Previous page / Next page text when children are omitted. Icon-only replacements must provide a direction name through aria-label, aria-labelledby or sr-only text, and hide decorative icons.
- PaginationEllipsis: An omitted-pages marker, not a final page.

## Responsive behavior
- Actions wrap while retaining current-page and total states.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
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
- totalCount / hasNextPage: number | null / boolean. A nonnegative total determines pages and corrects the current page when it decreases. Zero results retain internal page=1 but present no current page. null requires explicit hasNextPage and never invents a final page.
- pageSizeOptions / disabled: readonly number[] / boolean. Omit options to hide the page-size control; candidates are distinct positive integers. disabled blocks local actions without inferring request state.
- aria-label / render / ref / native nav props: PaginationProps. Forwarded to nav; accessible page names, total summaries and page-size labels come from locale.

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
  return <PaginationPattern totalCount={120} defaultValue={{ page: 2, pageSize: 10 }} pageSizeOptions={[10, 20, 50]} />;
}
```

### 页数较多
Source: apps/docs/src/content/pagination/demos/02-ellipsis.tsx
```tsx
import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页数较多", titleEn: "Many pages" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern totalCount={120} defaultValue={{ page: 6, pageSize: 10 }} />;
}
```

### 总数未知
Source: apps/docs/src/content/pagination/demos/03-unknown.tsx
```tsx
import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "总数未知", titleEn: "Unknown total" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern totalCount={null} hasNextPage />;
}
```
