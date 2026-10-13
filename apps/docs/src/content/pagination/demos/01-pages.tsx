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
