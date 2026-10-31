import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "总数未知", titleEn: "Unknown total" } satisfies DemoMeta;

export default function Demo() {
  return <PaginationPattern aria-label="分页：总数未知" totalCount={null} hasNextPage />;
}
