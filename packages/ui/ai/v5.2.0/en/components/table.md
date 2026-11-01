# Table

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/table
Source: packages/ui/src/components/table.tsx
Source SHA-256: ab0fe0cfb7686b1452ea27c13fafcea2e48a723be62693f7d41925e70b6f7737

Native two-dimensional relationships with complete comparison columns.

## Decision
Native table structure preserves comparison; the container handles horizontal capacity. Row occupancy and cell padding consume independent roles; density values are presets.

## Notes
- Empty results may use a spanning cell below complete headers; data and sorting belong to the application.
- One region, one surface: inside a Card use framed={false} rather than nesting a second border.
- Data cells and row headers wrap anywhere, so a long identifier cannot push a column off the surface; column headers stay on one line.
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
- `numeric?`: `boolean`.
- plus 290 inherited (@types/react 289, @base-ui/react 1); not expanded, see the installed declarations

### TableContainer
- `framed?`: `boolean`. false：表格放在已有的一张纸上（Card、面板），不再铺第二张——没有线、底与圆角，由承载它的纸给出。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### TableFooter
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### TableHead
- `numeric?`: `boolean`.
- plus 287 inherited (@types/react 286, @base-ui/react 1); not expanded, see the installed declarations

### TableHeader
- `sticky?`: `boolean`. 表头吸在最近的滚动区顶部。表格横向放得下时，TableContainer 不是滚动容器（见上），表头吸在页面或 Workspace 内容区； 横向溢出、需要左右滚动的宽表，TableContainer 本身成了滚动容器，表头只在它自己的有界高度里吸住—— 给 TableContainer（DataTable 的 containerProps）设了 max-height / height，或 DataTable 的虚拟化视口。 吸住时要盖住从下面滚过的行，所以底是不透明的纸（bg-surface，与 framed 的承载面同一个底）；清染表头底叠在其上。 层级 z-[1] 是预设：只需盖过同一张表里同为定位元素的固定列单元格（它们在 DOM 里排在表头之后），不参与浮层栈。
- `stickyOffset?`: `number | string | undefined`. 吸住时离滚动区顶部的距离：滚动区顶上还有一条固定的页眉或工具栏时，让开它的高度。数字按 px，字符串是 CSS 长度（如 "var(--app-header)"）。
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
- TableHeader sticky / stickyOffset: boolean / number | string. Sticks the header to the top of the nearest scroll area: when the table fits horizontally TableContainer is not a scroll container, so the header sticks to the page or Workspace content; when it overflows sideways it sticks within TableContainer's own bounded height. stickyOffset clears a fixed bar above; numbers are px.

### TableHead
A th with application-owned sort state.
- scope: "col" | "row" | "colgroup" | "rowgroup"; default "col". Use row for row headers; complex tables may use id/headers.
- numeric: boolean; default false. A numeric column is declared by the caller, never guessed from content: declare it on the header and its cells alike for inline-end alignment (left in RTL) and tabular figures; sort button content is reversed so the label meets the end edge. Readable as data-numeric.
- aria-sort / children / native props: native th props. Compose an application Button to sort; the library never reorders rows.

### TableCell
A td that preserves zero.
- numeric: boolean; default false. A cell of a numeric column, paired with numeric on the column's header.
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
  return <TableContainer><Table><TableCaption>同一组控件的占位与数量</TableCaption><TableHeader><TableRow><TableHead>控件</TableHead><TableHead numeric>宽度</TableHead><TableHead numeric>高度</TableHead><TableHead numeric aria-sort={descending ? "descending" : "ascending"}><Button variant="quiet" size="sm" onClick={() => setDescending(!descending)}>数量<span aria-hidden="true">{descending ? "↓" : "↑"}</span></Button></TableHead></TableRow></TableHeader><TableBody>{sorted.map(row => <TableRow key={row.name}><TableHead scope="row">{row.name}</TableHead><TableCell numeric>{row.width}</TableCell><TableCell numeric>{row.height}</TableCell><TableCell numeric>{row.count}</TableCell></TableRow>)}</TableBody></Table></TableContainer>;
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
    <TableContainer framed={false}><Table aria-labelledby="table-on-paper-title"><TableHeader><TableRow><TableHead>控件</TableHead><TableHead numeric>宽度</TableHead><TableHead numeric>高度</TableHead></TableRow></TableHeader><TableBody>{rows.map(row => <TableRow key={row.name}><TableHead scope="row">{row.name}</TableHead><TableCell numeric>{row.width}</TableCell><TableCell numeric>{row.height}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
  </Card>;
}
```
