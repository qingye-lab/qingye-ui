# 行内趋势 Sparkline

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/sparkline
Source: packages/ui/src/components/sparkline.tsx
Source SHA-256: e6061dfe3068d7c1fece1a1d0ac4c854d51a576d22fbbf9c8ed38bb2483e4bd2

坐在文字行里的小型折线，说明一个读数最近怎样变化。

## Decision
高一材，线用浓墨、当前一点用焦墨，默认不用色相；未知点断开而不当作零；可访问名称给出起止与最高最低。目标带是参照，用清墨画在线后面，纵向范围把它算进去，摘要补上当前值在目标之上、之下或之内。状态类别由调用方声明，组件不因越出目标带而自己变色。

## Use and ownership
- 读数旁需要「最近在变好还是变坏」的形状。
- 有明确的目标区间时用 band：读者要看的是线在区间之内还是之外。没有区间就不画带。
- tone 由应用决定：越出目标是好是坏只有应用知道（延迟高了是坏，产量高了未必）；组件不会自己变色。
- Avoid: 需要读出具体值或比较多个系列时用 Chart。
- Library: 形状、未知点的断开、纵向范围对目标带的并集，以及含目标位置的可访问摘要。
- Application: 数值、时间范围、格式、目标区间与状态类别。

## Composition
- 放在 StatValue、表格单元格或正文旁；名称与读数由调用方给出。

## Responsive behavior
- 宽度固定，随文字换行。

## Customization
- 颜色读墨阶；色相只经 tone 表达状态类别，不开放任意颜色。

## Current exports
- Sparkline: function; owner sparkline; PASS; props: SparklineProps
- SparklineProps: type; owner sparkline; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Sparkline
- `appearance?`: `"area" | "line"`. line：行内趋势，高一材、浓墨线，从属于旁边的读数（默认）。 area：独立成块的趋势（指标卡），数据是色——第一色的线加与纸调和的淡面，高度由调用方按材给出。
- `band?`: `{ from: number; to: number; label: string }`. 目标区间：画在线的后面、横贯整个宽度的一条带。带是参照，不是数据——用墨阶里的染，不用色相。 纵向范围会把它算进去，所以带永远在画面里。label 命名这个目标（进可访问摘要）。
- `format?`: `(value: number) => string`. 读数的格式，用于可访问摘要。
- `height?`: `number`. 仅 area：坐标高度（px），默认两材。
- `label`: `string`. 这条线量的是什么，例如「近 12 周同步次数」。它是可访问名称的一部分。
- `tone?`: `"info" | "warning" | "danger" | "success"`. 状态类别，由调用方声明：线、孤立点与当前点（area 的淡面同样）改用该类别的色。 组件不因数值越出目标带而自己变色——好坏只有应用知道。不给则保持墨色（area 为第一色）。
- `values`: `readonly (number | null)[]`. 按顺序的数值；null 表示该点未知，画成断开，不当作零。
- `width?`: `number`. 坐标宽度（px），默认 5 材。
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Sparkline
按顺序的数值与它量的是什么。
- label: string. 这条线量的是什么；是可访问名称的一部分。
- values: readonly (number | null)[]. 按顺序的数值；null 表示未知，画成断开。
- format: (value: number) => string. 可访问摘要里的读数格式。
- appearance: "line" | "area"; default "line". line 是行内趋势；area 是独立成块的趋势，取第一色并带淡面。
- height: number; default 40. 仅 area：坐标高度（px）。
- band: { from: number; to: number; label: string }. 目标区间，画成线后面横贯整个宽度的清墨带；from 须小于 to，label 命名目标并进入摘要。纵向范围包含它。
- tone: "danger" | "warning" | "success" | "info". 状态类别，由调用方声明；线、孤立点与当前点（area 的淡面）改用该类别色。不给则保持墨色。
- width: number; default 100. 坐标宽度（px），默认 5 材；line 的高度固定一材。

## Keyboard

## Source examples
### 读数旁的趋势
Source: apps/docs/src/content/sparkline/demos/01-inline.tsx
```tsx
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
export const meta = { title: "读数旁的趋势", titleEn: "Trend beside a reading" };
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) text-body">
    <p className="m-0 flex items-center gap-(--qy-field-gap)">近 12 周同步次数 <Sparkline label="近 12 周同步次数" values={[38, 41, 39, 45, 52, 48, 50, 57, 55, 61, 58, 64]} /> <span className="numeric">64</span></p>
    <p className="m-0 flex items-center gap-(--qy-field-gap)">平均延迟 <Sparkline label="平均延迟" values={[180, 172, null, 160, 151, 149, 140]} format={n => `${n} 毫秒`} /> <span className="numeric">140 毫秒</span></p>
  </div>;
}
```

### 目标带与状态类别
Source: apps/docs/src/content/sparkline/demos/02-band.tsx
```tsx
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "目标带与状态类别", titleEn: "Target band and tone" } satisfies DemoMeta;
export default function Demo() {
  return <dl className="m-0 grid grid-cols-[max-content_max-content_max-content] items-center gap-x-(--qy-field-gap) gap-y-(--qy-field-group-gap) text-body">
    <dt>同步成功率</dt><dd className="m-0"><Sparkline label="近 8 日同步成功率" values={[92, 94, 93, 95, 96, 95, 97, 96]} format={n => `${n}%`} band={{ from: 90, to: 100, label: "达标区间" }} /></dd><dd className="numeric m-0">96%</dd>
    <dt>平均延迟</dt><dd className="m-0"><Sparkline label="近 8 日平均延迟" values={[140, 152, 148, 170, 195, 230, 245, 260]} format={n => `${n} 毫秒`} band={{ from: 100, to: 180, label: "目标延迟" }} tone="danger" /></dd><dd className="numeric m-0">260 毫秒</dd>
    <dt>待处理任务</dt><dd className="m-0"><Sparkline label="近 8 日待处理任务" values={[12, 18, 25, 31, 36, 38, 44, 47]} format={n => `${n} 项`} band={{ from: 0, to: 40, label: "积压上限" }} tone="warning" /></dd><dd className="numeric m-0">47 项</dd>
  </dl>;
}
```

### 独立趋势的目标带
Source: apps/docs/src/content/sparkline/demos/03-area-band.tsx
```tsx
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "独立趋势的目标带", titleEn: "Target band on a block trend" } satisfies DemoMeta;
export default function Demo() {
  return <div className="grid max-w-sm gap-(--qy-field-gap)">
    <p className="m-0 text-body">近 12 周同步次数</p>
    <Sparkline appearance="area" height={64} label="近 12 周同步次数" values={[38, 41, 39, 45, 52, 48, 50, null, 55, 61, 58, 64]} band={{ from: 45, to: 60, label: "目标区间" }} />
  </div>;
}
```
