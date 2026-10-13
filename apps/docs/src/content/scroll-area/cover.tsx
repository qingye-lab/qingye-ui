import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";

export default function Cover() {
  return <ScrollArea aria-label="条目" role="region" className="max-h-[calc(var(--qy-control-md)*2.5)] w-full rounded-item border border-border">
    {Array.from({ length: 8 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md) items-center px-(--qy-control-md-padding) text-body">条目 {index + 1}</div>)}
  </ScrollArea>;
}
