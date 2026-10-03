# 名称与值 DescriptionList

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/description-list
Source: packages/ui/src/components/description-list.tsx
Source SHA-256: 8e6f73b918b19e37f9cf1153ea932f64151eda8ece2cd70fa46f86a14f6c2bad

名称和值的原生关系。

## Decision
dl 中以 div 组织 dt/dd，值作为 children 原样呈现，不用真假判断替换零。

## Notes
- 需要跨多个对象比较同一维度时使用 Table。

## Use and ownership
- 一个对象的名称与值需要对应呈现。
- Avoid: 多个对象跨维度比较使用 Table。
- Library: dl、dt、dd 及分组关系。
- Application: 名称、值、单位、零、未知与不适用文字。

## Composition
- DescriptionList：原生 dl。
- DescriptionListItem：div 成组名称与值。
- DescriptionListTerm / DescriptionListDetail：原生 dt / dd。

## Responsive behavior
- 默认纵向；宽容器可组合分列，长值完整换行。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

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
原生 dl。
- children / render / ref / native props: useRender.ComponentProps<dl>. 属性与 ref 属于实际名称值列表。

### DescriptionListItem
div 成组名称与值。
- children / render / ref / native props: useRender.ComponentProps<div>. 默认纵向；消费者可以选择多列排列，关系不变。

### DescriptionListTerm / DescriptionListDetail
原生 dt / dd。
- children / render / ref / native props: useRender.ComponentProps<dt | dd>. 0、未知、不适用由应用分别提供，可含合法链接。

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
