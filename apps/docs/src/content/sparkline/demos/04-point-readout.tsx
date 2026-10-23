import { Card } from "@qingye_lab/ui/components/card";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "核对每小时同步量", titleEn: "Inspect hourly sync counts" } satisfies DemoMeta;

const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
const values = [38, 41, null, 45, 0, 48, 50, 57];

export default function Demo() {
  return <Card className="w-full max-w-sm overflow-hidden p-(--qy-panel-padding-sm)">
    <div className="flex items-baseline justify-between gap-(--qy-field-gap)">
      <p className="m-0 text-body">每小时同步量</p>
      <p className="m-0 text-title-sm">57 次</p>
    </div>
    <div className="mt-(--qy-field-group-gap) overflow-auto py-(--qy-space-2)">
      <Sparkline
        label="09:00 至 16:00 同步次数"
        appearance="area"
        height={80}
        values={values}
        band={{ from: 40, to: 60, label: "每小时目标" }}
        format={value => `${value} 次`}
        tooltip
        getPointLabel={index => hours[index]!}
      />
    </div>
    <p className="m-0 flex justify-between text-control-sm text-muted-foreground"><span>09:00</span><span>16:00</span></p>
  </Card>;
}
