import * as React from "react";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem, MenuCheckboxItem, MenuSeparator } from "@qingye/ui/components/menu";
import { Inline, Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "当前条目的命令", titleEn: "Commands for the current item" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false); const [items, setItems] = React.useState(["条目 B", "条目 A"]);
  return <Stack><Inline><Menu><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem disabled={items[0] === "条目 A"} onClick={() => setItems(value => ["条目 A", ...value.filter(item => item !== "条目 A")])}>移到首位</MenuItem><MenuItem disabled>恢复</MenuItem><MenuSeparator /><MenuCheckboxItem checked={marked} onCheckedChange={setMarked}>标记条目 A</MenuCheckboxItem></MenuPopup></MenuPositioner></MenuPortal></Menu></Inline><p className="m-0 text-body">条目 A · {marked ? "已标记" : "未标记"}</p><ol className="m-0 text-body">{items.map(item => <li key={item}>{item}</li>)}</ol></Stack>;
}
