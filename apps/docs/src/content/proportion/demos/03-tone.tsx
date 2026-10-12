import { Proportion } from "@qingye_lab/ui/components/proportion";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "状态类别的构成", titleEn: "Parts by status" } satisfies DemoMeta;
export default function Demo() {
  return <div className="w-full max-w-xl"><Proportion label="今日巡检结果" items={[{ key: "ok", label: "正常", value: 42, tone: "success" }, { key: "warn", label: "提醒", value: 9, tone: "warning" }, { key: "bad", label: "异常", value: 3, tone: "danger" }]} /></div>;
}
