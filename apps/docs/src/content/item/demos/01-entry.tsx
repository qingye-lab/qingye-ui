import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemLink, ItemTitle } from "@qingye/ui/components/item";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "入口与独立动作", titleEn: "Navigation and separate actions" } satisfies DemoMeta;

export default function Demo() {
  const [expanded, setExpanded] = useState(false);
  return <Stack render={<ul />} className="m-0 list-none p-0">
    <Item render={<li />}>
      <ItemContent>
        <ItemTitle><ItemLink href="/components/description-list">名称与值</ItemLink></ItemTitle>
        {expanded && <ItemDescription>用一行名称对一行值，名称按内容成列。</ItemDescription>}
      </ItemContent>
      <ItemActions><Button variant="quiet" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "收起" : "展开"}</Button></ItemActions>
    </Item>
    <Item render={<li />}>
      <ItemContent><ItemTitle><ItemLink href="/components/table">比较表</ItemLink></ItemTitle></ItemContent>
    </Item>
  </Stack>;
}
