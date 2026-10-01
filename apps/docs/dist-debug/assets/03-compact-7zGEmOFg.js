const n=`import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { type MouseEvent, useState } from "react";

export const meta = {
  title: "紧凑",
  description: "移动端或空间有限时，只保留前后翻页与当前位置。",
};

const total = 12;

export default function Demo() {
  const [page, setPage] = useState(3);
  const go = (next: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(next);
  };
  return (
    <Pagination>
      <PaginationContent className="gap-3">
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} href={\`?page=\${page - 1}\`} onClick={go(page - 1)} />
        </PaginationItem>
        <PaginationItem aria-live="polite" className="numeric text-muted-foreground text-sm">
          第 <span className="font-medium text-foreground">{page}</span> / {total} 页
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled={page === total} href={\`?page=\${page + 1}\`} onClick={go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
`;export{n as default};
