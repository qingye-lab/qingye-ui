import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页数较多", titleEn: "Many pages" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern aria-label="分页：折叠的页码" totalCount={120} defaultValue={{ page: 6, pageSize: 10 }} />;
}
