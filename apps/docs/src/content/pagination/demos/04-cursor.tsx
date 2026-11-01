import { PaginationPattern, useCursorPagination } from "@qingye_lab/ui/components/pagination";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "游标分页", titleEn: "Cursor pagination" } satisfies DemoMeta;

const items = Array.from({ length: 53 }, (_, index) => `条目 ${String(index + 1).padStart(2, "0")}`);
/** 假数据源：游标是下一页第一条的下标，只能顺着上一页的结果拿到。 */
function fetchPage(cursor: string | null, pageSize: number) {
  const start = cursor === null ? 0 : Number(cursor);
  const end = start + pageSize;
  return { rows: items.slice(start, end), next: end < items.length ? String(end) : null };
}

export default function Demo() {
  const { cursor, value, paginationProps, setNextCursor } = useCursorPagination({ defaultValue: { page: 1, pageSize: 10 } });
  const { rows, next } = fetchPage(cursor, value.pageSize);
  React.useEffect(() => { setNextCursor(next); }, [next, setNextCursor]);
  return (
    <div className="flex flex-col gap-(--qy-panel-gap)">
      <ul className="m-0 list-none p-0 text-body">{rows.map(row => <li key={row}>{row}</li>)}</ul>
      <PaginationPattern aria-label="分页：游标" pageSizeOptions={[10, 25]} {...paginationProps} />
    </div>
  );
}
