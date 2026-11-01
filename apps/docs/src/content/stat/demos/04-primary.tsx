import { Stat, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "主读数", titleEn: "Primary reading" } satisfies DemoMeta;
export default function Demo() {
  return <Stat state="known" size="xl"><StatLabel>机房温度</StatLabel><StatValue>23.6<StatUnit>℃</StatUnit></StatValue><StatDescription>3 分钟前上报</StatDescription></Stat>;
}
