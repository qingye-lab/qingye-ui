# Skeleton

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/skeleton
Source: packages/ui/src/components/skeleton.tsx
Source SHA-256: 2c13fbc07ca9839309d4b1c436ed9c298a79d33d3a8508cda814ab0ef225d482

Hold the place and row count content will take until it arrives.

## Decision
A skeleton says only that content is loading; it carries no progress and does not decide when loading ends. On arrival, failure or an empty result it is replaced by the real content or Empty, never left in place.

## Use and ownership
- The first load of a region whose shape is known: how many rows and blocks to expect.
- Avoid: Refreshing keeps existing content and does not fall back to a skeleton.
- Avoid: A failed or empty result uses Empty; a placeholder never stands in for content.
- Avoid: A wait of unknown shape or very short duration uses a Button's in-progress.
- Library: One localized name, shapes hidden from assistive technology, the pulse and its reduced-motion form.
- Application: When loading starts and ends, the real shape of the content, and how failure and emptiness are handled.

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
      <SkeletonBlock />
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

/** 应用拥有「是否已到达」这个事实；骨架与真内容占同样的行，替换时版面不动。 */
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
        : <ul className="m-0 flex list-none flex-col gap-(--qy-field-gap) p-0">{ROWS.map(row => <li className="flex h-(--qy-cai) items-center text-body" key={row}>{row}</li>)}</ul>}
    </Card>
    <Button disabled={loading} onClick={() => setLoading(true)} variant="bordered">重播</Button>
  </Stack>;
}
```
