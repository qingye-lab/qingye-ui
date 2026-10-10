# 时间序列 Timeline

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/timeline
Source: packages/ui/src/components/timeline.tsx
Source SHA-256: cb38f1cd0e5ba64470cb11efec7700e026a5e152bec8eef0eb018e22c13e17a6

保留输入顺序与真实时间。

## Decision
ol/li 表达传入序列，time 保存可解析时间；不排序、不补事件、不伪造时间。

## Notes
- 正序、逆序和相同时间输入都原样保留；空序列不补占位事件。

## Use and ownership
- 呈现输入的时间事件序列。
- Avoid: 可执行的有序过程用 Steps；二维比较用 Table。
- Library: 序列、time 与内容关系。
- Application: 事件、输入顺序、时间格式与未知事实。

## Composition
- Timeline / TimelineItem：ol / li 按 children 顺序呈现。
- TimelineTime：原生 time。
- TimelineTitle / TimelineDescription：div / p 内容槽。

## Responsive behavior
- 内容完整换行，未知时间保持文字表达。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- Timeline: function; owner timeline; PASS; props: TimelineProps
- TimelineDescription: function; owner timeline; PASS; props: TimelineDescriptionProps
- TimelineDescriptionProps: type; owner timeline; PASS
- TimelineItem: function; owner timeline; PASS; props: TimelineItemProps
- TimelineItemProps: type; owner timeline; PASS
- TimelineProps: type; owner timeline; PASS
- TimelineTime: function; owner timeline; PASS; props: TimelineTimeProps
- TimelineTimeProps: type; owner timeline; PASS
- TimelineTitle: function; owner timeline; PASS; props: TimelineTitleProps
- TimelineTitleProps: type; owner timeline; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Timeline / TimelineItem
ol / li 按 children 顺序呈现。
- children / aria-label / render / ref / native props: useRender.ComponentProps<ol | li>. 名称和事件由应用提供，未知时间可用文字。

### TimelineTime
原生 time。
- dateTime / children / render / ref: useRender.ComponentProps<time>. 机器时间与显示文本独立，应用负责真实性。

### TimelineTitle / TimelineDescription
div / p 内容槽。
- children / render / ref / native props: useRender.ComponentProps<div | p>. 不推断成功、失败或业务对象。

## Keyboard

## Source examples
### 输入序列
Source: apps/docs/src/content/timeline/demos/01-sequence.tsx
```tsx
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "输入序列", titleEn: "Input sequence" } satisfies DemoMeta;
export default function Demo() {
  return <Timeline><TimelineItem><TimelineTime dateTime="2026-10-03T15:00:00+08:00">15:00</TimelineTime><TimelineTitle>第二条记录</TimelineTitle></TimelineItem><TimelineItem><TimelineTime dateTime="2026-10-03T09:00:00+08:00">09:00</TimelineTime><TimelineTitle>第一条记录</TimelineTitle></TimelineItem><TimelineItem><TimelineTitle>时间未知</TimelineTitle><TimelineDescription>未提供时间</TimelineDescription></TimelineItem></Timeline>;
}
```
