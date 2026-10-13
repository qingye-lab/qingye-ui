import { IconChevronRight } from "@tabler/icons-react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "整行是一个链接", titleEn: "The whole row as one link" } satisfies DemoMeta;

const queue = [
  { id: "room-3", name: "蚕室 3", note: "待核对 2 条读数" },
  { id: "room-5", name: "蚕室 5", note: "湿度偏高 3 次" },
  { id: "room-8", name: "蚕室 8", note: "桑叶入库单待签收" },
];

export default function Demo() {
  return <Stack render={<ul />} className="m-0 w-full max-w-lg list-none p-0">
    {queue.map(row => <li key={row.id}>
      <Item render={<a href={`#${row.id}`} />}>
        <ItemContent><ItemTitle>{row.name}</ItemTitle><ItemDescription>{row.note}</ItemDescription></ItemContent>
        <IconChevronRight aria-hidden="true" className="size-(--qy-control-md-icon) shrink-0 text-muted-foreground rtl:-scale-x-100" />
      </Item>
    </li>)}
  </Stack>;
}
