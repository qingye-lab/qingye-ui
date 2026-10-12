import { Proportion } from "@qingye_lab/ui/components/proportion";
import { Stat, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "数字下的轨道", titleEn: "A track under a number" } satisfies DemoMeta;
export default function Demo() {
  return <Stat state="known" className="w-full max-w-60"><StatLabel>已用空间</StatLabel><StatValue>64<StatUnit>GB</StatUnit></StatValue>
    <StatDescription><Proportion label="已用空间构成" legend="hidden" format={n => `${n} GB`} items={[{ key: "rec", label: "记录", value: 38 }, { key: "att", label: "附件", value: 20 }, { key: "log", label: "日志", value: 6 }]} /></StatDescription>
  </Stat>;
}
