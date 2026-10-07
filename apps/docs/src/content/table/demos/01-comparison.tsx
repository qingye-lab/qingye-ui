import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "比较与排序", titleEn: "Comparison and sorting" } satisfies DemoMeta;
// 列都是同一种量纲（像素与条数），行是真实对象，不是甲乙丙。
const rows = [
  { name: "紧凑工具条", width: 24, height: 24, count: 0 },
  { name: "列表行操作", width: 28, height: 28, count: 2 },
  { name: "面板主入口", width: 36, height: 36, count: 1 },
];
export default function Demo() {
  const [descending, setDescending] = useState(false);
  const sorted = [...rows].sort((a, b) => descending ? b.count - a.count : a.count - b.count);
  // 数字列右对齐；排序箭头放在列名前，列名仍落在列的右缘上。正在排序的列名是当前状态，用焦墨。
  return <TableContainer><Table><TableCaption>同一组控件的占位与数量</TableCaption><TableHeader><TableRow><TableHead>控件</TableHead><TableHead className="text-end">宽度</TableHead><TableHead className="text-end">高度</TableHead><TableHead className="text-end" aria-sort={descending ? "descending" : "ascending"}><Button variant="quiet" size="sm" onClick={() => setDescending(!descending)}><span aria-hidden="true">{descending ? "↓" : "↑"}</span>数量</Button></TableHead></TableRow></TableHeader><TableBody>{sorted.map(row => <TableRow key={row.name}><TableHead scope="row">{row.name}</TableHead><TableCell className="text-end numeric">{row.width}</TableCell><TableCell className="text-end numeric">{row.height}</TableCell><TableCell className="text-end numeric">{row.count}</TableCell></TableRow>)}</TableBody></Table></TableContainer>;
}
