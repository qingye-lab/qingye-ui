import { useState } from "react";
import { Chart, type ChartSeries } from "@qingye/ui/components/chart";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "数值与显式未知", titleEn: "Values and explicit unknowns" };
const series: readonly ChartSeries[] = Array.from({ length: 5 }, (_, index) => ({ key: `s${index}`, label: `系列 ${index + 1}` }));
export default function ChartDemo() {
  const [values, setValues] = useState(["0", "0", "0", "0", "0"]);
  return <Stack gap="panel" className="w-full max-w-lg"><div className="grid min-w-0 gap-(--qy-field-gap)">{series.map((item, index) => <Stack gap="field" key={item.key}><Label htmlFor={`chart-${item.key}`}>{item.label}</Label><Input id={`chart-${item.key}`} type="number" value={values[index]} onChange={event => { const draft = event.currentTarget.value; setValues(old => old.map((value, at) => at === index ? draft : value)); }} /></Stack>)}</div>
    <Chart label="输入数值" categoryLabel="项" valueLabel="数值" series={series} rows={[
      { id: "input", label: "输入", values: Object.fromEntries(series.map((item, index) => [item.key, values[index]!.trim() && Number.isFinite(Number(values[index])) ? Number(values[index]) : { state: "unknown" as const, label: "数值未完整" }])) },
      { id: "unknown", label: "未知", values: Object.fromEntries(series.map(item => [item.key, { state: "unknown" as const, label: "尚未核实" }])) },
      { id: "na", label: "不适用", values: Object.fromEntries(series.map(item => [item.key, { state: "not-applicable" as const, label: "不适用" }])) },
    ]} />
  </Stack>;
}
