# Sparkline

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/sparkline
Source: packages/ui/src/components/sparkline.tsx
Source SHA-256: 856797e9c07fc4a1d7a230de40b6fabfea2d9b5a14a5958f43cdfae590ec0e58

A small line set in a line of text, showing how a reading has recently changed.

## Decision
One module tall, the line in medium ink and the current point in full ink, without hue by default. Unknown points break the line rather than becoming zero. The accessible name states the endpoints and the range. A target band is a reference: it is drawn behind the line in light ink, the vertical range includes it, and the summary adds whether the current value is above, below or within the target. The tone is declared by the caller; the component never recolors itself for leaving the band. Point readouts are opt-in: hover finds the nearest point; one focus target traverses with Left/Right and Home/End; a tap shows or dismisses the reading. Escape, blur and an outside press dismiss it. The public Tooltip provides a portal and hoverable content; unknown values remain unknown.

## Use and ownership
- A reading needs a shape showing whether it has recently improved or worsened.
- Use band when there is a real target range: the reader needs to see whether the line is inside or outside it. Without a range, draw no band.
- The application decides tone: only it knows whether leaving the target is good or bad (higher latency is bad, higher output may not be); the component never recolors itself.
- Enable tooltip when a short card or table trend needs occasional point inspection, and name its time or category with getPointLabel.
- Avoid: Use Chart or a data table for axes, multiple series or persistently visible point details.
- Library: Shape, gaps at unknown points, the data/band domain, the accessible summary, and opt-in active point, readout and dismissal behavior.
- Application: Values, time range, category names, formatting, target range and tone.

## Composition
- Place beside StatValue, in a table cell, or in text; the caller supplies the name and reading.
- Point inspection has one Tab stop. Accessible hints retain the category, real value or unknown state, and point index. Leave room for the touch target and avoid nesting Sparkline in another button or link.

## Responsive behavior
- line has a fixed width and wraps with text; area fills its container when width is omitted.
- Point hints use a portal to escape card and scroll-container clipping; the shared floating layer handles viewport collisions.

## Customization
- Colors come from the ink ladder; hue appears only through tone as a status category, never as an arbitrary color.

## Current exports
- Sparkline: function; owner sparkline; PASS; props: SparklineProps
- SparklineProps: type; owner sparkline; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Sparkline
- `appearance?`: `"area" | "line"`. line：行内趋势，高一材、浓墨线，从属于旁边的读数（默认）。 area：独立成块的趋势（指标卡），数据是色——第一色的线加与纸调和的淡面，高度由调用方按材给出。
- `band?`: `{ from: number; to: number; label: string }`. 目标区间：画在线的后面、横贯整个宽度的一条带。带是参照，不是数据——用墨阶里的染，不用色相。 纵向范围会把它算进去，所以带永远在画面里。label 命名这个目标（进可访问摘要）。
- `format?`: `(value: number) => string`. 读数的格式，用于可访问摘要与逐点提示。
- `getPointLabel?`: `(index: number) => string`. 逐点读数的类别或时间名称；index 从 0 开始。省略或空白时使用本地化点序号。
- `height?`: `number`. 仅 area：坐标高度（px），默认两材。
- `label`: `string`. 这条线量的是什么，例如「近 12 周同步次数」。它是可访问名称的一部分。
- `tone?`: `"info" | "warning" | "danger" | "success"`. 状态类别，由调用方声明：线、孤立点与当前点（area 的淡面同样）改用该类别的色。 组件不因数值越出目标带而自己变色——好坏只有应用知道。不给则保持墨色（area 为第一色）。
- `tooltip?`: `boolean`. 显式开启逐点读数；默认只提供静态趋势与整图摘要。
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
Ordered values and what they measure.
- label: string. What the line measures; part of the accessible name.
- values: readonly (number | null)[]. Ordered values; null is unknown and breaks the line.
- format: (value: number) => string. Formatting for values in the accessible summary and point readouts; never called for unknown values.
- tooltip: boolean; default false. Enable point readouts. Hover shows the nearest point; focus opens it; Left/Right and Home/End traverse; Enter/Space or a tap toggles it. Escape, blur or an outside press dismiss it without immediately reopening from retained focus or hover. The hint states the category, value and point index. The default remains a static image summary; an empty array has no point target.
- getPointLabel: (index: number) => string. Time or category for a point, with a zero-based index. Omitted or blank labels fall back to a localized point number. Called only when tooltip is enabled and points exist.
- appearance: "line" | "area"; default "line". line is the inline trend; area is a block trend in the first color with a soft fill.
- height: number; default 40. area only: plot height in px.
- band: { from: number; to: number; label: string }. Target range, drawn as a light-ink band across the full width behind the line; from must be below to, and label names the target in the summary. The vertical range includes it.
- tone: "danger" | "warning" | "success" | "info". Status category declared by the caller; the line, isolated points and current point (and the area fill) take its color. Omit it to stay in ink.
- width: number; default 100. Plot width in px, five modules by default; a line is always one module tall.

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

### 核对每小时同步量
Source: apps/docs/src/content/sparkline/demos/04-point-readout.tsx
```tsx
import { Card } from "@qingye_lab/ui/components/card";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "核对每小时同步量", titleEn: "Inspect hourly sync counts" } satisfies DemoMeta;

const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
const values = [38, 41, null, 45, 0, 48, 50, 57];

export default function Demo() {
  return <Card className="w-full max-w-sm overflow-hidden p-(--qy-panel-padding-sm)">
    <div className="flex items-baseline justify-between gap-(--qy-field-gap)">
      <p className="m-0 text-body">每小时同步量</p>
      <p className="m-0 text-title-sm">57 次</p>
    </div>
    <div className="mt-(--qy-field-group-gap) overflow-auto py-(--qy-space-2)">
      <Sparkline
        label="09:00 至 16:00 同步次数"
        appearance="area"
        height={80}
        values={values}
        band={{ from: 40, to: 60, label: "每小时目标" }}
        format={value => `${value} 次`}
        tooltip
        getPointLabel={index => hours[index]!}
      />
    </div>
    <p className="m-0 flex justify-between text-control-sm text-muted-foreground"><span>09:00</span><span>16:00</span></p>
  </Card>;
}
```
