import { VirtualList } from "@qingye_lab/ui/components/virtual-list";
export const meta = { title: "集合窗口", titleEn: "Collection window" };
const items = Array.from({ length: 100 }, (_, id) => ({ id, label: `条目 ${id + 1}` }));
const rowSize = 48;
export default function Demo() {
  return <VirtualList aria-label="等高条目" items={items} getKey={item => item.id} itemSize={rowSize} height={rowSize * 4} renderItem={item => <span className="flex h-full items-center px-(--qy-control-md-padding) text-body">{item.label}</span>} />;
}
