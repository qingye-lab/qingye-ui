import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "比较与排序", titleEn: "Comparison and sorting" } satisfies DemoMeta;
const rows = [{ name: "A", width: 24, height: 16, count: 0 }, { name: "B", width: 16, height: 24, count: 2 }, { name: "C", width: 32, height: 24, count: 1 }];
export default function Demo() {
  const [descending, setDescending] = useState(false);
  const sorted = [...rows].sort((a, b) => descending ? b.count - a.count : a.count - b.count);
  return <TableContainer><Table><TableCaption>尺寸与数量</TableCaption><TableHeader><TableRow><TableHead>条目</TableHead><TableHead>宽度</TableHead><TableHead>高度</TableHead><TableHead aria-sort={descending ? "descending" : "ascending"}><Button variant="quiet" size="sm" onClick={() => setDescending(!descending)}>数量 {descending ? "↓" : "↑"}</Button></TableHead></TableRow></TableHeader><TableBody>{sorted.map(row => <TableRow key={row.name}><TableHead scope="row">{row.name}</TableHead><TableCell className="numeric">{row.width}</TableCell><TableCell className="numeric">{row.height}</TableCell><TableCell className="numeric">{row.count}</TableCell></TableRow>)}</TableBody></Table></TableContainer>;
}
