import { Card } from "@qingye_lab/ui/components/card";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { Heading } from "@qingye_lab/ui/components/typography";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "放在已有的纸上", titleEn: "On an existing surface" } satisfies DemoMeta;
const rows = [
  { name: "紧凑工具条", width: 24, height: 24 },
  { name: "列表行操作", width: 28, height: 28 },
  { name: "面板主入口", width: 36, height: 36 },
];
export default function Demo() {
  // 卡片已经是一张纸：表格不再铺第二张，贴着卡片的边放，首列文字与卡片标题同一条竖线。
  return <Card className="w-full max-w-md overflow-hidden" render={<section aria-labelledby="table-on-paper-title" />}>
    <Heading id="table-on-paper-title" level={3} className="px-(--qy-panel-padding) pt-(--qy-panel-padding-sm) pb-(--qy-field-gap)">控件占位</Heading>
    <TableContainer framed={false}><Table aria-labelledby="table-on-paper-title"><TableHeader><TableRow><TableHead>控件</TableHead><TableHead className="text-end">宽度</TableHead><TableHead className="text-end">高度</TableHead></TableRow></TableHeader><TableBody>{rows.map(row => <TableRow key={row.name}><TableHead scope="row">{row.name}</TableHead><TableCell className="text-end numeric">{row.width}</TableCell><TableCell className="text-end numeric">{row.height}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
  </Card>;
}
