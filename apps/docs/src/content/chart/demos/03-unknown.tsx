import { Chart } from "@qingye_lab/ui/components/chart";
import { Empty, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "未知与空", titleEn: "Unknown and empty" };

const failures: { id: string; label: string; count: number }[] = [];

export default function Demo() {
  return <Stack gap="section" className="w-full max-w-2xl">
    <Chart type="line" label="近五天延迟" categoryLabel="日期" valueLabel="毫秒" series={[{ key: "ms", label: "延迟" }]}
      rows={[{ id: "1", label: "10/01", values: { ms: 120 } }, { id: "2", label: "10/02", values: { ms: 140 } }, { id: "3", label: "10/03", values: { ms: { state: "unknown", label: "采集中断" } } }, { id: "4", label: "10/04", values: { ms: 110 } }, { id: "5", label: "10/05", values: { ms: 98 } }]} />
    {failures.length > 0
      ? <Chart type="bar" label="本月失败原因" categoryLabel="原因" valueLabel="次数" series={[{ key: "count", label: "次数" }]} rows={failures.map(item => ({ id: item.id, label: item.label, values: { count: item.count } }))} />
      : <Empty state="empty"><EmptyTitle level={3}>本月失败原因</EmptyTitle><EmptyDescription>本月没有失败记录。</EmptyDescription></Empty>}
  </Stack>;
}
