import { Chart } from "@qingye_lab/ui/components/chart";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "放在区块里", titleEn: "Inside a section" } satisfies DemoMeta;

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const ok = [42, 48, 45, 51, 58, 31, 28];
const failed = [3, 2, 6, 1, 4, 0, 2];

export default function Demo() {
  return <Section className="w-full max-w-2xl">
    <SectionHeader><SectionTitle level={4} id="chart-section-sync">本周同步</SectionTitle></SectionHeader>
    <Chart framed={false} aria-labelledby="chart-section-sync" type="line" label="本周同步次数" categoryLabel="日期" valueLabel="次数"
      series={[{ key: "ok", label: "成功" }, { key: "failed", label: "失败" }]}
      rows={days.map((day, index) => ({ id: day, label: day, values: { ok: ok[index]!, failed: failed[index]! } }))} />
  </Section>;
}
