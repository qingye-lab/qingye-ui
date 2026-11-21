import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye_lab/ui/components/meter";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "以整格计的读数", titleEn: "Readings in whole cells" } satisfies DemoMeta;
const rows = [
  { name: "一号蚕室桑叶余量", value: 3 },
  { name: "二号蚕室桑叶余量", value: 1 },
  { name: "三号蚕室桑叶余量", value: 0 },
];
const reading = (value: number) => `${value} / 4 筐`;
export default function Demo() {
  return <Stack gap="fields" className="w-full max-w-xs">{rows.map(row => <Meter key={row.name} value={row.value} min={0} max={4} segments={4} getAriaValueText={(_, value) => reading(value)}>
    <Inline gap="actions"><MeterLabel>{row.name}</MeterLabel><MeterValue className="ms-auto">{(_, value) => reading(value)}</MeterValue></Inline>
    <MeterTrack><MeterIndicator /></MeterTrack>
  </Meter>)}</Stack>;
}
