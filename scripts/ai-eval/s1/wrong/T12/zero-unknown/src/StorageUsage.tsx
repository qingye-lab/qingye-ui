import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye_lab/ui/components/meter";

export type StorageUsageProps = {
  usedGb: number | null;
  totalGb: number;
};

// 用了 Meter，但未知时把值填成 0
export function StorageUsage({ usedGb, totalGb }: StorageUsageProps) {
  const value = usedGb ?? 0;
  return (
    <Meter value={value} min={0} max={totalGb} getAriaValueText={(_, v) => `${v} / ${totalGb} GB`}>
      <MeterLabel>存储空间</MeterLabel>
      <MeterValue>{(_, v) => (usedGb === null ? "用量未知" : `${v} / ${totalGb} GB`)}</MeterValue>
      <MeterTrack><MeterIndicator /></MeterTrack>
    </Meter>
  );
}
