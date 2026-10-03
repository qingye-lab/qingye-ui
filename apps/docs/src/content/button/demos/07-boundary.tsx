import { Button } from "@qingye/ui/components/button";

export const meta = { title: "组合：同底色的边界", titleEn: "Composition: boundary on the same surface" };

export default function Demo() {
  return <div className="w-full rounded-panel bg-(--device-carrier) [--device-carrier:var(--qy-primary)] [--device-boundary:var(--qy-primary-foreground)] p-(--qy-panel-padding) text-primary-foreground">
    {/* 基础层 §5：实心入口与父面同色，显式补必要边界，并消费 §1 的边框换算。 */}
    <Button className="border border-(--device-boundary) px-(--qy-control-md-padding-bordered) focus-visible:ring-0 focus-visible:border-(--device-boundary) focus-visible:inset-ring-[length:var(--qy-focus-boundary-inset)] focus-visible:inset-ring-(--device-boundary)">继续核对设备</Button>
  </div>;
}
