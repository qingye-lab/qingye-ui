import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页码与每页条数", titleEn: "Pages and page size" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern aria-label="分页：已知总数" totalCount={95} defaultValue={{ page: 2, pageSize: 20 }} pageSizeOptions={[20, 50, 100]} />;
}
