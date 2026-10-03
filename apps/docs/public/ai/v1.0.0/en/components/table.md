# Table

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/table
Source: packages/ui/src/components/table.tsx
Source SHA-256: dd07802562280c5ac4750a028410951df07bdaf740a11b82946bc6244b36aa08

Native two-dimensional relationships with complete comparison columns.

## Decision
Native table structure preserves comparison; the container handles horizontal capacity. Row occupancy and cell padding consume independent roles; density values are presets.

## Notes
- Empty results may use a spanning cell below complete headers; data and sorting belong to the application.

## Use and ownership
- Compare multiple objects along shared dimensions.
- Avoid: Use DescriptionList for one object's names/values and Typography for long reading.
- Library: Native two-dimensional structure, header relationships, and scrolling capacity.
- Application: Data, table names, sorting, errors, unknown, and empty results.

## Composition
- TableContainer: A horizontal scroll container.
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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TableContainer
A horizontal scroll container.
- tabIndex / aria-label / render / ref / native props: useRender.ComponentProps<div>; default tabIndex=0. Ref targets the container; keyboard scrolling remains available.

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
```
