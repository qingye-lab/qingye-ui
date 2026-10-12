import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "参照：目标带、背景系列与事件", titleEn: "Reference: target band, context series and events" };
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const room3 = [23.1, 23.8, 24.6, 26.4, 27.9, 27.2, 25.8, 24.9, 24.2, 23.6, 23.2, 22.8];
const others = [
  [22.6, 23.0, 23.7, 24.8, 25.9, 26.1, 25.2, 24.5, 24.0, 23.4, 23.0, 22.5],
  [23.4, 24.0, 24.9, 25.6, 26.3, 25.9, 25.1, 24.6, 24.1, 23.7, 23.3, 23.0],
  [22.2, 22.8, 23.5, 24.4, 25.2, 25.4, 24.9, 24.3, 23.8, 23.2, 22.7, 22.3],
  [23.8, 24.5, 25.3, 26.1, 26.6, 26.2, 25.5, 24.8, 24.3, 23.9, 23.5, 23.1],
  [22.9, 23.3, 24.1, 25.0, 25.7, 25.6, 25.0, 24.4, 23.9, 23.4, 23.0, 22.6],
  [23.0, 23.6, 24.3, 25.2, 25.8, 25.5, 24.8, 24.2, 23.8, 23.3, 22.9, 22.4],
];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="3 号蚕室今日温度" categoryLabel="时刻" valueLabel="温度（℃）"
    series={[{ key: "room3", label: "3 号蚕室" }, ...others.map((_, index) => ({ key: `other${index}`, label: `${[1, 2, 4, 5, 6, 7][index]} 号蚕室`, context: true }))]}
    contextLabel="其余蚕室"
    valueDomain={[20, 30]}
    references={[{ kind: "band", from: 22, to: 26, label: "适宜温度" }]}
    events={[{ rowId: "10:00", label: "开窗通风" }, { rowId: "15:00", label: "关窗保温" }]}
    formatValue={value => `${value} ℃`}
    rows={hours.map((hour, index) => ({ id: hour, label: hour, values: { room3: room3[index]!, ...Object.fromEntries(others.map((values, other) => [`other${other}`, values[index]!])) } }))} />;
}
