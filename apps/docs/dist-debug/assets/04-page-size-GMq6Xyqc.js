const n=`import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { type MouseEvent, useState } from "react";

export const meta = {
  title: "每页条数",
  description: "列表底栏：每页条数、范围说明与翻页。窄屏时换行，页码只保留前后翻页。",
};

const total = 236;
const sizes = [10, 20, 50];

export default function Demo() {
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(total / size);
  const from = (page - 1) * size + 1;
  const to = Math.min(page * size, total);
  const go = (next: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(next);
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 text-muted-foreground text-sm">
      <div className="flex items-center gap-2">
        <span>每页</span>
        <Select
          items={sizes.map((n) => ({ label: \`\${n} 条\`, value: n }))}
          onValueChange={(value) => {
            setSize(value as number);
            setPage(1);
          }}
          value={size}
        >
          <SelectTrigger aria-label="每页条数" className="w-auto min-w-24" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {sizes.map((n) => (
              <SelectItem key={n} value={n}>
                {n} 条
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <span className="numeric">
          {from}–{to}，共 {total} 条
        </span>
      </div>
      <Pagination className="ms-auto me-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled={page === 1} href={\`?page=\${page - 1}\`} onClick={go(page - 1)} />
          </PaginationItem>
          {[1, 2, 3].map((p) =>
            p <= pageCount ? (
              <PaginationItem className="max-sm:hidden" key={p}>
                <PaginationLink href={\`?page=\${p}\`} isActive={p === page} onClick={go(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ) : null,
          )}
          <PaginationItem>
            <PaginationNext disabled={page === pageCount} href={\`?page=\${page + 1}\`} onClick={go(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
`;export{n as default};
