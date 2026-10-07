import { useState } from "react";
import { Stack } from "@qingye/ui/components/layout";
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { Heading, Text } from "@qingye/ui/components/typography";
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
