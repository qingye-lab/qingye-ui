# DescriptionList

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/description-list
Source: packages/ui/src/components/description-list.tsx
Source SHA-256: 642be77029202e1a51b8583d9d89ca5048613a7fcace731d7af08b3db529529e

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
- Vertical by default; wide containers may compose columns, and long values wrap fully.

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DescriptionList
A native dl.
- children / render / ref / native props: useRender.ComponentProps<dl>. Props and ref reach the actual description list.

### DescriptionListItem
A div grouping names and values.
- children / render / ref / native props: useRender.ComponentProps<div>. Stacked by default; callers may select multiple columns without changing semantics.

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
