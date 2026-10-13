# Table

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/table
Source: packages/ui/src/components/table.tsx
Source SHA-256: 659c6b93c7d065b51ce959d6ddb88ab959e8b06c51dd47338cfbd20910553db1

Native two-dimensional relationships with complete comparison columns.

## Decision
Native table structure preserves comparison; the container handles horizontal capacity. Row occupancy and cell padding consume independent roles; density values are presets.

## Notes
- Empty results may use a spanning cell below complete headers; data and sorting belong to the application.
- One region, one surface: inside a Card use framed={false} rather than nesting a second border.
- Scrollability is measured with a ResizeObserver. The server and first frame render as not scrollable (the server has no layout to measure, and guessing would give most fitting tables a false Tab stop); the client updates before first paint.

## Use and ownership
- Compare multiple objects along shared dimensions.
- Avoid: Use DescriptionList for one object's names/values and Typography for long reading.
- Library: Native two-dimensional structure, header relationships, and scrolling capacity.
- Application: Data, table names, sorting, errors, unknown, and empty results.

## Composition
- TableContainer: The table's surface and horizontal scroll container.
- Table / TableCaption / TableHeader / TableBody / TableFooter / TableRow: Native table / caption / thead / tbody / tfoot / tr.
- TableHead: A th with application-owned sort state.
- TableCell: A td that preserves zero.

## Responsive behavior
- Horizontal scrolling retains complete comparison columns instead of cards losing dimensions.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Table
- no props declared by this library
- plus 290 inherited (@types/react 289, @base-ui/react 1); not expanded, see the installed declarations

### TableBody
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### TableCaption
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### TableCell
- no props declared by this library
- plus 290 inherited (@types/react 289, @base-ui/react 1); not expanded, see the installed declarations

### TableContainer
- `framed?`: `boolean`. false：表格放在已有的一张纸上（Card、面板），不再铺第二张——没有线、底与圆角，由承载它的纸给出。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### TableFooter
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### TableHead
- no props declared by this library
- plus 287 inherited (@types/react 286, @base-ui/react 1); not expanded, see the installed declarations

### TableHeader
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### TableRow
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### TableContainer
The table's surface and horizontal scroll container.
- framed: boolean; default true. false places the table on an existing surface such as a Card, without its own line, fill, or radius. Set it flush with the host, which clips the corners.
- tabIndex / aria-label / render / ref / native props: useRender.ComponentProps<div>; default by measured overflow. Focusable (tabIndex=0) only while the content actually overflows horizontally or vertically, so the keyboard can scroll it; it then becomes a named region from aria-label / aria-labelledby, else the table's caption or aria-label. A container whose content fits stays out of the Tab sequence. Ref targets the container; an explicit tabIndex wins.

### Table / TableCaption / TableHeader / TableBody / TableFooter / TableRow
Native table / caption / thead / tbody / tfoot / tr.
- children / render / ref / native props: useRender.ComponentProps<native table part>. Props reach actual elements; caption names the table.

### TableHead
A th with application-owned sort state.
- scope: "col" | "row" | "colgroup" | "rowgroup"; default "col". Use row for row headers; complex tables may use id/headers.
- aria-sort / children / native props: native th props. Compose an application Button to sort; the library never reorders rows.

### TableCell
A td that preserves zero.
- colSpan / rowSpan / headers / render / ref / native props: useRender.ComponentProps<td>. Supply spans and header associations explicitly; comparison columns are not hidden.

## Keyboard

## Source examples
### 比较与排序
Source: apps/docs/src/content/table/demos/01-comparison.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
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

### 放在已有的纸上
Source: apps/docs/src/content/table/demos/02-on-paper.tsx
```tsx
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
```
