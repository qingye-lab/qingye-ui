import { Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "离散的阶段", titleEn: "Discrete stages" } satisfies DemoMeta;
const stages = ["一龄", "二龄", "三龄", "四龄", "五龄", "上蔟", "结茧"];
const text = (value: number | null) => value === null ? "" : `${stages[value - 1]}，第 ${value} / 7 阶段`;
export default function Demo() {
  return <Stack gap="fields" className="w-full max-w-sm">{[1, 4, 7].map(value => <Progress key={value} value={value} min={0} max={7} segments={7} getAriaValueText={(_, actual) => text(actual)}><ProgressLabel>蚕龄</ProgressLabel><ProgressValue>{(_, actual) => text(actual)}</ProgressValue><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>)}</Stack>;
}
