# Toc

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/toc
Source: packages/ui/src/components/toc.tsx
Source SHA-256: 485737ff549778b5948f166d735a24bf93ea8b17598c9517a0b6a40383231067

A vertical in-page table of contents for moving between sections; the current location deepens its own segment of an existing thin line instead of adding a new shape.

## Decision
Toc neither reads routing nor performs smooth scrolling: <a href="#id"> is a native anchor jump; sticky-header offsets and router integration stay with the project. The current location is supplied by the caller — the component never guesses scroll position — and useTocScrollSpy is an optional utility, not a hidden dependency of Toc.

## Notes
- The current item does not change font weight; only the line segment and text ink deepen, so the row never shifts width.
- Level 2 sits one relationship gap from the baseline; level 3 adds the existing level indent on top — two existing relationships added together, not a new value.

## Use and ownership
- A long article or documentation page needs quick movement between sections, with visible confirmation of the current one.
- Avoid: A single destination makes no table of contents; the caller decides whether to render one (Toc itself only withholds rendering when items is empty).
- Avoid: Use Breadcrumb or NavigationMenu for destinations across pages; Toc only expresses position within the current page.
- Library: The table of contents' layout, level indent, and the current item's visual expression.
- Application: Headings' actual ids, the scroll container, sticky-header offsets, and whether a table of contents is needed at all.

## Composition
- items can be written by hand, or scanned from a container's h2/h3[id] with useTocHeadings (headings Prose renders already satisfy this).
- current can be controlled manually or computed from scroll position with useTocScrollSpy; both are optional — a plain table of contents renders without either.
- The vertical nav line reuses src/nav-line.ts's mechanism (the same source as Tabs' and NavigationMenu's horizontal nav line, just a different axis).

## Responsive behavior
- Items sit in a tight vertical stack without touch-target (it would cover adjacent items); padding alone widens the hit area.

## Customization
- 使用公开 render/ref/className/style 与原生属性；不混用主题三轴。

## Current exports
- scanTocHeadings: function; owner toc; PASS; props: Element
- Toc: function; owner toc; PASS; props: TocProps
- TocItem: type; owner toc; PASS
- TocProps: type; owner toc; PASS
- TocScrollSpyOptions: type; owner toc; PASS
- useTocHeadings: function; owner toc; PASS; props: React.RefObject<Element | null>
- useTocScrollSpy: function; owner toc; PASS; props: TocItem[]

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Toc
The table of contents container; renders as nav, and renders nothing when there are no items.
- items: { id: string; label: string; level: 2 | 3 }[]. The destination list; id must match an anchor that actually exists on the page.
- current: string. The id of the current destination; omitted means no item carries aria-current.
- render / ref / className / style / native props: useRender.ComponentProps<"nav">. Forward attributes, events and refs to the actual element.

### scanTocHeadings(root, selector?)
Reads headings directly from already-rendered content; not a React hook. selector defaults to ":is(h2,h3)[id]".

### useTocHeadings(containerRef, selector?)
A React wrapper around scanTocHeadings: rescans via MutationObserver when content changes, including asynchronous loads.

### useTocScrollSpy(items, { container?, offset? })
Computes the current destination from scroll position; container defaults to window — the hook never guesses which element actually scrolls.

## Keyboard
- Tab / Shift+Tab: Move focus between the native anchors.
- Enter: Jump to the corresponding anchor.

## Source examples
### 随滚动更新当前项
Source: apps/docs/src/content/toc/demos/01-scroll-spy.tsx
```tsx
import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye_lab/ui/components/toc";
import { Inline } from "@qingye_lab/ui/components/layout";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "随滚动更新当前项", titleEn: "Updates the current item as the reader scrolls" } satisfies DemoMeta;

const sections = [
  { id: "demo-overview", level: 2 as const, title: "概览", body: "每次同步开始时，青野会先记录本次要处理的范围，再逐条写入。" },
  { id: "demo-retry", level: 3 as const, title: "重试与核实", body: "默认重试 3 次，间隔依次为 1、5、15 分钟；超过次数仍失败，转入人工核实队列。" },
  { id: "demo-unknown", level: 3 as const, title: "结果未知时", body: "直接重试可能写入两次；先在 Webhook 回调或审计日志里核实，再决定下一步。" },
  { id: "demo-recovery", level: 2 as const, title: "恢复与返回", body: "放弃一条记录不会影响其余记录；核实后可以随时手动重新触发。" },
];

export default function Demo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headings = useTocHeadings(containerRef);
  const current = useTocScrollSpy(headings, { container: containerRef });
  return <Inline gap="panel" align="start">
    <Toc items={headings} current={current} className="w-40 shrink-0" />
    <div ref={containerRef} className="h-56 w-80 overflow-y-auto rounded-item border border-border p-(--qy-panel-padding-sm)">
      {sections.map((section) => {
        const Heading = section.level === 2 ? "h2" : "h3";
        return <section key={section.id} className="mb-(--qy-field-group-gap)">
          <Heading id={section.id} className="m-0 mb-(--qy-field-gap) text-heading text-foreground">{section.title}</Heading>
          <p className="m-0 text-body text-foreground">{section.body}</p>
        </section>;
      })}
    </div>
  </Inline>;
}
```

### 手写目录与两级层级
Source: apps/docs/src/content/toc/demos/02-explicit-items.tsx
```tsx
import { Toc } from "@qingye_lab/ui/components/toc";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "手写目录与两级层级", titleEn: "A hand-written list with two levels" } satisfies DemoMeta;
export default function Demo() {
  return <Toc
    aria-label="《同步失败时，数据会怎样》目录"
    items={[
      { id: "overview", label: "同步失败时，数据会怎样", level: 2 },
      { id: "retry", label: "重试与核实", level: 3 },
      { id: "result", label: "按失败原因统计", level: 2 },
    ]}
    current="retry"
    className="w-48"
  />;
}
```
