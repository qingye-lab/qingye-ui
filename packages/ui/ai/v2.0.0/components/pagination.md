# 分页 Pagination

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/pagination
Source: packages/ui/src/components/pagination.tsx
Source SHA-256: 13a7de3c9d8565af5a3f4f8f002216b561885ab68dd0d42a73d2af34bd7a54ae

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
