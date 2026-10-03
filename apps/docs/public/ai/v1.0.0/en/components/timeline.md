# Timeline

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/timeline
Source: packages/ui/src/components/timeline.tsx
Source SHA-256: e8a9371811e81c8699729e31196fa4459bc9a3506ddb6d7d7d40eab4ec83ce41

Preserve input order and actual times.

## Decision
ol/li express the input sequence; time preserves machine time. No sorting or invented events and times.

## Notes
- Ascending, descending and tied times keep input order; an empty sequence generates no entries.

## Use and ownership
- Present an input sequence of time events.
- Avoid: Use Steps for actionable ordered processes and Table for two-dimensional comparison.
- Library: Sequence, time elements, and content relationships.
- Application: Events, input order, time formatting, and unknown facts.

## Composition
- Timeline / TimelineItem: ol / li render in children order.
- TimelineTime: A native time element.
- TimelineTitle / TimelineDescription: div / p content slots.

## Responsive behavior
- Content wraps fully and unknown times remain explicit text.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

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
ol / li render in children order.
- children / aria-label / render / ref / native props: useRender.ComponentProps<ol | li>. The caller supplies names and events; unknown times may use text.

### TimelineTime
A native time element.
- dateTime / children / render / ref: useRender.ComponentProps<time>. Machine time and display text are independent application facts.

### TimelineTitle / TimelineDescription
div / p content slots.
- children / render / ref / native props: useRender.ComponentProps<div | p>. Infers no result or business object.

## Keyboard

## Source examples
### 输入序列
Source: apps/docs/src/content/timeline/demos/01-sequence.tsx
```tsx
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye/ui/components/timeline";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "输入序列", titleEn: "Input sequence" } satisfies DemoMeta;
export default function Demo() {
  return <Timeline><TimelineItem><TimelineTime dateTime="2026-10-03T15:00:00+08:00">15:00</TimelineTime><TimelineTitle>第二条记录</TimelineTitle></TimelineItem><TimelineItem><TimelineTime dateTime="2026-10-03T09:00:00+08:00">09:00</TimelineTime><TimelineTitle>第一条记录</TimelineTitle></TimelineItem><TimelineItem><TimelineTitle>时间未知</TimelineTitle><TimelineDescription>未提供时间</TimelineDescription></TimelineItem></Timeline>;
}
```
