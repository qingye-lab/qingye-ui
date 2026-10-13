# SeverityMark

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/severity-mark
Source: packages/ui/src/components/severity-mark.tsx
Source SHA-256: b5ee87babb7044c0d014e89a44df856883f2893ada42f347674a9100cc8b0bf3

An ordered level shown as a number of filled cells, named by the application.

## Decision
The level is carried by the number of filled cells and tone is only an accompanying category: two levels with the same cell count and different hues cannot be told apart once the name is hidden, so different levels take different level values. The library ships no level words and infers no name from the number; label is required. With no level, omit the mark: level has no 0.

## Notes
- A screen reader reads the name once: the cells and the visible name stay out of the accessibility tree.
- The level does not rely on color: without hue, solid filled cells and outlined empty cells still give the level.
- In forced colors filled cells are solid CanvasText and empty cells are an outline; tone hues collapse to one color.

## Use and ownership
- A row's object has an ordered level that must be comparable without spending a text column.
- Avoid: Use StatusDot for which state an object is in: states have no order.
- Avoid: Use Meter for a measurement with a unit and Progress for task completion.
- Avoid: Do not tell two levels with the same cell count apart by hue.
- Library: The mapping from level to filled cells, the image semantics and the accessible name.
- Application: The level value, the number of levels, and each level's name and category.

## Composition
- Marks in one column share one max.
- With name="hidden" the name remains the accessible name; the row or the column header must still tell sighted readers that the column is a level.
- Beside a StatusDot both marks have the same height and share one row midline.

## Responsive behavior
- The name follows the text size of its row and wraps when long; cells do not shrink.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- SeverityMark: function; owner severity-mark; PASS; props: SeverityMarkProps
- SeverityMarkProps: type; owner severity-mark; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### SeverityMark
- `label`: `string`. 这一级叫什么，必填。名称由应用声明：库不内置任何级别用词，也不从数字推断。
- `level`: `number`. 第几级：填满的格数，1 到 max 的整数。没有级别就不放这个标记，所以没有 0。
- `max?`: `number`. 一共几级：格的总数，2 到 5 的整数。同一列里的标记用同一个 max。
- `name?`: `"hidden" | "visible"`. visible：格后面跟着名称。hidden：画面上只剩格，名称仍是这个标记的可访问名称—— 名称由同一行的别的文字或表头承担时用。
- `tone?`: `"info" | "warning" | "danger" | "success"`. 状态类别：由调用方声明，组件不从级别猜好坏（随类赋彩）。不给时填充用焦墨。
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### SeverityMark
A row of cells and a name; the root is role="img" and its accessible name is label.
- level: number. Required level: the number of filled cells, an integer from 1 to max. Out-of-range or non-integer values throw RangeError and are never rounded. The root carries data-level.
- max: number; default 3. The number of levels: total cells, an integer from 2 to 5; otherwise RangeError is thrown. Unfilled cells stay as empty cells.
- tone: "danger" | "warning" | "success" | "info". The status category of the filled cells, declared by the caller; the component does not guess good or bad from the level. The root carries data-tone. Omitted, the ink color is used. An invalid value throws RangeError.
- label: string. Required name of the level; a missing or blank value throws. It is the accessible name and the visible name.
- name: "visible" | "hidden"; default "visible". With hidden only the cells remain on screen; label is still the accessible name.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 三级
Source: apps/docs/src/content/severity-mark/demos/01-levels.tsx
```tsx
import { Inline } from "@qingye_lab/ui/components/layout";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "三级", titleEn: "Three levels" } satisfies DemoMeta;

export default function Demo() {
  return <Inline gap="panel">
    <SeverityMark level={3} tone="danger" label="高" />
    <SeverityMark level={2} tone="warning" label="中" />
    <SeverityMark level={1} tone="info" label="低" />
  </Inline>;
}
```

### 五级，不声明类别
Source: apps/docs/src/content/severity-mark/demos/02-scale.tsx
```tsx
import { Inline } from "@qingye_lab/ui/components/layout";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "五级，不声明类别", titleEn: "Five levels without a tone" } satisfies DemoMeta;

const names = ["一级", "二级", "三级", "四级", "五级"];

export default function Demo() {
  return <Inline gap="panel">{names.map((name, index) => <SeverityMark key={name} level={index + 1} max={5} label={name} />)}</Inline>;
}
```

### 表格里隐藏名称
Source: apps/docs/src/content/severity-mark/demos/03-table.tsx
```tsx
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
```

### 条目里显示名称
Source: apps/docs/src/content/severity-mark/demos/04-items.tsx
```tsx
import { Item, ItemContent, ItemTitle } from "@qingye_lab/ui/components/item";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "条目里显示名称", titleEn: "Name shown in a list" } satisfies DemoMeta;

const rows = [
  { name: "正文对比度低于 4.5:1", level: 3, label: "高", tone: "danger" },
  { name: "触屏目标小于 44px", level: 2, label: "中", tone: "warning" },
  { name: "行高不在 4px 格上", level: 1, label: "低", tone: "info" },
] as const;

export default function Demo() {
  return <ul className="m-0 w-full max-w-md list-none p-0">{rows.map(row => <Item render={<li />} key={row.name}>
    <ItemContent><ItemTitle>{row.name}</ItemTitle></ItemContent>
    <SeverityMark level={row.level} tone={row.tone} label={row.label} />
  </Item>)}</ul>;
}
```
