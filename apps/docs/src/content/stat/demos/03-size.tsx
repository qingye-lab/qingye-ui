import { Inline } from "@qingye_lab/ui/components/layout";
import { Stat, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "概览读数", titleEn: "Overview readings" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="section" align="start">
    <Stat state="known" size="lg"><StatLabel>在线设备</StatLabel><StatValue>128<StatUnit>台</StatUnit></StatValue><StatDescription>共 140 台</StatDescription></Stat>
    <Stat state="known" size="lg"><StatLabel>待处理</StatLabel><StatValue>3<StatUnit>项</StatUnit></StatValue><StatDescription>最早一项等了 2 小时</StatDescription></Stat>
    <Stat state="known" size="lg"><StatLabel>本周完成</StatLabel><StatValue>46<StatUnit>单</StatUnit></StatValue><StatDescription>较上周多 5 单</StatDescription></Stat>
    <Stat state="known" size="lg"><StatLabel>平均响应</StatLabel><StatValue>1.8<StatUnit>秒</StatUnit></StatValue><StatDescription>近 7 天</StatDescription></Stat>
  </Inline>;
}
