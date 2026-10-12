import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "三级的级别", titleEn: "Three levels" } satisfies DemoMeta;
const levels = ["低", "中", "高"];
const rows: { name: string; level: 1 | 2 | 3; tone: "danger" | "warning" | "info" }[] = [
  { name: "三号蚕室温度偏离", level: 3, tone: "danger" },
  { name: "一号蚕室湿度偏离", level: 2, tone: "warning" },
  { name: "二号蚕室桑叶余量", level: 1, tone: "info" },
];
export default function Demo() {
  return <ul className="m-0 grid w-full max-w-xs list-none gap-(--qy-field-gap) p-0">{rows.map(row => <li key={row.name} className="flex min-w-0 items-center justify-between gap-(--qy-panel-gap)">
    <span className="min-w-0 text-body wrap-anywhere">{row.name}</span>
    <Meter className="w-16 shrink-0" aria-label={`${row.name}级别`} value={row.level} min={0} max={3} segments={3} tone={row.tone} getAriaValueText={(_, value) => levels[value - 1]!}><MeterTrack><MeterIndicator /></MeterTrack></Meter>
  </li>)}</ul>;
}
