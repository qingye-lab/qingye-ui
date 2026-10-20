import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页码与每页条数", titleEn: "Pages and page size" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern totalCount={120} defaultValue={{ page: 2, pageSize: 10 }} pageSizeOptions={[10, 20, 50]} />;
}
