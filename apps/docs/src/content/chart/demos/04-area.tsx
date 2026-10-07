import { Chart } from "@qingye/ui/components/chart";
export const meta = { title: "随时间的量：面积", titleEn: "Quantity over time: area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const records = [812, 940, 1024, 980, 1180, 640, 560];
export default function Demo() {
  return <Chart type="area" className="w-full max-w-2xl" label="本周写入记录数" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "records", label: "记录数" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { records: records[index]! } }))} />;
}
