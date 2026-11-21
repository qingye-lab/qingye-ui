import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye_lab/ui/components/meter";

export type StorageUsageProps = {
  usedGb: number | null;
  totalGb: number;
};

// 指南 meter.md：表达真实范围内的测量值；任务完成比例用 Progress；未知测量不要填 0
export function StorageUsage({ usedGb, totalGb }: StorageUsageProps) {
  if (usedGb === null) {
    return <div><p>存储空间</p><p>用量未知</p></div>;
  }
  return (
    <Meter value={usedGb} min={0} max={totalGb} getAriaValueText={(_, value) => `${value} / ${totalGb} GB`}>
      <MeterLabel>存储空间</MeterLabel>
      <MeterValue>{(_, value) => `${value} / ${totalGb} GB`}</MeterValue>
      <MeterTrack><MeterIndicator /></MeterTrack>
    </Meter>
  );
}
