# 名称与值 DescriptionList

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/description-list
Source: packages/ui/src/components/description-list.tsx
Source SHA-256: 01619fae8f6efcc264c2e90e09c97edccf36c8ff6bfc2220e91e3877176c44c0

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
- columns 给出并排组数上限，容器按实宽自动退回更少列；长值完整换行。

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
原生 dl。
- columns: number; default 1. 并排的「名称 · 值」组数上限，正整数。按 DOM 顺序逐行排开（先横后纵），读屏顺序与视觉顺序一致；同一列的名称共用一条值的起始线。容器放不下时按容器实宽（不看视口）退回更少列：一组至少 12 材（默认 240px，预设）。
- layout: "stacked" | "inline"; default "stacked". stacked：名称在左、值在右成对。inline：每个条目是名称在上、值在下的一小块，块与块横排并随宽度换行（columns 给出时按列数分格，最小块宽 8 材，预设）。两者都是 dl > div > dt + dd。
- children / render / ref / native props: useRender.ComponentProps<dl>. 属性与 ref 属于实际名称值列表。

### DescriptionListItem
div 成组名称与值。
- children / render / ref / native props: useRender.ComponentProps<div>. 名称与值的分组；排布由列表的 columns 与 layout 决定，关系不变。

### DescriptionListTerm / DescriptionListDetail
原生 dt / dd。
- children / render / ref / native props: useRender.ComponentProps<dt | dd>. 0、未知、不适用由应用分别提供，可含合法链接。

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
