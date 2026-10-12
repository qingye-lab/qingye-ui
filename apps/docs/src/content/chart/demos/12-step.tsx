import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "保持不变：设定值用阶梯", titleEn: "Held between changes: a setpoint as steps" };
const hours = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const target = [23, 23, 25, 26, 26, 25, 24, 23];
const actual = [22.6, 23.1, 24.4, 25.7, 26.2, 25.4, 24.6, 23.5];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="3 号蚕室温度" categoryLabel="时刻" valueLabel="温度（℃）"
    series={[{ key: "target", label: "设定温度", interpolation: "step" }, { key: "actual", label: "实测温度" }]}
    valueDomain={[20, 30]} formatValue={value => `${value} ℃`}
    rows={hours.map((hour, index) => ({ id: hour, label: hour, values: { target: target[index]!, actual: actual[index]! } }))} />;
}
