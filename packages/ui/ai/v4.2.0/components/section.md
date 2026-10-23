# 区块 Section

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/section
Source: packages/ui/src/components/section.tsx
Source SHA-256: 4878536a4cef8e4e4d2b42dd7f7e6a290cf1d0911cd35fd2cddd499fbdffa5ab

不带边框的页面区块，由标题命名；标题与操作同一行。

## Decision
区块靠间距分组，自己不画线、不铺底、不加圆角；区块之间的距离由调用方用节间距排布，需要线时放 Separator。区块由标题命名：SectionTitle 把自己的 id 交给 Section 作 aria-labelledby，没有标题就不产生引用。计数不是独立部件，它是标题里的一段浓墨等宽数字。

## Notes
- 区块之间的距离、分界线由调用方决定；区块自己不画线。

## Use and ownership
- 页面里一段内容需要名称，并可能在标题行右端放一个与它有关的操作。
- Avoid: 有独立边界、需要围合的内容用 Card；页面名称与页面级动作用 PageHeader。
- Avoid: 标题没有内容可命名时不要放区块。
- Avoid: 标题行右端只放一两个小号操作；成组的常驻操作用 Toolbar。
- Library: 标题与区块的命名关联、标题行的行高与中线。
- Application: 标题内容、计数的含义、标题层级与操作的真实目标。

## Composition
- 区块之间用 Stack gap="section"；需要线时在两个 Section 之间放 Separator。
- 右侧操作用 Link 或 Button variant="quiet" size="sm"。
- 计数写成标题里的一段 numeric text-muted-foreground。

## Responsive behavior
- 标题与操作同一行；标题长到放不下时操作落到下一行，第一行的中线不动。

## Customization
- className、style、render 与 ref 属于各自的部件；标题层级用 SectionTitle 的 level，不改字号。

## Current exports
- Section: function; owner section; PASS; props: SectionProps
- SectionActions: function; owner section; PASS; props: SectionActionsProps
- SectionActionsProps: type; owner section; PASS
- SectionHeader: function; owner section; PASS; props: SectionHeaderProps
- SectionHeaderProps: type; owner section; PASS
- SectionProps: type; owner section; PASS
- SectionTitle: function; owner section; PASS; props: SectionTitleProps
- SectionTitleProps: type; owner section; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Section
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SectionActions
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SectionHeader
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### SectionTitle
- `level?`: `1 | 2 | 3 | 4 | 5 | 6`. Document outline, independent of the visual text step.
- `numeric?`: `boolean`.
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm-mobile" | "contr…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale
- Context SectionContext: without a provider nullable; provided by Section

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Section
默认 section；内部有 SectionTitle 时自动用它的 id 作 aria-labelledby。
- render / ref / children / native props: useRender.ComponentProps<section>. 显式传入 aria-label 或 aria-labelledby 时不再自动关联。

### SectionHeader
标题栏一行：标题在左，操作在右。
- render / ref / children / native props: useRender.ComponentProps<div>. 行高恒为一个小号控件高，与 ChartHeader 同一规则。

### SectionTitle
区块标题，复用 Heading。
- level: 1 | 2 | 3 | 4 | 5 | 6; default 2. 文档大纲层级，独立于文字档。
- id / render / ref / Heading props: HeadingProps. 传入 id 时区块用它作关联；文字档默认 heading（16/24）。

### SectionActions
靠行尾的操作。
- render / ref / children / native props: useRender.ComponentProps<div>. 放 Link 或 Button variant="quiet" size="sm"。

## Keyboard

## Source examples
### 标题与文字链接
Source: apps/docs/src/content/section/demos/01-link.tsx
```tsx
import { Item, ItemContent, ItemDescription, ItemLink, ItemTitle } from "@qingye_lab/ui/components/item";
import { Link } from "@qingye_lab/ui/components/link";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "标题与文字链接", titleEn: "Title with a text link" } satisfies DemoMeta;

export default function Demo() {
  return <Section className="w-full max-w-lg">
    <SectionHeader>
      <SectionTitle>最近编辑</SectionTitle>
      <SectionActions><Link href="/components/item">查看全部</Link></SectionActions>
    </SectionHeader>
    <ul className="m-0 list-none p-0">
      <Item render={<li />}><ItemContent><ItemTitle><ItemLink href="/components/table">蚕室温湿度表</ItemLink></ItemTitle><ItemDescription>今天 08:30</ItemDescription></ItemContent></Item>
      <Item render={<li />}><ItemContent><ItemTitle><ItemLink href="/components/chart">产茧量走势</ItemLink></ItemTitle><ItemDescription>昨天 17:12</ItemDescription></ItemContent></Item>
    </ul>
  </Section>;
}
```

### 标题里的计数与小号按钮
Source: apps/docs/src/content/section/demos/02-count.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemContent, ItemTitle } from "@qingye_lab/ui/components/item";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "标题里的计数与小号按钮", titleEn: "A count in the title and a small button" } satisfies DemoMeta;

const members = ["林岚", "周青", "沈野"];

export default function Demo() {
  return <Section className="w-full max-w-lg">
    <SectionHeader>
      <SectionTitle>成员 <span className="numeric text-muted-foreground">{members.length}</span></SectionTitle>
      <SectionActions><Button variant="quiet" size="sm">邀请成员</Button></SectionActions>
    </SectionHeader>
    <ul className="m-0 list-none p-0">
      {members.map(name => <Item render={<li />} key={name}><ItemContent><ItemTitle>{name}</ItemTitle></ItemContent></Item>)}
    </ul>
  </Section>;
}
```

### 区块之间
Source: apps/docs/src/content/section/demos/03-between.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { Separator } from "@qingye_lab/ui/components/separator";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "区块之间", titleEn: "Between sections" } satisfies DemoMeta;

export default function Demo() {
  return <Stack gap="section" className="w-full max-w-lg">
    <Section>
      <SectionHeader><SectionTitle>近期活动</SectionTitle></SectionHeader>
      <Item><ItemContent><ItemTitle>春蚕上簇</ItemTitle><ItemDescription>10 月 12 日 08:30</ItemDescription></ItemContent></Item>
    </Section>
    <Separator />
    <Section>
      <SectionHeader><SectionTitle>待办 <span className="numeric text-muted-foreground">2</span></SectionTitle><SectionActions><Button variant="quiet" size="sm">全部完成</Button></SectionActions></SectionHeader>
      <Item><ItemContent><ItemTitle>补录湿度读数</ItemTitle></ItemContent></Item>
      <Item><ItemContent><ItemTitle>核对桑叶入库单</ItemTitle></ItemContent></Item>
    </Section>
  </Stack>;
}
```
