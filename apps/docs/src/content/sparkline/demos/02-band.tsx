import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "目标带与状态类别", titleEn: "Target band and tone" } satisfies DemoMeta;
export default function Demo() {
  return <dl className="m-0 grid grid-cols-[max-content_max-content_max-content] items-center gap-x-(--qy-field-gap) gap-y-(--qy-field-group-gap) text-body">
    <dt>同步成功率</dt><dd className="m-0"><Sparkline label="近 8 日同步成功率" values={[92, 94, 93, 95, 96, 95, 97, 96]} format={n => `${n}%`} band={{ from: 90, to: 100, label: "达标区间" }} /></dd><dd className="numeric m-0">96%</dd>
    <dt>平均延迟</dt><dd className="m-0"><Sparkline label="近 8 日平均延迟" values={[140, 152, 148, 170, 195, 230, 245, 260]} format={n => `${n} 毫秒`} band={{ from: 100, to: 180, label: "目标延迟" }} tone="danger" /></dd><dd className="numeric m-0">260 毫秒</dd>
    <dt>待处理任务</dt><dd className="m-0"><Sparkline label="近 8 日待处理任务" values={[12, 18, 25, 31, 36, 38, 44, 47]} format={n => `${n} 项`} band={{ from: 0, to: 40, label: "积压上限" }} tone="warning" /></dd><dd className="numeric m-0">47 项</dd>
  </dl>;
}
