# Toc

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/toc
Source: packages/ui/src/components/toc.tsx
Source SHA-256: 8d97141f492627f220e38c903da4c49540311794074937e3d4b82be9ec0b857d

A vertical in-page table of contents for moving between sections; the current location deepens its own segment of an existing thin line instead of adding a new shape.

## Decision
Toc neither reads routing nor performs smooth scrolling: <a href="#id"> is a native anchor jump; sticky-header offsets and router integration stay with the project. The current location is supplied by the caller — the component never guesses scroll position — and useTocScrollSpy is an optional utility, not a hidden dependency of Toc.

## Notes
- The current item does not change font weight; only the line segment and text ink deepen, so the row never shifts width.
- In forced colors (high contrast) the current item also gets an underline: once the system recolors every border, the line no longer tells the current item apart.
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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Toc
- `current?`: `string | undefined`. 当前所在目的地的 id；缺省时没有条目带 aria-current，纯展示一份目录。类型显式带 `| undefined`：useTocScrollSpy 在没有命中任何目的地时返回 undefined，这个值需要能 直接传入（exactOptionalPropertyTypes 下，`current?: string` 只允许省略整个属性， 不允许显式传 undefined）。
- `items`: `TocItem[]`.
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "随滚动更新当前项", titleEn: "Updates the current item as the reader scrolls" } satisfies DemoMeta;

const sections = [
  { id: "demo-install", level: 2 as const, title: "安装", body: "用包管理器加入 @qingye_lab/ui，组件与样式在同一个包里。" },
  { id: "demo-styles", level: 3 as const, title: "引入样式", body: "在应用入口引入一次 styles.css；之后每个组件都按同一套令牌取值。" },
  { id: "demo-theme", level: 3 as const, title: "明暗与品牌", body: "ThemeProvider 写入明暗；品牌只写在 html 的 data-brand 上，两者互不覆盖。" },
  { id: "demo-density", level: 2 as const, title: "密度", body: "在容器上写 data-density=\"compact\"，其中的控件与间距一起收紧，字号不变。" },
];

export default function Demo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headings = useTocHeadings(containerRef);
  const current = useTocScrollSpy(headings, { container: containerRef });
  return <Inline gap="panel" align="start">
    <Toc aria-label="示例文章目录" items={headings} current={current} className="w-40 shrink-0" />
    <ScrollArea ref={containerRef} role="region" aria-label="接入说明" className="h-56 w-80 rounded-item border border-border p-(--qy-panel-padding-sm)">
      {sections.map((section) => {
        const Heading = section.level === 2 ? "h2" : "h3";
        return <section key={section.id} className="mb-(--qy-field-group-gap)">
          <Heading id={section.id} className="m-0 mb-(--qy-field-gap) text-heading text-foreground">{section.title}</Heading>
          <p className="m-0 text-body text-foreground">{section.body}</p>
        </section>;
      })}
    </ScrollArea>
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
    aria-label="《接入》目录"
    items={[
      { id: "install", label: "安装", level: 2 },
      { id: "styles", label: "引入样式", level: 3 },
      { id: "density", label: "密度", level: 2 },
    ]}
    current="styles"
    className="w-48"
  />;
}
```
