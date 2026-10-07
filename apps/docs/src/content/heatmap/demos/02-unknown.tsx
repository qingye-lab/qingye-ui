import { Heatmap } from "@qingye/ui/components/heatmap";
export const meta = { title: "含未统计格", titleEn: "With an unavailable cell" };
const days = [{ key: "mon", label: "周一" }, { key: "tue", label: "周二" }, { key: "wed", label: "周三" }];
export default function Demo() {
  return <Heatmap className="w-full max-w-md" label="近三日的同步次数" rowLabel="时段" columnLabel="星期" valueLabel="同步次数"
    columns={days}
    rows={[
      { id: "am", label: "上午", values: { mon: 12, tue: 9, wed: { state: "unknown", label: "采集中断" } } },
      { id: "pm", label: "下午", values: { mon: 30, tue: 18, wed: 6 } },
    ]} />;
}
