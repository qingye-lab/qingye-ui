import { Item, ItemContent, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { useState } from "react";

export const meta = { title: "就地筛选", titleEn: "Filter in place" };

const names = ["春季目录", "夏季目录", "秋季目录", "冬季目录"];

export default function Demo() {
  const [query, setQuery] = useState("");
  const matches = names.filter(name => name.includes(query.trim()));
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <SearchInput aria-label="筛选目录" placeholder="筛选目录" value={query} onChange={event => setQuery(event.target.value)} />
      <div>{matches.map(name => <Item key={name}><ItemContent><ItemTitle>{name}</ItemTitle></ItemContent></Item>)}</div>
      {matches.length === 0 && <p className="text-support text-muted-foreground">没有名称包含「{query.trim()}」的目录</p>}
    </Stack>
  );
}
