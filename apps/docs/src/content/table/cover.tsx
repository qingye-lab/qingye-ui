import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";

const rows = [
  { name: "工具条", width: 24, height: 24 },
  { name: "列表行", width: 28, height: 28 },
  { name: "面板", width: 36, height: 36 },
];

export default function Cover() {
  return <TableContainer className="w-full"><Table>
    <TableHeader><TableRow><TableHead>控件</TableHead><TableHead className="text-end">宽度</TableHead><TableHead className="text-end">高度</TableHead></TableRow></TableHeader>
    <TableBody>{rows.map(row => <TableRow key={row.name}><TableCell>{row.name}</TableCell><TableCell className="text-end numeric">{row.width}</TableCell><TableCell className="text-end numeric">{row.height}</TableCell></TableRow>)}</TableBody>
  </Table></TableContainer>;
}
