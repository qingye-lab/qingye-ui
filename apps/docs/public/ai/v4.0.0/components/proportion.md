# 构成 Proportion

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/proportion
Source: packages/ui/src/components/proportion.tsx
Source SHA-256: beb1120e3dcc0c18e57b42da2124fef5cb4ca9c449f7dbf5ef31b932c76cbafb

一个整体由哪几部分组成，各占多少。

## Decision
用长度而不是角度表达比例，所以不提供饼图；与 Meter 同一条凹槽。两到五个部分按校验过的系列顺序取色，剩余是凹槽本身。图例给出名称、数值与百分比，是完整的文字等价物；legend="hidden" 只把它从画面上移开（仅对辅助技术可见），不删。部分可以声明状态类别 tone：要么全有要么全无，同一类别不出现两次。

## Use and ownership
- 一个整体的构成需要一眼看出。
- Avoid: 只有一个部分对一个上限时用 Meter；比较各类别的大小用 Chart 柱状。
- Library: 分段、空隙、取色与文字等价物。
- Application: 数值、总量与合并规则。

## Composition
- 放在面板、读数旁；名称由调用方给出。
- 在 Stat 的数字下面时放进 StatDescription，并用 legend="hidden"。

## Responsive behavior
- 条占满宽度，图例换行。

## Customization
- 系列色来自 chart1..5，不另造调色板。

## Current exports
- Proportion: function; owner proportion; PASS; props: ProportionProps
- ProportionItem: type; owner proportion; PASS
- ProportionProps: type; owner proportion; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Proportion
- `format?`: `(value: number) => string`.
- `items`: `readonly ProportionItem[]`. 两到五个部分；更多时由调用方把尾部合并成「其他」。
- `label`: `string`. 整体是什么，例如「存储用量」。
- `legend?`: `"hidden" | "visible"`. visible：轨道下方列出图例。hidden：画面上只剩轨道，图例仍在文档里、只对辅助技术可见—— 图例是这条轨道完整的文字等价物，不能删，只能换承载面（数值由旁边的读数或上下文承担时用）。
- `total?`: `number`. 整体的总量。省略时等于各部分之和；大于之和时，剩余部分显示为空槽。
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Proportion
整体的名称、部分与可选总量。
- label: string. 整体是什么。
- items: readonly { key; label; value; tone? }[]. 两到五个非负部分；更多时由调用方合并为「其他」。tone 为状态类别（danger、warning、success、info）：要么所有部分都声明，要么都不声明，混用或同一类别出现两次抛错；声明后各段与图例色块取类别色，不再按序取系列色。
- total: number. 整体总量；省略时等于各部分之和，大于时剩余显示为空槽。
- format: (value: number) => string. 图例中数值的格式。
- legend: "visible" | "hidden". 默认 visible。hidden 时图例仍在文档里、只对辅助技术可见，画面上只剩轨道；用于旁边已有数字（如 Stat）的位置。

## Keyboard

## Source examples
### 部分与剩余
Source: apps/docs/src/content/proportion/demos/01-storage.tsx
```tsx
import { Proportion } from "@qingye_lab/ui/components/proportion";
export const meta = { title: "部分与剩余", titleEn: "Parts and remainder" };
export default function Demo() {
  return <div className="grid w-full max-w-xl gap-(--qy-section-gap)">
    <Proportion label="存储用量" total={100} format={n => `${n} GB`} items={[{ key: "rec", label: "记录", value: 42 }, { key: "att", label: "附件", value: 23 }, { key: "log", label: "日志", value: 9 }]} />
    <Proportion label="同步来源" items={[{ key: "api", label: "接口推送", value: 1284 }, { key: "file", label: "定时导入", value: 912 }, { key: "db", label: "数据库", value: 640 }]} />
  </div>;
}
```

### 数字下的轨道
Source: apps/docs/src/content/proportion/demos/02-stat.tsx
```tsx
import { Proportion } from "@qingye_lab/ui/components/proportion";
import { Stat, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "数字下的轨道", titleEn: "A track under a number" } satisfies DemoMeta;
export default function Demo() {
  return <Stat state="known" className="w-full max-w-60"><StatLabel>已用空间</StatLabel><StatValue>64<StatUnit>GB</StatUnit></StatValue>
    <StatDescription><Proportion label="已用空间构成" legend="hidden" format={n => `${n} GB`} items={[{ key: "rec", label: "记录", value: 38 }, { key: "att", label: "附件", value: 20 }, { key: "log", label: "日志", value: 6 }]} /></StatDescription>
  </Stat>;
}
```

### 状态类别的构成
Source: apps/docs/src/content/proportion/demos/03-tone.tsx
```tsx
import { Proportion } from "@qingye_lab/ui/components/proportion";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "状态类别的构成", titleEn: "Parts by status" } satisfies DemoMeta;
export default function Demo() {
  return <div className="w-full max-w-xl"><Proportion label="今日巡检结果" items={[{ key: "ok", label: "正常", value: 42, tone: "success" }, { key: "warn", label: "提醒", value: 9, tone: "warning" }, { key: "bad", label: "异常", value: 3, tone: "danger" }]} /></div>;
}
```
