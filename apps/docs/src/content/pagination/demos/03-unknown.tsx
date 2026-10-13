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
