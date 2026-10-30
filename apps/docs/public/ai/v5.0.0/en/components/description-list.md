# DescriptionList

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/description-list
Source: packages/ui/src/components/description-list.tsx
Source SHA-256: 31a7f512ed6965e5f6b51a6e6a08f789f48cac1ed438d82f5b13d089e3fb546c

Native relationships between names and values.

## Decision
A dl groups dt/dd in div elements; children render unchanged without replacing zero through truthiness checks.

## Notes
- Use Table to compare the same dimension across multiple objects.

## Use and ownership
- Present corresponding names and values for one object.
- Avoid: Use Table to compare several objects across dimensions.
- Library: dl, dt, dd, and grouping relationships.
- Application: Names, values, units, zero, unknown, and not-applicable text.

## Composition
- DescriptionList: A native dl.
- DescriptionListItem: A div grouping names and values.
- DescriptionListTerm / DescriptionListDetail: Native dt / dd.

## Responsive behavior
- columns sets the upper bound of side-by-side groups and the list falls back to fewer by its own measured width; long values wrap fully.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- DescriptionList: function; owner description-list; PASS; props: DescriptionListProps
- DescriptionListDetail: function; owner description-list; PASS; props: DescriptionListDetailProps
- DescriptionListDetailProps: type; owner description-list; PASS
- DescriptionListItem: function; owner description-list; PASS; props: DescriptionListItemProps
- DescriptionListItemProps: type; owner description-list; PASS
- DescriptionListProps: type; owner description-list; PASS
- DescriptionListTerm: function; owner description-list; PASS; props: DescriptionListTermProps
- DescriptionListTermProps: type; owner description-list; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DescriptionList
- `columns?`: `number`. 并排的组数上限，默认 1。容器放不下时自动退回更少列（见下方 COLUMN_MIN_FEN）； 条目按 DOM 顺序逐行排开（先横后纵），读屏顺序与视觉顺序一致。
- `layout?`: `"inline" | "stacked"`. stacked（默认）：名称在左、值在右成对，多组共用名列定宽。 inline：每个条目是名称在上、值在下的一小块，块与块横排——适合「创建人 / 创建时间 / 状态」这类事实条。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### DescriptionListDetail
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### DescriptionListItem
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### DescriptionListTerm
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale
- Context ListContext: without a provider default-value; provided by DescriptionList

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DescriptionList
A native dl.
- columns: number; default 1. Upper bound of side-by-side name-and-value groups, a positive integer. Items flow row by row in DOM order, so reading order matches visual order, and names in one column share a value start line. When the container cannot hold them the list falls back to fewer columns by its own width, not the viewport: a group needs at least 12 modules (240px by default, a preset).
- layout: "stacked" | "inline"; default "stacked". stacked: names on the left, values on the right. inline: each item is a small block with the name above the value, blocks flowing horizontally and wrapping with the width (with columns they are split into that many cells, at least 8 modules wide, a preset). Both are dl > div > dt + dd.
- children / render / ref / native props: useRender.ComponentProps<dl>. Props and ref reach the actual description list.

### DescriptionListItem
A div grouping names and values.
- children / render / ref / native props: useRender.ComponentProps<div>. Groups a name and its value; placement follows the list's columns and layout without changing semantics.

### DescriptionListTerm / DescriptionListDetail
Native dt / dd.
- children / render / ref / native props: useRender.ComponentProps<dt | dd>. The application supplies zero, unknown and not applicable separately; valid links are supported.

## Keyboard

## Source examples
### 值与未知
Source: apps/docs/src/content/description-list/demos/01-values.tsx
```tsx
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "值与未知", titleEn: "Values and uncertainty" } satisfies DemoMeta;

export default function Demo() {
  // 名称按内容宽度成列，多行共用同一条值的起始线；窄屏自动回到名称在上。
  // 演示只给名称与值，不编造业务流程（值可以是 0，也可以是「未知」）。
  return <DescriptionList className="max-w-md">
    <DescriptionListItem><DescriptionListTerm>名称</DescriptionListTerm><DescriptionListDetail>接入与设备</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>记录数</DescriptionListTerm><DescriptionListDetail className="numeric">{0}</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>最近同步</DescriptionListTerm><DescriptionListDetail>未知</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>保留策略</DescriptionListTerm><DescriptionListDetail>滚动保留最近 90 天，更早的记录按周归档</DescriptionListDetail></DescriptionListItem>
  </DescriptionList>;
}
```

### 多列
Source: apps/docs/src/content/description-list/demos/02-columns.tsx
```tsx
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "多列", titleEn: "Columns" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const rows: [string, string][] = en
    ? [["Name", "Intake and devices"], ["Records", "0"], ["Last sync", "Unknown"], ["Owner", "Wang Lin"], ["Region", "East"], ["Retention", "Rolling 90 days"]]
    : [["名称", "接入与设备"], ["记录数", "0"], ["最近同步", "未知"], ["负责人", "王林"], ["区域", "华东"], ["保留策略", "滚动保留 90 天"]];
  return <DescriptionList columns={3} className="w-full">
    {rows.map(([term, detail]) => <DescriptionListItem key={term}><DescriptionListTerm>{term}</DescriptionListTerm><DescriptionListDetail>{detail}</DescriptionListDetail></DescriptionListItem>)}
  </DescriptionList>;
}
```

### 横排事实条
Source: apps/docs/src/content/description-list/demos/03-inline.tsx
```tsx
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "横排事实条", titleEn: "Inline facts" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const rows: [string, string][] = en
    ? [["Created by", "Wang Lin"], ["Created", "2026-10-30 09:12"], ["Status", "Unknown"]]
    : [["创建人", "王林"], ["创建时间", "2026-10-30 09:12"], ["状态", "未知"]];
  return <DescriptionList layout="inline">
    {rows.map(([term, detail]) => <DescriptionListItem key={term}><DescriptionListTerm>{term}</DescriptionListTerm><DescriptionListDetail>{detail}</DescriptionListDetail></DescriptionListItem>)}
  </DescriptionList>;
}
```
