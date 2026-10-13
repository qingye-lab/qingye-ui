import { Heatmap } from "@qingye_lab/ui/components/heatmap";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "放在区块里", titleEn: "Inside a section" } satisfies DemoMeta;

const days = [
  { key: "mon", label: "周一" }, { key: "tue", label: "周二" }, { key: "wed", label: "周三" },
  { key: "thu", label: "周四" }, { key: "fri", label: "周五" }, { key: "sat", label: "周六" }, { key: "sun", label: "周日" },
];
const hours = ["00 时", "06 时", "12 时", "18 时"];
const counts: Record<string, number[]> = {
  mon: [2, 18, 42, 30], tue: [1, 20, 46, 28], wed: [3, 16, 38, 25],
  thu: [2, 22, 50, 33], fri: [4, 19, 44, 29], sat: [0, 6, 14, 10], sun: [0, 4, 9, 7],
};

export default function Demo() {
  return <Section className="w-full max-w-2xl">
    <SectionHeader><SectionTitle level={4} id="heatmap-section-sync">同步热度</SectionTitle></SectionHeader>
    <Heatmap framed={false} aria-labelledby="heatmap-section-sync" label="每周时段的同步次数" rowLabel="时段" columnLabel="星期" valueLabel="同步次数"
      columns={days}
      rows={hours.map((hour, index) => ({ id: hour, label: hour, values: Object.fromEntries(days.map(day => [day.key, counts[day.key]![index]!])) }))} />
  </Section>;
}
