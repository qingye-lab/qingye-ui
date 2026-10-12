# Section

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/section
Source: packages/ui/src/components/section.tsx
Source SHA-256: 4878536a4cef8e4e4d2b42dd7f7e6a290cf1d0911cd35fd2cddd499fbdffa5ab

A page block without a border, named by its title; the title and its actions share one row.

## Decision
A section groups by spacing and draws no line, fill or radius; the caller spaces sections with the section gap and places a Separator when a line is wanted. A section is named by its title: SectionTitle hands its id to Section as aria-labelledby, and without a title no reference is made. A count is not a part of its own; it is a run of muted tabular digits inside the title.

## Notes
- The caller decides the distance and any line between sections; a section draws none.

## Use and ownership
- A stretch of page content needs a name, and perhaps one related action at the right end of the title row.
- Avoid: Use Card for content that needs its own boundary; use PageHeader for a page's name and page-level actions.
- Avoid: Do not add a section whose title names nothing.
- Avoid: Keep one or two small actions at the right end; use Toolbar for a persistent group of actions.
- Library: The naming link between title and section, and the row height and midline of the title row.
- Application: The title, what a count means, the heading level and the real target of the action.

## Composition
- Space sections with Stack gap="section"; place a Separator between two Sections when a line is wanted.
- Use Link or Button variant="quiet" size="sm" for the right-hand action.
- Write a count as a numeric text-muted-foreground run inside the title.

## Responsive behavior
- The title and actions share a row; when the title is too long the actions drop to the next row and the first row's midline stays.

## Customization
- className, style, render and ref belong to each part; change the heading level with SectionTitle's level, never its size.

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
A section by default; when it holds a SectionTitle, that title's id becomes aria-labelledby.
- render / ref / children / native props: useRender.ComponentProps<section>. An explicit aria-label or aria-labelledby disables the automatic link.

### SectionHeader
The title row: title at the left, actions at the right.
- render / ref / children / native props: useRender.ComponentProps<div>. Row height is always one small control, the same rule as ChartHeader.

### SectionTitle
The section title, built on Heading.
- level: 1 | 2 | 3 | 4 | 5 | 6; default 2. Document outline level, independent of the text step.
- id / render / ref / Heading props: HeadingProps. A given id is the one the section links to; the text step defaults to heading (16/24).

### SectionActions
Actions at the end of the row.
- render / ref / children / native props: useRender.ComponentProps<div>. Hold a Link or a Button variant="quiet" size="sm".

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
