# Pagination

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: df9f54d7c78d9db0765486a540b32e116427823bd4c688b1ec94764ac9f91878

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
### 已知与未知总页数
Source: apps/docs/src/content/pagination/demos/01-pages.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Stack } from "@qingye/ui/components/layout";
import { Pagination, PaginationItem, PaginationList, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { Text } from "@qingye/ui/components/typography";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "已知与未知总页数", titleEn: "Known and unknown totals" } satisfies DemoMeta;
const pages = ["A · B", "C · D", "E · F"];
const availablePages = ["A · B", "C · D"];
export default function Demo() {
  const [page, setPage] = useState(1);
  const [partialPage, setPartialPage] = useState(2);
  return <Stack gap="section"><Stack><Text>{pages[page - 1]}</Text><Pagination page={page} totalPages={pages.length} aria-label="内容分页"><PaginationList><PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>{pages.map((_, index) => <PaginationItem key={index}><Button variant="quiet" aria-current={page === index + 1 ? "page" : undefined} onClick={() => setPage(index + 1)}>{index + 1}</Button></PaginationItem>)}<PaginationItem><PaginationNext disabled={page === pages.length} onClick={() => setPage(page + 1)} /></PaginationItem></PaginationList></Pagination></Stack><Stack><Text>{availablePages[partialPage - 1]}</Text><Pagination page={partialPage} totalPages={null} aria-label="未知总数的分页"><PaginationList><PaginationItem><PaginationPrevious disabled={partialPage === 1} onClick={() => setPartialPage(partialPage - 1)} /></PaginationItem><PaginationItem><PaginationNext disabled={partialPage === availablePages.length} onClick={() => setPartialPage(partialPage + 1)} /></PaginationItem></PaginationList><Text step="support">第 {partialPage} 页 · 总页数未知</Text></Pagination></Stack></Stack>;
}
```
