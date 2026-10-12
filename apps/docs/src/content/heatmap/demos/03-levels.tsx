import { Heatmap, type HeatmapLevel } from "@qingye_lab/ui/components/heatmap";
export const meta = { title: "分档、行尾汇总与读数", titleEn: "Levels, row summary and readout" };
const hours = ["08 时", "10 时", "12 时", "14 时", "16 时", "18 时"];
const temperature: Record<string, number[]> = {
  "1 号室": [24.2, 25.1, 26.4, 27.2, 26.0, 24.8],
  "2 号室": [24.6, 25.8, 27.3, 28.4, 27.1, 25.2],
  "3 号室": [25.0, 26.3, 27.9, 28.6, 28.2, 26.1],
  "4 号室": [25.4, 27.0, 29.0, 30.6, 30.1, 27.4],
  "5 号室": [24.0, 24.9, 25.7, 26.8, 26.2, 24.5],
};
const levels: readonly HeatmapLevel[] = [
  { label: "适宜" },
  { label: "偏暖", from: 26 },
  { label: "偏高", from: 28, tone: "warning" },
  { label: "过高", from: 30, tone: "danger" },
];
const humidity = (celsius: number) => Math.round(92 - (celsius - 24) * 3.2);
const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
export default function Demo() {
  return <Heatmap className="w-full max-w-2xl" label="蚕室温度" rowLabel="蚕室" columnLabel="时刻" valueLabel="温度（℃）"
    columns={hours.map(hour => ({ key: hour, label: hour }))}
    rows={Object.entries(temperature).map(([room, values]) => ({ id: room, label: room, values: Object.fromEntries(hours.map((hour, index) => [hour, values[index]!])) }))}
    formatValue={(value) => value.toFixed(1)}
    levels={levels}
    rowSummary={{ label: "日均", value: (row) => mean(temperature[row.id]!).toFixed(1) }}
    renderReadout={({ value, level }) => typeof value === "number"
      ? <div className="grid gap-(--qy-space-1)"><div className="flex items-baseline gap-(--qy-field-gap)"><span className="text-body-strong numeric">{value.toFixed(1)} ℃</span>{level && <span className="text-muted-foreground">{level.label}</span>}</div><div className="text-muted-foreground numeric">湿度 {humidity(value)}%</div></div>
      : <div>{value.label}</div>} />;
}
