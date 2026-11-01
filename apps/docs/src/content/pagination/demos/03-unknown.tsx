import { PaginationPattern, type PaginationValue } from "@qingye_lab/ui/components/pagination";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "总数未知", titleEn: "Unknown total" } satisfies DemoMeta;

export default function Demo() {
  const [value, setValue] = React.useState<PaginationValue>({ page: 1, pageSize: 20 });
  return <PaginationPattern totalCount={null} hasNextPage={value.page < 4} value={value} onValueChange={setValue} />;
}
