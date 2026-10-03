# DescriptionList

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/description-list
Source: packages/ui/src/components/description-list.tsx
Source SHA-256: 8e6f73b918b19e37f9cf1153ea932f64151eda8ece2cd70fa46f86a14f6c2bad

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
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye/ui/components/description-list";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "值与未知", titleEn: "Values and uncertainty" } satisfies DemoMeta;
export default function Demo() {
  return <DescriptionList><DescriptionListItem className="sm:grid-cols-2"><DescriptionListTerm>数量</DescriptionListTerm><DescriptionListDetail>{0}</DescriptionListDetail></DescriptionListItem><DescriptionListItem className="sm:grid-cols-2"><DescriptionListTerm>宽度</DescriptionListTerm><DescriptionListDetail>未知</DescriptionListDetail></DescriptionListItem><DescriptionListItem className="sm:grid-cols-2"><DescriptionListTerm>名称</DescriptionListTerm><DescriptionListDetail>一段更长的名称，保留完整内容与原生名称值关系</DescriptionListDetail></DescriptionListItem></DescriptionList>;
}
```
