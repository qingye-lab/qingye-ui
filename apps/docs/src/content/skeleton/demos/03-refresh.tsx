import { useEffect, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressTrack } from "@qingye_lab/ui/components/progress";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "刷新时保留内容", titleEn: "Refresh keeps the content" } satisfies DemoMeta;

const ROWS = ["接入设备 · 12 项", "权限与角色 · 8 项", "同步与导出 · 0 项"];

/** 已有内容的刷新不退回骨架：旧内容仍可读，等待由发起它的按钮与一条进度表达。 */
export default function Demo() {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (!refreshing) return;
    const timer = setTimeout(() => setRefreshing(false), 1600);
    return () => clearTimeout(timer);
  }, [refreshing]);
  return <Card className="w-full max-w-md p-(--qy-panel-padding)">
    <Stack aria-busy={refreshing}>
      <Progress aria-label="正在刷新" value={refreshing ? null : 0}>
        <ProgressTrack><ProgressIndicator /></ProgressTrack>
      </Progress>
      <ul className="m-0 flex list-none flex-col p-0">{ROWS.map(row => <li className="flex h-(--qy-cai) items-center text-body" key={row}>{row}</li>)}</ul>
      <Button onClick={() => setRefreshing(true)} loading={refreshing} variant="bordered">刷新</Button>
    </Stack>
  </Card>;
}
