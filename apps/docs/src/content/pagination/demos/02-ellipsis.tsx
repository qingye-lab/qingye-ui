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
