import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "零结果", titleEn: "Zero results" } satisfies DemoMeta;
export default function Demo() {
  return <Empty state="empty"><EmptyTitle level={3}>0 条内容</EmptyTitle><EmptyActions><Button>添加一项</Button></EmptyActions></Empty>;
}
