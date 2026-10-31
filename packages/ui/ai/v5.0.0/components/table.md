# 比较表 Table

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/table
Source: packages/ui/src/components/table.tsx
Source SHA-256: ab0fe0cfb7686b1452ea27c13fafcea2e48a723be62693f7d41925e70b6f7737

原生二维关系与完整比较列。

## Decision
原生表格保留比较关系，外部容器承接横向容量。行占位与单元格内距消费独立角色；疏密取值是预设。

## Notes
- 空结果可在完整表头下提供跨列单元格；数据与排序由应用提供。
- 一个范围只铺一张纸：表格进 Card 时用 framed={false}，不要在卡片里再套一层边框。
- 数据格与行标题允许在任意位置折行，长标识符不会把列撑出纸外；列标题保持单行。
- 可滚动由 ResizeObserver 实测决定；服务端与首帧按「不可滚动」输出（服务端没有布局可测，猜可滚动会让多数放得下的表带一个假停靠点），客户端在首次绘制前即更新。

## Use and ownership
- 多个对象需要按共同维度比较。
- Avoid: 单一对象名称值关系用 DescriptionList；长阅读正文用 Typography。
- Library: 原生二维结构、表头关系与滚动容量。
- Application: 数据、表名、排序、错误、未知与空结果。

## Composition
- TableContainer：表格的纸与横向滚动容器。
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
表格的纸与横向滚动容器。
- framed: boolean; default true. false：表格放在已有的一张纸上（Card、面板），不再铺线、底与圆角；贴着承载面的边放置，由承载面裁切圆角。
- tabIndex / aria-label / render / ref / native props: useRender.ComponentProps<div>; default 按实测滚动与否. 内容真的超出（横向或纵向）时才可聚焦（tabIndex=0），用于键盘滚动，并成为具名区域：取 aria-label / aria-labelledby，否则沿用表的 caption 或 aria-label；放得下时不进 Tab 序列。ref 属于容器；显式传入的 tabIndex 优先。

### Table / TableCaption / TableHeader / TableBody / TableFooter / TableRow
table / caption / thead / tbody / tfoot / tr。
- children / render / ref / native props: useRender.ComponentProps<native table part>. 属性属于真实元素；caption 命名整张表。
- TableHeader sticky / stickyOffset: boolean / number | string. 表头吸在最近的滚动区顶部：横向放得下时 TableContainer 不构成滚动容器，表头吸在页面或 Workspace 内容区；横向溢出时吸在 TableContainer 自己的有界高度里。stickyOffset 让开顶上的固定页眉，数字按 px。

### TableHead
th；应用提供排序状态。
- scope: "col" | "row" | "colgroup" | "rowgroup"; default "col". 行标题用 row；复杂表格可用 id/headers。
- numeric: boolean; default false. 数值列由调用方声明，不由内容猜：表头与该列单元格同时声明，行内末端对齐（RTL 下在左）并用等宽数字；排序按钮内容反向排列，列名紧贴末端。读 data-numeric。
- aria-sort / children / native props: native th props. 排序交应用 Button 组合，库不重排 rows。

### TableCell
td，零值原样呈现。
- numeric: boolean; default false. 数值列的单元格，与同列表头的 numeric 配对。
- colSpan / rowSpan / headers / render / ref / native props: useRender.ComponentProps<td>. 显式提供跨列和关联表头，不隐藏比较列。

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
