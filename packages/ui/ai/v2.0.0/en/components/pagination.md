# Pagination

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: 13a7de3c9d8565af5a3f4f8f002216b561885ab68dd0d42a73d2af34bd7a54ae

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
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
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
import { Stack } from "@qingye_lab/ui/components/layout";
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye_lab/ui/components/pagination";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "已知与未知总页数", titleEn: "Known and unknown totals" } satisfies DemoMeta;

// 演示只描述「结果分页」本身，不编造业务流程。
const pages = [
  { title: "接入与设备", summary: "12 条记录" },
  { title: "权限与角色", summary: "8 条记录" },
  { title: "同步与导出", summary: "5 条记录" },
];

export default function Demo() {
  const [page, setPage] = useState(2);
  return <Stack gap="section">
    <Stack>
      <Heading level={6} step="heading">{pages[page - 1]!.title}</Heading>
      <Text step="support" className="text-muted-foreground">{pages[page - 1]!.summary}</Text>
      <Pagination page={page} totalPages={pages.length} aria-label="内容分页">
        <PaginationList>
          <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
          {pages.map((entry, index) => <PaginationItem key={entry.title}>
            <PaginationLink
              page={index + 1}
              href={`#page-${index + 1}`}
              onClick={event => { event.preventDefault(); setPage(index + 1); }}
            >{index + 1}</PaginationLink>
          </PaginationItem>)}
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationNext disabled={page === pages.length} onClick={() => setPage(page + 1)} /></PaginationItem>
        </PaginationList>
      </Pagination>
    </Stack>

    <Stack>
      <Text step="support" className="text-muted-foreground">总数未知时只表达方向和已到达的位置，不伪造末页。</Text>
      <Pagination page={page} totalPages={null} aria-label="未知总数的分页">
        <PaginationList>
          <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
          <PaginationItem><Text step="support">第 {page} 页</Text></PaginationItem>
          <PaginationItem><PaginationNext onClick={() => setPage(page + 1)} /></PaginationItem>
        </PaginationList>
      </Pagination>
    </Stack>
  </Stack>;
}
```
