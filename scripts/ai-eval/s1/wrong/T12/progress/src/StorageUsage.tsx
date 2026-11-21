import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";

export type StorageUsageProps = {
  usedGb: number | null;
  totalGb: number;
};

// DN 自然解：带条的占比就用 Progress；未知时不画条
export function StorageUsage({ usedGb, totalGb }: StorageUsageProps) {
  if (usedGb === null) return <div><p>存储空间</p><p>用量未知</p></div>;
  return (
    <Progress value={usedGb} min={0} max={totalGb}>
      <ProgressLabel>存储空间</ProgressLabel>
      <ProgressValue>{(_, value) => `${value} / ${totalGb} GB`}</ProgressValue>
      <ProgressTrack><ProgressIndicator /></ProgressTrack>
    </Progress>
  );
}
