import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
export const meta = { title: "有限视口", titleEn: "Bounded viewport" };
export default function Demo() {
  return <ScrollArea aria-label="完整条目" role="region" style={{ maxHeight: "calc(var(--qy-control-md) * 5)" }}>{Array.from({ length: 20 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1}</div>)}</ScrollArea>;
}
