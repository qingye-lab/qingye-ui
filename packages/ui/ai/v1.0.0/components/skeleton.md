# 骨架屏 Skeleton

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/skeleton
Source: packages/ui/src/components/skeleton.tsx
Source SHA-256: 301df2afea5a642f2f2c8937e9e84da28ac15af75cde6baf5edbb540b9775f0e

内容到达之前，先摆出它将占的位置与行数。

## Decision
骨架只表达「正在加载」，不表达进度，也不替应用决定何时结束，更不自行超时；到达、失败或为空时换成真内容或 Empty，不让占位一直留着。正文行高是一材，一行骨架占一材、行间不留缝，所以 N 行骨架恰是 N 行正文，内容到达版面不动。填充是清染（大面）与清墨（小条）的透明墨，不脉动：等待没有「变化」可说，循环明灭只是装饰。

## Use and ownership
- 首次加载的内容区域，形状已知、几行几块可预期。
- Avoid: 刷新时保留仍然有效的工作面，不退回骨架；等待由发起它的 Button（in-progress）与一条 Progress 表达，二者共用一个等待周期。
- Avoid: 加载失败或结果为空时改用 Empty，不让占位冒充内容。
- Avoid: 不确定形状或时间极短的等待，用按钮的 in-progress。
- Library: 一句名称（跟随语言）、形状对辅助技术隐藏、以材为度的行高与墨色。
- Application: 何时开始与结束、久等的处置、内容的真实形状、失败与为空的处置。

## Composition
- Skeleton 包住一组 SkeletonLine / SkeletonBlock，摆成真实内容的版式；到达后整体换掉，版面不跳。

## Responsive behavior
- 宽度由所在容器决定，行宽用 className 表达；行高固定为一材。

## Customization
- className 调整行宽与块高；label 写明对象，如「正在加载成员」。

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
外层 status，内含一句名称；形状放在其中。
- label: string. 替代默认的「正在加载」，写明对象。
- render / ref / 原生属性: current public component props. 属性、事件与 ref 透传实际元素；样式由 className/style 调整。

### SkeletonLine
一行文字的位置，占一材；宽度由 className 给出。
- className: string; default w-full. 行宽，例如 w-2/3。

### SkeletonBlock
整块内容（图、图表、表格）的位置；高度由 className 给出。
- className: string; default h-[5 材]. 块高，例如 h-40。

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
      <Button onClick={() => setRefreshing(true)} state={refreshing ? "in-progress" : "idle"} variant="bordered">刷新</Button>
    </Stack>
  </Card>;
}
```
