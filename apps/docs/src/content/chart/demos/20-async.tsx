import { useState } from "react";
import { AsyncContent } from "@qingye_lab/ui/components/async-content";
import { Button } from "@qingye_lab/ui/components/button";
import { Chart } from "@qingye_lab/ui/components/chart";
import { Empty, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "请求状态与空结果", titleEn: "Request states and empty results" };

const days = ["10/01", "10/02", "10/03", "10/04", "10/05"];
const counts = [12, 18, 9, 21, 15];

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [rows, setRows] = useState(() => days.map((day, index) => ({ id: day, label: day, values: { count: counts[index]! } })));
  return <Stack className="w-full max-w-2xl">
    <Inline>
      <Button variant="bordered" onClick={() => setRows(days.map((day, index) => ({ id: day, label: day, values: { count: counts[index]! } })))}>{en ? "Has records" : "有记录"}</Button>
      <Button variant="bordered" onClick={() => setRows([])}>{en ? "No records" : "没有记录"}</Button>
    </Inline>
    <AsyncContent status="success" hasContent={rows.length > 0}
      emptyContent={<Empty state="empty"><EmptyTitle level={3}>{en ? "Sync runs" : "同步次数"}</EmptyTitle><EmptyDescription>{en ? "No runs in this period." : "这段时间没有同步记录。"}</EmptyDescription></Empty>}>
      <Chart type="bar" label={en ? "Sync runs" : "同步次数"} categoryLabel={en ? "Date" : "日期"} valueLabel={en ? "Runs" : "次数"} series={[{ key: "count", label: en ? "Runs" : "次数" }]} rows={rows} />
    </AsyncContent>
  </Stack>;
}
