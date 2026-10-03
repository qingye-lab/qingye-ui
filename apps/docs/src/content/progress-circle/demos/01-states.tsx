import { useId } from "react";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";
import { Inline, Stack } from "@qingye/ui/components/layout";
export const meta = { title: "圆形进度", titleEn: "Circular progress" };
export default function Demo() {
  const name = useId();
  return <Stack gap="fields"><span id={name} className="text-label">进度</span><Inline>{(["xs","sm","md","lg","xl"] as const).map(size => <Stack key={size} gap="field" align="center"><ProgressCircle size={size} value={50} aria-labelledby={name} /><span className="text-caption">50%</span></Stack>)}</Inline><Inline>{([0,100,null] as const).map((value,index) => <Stack key={index} gap="field" align="center"><ProgressCircle value={value} aria-labelledby={name} /><span className="text-caption">{value === null ? "进行中" : `${value}%`}</span></Stack>)}</Inline></Stack>;
}
