# 比较表 Table

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/table
Source: packages/ui/src/components/table.tsx
Source SHA-256: c402b617d2d1c92bd68ca35a2f2f95e81719ba7e92e5015281a8204d91b1c91e

原生二维关系与完整比较列。

## Decision
原生表格保留比较关系，外部容器承接横向容量。行占位与单元格内距消费独立角色；疏密取值是预设。

## Notes
- 空结果可在完整表头下提供跨列单元格；数据与排序由应用提供。

## Use and ownership
- 多个对象需要按共同维度比较。
- Avoid: 单一对象名称值关系用 DescriptionList；长阅读正文用 Typography。
- Library: 原生二维结构、表头关系与滚动容量。
- Application: 数据、表名、排序、错误、未知与空结果。

## Composition
- TableContainer：横向滚动容器。
- Table / TableCaption / TableHeader / TableBody / TableFooter / TableRow：table / caption / thead / tbody / tfoot / tr。
- TableHead：th；应用提供排序状态。
- TableCell：td，零值原样呈现。

## Responsive behavior
- 横向滚动保留完整比较列，不改成丢维度的卡片。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- Table: function; owner table; PASS; props: TableProps
- TableBody: function; owner table; PASS; props: TableBodyProps
- TableBodyProps: type; owner table; PASS
- TableCaption: function; owner table; PASS; props: TableCaptionProps
- TableCaptionProps: type; owner table; PASS
- TableCell: function; owner table; PASS; props: TableCellProps
- TableCellProps: type; owner table; PASS
- TableContainer: function; owner table; PASS; props: TableContainerProps
- TableContainerProps: type; owner table; PASS
- TableFooter: function; owner table; PASS; props: TableFooterProps
- TableFooterProps: type; owner table; PASS
- TableHead: function; owner table; PASS; props: TableHeadProps
- TableHeader: function; owner table; PASS; props: TableHeaderProps
- TableHeaderProps: type; owner table; PASS
- TableHeadProps: type; owner table; PASS
- TableProps: type; owner table; PASS
- TableRow: function; owner table; PASS; props: TableRowProps
- TableRowProps: type; owner table; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TableContainer
横向滚动容器。
- tabIndex / aria-label / render / ref / native props: useRender.ComponentProps<div>; default tabIndex=0. ref 属于容器；允许键盘滚动。

### Table / TableCaption / TableHeader / TableBody / TableFooter / TableRow
table / caption / thead / tbody / tfoot / tr。
- children / render / ref / native props: useRender.ComponentProps<native table part>. 属性属于真实元素；caption 命名整张表。

### TableHead
th；应用提供排序状态。
- scope: "col" | "row" | "colgroup" | "rowgroup"; default "col". 行标题用 row；复杂表格可用 id/headers。
- aria-sort / children / native props: native th props. 排序交应用 Button 组合，库不重排 rows。

### TableCell
td，零值原样呈现。
- colSpan / rowSpan / headers / render / ref / native props: useRender.ComponentProps<td>. 显式提供跨列和关联表头，不隐藏比较列。

## Keyboard

## Source examples
### 比较与排序
Source: apps/docs/src/content/table/demos/01-comparison.tsx
```tsx
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
```
