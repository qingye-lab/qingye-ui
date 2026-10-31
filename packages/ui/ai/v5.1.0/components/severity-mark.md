# 级别 SeverityMark

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/severity-mark
Source: packages/ui/src/components/severity-mark.tsx
Source SHA-256: b5ee87babb7044c0d014e89a44df856883f2893ada42f347674a9100cc8b0bf3

用填了几格表达有次序的级别，名称由应用给出。

## Decision
级别由填充的格数承担，tone 只是附带的类别：两个级别如果格数相同、只有色相不同，隐藏名称后就分不开，所以不同的级别要用不同的 level。库不内置任何级别用词，也不从数字推断名称；label 必填。没有级别时不放这个标记，level 没有 0。

## Notes
- 读屏只读一次名称：格与可见名称都不进可访问树。
- 级别不只靠颜色：去掉色相后，已填的实心格与未填的空格仍读得出第几级。
- 强制颜色下已填的格是 CanvasText 实心，未填的格是一圈线；tone 的色相收成同一色。

## Use and ownership
- 一行对象带有一个有次序的级别，需要不占一列文字就能比较高低。
- Avoid: 对象处于哪一种状态用 StatusDot：状态之间没有次序。
- Avoid: 有单位的测量值用 Meter；任务完成比例用 Progress。
- Avoid: 不用色相区分格数相同的两个级别。
- Library: 格数与填充的对应、图形语义与可访问名称。
- Application: 级别的数值、一共几级、每一级的名称与类别。

## Composition
- 同一列里的标记用同一个 max。
- name="hidden" 时名称仍是可访问名称；同一行或表头要有文字让看得见的读者知道这一列是级别。
- 与 StatusDot 同行时两种标记同高、同一条行中线。

## Responsive behavior
- 名称跟随所在那一行的字号，过长时换行；格不缩小。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

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
一排格加一个名称；根是 role="img"，可访问名称就是 label。
- level: number. 第几级：填满的格数，1 到 max 的整数，必填。越界或非整数抛 RangeError，不取整。根上带 data-level。
- max: number; default 3. 一共几级：格的总数，2 到 5 的整数；否则抛 RangeError。未填的格保留为空格。
- tone: "danger" | "warning" | "success" | "info". 已填格的状态类别，由调用方声明，组件不从级别猜好坏；根上带 data-tone。不给时用焦墨。非法值抛 RangeError。
- label: string. 这一级的名称，必填；缺失或为空时抛错。它是可访问名称，也是可见名称。
- name: "visible" | "hidden"; default "visible". hidden 时画面上只剩格，label 仍是可访问名称。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

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
