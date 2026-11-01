import { Card } from "@qingye_lab/ui/components/card";
import { Skeleton, SkeletonControl, SkeletonLine } from "@qingye_lab/ui/components/skeleton";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "与控件同高", titleEn: "Same height as the control" } satisfies DemoMeta;

export default function Demo() {
  return <Card className="w-full max-w-md p-(--qy-panel-padding)">
    <Skeleton label="正在加载表单" className="gap-(--qy-field-gap)">
      <SkeletonLine className="w-1/4" />
      <SkeletonControl />
      <SkeletonLine className="w-1/3" />
      <SkeletonControl />
      <SkeletonControl className="w-24" />
    </Skeleton>
  </Card>;
}
