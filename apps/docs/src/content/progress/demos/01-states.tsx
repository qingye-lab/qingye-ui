import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "已确认与不定进度", titleEn: "Confirmed and indeterminate progress" };
export default function Demo() { return <Stack gap="fields" className="w-full max-w-sm">{([0,50,100,null] as const).map((value,index) => <Progress key={index} value={value}><ProgressLabel>进度</ProgressLabel><ProgressValue /><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>)}</Stack>; }
