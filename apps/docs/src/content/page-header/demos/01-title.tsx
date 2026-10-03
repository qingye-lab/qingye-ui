import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Item, ItemTitle } from "@qingye/ui/components/item";
import { Stack } from "@qingye/ui/components/layout";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye/ui/components/page-header";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "名称与任务动作", titleEn: "Name and task actions" } satisfies DemoMeta;
export default function Demo() {
  const [count, setCount] = useState(0);
  return <Stack><PageHeader><PageHeaderContent><PageHeaderTitle level={3}>内容</PageHeaderTitle><PageHeaderDescription>{count} 项</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button onClick={() => setCount(count + 1)}>添加一项</Button></PageHeaderActions></PageHeader>{count > 0 && <Stack render={<ul />} className="m-0 list-none p-0">{Array.from({ length: count }, (_, index) => <Item render={<li />} key={index}><ItemTitle>条目 {index + 1}</ItemTitle></Item>)}</Stack>}</Stack>;
}
