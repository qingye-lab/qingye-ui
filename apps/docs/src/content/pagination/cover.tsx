import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye_lab/ui/components/pagination";

export default function Cover() {
  return <Pagination page={2} totalPages={5}>
    <PaginationList>
      <PaginationItem><PaginationPrevious shape="icon" aria-label="上一页"><IconChevronLeft aria-hidden="true" /></PaginationPrevious></PaginationItem>
      {[1, 2].map(page => <PaginationItem key={page}><PaginationLink page={page} href={`#page-${page}`}>{page}</PaginationLink></PaginationItem>)}
      <PaginationItem><PaginationNext shape="icon" aria-label="下一页"><IconChevronRight aria-hidden="true" /></PaginationNext></PaginationItem>
    </PaginationList>
  </Pagination>;
}
