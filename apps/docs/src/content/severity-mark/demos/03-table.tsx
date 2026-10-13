import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "表格里隐藏名称", titleEn: "Name hidden in a table" } satisfies DemoMeta;

const rows = [
  { name: "正文对比度低于 4.5:1", level: 3, label: "高", tone: "danger", status: "in-progress" },
  { name: "触屏目标小于 44px", level: 2, label: "中", tone: "warning", status: "pending" },
  { name: "行高不在 4px 格上", level: 1, label: "低", tone: "info", status: "pending" },
] as const;

export default function Demo() {
  return <TableContainer><Table>
    <TableCaption>检查结果</TableCaption>
    <TableHeader><TableRow><TableHead>级别</TableHead><TableHead>检查项</TableHead><TableHead>状态</TableHead></TableRow></TableHeader>
    <TableBody>{rows.map(row => <TableRow key={row.name}>
      <TableCell><SeverityMark level={row.level} tone={row.tone} label={row.label} name="hidden" /></TableCell>
      <TableHead scope="row">{row.name}</TableHead>
      <TableCell><StatusDot status={row.status} /></TableCell>
    </TableRow>)}</TableBody>
  </Table></TableContainer>;
}
