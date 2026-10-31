import * as React from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { DataTablePattern, type DataTablePatternColumn } from "@qingye_lab/ui/components/data-table";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "刷新与失败", titleEn: "Refreshing and failure" } satisfies DemoMeta;

type Entry = { id: string; label: string; labelEn: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", labelEn: "Connected devices", count: 12 },
  { id: "roles", label: "权限与角色", labelEn: "Permissions and roles", count: 8 },
  { id: "sync", label: "同步与导出", labelEn: "Sync and export", count: 0 },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "label", header: english ? "Name" : "名称", accessor: row => english ? row.labelEn : row.label, rowHeader: true },
    { id: "count", header: english ? "Records" : "记录数", accessor: row => row.count, numeric: true },
  ];
  // 请求由应用持有：这里用定时器代替，第一次刷新失败，第二次成功。
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const attempts = React.useRef(0);
  const refresh = () => {
    setBusy(true); setFailed(false);
    window.setTimeout(() => { setBusy(false); setFailed(attempts.current++ === 0); }, 1600);
  };
  return <Stack>
    <Inline><Button variant="bordered" onClick={refresh} disabled={busy}>{english ? "Refresh" : "刷新"}</Button></Inline>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? "Local collection (refresh) · 3 entries" : "本地集合（刷新）· 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} busy={busy}
      error={failed ? <Alert tone="danger"><AlertDescription>{english ? "Refresh failed. The rows below are from the last load." : "刷新失败，下面是上次加载的数据。"}<Button variant="quiet" size="sm" onClick={refresh}>{english ? "Retry" : "重试"}</Button></AlertDescription></Alert> : undefined} />
  </Stack>;
}
