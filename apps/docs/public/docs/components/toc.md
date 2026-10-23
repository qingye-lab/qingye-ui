# 阅读目录 Toc

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/toc
Source: packages/ui/src/components/toc.tsx
Source SHA-256: 485737ff549778b5948f166d735a24bf93ea8b17598c9517a0b6a40383231067

本页内几个段落之间走动的纵向目录：当前位置把一条清墨基线上自己那一段加深为焦墨，不新增形状。

## Decision
Toc 不读路由、不做平滑滚动：<a href="#id"> 是原生锚点跳转，吸顶偏移、路由集成这类页面细节留给项目。当前位置（current）由调用方传入，组件不猜测滚动位置；useTocScrollSpy 是可选工具，不是 Toc 的隐藏依赖。

## Notes
- 当前项不改字重，只加深线段与文字墨色，避免整排因变宽而跳动。
- 二级目录到基线 = 组内间隔；三级在此基础上再加层级缩进（--qy-level-indent），两个既有关系相加，不是新值。

## Use and ownership
- 一篇长文或文档页需要在几个段落间快速定位，并看到自己读到了哪一节。
- Avoid: 少于两个目的地时目录没有意义，由调用方决定是否渲染（Toc 本身只在 items 为空时不渲染）。
- Avoid: 跨页面的目的地用 Breadcrumb 或 NavigationMenu；Toc 只表达同一页内的位置。
- Library: 目录的排版、层级缩进、当前项的视觉表达。
- Application: 标题的真实 id、滚动容器、吸顶偏移、是否需要目录（少于两项时渲染与否）。

## Composition
- items 可以手写，也可以用 useTocHeadings 从容器里扫描 h2/h3[id]（Prose 渲染的标题天然满足）。
- current 可以手动受控，也可以用 useTocScrollSpy 按滚动位置计算；两者都是可选项，不用也能渲染一份纯目录。
- 纵向导航线复用 src/nav-line.ts 的机制（与 Tabs、NavigationMenu 的横向导航线同源，只换轴向）。

## Responsive behavior
- 条目纵向紧排，不加 touch-target（会盖住上下条目），用内边距撑开命中区。

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
目录容器；渲染为 nav，没有条目时不渲染。
- items: { id: string; label: string; level: 2 | 3 }[]. 目的地列表；id 对应页面上真实存在的锚点。
- current: string. 当前所在目的地的 id；缺省时没有条目带 aria-current。
- render / ref / className / style / 原生属性: useRender.ComponentProps<"nav">. 属性、事件与 ref 透传实际元素。

### scanTocHeadings(root, selector?)
从一段已渲染内容里直接读出标题，不是 React hook；selector 默认 ":is(h2,h3)[id]"。

### useTocHeadings(containerRef, selector?)
scanTocHeadings 的 React 封装：内容变化（含异步加载）时用 MutationObserver 重新扫描。

### useTocScrollSpy(items, { container?, offset? })
按滚动位置计算当前目的地；container 缺省为 window，组件不猜测页面用了哪个滚动容器。

## Keyboard
- Tab / Shift+Tab: 在原生锚点之间移动焦点。
- Enter: 跳转到对应锚点。

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
    <Toc items={headings} current={current} className="w-40 shrink-0" />
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
