import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "独立趋势的目标带", titleEn: "Target band on a block trend" } satisfies DemoMeta;
export default function Demo() {
  return <div className="grid max-w-sm gap-(--qy-field-gap)">
    <p className="m-0 text-body">近 12 周同步次数</p>
    <Sparkline appearance="area" height={64} label="近 12 周同步次数" values={[38, 41, 39, 45, 52, 48, 50, null, 55, 61, 58, 64]} band={{ from: 45, to: 60, label: "目标区间" }} />
  </div>;
}
