import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Input } from "@qingye_lab/ui/components/input";
import { VirtualList } from "@qingye_lab/ui/components/virtual-list";
export const meta = { title: "项身份与焦点", titleEn: "Identity and focus" };
const initial = Array.from({ length: 40 }, (_, id) => ({ id, label: `条目 ${id + 1}` }));
const rowSize = 48;
export default function Demo() {
  const [items, setItems] = useState(initial);
  return <div className="grid gap-(--qy-action-gap)"><div className="flex flex-wrap gap-(--qy-action-gap)"><Button variant="bordered" onClick={() => setItems(current => [...current].reverse())}>倒序</Button><Button variant="quiet" onClick={() => setItems(current => current.slice(1))} disabled={items.length === 0}>移除首项</Button></div><VirtualList aria-label="可编辑条目" items={items} getKey={item => item.id} itemSize={rowSize} height={rowSize * 4} renderItem={item => <div className="flex h-full items-center px-(--qy-control-md-padding)"><Input aria-label={item.label} defaultValue={item.label} /></div>} /></div>;
}
