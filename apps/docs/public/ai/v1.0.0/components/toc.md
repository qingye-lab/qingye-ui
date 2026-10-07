# 阅读目录 Toc

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/toc
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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye/ui/components/toc";
import { Inline } from "@qingye/ui/components/layout";
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
import { Toc } from "@qingye/ui/components/toc";
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
