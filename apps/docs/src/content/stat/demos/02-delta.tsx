import { Inline } from "@qingye/ui/components/layout";
import { Sparkline } from "@qingye/ui/components/sparkline";
import { Stat, StatDelta, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "变化量与趋势", titleEn: "Change and trend" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="section" align="start">
    <Stat state="known"><StatLabel>本周同步</StatLabel><StatValue>1,284<StatUnit>次</StatUnit></StatValue><StatDelta value={12.4} period="较上周" format={n => `${n}%`} /><dd className="m-0"><Sparkline label="近 8 周同步次数" values={[980, 1010, 1102, 1080, 1150, 1120, 1142, 1284]} /></dd></Stat>
    <Stat state="known"><StatLabel>失败</StatLabel><StatValue>18<StatUnit>次</StatUnit></StatValue><StatDelta value={6} period="较上周" sentiment="bad" /></Stat>
    <Stat state="known"><StatLabel>平均延迟</StatLabel><StatValue>140<StatUnit>毫秒</StatUnit></StatValue><StatDelta value={-22} period="较上周" sentiment="good" format={n => `${n} 毫秒`} /></Stat>
  </Inline>;
}
