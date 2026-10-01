import { ProgressCircle } from "@qingye/ui/components/progress-circle";

export const meta = { title: "尺寸", description: "环的粗细随尺寸增长但增长得更慢，大环依然轻盈。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <ProgressCircle aria-label="上传进度" size="xs" value={68} />
      <ProgressCircle aria-label="上传进度" size="sm" value={68} />
      <ProgressCircle aria-label="上传进度" showValue value={68} />
      <ProgressCircle aria-label="上传进度" showValue size="lg" value={68} />
      <ProgressCircle aria-label="上传进度" showValue size="xl" value={68} />
    </div>
  );
}
