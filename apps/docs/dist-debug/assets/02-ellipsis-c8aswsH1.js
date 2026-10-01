const n=`import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { type MouseEvent, useState } from "react";

export const meta = {
  title: "省略号",
  description: "保留首尾与当前页两侧，其余收起。点击页码试试。",
};

const total = 20;

/** 1 … 5 6 7 … 20 */
function pages(current: number): (number | "gap")[] {
  const near = [current - 1, current, current + 1].filter((p) => p > 1 && p < total);
  const list: (number | "gap")[] = [1];
  if (near[0]! > 2) list.push("gap");
  list.push(...near);
  if (near[near.length - 1]! < total - 1) list.push("gap");
  list.push(total);
  return list;
}

export default function Demo() {
  const [page, setPage] = useState(6);
  const go = (next: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(next);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} href={\`?page=\${page - 1}\`} onClick={go(page - 1)} />
        </PaginationItem>
        {pages(page).map((p, i) =>
          p === "gap" ? (
            <PaginationItem key={\`gap-\${i}\`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink href={\`?page=\${p}\`} isActive={p === page} onClick={go(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext disabled={page === total} href={\`?page=\${page + 1}\`} onClick={go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
`;export{n as default};
