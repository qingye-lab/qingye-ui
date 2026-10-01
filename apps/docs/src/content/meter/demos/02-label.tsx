import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = { title: "标签与数值", description: "MeterValue 默认显示数值在范围内的百分比。" };

export default function Demo() {
  return (
    <Meter className="max-w-sm" value={75}>
      <div className="flex items-center justify-between gap-2">
        <MeterLabel>团队席位</MeterLabel>
        <MeterValue />
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}
