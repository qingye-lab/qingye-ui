import { Skeleton, SkeletonLine } from "@qingye_lab/ui/components/skeleton";

export default function Cover() {
  return <Skeleton label="正在加载" className="w-full">
    <SkeletonLine className="w-1/2" />
    <SkeletonLine />
    <SkeletonLine className="w-3/4" />
  </Skeleton>;
}
