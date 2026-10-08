import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Item, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "零、未知与不适用", titleEn: "Zero, unknown and not applicable" } satisfies DemoMeta;
export default function Demo() {
  const [added, setAdded] = useState(false);
  return <Stack gap="section">{added ? <Item><ItemTitle>条目 1</ItemTitle></Item> : <Empty state="empty"><EmptyTitle level={3}>0 条内容</EmptyTitle><EmptyActions><Button onClick={() => setAdded(true)}>添加一项</Button></EmptyActions></Empty>}<Empty state="unknown"><EmptyTitle level={3}>结果未知</EmptyTitle><EmptyDescription>尚未提供结果</EmptyDescription></Empty><Empty state="not-applicable"><EmptyTitle level={3}>不适用</EmptyTitle></Empty></Stack>;
}
