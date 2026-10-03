import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
export const meta = { title: "宽高关系", titleEn: "Ratios" };
export default function Demo() {
  return <div className="grid grid-cols-1 gap-(--qy-space-4) sm:grid-cols-3">{[{ ratio: 1, label: "1:1" }, { ratio: 3 / 2, label: "3:2" }, { ratio: 16 / 9, label: "16:9" }].map(item => <AspectRatio key={item.label} ratio={item.ratio} className="flex items-center justify-center bg-surface-subtle text-body">{item.label}</AspectRatio>)}</div>;
}
