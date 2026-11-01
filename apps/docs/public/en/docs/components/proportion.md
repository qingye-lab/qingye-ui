# Proportion

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/proportion
Source: packages/ui/src/components/proportion.tsx
Source SHA-256: 0844615af3d66aaf7d6ab710260f5c99501c0ab2008932df622d065b6e8b8a5d

Which parts make up a whole and how much each takes.

## Decision
Length rather than angle carries the share, so there is no pie; it uses the same groove as Meter. Two to five parts take the validated series order, and the remainder is the groove itself. The legend states names, values and percentages as the full text equivalent; legend="hidden" only moves it off screen (assistive technology still reads it), it is never removed. Parts may declare a status tone: all or none, and no tone twice. When part values change each segment travels to its new length (nothing animates on first render; with reduced motion or keyboard input it lands at once).

## Use and ownership
- The make-up of a whole should read at a glance.
- Avoid: Use Meter for one part against a limit; use a bar Chart to compare category sizes.
- Library: Segments, gaps, colors and the text equivalent.
- Application: Values, the total and folding rules.

## Composition
- Place in panels or beside readings; the caller supplies the name.
- Under a Stat number, place it in StatDescription with legend="hidden".

## Responsive behavior
- The bar fills the width; the legend wraps.

## Customization
- Series colors come from chart1..5 without a separate palette.

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
The whole's name, its parts and an optional total.
- label: string. What the whole is.
- items: readonly { key; label; value; tone? }[]. Two to five non-negative parts; fold more into one named part. tone is a status category (danger, warning, success, info): all parts declare one or none do; mixing, or repeating a tone, throws. Declared tones replace the ordered series colors in segments and legend swatches.
- total: number. The whole; defaults to the sum, and any remainder shows as empty groove.
- format: (value: number) => string. Formatting for values in the legend.
- legend: "visible" | "hidden". Defaults to visible. When hidden the legend stays in the document for assistive technology only and the screen shows the track alone; for places that already carry a number, such as a Stat.

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
