# Skeleton

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/skeleton
Source: packages/ui/src/components/skeleton.tsx
Source SHA-256: 301df2afea5a642f2f2c8937e9e84da28ac15af75cde6baf5edbb540b9775f0e

Hold the place and row count content will take until it arrives.

## Decision
A skeleton says only that content is loading; it carries no progress, does not decide when loading ends, and never times out by itself. On arrival, failure or an empty result it is replaced by the real content or Empty, never left in place. Body leading is one module, so a skeleton row takes one module with no gap between rows: N rows are exactly N lines of text and the page does not move on arrival. Fills are transparent ink (a faint wash for large areas, a faint ink for small bars) and do not pulse: waiting has no change to report, and a looping fade is decoration.

## Use and ownership
- The first load of a region whose shape is known: how many rows and blocks to expect.
- Avoid: Refreshing keeps the content that is still valid and does not fall back to a skeleton; the wait is shown on the Button that started it (loading) and on a Progress band, both of which share one wait period.
- Avoid: A failed or empty result uses Empty; a placeholder never stands in for content.
- Avoid: A wait of unknown shape or very short duration uses a Button's loading.
- Library: One localized name, shapes hidden from assistive technology, row height and ink derived from the module.
- Application: When loading starts and ends, how a long wait is handled, the real shape of the content, and how failure and emptiness are handled.

## Composition
- Skeleton wraps SkeletonLine / SkeletonBlock laid out like the real content; on arrival the whole is replaced and the page does not jump.

## Responsive behavior
- Width follows the container; express row width with className. Row height is one module.

## Customization
- className adjusts row width and block height; label names the object, e.g. “Loading members”.

## Current exports
- Skeleton: function; owner skeleton; PASS; props: SkeletonProps
- SkeletonBlock: function; owner skeleton; PASS; props: SkeletonBlockProps
- SkeletonBlockProps: type; owner skeleton; PASS
- SkeletonLine: function; owner skeleton; PASS; props: SkeletonLineProps
- SkeletonLineProps: type; owner skeleton; PASS
- SkeletonProps: type; owner skeleton; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Skeleton
The outer status, holding one name; shapes sit inside.
- label: string. Replaces the default “Loading”, naming the object.
- render / ref / native props: current public component props. Forward attributes, events and refs to the actual element; adjust presentation through className/style.

### SkeletonLine
The place of one text line, one module high; width comes from className.
- className: string; default w-full. Row width, e.g. w-2/3.

### SkeletonBlock
The place of a whole block (image, chart, table); height comes from className.
- className: string; default h-[5 材]. Block height, e.g. h-40.

## Keyboard

## Source examples
### 摆出内容的版式
Source: apps/docs/src/content/skeleton/demos/01-layout.tsx
```tsx
import { Card } from "@qingye_lab/ui/components/card";
import { Skeleton, SkeletonBlock, SkeletonLine } from "@qingye_lab/ui/components/skeleton";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "摆出内容的版式", titleEn: "Laid out like the content" } satisfies DemoMeta;

export default function Demo() {
  return <Card className="w-full max-w-md p-(--qy-panel-padding)">
    <Skeleton label="正在加载项目">
      <SkeletonLine className="w-1/2" />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine className="w-3/4" />
      <SkeletonBlock className="mt-(--qy-field-gap)" />
    </Skeleton>
  </Card>;
}
```

### 到达后原位替换
Source: apps/docs/src/content/skeleton/demos/02-arrival.tsx
```tsx
import { useEffect, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Skeleton, SkeletonLine } from "@qingye_lab/ui/components/skeleton";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "到达后原位替换", titleEn: "Replaced in place on arrival" } satisfies DemoMeta;

const ROWS = ["接入设备 · 12 项", "权限与角色 · 8 项", "同步与导出 · 0 项"];

/** 应用拥有「是否已到达」这个事实；骨架一行占一材，与真内容的一行等高、行间都不留缝，替换时版面不动。 */
export default function Demo() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, [loading]);
  return <Stack>
    <Card className="w-full max-w-md p-(--qy-panel-padding)">
      {loading
        ? <Skeleton label="正在加载集合">{ROWS.map(row => <SkeletonLine key={row} />)}</Skeleton>
        : <ul className="m-0 flex list-none flex-col p-0">{ROWS.map(row => <li className="flex h-(--qy-cai) items-center text-body" key={row}>{row}</li>)}</ul>}
    </Card>
    <Button disabled={loading} onClick={() => setLoading(true)} variant="bordered">重播</Button>
  </Stack>;
}
```

### 刷新时保留内容
Source: apps/docs/src/content/skeleton/demos/03-refresh.tsx
```tsx
import { useEffect, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressTrack } from "@qingye_lab/ui/components/progress";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "刷新时保留内容", titleEn: "Refresh keeps the content" } satisfies DemoMeta;

const ROWS = ["接入设备 · 12 项", "权限与角色 · 8 项", "同步与导出 · 0 项"];

/** 已有内容的刷新不退回骨架：旧内容仍可读，等待由发起它的按钮与一条进度表达。 */
export default function Demo() {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (!refreshing) return;
    const timer = setTimeout(() => setRefreshing(false), 1600);
    return () => clearTimeout(timer);
  }, [refreshing]);
  return <Card className="w-full max-w-md p-(--qy-panel-padding)">
    <Stack aria-busy={refreshing}>
      <Progress aria-label="正在刷新" value={refreshing ? null : 0}>
        <ProgressTrack><ProgressIndicator /></ProgressTrack>
      </Progress>
      <ul className="m-0 flex list-none flex-col p-0">{ROWS.map(row => <li className="flex h-(--qy-cai) items-center text-body" key={row}>{row}</li>)}</ul>
      <Button onClick={() => setRefreshing(true)} loading={refreshing} variant="bordered">刷新</Button>
    </Stack>
  </Card>;
}
```
