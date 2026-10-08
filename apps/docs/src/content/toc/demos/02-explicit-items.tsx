import { Toc } from "@qingye_lab/ui/components/toc";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "手写目录与两级层级", titleEn: "A hand-written list with two levels" } satisfies DemoMeta;
export default function Demo() {
  return <Toc
    aria-label="《同步失败时，数据会怎样》目录"
    items={[
      { id: "overview", label: "同步失败时，数据会怎样", level: 2 },
      { id: "retry", label: "重试与核实", level: 3 },
      { id: "result", label: "按失败原因统计", level: 2 },
    ]}
    current="retry"
    className="w-48"
  />;
}
