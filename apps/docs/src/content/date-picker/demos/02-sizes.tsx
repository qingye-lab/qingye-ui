import { DatePicker } from "@qingye/ui/components/date-picker";

export const meta = { title: "尺寸", description: "sm / default / lg，与同尺寸的 Input、Select 等高。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <DatePicker size="sm" aria-label="开始日期" placeholder="小尺寸" />
      <DatePicker aria-label="开始日期" placeholder="默认尺寸" />
      <DatePicker size="lg" aria-label="开始日期" placeholder="大尺寸" />
    </div>
  );
}
