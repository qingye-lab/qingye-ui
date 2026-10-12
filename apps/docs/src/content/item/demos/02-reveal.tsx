import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "悬停显现的次要动作", titleEn: "Secondary actions on hover" } satisfies DemoMeta;

const rows = [
  { name: "春季蚕室记录", note: "温度 24℃，湿度 72%", time: "08:30" },
  { name: "夏季蚕室记录", note: "温度 27℃，湿度 68%", time: "昨天" },
  { name: "秋季蚕室记录", note: "温度 22℃，湿度 75%", time: "周一" },
  { name: "冬季蚕室记录", note: "温度 18℃，湿度 70%", time: "10 月 6 日" },
];

export default function Demo() {
  return <Stack gap="field" render={<ul />} className="m-0 w-full max-w-lg list-none p-0">
    {rows.map(row => <Item render={<li />} key={row.name}>
      <ItemContent><ItemTitle>{row.name}</ItemTitle><ItemDescription>{row.note}</ItemDescription></ItemContent>
      <ItemActions reveal="hover" resting={<time>{row.time}</time>}>
        <Button variant="quiet" size="sm">重命名</Button>
        <Button variant="quiet" size="sm">归档</Button>
      </ItemActions>
    </Item>)}
  </Stack>;
}
