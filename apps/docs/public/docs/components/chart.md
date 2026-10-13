# 图表 Chart

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/chart
Source: packages/ui/src/components/chart.tsx
Source SHA-256: 64c72499d5d4d77213cd679fbe2520d47cfae210c81ed255dd9227afc5c4a2c9

九种由任务选定的形式——折线、柱状、面积、堆叠面积、占比面积、横向柱、堆叠柱、占比柱、环形；同源的图形、命名的轴与按需展开的数据表。

## Decision
图只画数据。已知0、未知和不适用的单个值分别成立：未知值形成gap，表格保留其真实名称。整张图没有记录、结果未知或不适用时不渲染图，由调用方在原位放 Empty。图形不替代可达数值。参照（目标带、参照线）、背景系列与事件只帮读者定位数据，自己不是数据：用墨不用色，名称必填并出现在图例与数据表。量轴只有折线可以不从零起，柱与面积的长度、面积编码一旦截断，比例就是假的。状态色（series[].tone）由应用声明，组件不从数值猜好坏。阶梯（series[].interpolation: "step"）表达值在两次变化之间保持不变，取 step-after：记录是「这一刻起变成了这个值」，step-before 会把变化画到观测之前；不提供平滑曲线，曲线在两点之间画出数据里没有的值。占比构成（bar-share / area-share）读的是构成怎样变而不是多少：各行内归一到该行之和，量轴固定 0–100%，刻度 0/25/50/75/100；含未知或不适用值、或和为 0 的行整行不画（整体不可得，每一部分的占比都会是假的），已知原值在数据表里如实列出；负值抛错。柱上标值（valueLabels）只给单系列的 bar 与 bar-horizontal，标了值就不再画量轴刻度与网格（同一事实不说两遍）。堆叠与占比的读数和数据表给出合计；含缺项的行不合计，数据表里写明缺项。

## Notes
- null、NaN、Infinity、缺失键不能表示0；用显式unknown或not-applicable表达。
- 所有值均未知时不画虚假数值轴，名称、图例与表格保留。
- 默认图形为数据表的视觉补充，辅助技术使用展开后的数据表；悬停读数只增强，不替代数据表。
- 长名称在可见Table保留，图形轴的公共碰撞处理不表示记录丢失。
- 浅深必要图形对真实背景至少3:1、文字至少4.5:1，由浏览器owner核实。
- 折线上相邻两点的间距小于两个标记宽（16px）时，每个系列只画最后一个已知点的标记，形状照旧；点距足够时每点都画。
- 状态色（tone）之外必须另有名称、位置或数值承担同一事实：浅色主题下危险与警示的明度相近，红绿色觉缺陷下相邻时不易分辨，堆叠段之间 2px 的纸色空隙、图例次序、读数与数据表里的名称是兜底。
- 堆叠与占比的读数末尾与数据表末列给出「合计」；行内有未知或不适用值时不合计（已知部分的和不是合计），读数记「—」，数据表写明缺项。
- 环形图例每项给出名称、值与占比（含总量大于各部分之和时的「其余」），数值列右对齐并用等宽数字，写法与 Proportion 的图例一致。
- donut 超过5个部分或需要精确比较时改用 Proportion 或 bar/bar-horizontal；两个量的关系用 ScatterChart，两个类别维度上的量用 Heatmap——它们数据形状不同，是独立组件而不是 Chart 的 type。

## Use and ownership
- 真实共享量纲数据需要图形比较，且等价值可达。
- 读者要知道「在不在范围内」：用 references 给目标带或参照线，不要靠网格线猜。
- 一个量要放在同类的“其余”里读：把其余几条设为背景系列（context），只有关注的一条取色。
- 数据的变化有已知的原因：用 events 在类别轴上标出，名称进读数与数据表。
- 折线读的是窄区间内的变化（比率 80%–100%）：用 valueDomain；柱与面积不行。
- 系列本身就是状态类别（成功、重试、失败）：用 tone，由应用声明哪个系列是哪一类，组件不从数值猜好坏。
- 值在两次变化之间保持不变（设定值、阈值、库存）：用 interpolation: "step"，不要用直线编造中间值。
- 读的是构成怎样变而不是多少：bar-share（各类别）、area-share（随时间），原值与占比同时在读数与数据表里。
- 柱少而要读准确值：用 valueLabels 把数标在柱上，不再画刻度与网格。
- 切换时间范围或指标：不加接口——把范围放在应用的状态里，用 SegmentedControl 选择，Chart 只按它换 rows。
- Avoid: 混合量纲、猜测结果、把缺值连成可靠趋势或仅靠颜色。
- Avoid: 环形超过5个部分，或占比需要精确比较而不是一眼大小。
- Avoid: 把柱或面积的量轴截断（valueDomain 对它们抛错）。
- Avoid: 用参照、背景线或事件点承载唯一的数据：它们是墨、是背景，数值读数在数据表里。
- Avoid: tone 与按次序取色的系列混用，或两个系列同一类别。
- Avoid: 用平滑曲线连接两点（不提供：曲线画出数据里没有的值）；用占比图读绝对量；把值标在堆叠段或多系列并排的柱上（段太窄、标签挤成一片，valueLabels 不接受）。
- Library: 同源投影、可见等价表、系列形态和基础名称。
- Application: 数据、量纲、真实性、状态文字与自定义图形。

## Composition
- Recharts公开原语 + 当前Table；同一rows/series投影。没有可画的数据时，调用方在原位改放 Empty。

## Responsive behavior
- 图高集中12em可覆写，表格原生滚动/换行；不裁掉实际值。

## Customization
- chart1..5语义角色；局部plot roles与公开renderPlot，不另造图表调色板。系列颜色按次序取，次序是色觉安全的机制，不开放自由配色；状态色只有 danger / warning / success / info 四类。

## Current exports
- AxisTick: function; owner chart; PASS; props: { x?: number; y?: number; textAnchor?: "start" | "middle" | "end"; verticalAnchor?: "start" | "middle" | "end"; payload?: { value: string | number }; formatter?: (value: string | number) => string }
- Chart: function; owner chart; PASS; props: ChartProps
- chartBaseClassName: const; owner chart; UNVERIFIED
- ChartEvent: type; owner chart; PASS
- ChartFigureProps: type; owner chart; PASS
- chartFrameClassName: const; owner chart; UNVERIFIED
- ChartGeometry: reexport; owner chart; UNVERIFIED
- ChartHeader: function; owner chart; PASS; props: { titleId?: string | undefined; label?: React.ReactNode; legend?: React.ReactNode; toggle?: React.ReactNode }
- ChartInterpolation: type; owner chart; PASS
- ChartMarker: type; owner chart; PASS
- chartName: function; owner chart; PASS; props: { "aria-labelledby"?: string | undefined; "aria-label"?: string | undefined }
- chartPaperClassName: const; owner chart; UNVERIFIED
- ChartPlotData: type; owner chart; PASS
- ChartProjectedSeries: type; owner chart; PASS
- ChartProps: type; owner chart; PASS
- ChartReference: type; owner chart; PASS
- ChartRow: type; owner chart; PASS
- ChartSeries: type; owner chart; PASS
- ChartSeriesInput: type; owner chart; PASS
- ChartStyle: type; owner chart; PASS
- ChartType: type; owner chart; PASS
- ChartUnavailableValue: type; owner chart; PASS
- ChartValue: type; owner chart; PASS
- legendClassName: const; owner chart; UNVERIFIED
- LegendKey: function; owner chart; PASS; props: { series: ChartProjectedSeries; type: ChartType }
- Marker: function; owner chart; PASS; props: { color: string; marker: ChartMarker; cx?: number; cy?: number }
- MARKERS: const; owner chart; PASS
- MarkerShape: function; owner chart; PASS; props: { marker: ChartMarker }
- PLOT_PRESETS: const; owner chart; PASS
- ReadoutTooltip: function; owner chart; PASS; props: { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number; series: readonly ChartProjectedSeries[]; format: (value: number, key: string, category: string) => React.ReactNode; band?: ChartBand | undefined; eventsOf?: (rowId: string) => readonly ChartEvent[]; share?: { raw: (rowId: string, key: string) => string | null; percent: Intl.NumberFormat } | undefined; total?: ((rowId: string) => React.ReactNode) | undefined }
- readValue: function; owner chart; PASS; props: ChartRow
- useChartData: function; owner chart; PASS
- useChartGeometry: reexport; owner chart; UNVERIFIED

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### AxisTick
- `formatter?`: `(value: string | number) => string`.
- `payload?`: `{ value: string | number }`.
- `textAnchor?`: `"start" | "end" | "middle"`.
- `verticalAnchor?`: `"start" | "end" | "middle"`.
- `x?`: `number`.
- `y?`: `number`.

### Chart
- `categoryLabel`: `string`.
- `contextLabel?`: `string`. 有背景系列（series[].context）时必填：图例里合成一项的名字，例如「其余蚕室」。
- `events?`: `readonly ChartEvent[]`. 落在类别轴某一行上的事件：基线处一个圆点，名称进悬停读数与数据表的一列。donut 不接受。
- `formatValue?`: `(value: number, series: ChartSeries, row: ChartRow) => React.ReactNode`.
- `framed?`: `boolean`. false：图放在已有的面上（无边框的 Section、Card、面板），不再铺自己的纸——没有线、底、圆角与内缘。是否显示图内标题与它无关，只看有没有外部名称。
- `label`: `string`. 图的名字。默认显示为图内的标题（figcaption）并命名这个 figure。调用方传入 aria-labelledby 或 aria-label 时， figure 由那个外部名称命名，图内不再显示标题（同一个名字不说两遍，NG1）；label 仍必填，它是等价数据表的名字。
- `references?`: `readonly ChartReference[]`. 量轴上的参照：目标带或参照线。画成墨，名称进图例与数据表；量轴范围自动算入。donut 不接受。
- `renderPlot?`: `(projection: ChartPlotData) => React.ReactNode`.
- `rows`: `readonly ChartRow[]`.
- `series`: `readonly ChartSeriesInput[]`.
- `style?`: `ChartStyle`.
- `total?`: `number`. 只用于 donut：整体的总量。省略时等于各部分之和；大于之和时，剩余部分并入「其余」（groove-surface，不是第六种色相）。其他 type 不读取此值。
- `type`: `"area" | "line" | "bar" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "bar-share" | "area-share" | "donut"`.
- `valueDomain?`: `readonly [number, number]`. 量轴范围，只对 line 生效：位置编码可以不从零起，长度与面积编码不行。其他类型传入即抛错。
- `valueLabel`: `string`.
- `valueLabels?`: `boolean`. 把格式化后的值标在柱的数据端，同时不再画量轴刻度与网格。只对 bar、bar-horizontal 生效，且只允许单系列；其他类型传入即抛错。
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

### ChartHeader
- `label?`: `React.ReactNode`.
- `legend?`: `React.ReactNode`.
- `titleId?`: `string | undefined`.
- `toggle?`: `React.ReactNode`.

### LegendKey
- `series`: `ChartProjectedSeries`.
- `type`: `"area" | "line" | "bar" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "bar-share" | "area-share" | "donut"`.

### Marker
- `color`: `string`.
- `cx?`: `number`.
- `cy?`: `number`.
- `marker`: `"circle" | "square" | "triangle" | "diamond" | "cross"`.

### MarkerShape
- `marker`: `"circle" | "square" | "triangle" | "diamond" | "cross"`.

### ReadoutTooltip
- `active?`: `boolean`.
- `band?`: `ChartBand | undefined`.
- `eventsOf?`: `(rowId: string) => readonly ChartEvent[]`.
- `format`: `(value: number, key: string, category: string) => React.ReactNode`.
- `label?`: `string | number`.
- `payload?`: `readonly TooltipEntry[]`.
- `series`: `readonly ChartProjectedSeries[]`.
- `share?`: `{ raw: (rowId: string, key: string) => string | null; percent: Intl.NumberFormat } | undefined`.
- `total?`: `((rowId: string) => React.ReactNode) | undefined`.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context ChartGeometryContext: without a provider default-value; provided by Chart

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Chart
figure名称、共同轴量纲、不同系列形态与同源可见Table。
- label: string. 非空真实语义名称。
- framed: boolean; default true. false：图放在已有的面上（无边框的 Section、Card、面板），不铺自己的纸——没有线、底、圆角与内缘，图的左右缘就是承载面的内容缘。与 TableContainer 的 framed 同义。是否显示图内标题与它无关。
- aria-labelledby / aria-label: string. 外部名称：传入非空的 aria-labelledby（如 SectionTitle 的 id）或 aria-label 时，figure 由它命名，图内不显示标题；图例与「查看数据」仍在图内、靠行尾，二者都没有时标题栏整行不渲染。不传时由图内标题命名。label 仍必填，是等价数据表的名字。
- type: "line" | "bar" | "area" | "area-stacked" | "area-share" | "bar-horizontal" | "bar-stacked" | "bar-share" | "donut". 由任务选定的形式，不是外观偏好：line 随时间/次序的趋势；bar 类别间比较；area 随时间的量（单系列第一色淡面，多系列默认半透叠放）；area-stacked 随时间的构成（淡色带加足色上沿，彼此相切）；bar-horizontal 类别名长或按大小排序的排行；bar-stacked 类别间的构成比较；bar-share / area-share 构成的占比怎样变（各行归一到该行之和，量轴固定 0–100%，原值与占比同时在读数与数据表里；两个以上系列，值不得为负；含未知 / 不适用值或和为 0 的行不画，已知原值在数据表里如实列出；不接受 references 与 valueDomain）；donut 只用于 2–5 个部分、一眼占比的单个整体（rows 必须正好一行）。必填。
- categoryLabel / valueLabel: string. 非空分类轴名与共享量纲/单位；donut 不画轴线，但两个名字仍用于等价数据表与中心读数的说明文字。
- series: readonly { key: string; label: string; context?: boolean; tone?: Tone; interpolation?: "linear" | "step" }[]. 1至5个同量纲系列（donut 要求2至5个；背景系列不计入）。context: true 只用于 line，画成淡墨细线、不画标记、不占身份色与标记名额，另限 12 条；tone 取 danger / warning / success / info，全部非背景系列都声明或都不声明，同一类别不得重复（混用、重复抛错）。interpolation 取 linear（默认）或 step（阶梯，step-after：值从该点起保持到下一点），只对 line、area、area-stacked、area-share 生效，其他类型传入抛错；堆叠与占比的面各带共用边界，必须同一种。只有一个系列时取第一色（文字是墨，数据是色）、不显示图例；两个以上按 chart1..5 的校验顺序取色，并配不同标记形状或图例方块。
- rows: readonly ChartRow[]. 稳定id、分类名称与values；值为finite number或{state:unknown|not-applicable,label}。必须有真实记录；donut 要求正好一行，且每个部分必须是已知的非负数。
- contextLabel: string. 有背景系列时必填：图例里合成一项的名字（淡墨线键 + 此名），例如「其余蚕室」。背景系列各自的名字只出现在等价数据表。缺失抛错。
- references: ({ kind: "band"; from: number; to: number; label: string } | { kind: "line"; value: number; label: string })[]. 量轴上的参照：目标带或参照线（纵向图是横带 / 横线，bar-horizontal 是竖带 / 竖线）。画成墨、在数据之后；量轴范围自动算入；label 必填，出现在图例与数据表下的表注；band 须 from < to，数值有限；donut 传入抛错。有带时悬停读数为每个数值多一行相对目标的位置（高于、低于多少，或在内）；多个带时只对第一个计算。
- events: readonly { rowId: string; label: string; tone?: Tone }[]. 落在类别轴某一行上的事件：基线处一个圆点（给 tone 时用类别色，否则用墨）。事件名出现在该行的悬停读数，并作为数据表的「事件」一列。rowId 不存在或 donut 传入抛错。
- valueDomain: readonly [number, number]. 量轴范围，只对 line 生效：位置编码可以不从零起，例如 80%–100% 的比率。其他类型传入即抛 RangeError（柱与面积用长度、面积编码，必须从零起）。min < max；任何已知值或参照落在范围外抛错——截掉数据与名实不符。刻度取 1、2、2.5、5 乘 10 的幂，最多 6 个。
- total: number. 只用于 donut：整体的总量。省略时等于各部分之和；大于之和时，剩余部分并入「其余」（groove-surface，不是第六种色相）。
- valueLabels: boolean. 把格式化后的值标在柱的数据端外侧（纵柱在柱顶上方，横柱在末端之后，负值在另一侧）；同时不再画量轴刻度与网格，基线保留。只对 bar 与 bar-horizontal 生效，且只允许单系列、至多 12 行（每根柱的类别带得放得下一个标签）；其他类型、多系列或行数超出抛错。文字用墨阶、dense 档、等宽数字；formatValue 只取字符串或数字结果，返回节点时退回默认数值格式。
- formatValue: (value, series, row) => ReactNode. 格式化已知数值；默认按UILocale数值Intl，不改数据。合计、环形图例的数值与「其余」按第一个系列调用（堆叠与环形的系列共用一个量纲）；占比读数、柱上标值、环形图例只取字符串或数字结果。
- renderPlot: (projection: ChartPlotData) => ReactNode. 替换同源图形；gap为null，默认LineChart不连接gap且不动画。名称、图例与可见Table始终保留。自定义图形承担自身交互/ARIA；projection 带有 references、events、valueDomain，系列带 context 与 tone，自定义图形应一并遵守（背景系列不画标记，参照画在数据后面）。
- style / className / render / ref: ChartStyle / useRender组合. 根style可覆写 --qy-chart-plot-height（默认 10 材）。线宽、标记与柱宽是图的法度，不开放逐个配置。

## Keyboard

## Source examples
### 趋势：折线
Source: apps/docs/src/content/chart/demos/01-trend.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "趋势：折线", titleEn: "Trend: line" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const ok = [42, 48, 45, 51, 58, 31, 28];
const failed = [3, 2, 6, 1, 4, 0, 2];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="本周同步次数" categoryLabel="日期" valueLabel="次数"
    series={[{ key: "ok", label: "成功" }, { key: "failed", label: "失败" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { ok: ok[index]!, failed: failed[index]! } }))} />;
}
```

### 比较：柱状，单一系列用墨
Source: apps/docs/src/content/chart/demos/02-compare.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "比较：柱状，单一系列用墨", titleEn: "Comparison: bars, one series in ink" };
const sources = [["接口推送", 1284], ["定时导入", 912], ["数据库连接", 640], ["手动上传", 155]] as const;
export default function Demo() {
  return <Chart type="bar" className="w-full max-w-2xl" label="各来源记录数" categoryLabel="来源" valueLabel="记录数"
    series={[{ key: "count", label: "记录数" }]}
    rows={sources.map(([name, count]) => ({ id: name, label: name, values: { count } }))} />;
}
```

### 未知与空
Source: apps/docs/src/content/chart/demos/03-unknown.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
import { Empty, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "未知与空", titleEn: "Unknown and empty" };

const failures: { id: string; label: string; count: number }[] = [];

export default function Demo() {
  return <Stack gap="section" className="w-full max-w-2xl">
    <Chart type="line" label="近五天延迟" categoryLabel="日期" valueLabel="毫秒" series={[{ key: "ms", label: "延迟" }]}
      rows={[{ id: "1", label: "10/01", values: { ms: 120 } }, { id: "2", label: "10/02", values: { ms: 140 } }, { id: "3", label: "10/03", values: { ms: { state: "unknown", label: "采集中断" } } }, { id: "4", label: "10/04", values: { ms: 110 } }, { id: "5", label: "10/05", values: { ms: 98 } }]} />
    {failures.length > 0
      ? <Chart type="bar" label="本月失败原因" categoryLabel="原因" valueLabel="次数" series={[{ key: "count", label: "次数" }]} rows={failures.map(item => ({ id: item.id, label: item.label, values: { count: item.count } }))} />
      : <Empty state="empty"><EmptyTitle level={3}>本月失败原因</EmptyTitle><EmptyDescription>本月没有失败记录。</EmptyDescription></Empty>}
  </Stack>;
}
```

### 随时间的量：面积
Source: apps/docs/src/content/chart/demos/04-area.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "随时间的量：面积", titleEn: "Quantity over time: area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const records = [812, 940, 1024, 980, 1180, 640, 560];
export default function Demo() {
  return <Chart type="area" className="w-full max-w-2xl" label="本周写入记录数" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "records", label: "记录数" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { records: records[index]! } }))} />;
}
```

### 随时间的构成：堆叠面积
Source: apps/docs/src/content/chart/demos/05-area-stacked.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "随时间的构成：堆叠面积", titleEn: "Composition over time: stacked area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const api = [612, 640, 700, 680, 820, 440, 360];
const scheduled = [200, 260, 240, 220, 260, 150, 140];
const manual = [40, 30, 44, 36, 50, 20, 18];
export default function Demo() {
  return <Chart type="area-stacked" className="w-full max-w-2xl" label="本周各来源记录数" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { api: api[index]!, scheduled: scheduled[index]!, manual: manual[index]! } }))} />;
}
```

### 排行：横向柱
Source: apps/docs/src/content/chart/demos/06-bar-horizontal.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "排行：横向柱", titleEn: "Ranking: horizontal bars" };
const sources = [["接入设备", 1284], ["权限与角色", 42], ["同步与导出", 0], ["操作记录", 90512], ["回调地址", 6]] as const;
export default function Demo() {
  return <Chart type="bar-horizontal" className="w-full max-w-2xl" label="各集合记录数" categoryLabel="集合" valueLabel="记录数"
    series={[{ key: "records", label: "记录数" }]}
    rows={[...sources].sort((a, b) => b[1] - a[1]).map(([name, records]) => ({ id: name, label: name, values: { records } }))} />;
}
```

### 构成比较：堆叠柱
Source: apps/docs/src/content/chart/demos/07-bar-stacked.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "构成比较：堆叠柱", titleEn: "Composition comparison: stacked bars" };
const sources = [["接口推送", 412, 9], ["定时导入", 288, 21], ["数据库连接", 197, 4], ["手动上传", 96, 12]] as const;
export default function Demo() {
  return <Chart type="bar-stacked" className="w-full max-w-2xl" label="各来源成功与失败" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功" }, { key: "failed", label: "失败" }]}
    rows={sources.map(([name, success, failed]) => ({ id: name, label: name, values: { success, failed } }))} />;
}
```

### 一眼占比：环形
Source: apps/docs/src/content/chart/demos/08-donut.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "一眼占比：环形", titleEn: "At-a-glance share: donut" };
export default function Demo() {
  return <Chart type="donut" className="w-full max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />;
}
```

### 参照：目标带、背景系列与事件
Source: apps/docs/src/content/chart/demos/09-reference.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "参照：目标带、背景系列与事件", titleEn: "Reference: target band, context series and events" };
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const room3 = [23.1, 23.8, 24.6, 26.4, 27.9, 27.2, 25.8, 24.9, 24.2, 23.6, 23.2, 22.8];
const others = [
  [22.6, 23.0, 23.7, 24.8, 25.9, 26.1, 25.2, 24.5, 24.0, 23.4, 23.0, 22.5],
  [23.4, 24.0, 24.9, 25.6, 26.3, 25.9, 25.1, 24.6, 24.1, 23.7, 23.3, 23.0],
  [22.2, 22.8, 23.5, 24.4, 25.2, 25.4, 24.9, 24.3, 23.8, 23.2, 22.7, 22.3],
  [23.8, 24.5, 25.3, 26.1, 26.6, 26.2, 25.5, 24.8, 24.3, 23.9, 23.5, 23.1],
  [22.9, 23.3, 24.1, 25.0, 25.7, 25.6, 25.0, 24.4, 23.9, 23.4, 23.0, 22.6],
  [23.0, 23.6, 24.3, 25.2, 25.8, 25.5, 24.8, 24.2, 23.8, 23.3, 22.9, 22.4],
];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="3 号蚕室今日温度" categoryLabel="时刻" valueLabel="温度（℃）"
    series={[{ key: "room3", label: "3 号蚕室" }, ...others.map((_, index) => ({ key: `other${index}`, label: `${[1, 2, 4, 5, 6, 7][index]} 号蚕室`, context: true }))]}
    contextLabel="其余蚕室"
    valueDomain={[20, 30]}
    references={[{ kind: "band", from: 22, to: 26, label: "适宜温度" }]}
    events={[{ rowId: "10:00", label: "开窗通风" }, { rowId: "15:00", label: "关窗保温" }]}
    formatValue={value => `${value} ℃`}
    rows={hours.map((hour, index) => ({ id: hour, label: hour, values: { room3: room3[index]!, ...Object.fromEntries(others.map((values, other) => [`other${other}`, values[index]!])) } }))} />;
}
```

### 量轴范围：折线取 80%–100%
Source: apps/docs/src/content/chart/demos/10-value-domain.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "量轴范围：折线取 80%–100%", titleEn: "Value domain: a line from 80% to 100%" };
const uptime = Array.from({ length: 60 }, (_, index) => Number((96.5 + 2 * Math.sin(index / 3) + 1.2 * Math.sin(index / 1.3)).toFixed(1)));
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="近 60 天在线率" categoryLabel="日期" valueLabel="在线率（%）"
    series={[{ key: "uptime", label: "在线率" }]}
    valueDomain={[80, 100]}
    references={[{ kind: "line", value: 95, label: "目标 95%" }]}
    formatValue={value => `${value}%`}
    rows={uptime.map((value, index) => ({ id: `d${index + 1}`, label: `${index + 1} 日`, values: { uptime: value } }))} />;
}
```

### 状态类别：堆叠柱按类别着色
Source: apps/docs/src/content/chart/demos/11-tone.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "状态类别：堆叠柱按类别着色", titleEn: "Status tone: stacked bars colored by category" };
const sources = [["接口推送", 148, 42, 24], ["定时导入", 96, 58, 31], ["数据库连接", 120, 18, 9], ["手动上传", 54, 12, 16]] as const;
export default function Demo() {
  return <Chart type="bar-stacked" className="w-full max-w-2xl" label="各来源本周同步结果" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功", tone: "success" }, { key: "retry", label: "重试中", tone: "warning" }, { key: "failed", label: "失败", tone: "danger" }]}
    rows={sources.map(([name, success, retry, failed]) => ({ id: name, label: name, values: { success, retry, failed } }))} />;
}
```

### 保持不变：设定值用阶梯
Source: apps/docs/src/content/chart/demos/12-step.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "保持不变：设定值用阶梯", titleEn: "Held between changes: a setpoint as steps" };
const hours = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const target = [23, 23, 25, 26, 26, 25, 24, 23];
const actual = [22.6, 23.1, 24.4, 25.7, 26.2, 25.4, 24.6, 23.5];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="3 号蚕室温度" categoryLabel="时刻" valueLabel="温度（℃）"
    series={[{ key: "target", label: "设定温度", interpolation: "step" }, { key: "actual", label: "实测温度" }]}
    valueDomain={[20, 30]} formatValue={value => `${value} ℃`}
    rows={hours.map((hour, index) => ({ id: hour, label: hour, values: { target: target[index]!, actual: actual[index]! } }))} />;
}
```

### 构成占比：占比柱
Source: apps/docs/src/content/chart/demos/13-share.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "构成占比：占比柱", titleEn: "Composition share: share bars" };
const sources = [["接口推送", 412, 36, 9], ["定时导入", 288, 52, 21], ["数据库连接", 197, 8, 4], ["手动上传", 96, 18, 12]] as const;
export default function Demo() {
  return <Chart type="bar-share" className="w-full max-w-2xl" label="各来源本周同步结果占比" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功" }, { key: "retry", label: "重试" }, { key: "failed", label: "失败" }]}
    rows={[
      ...sources.map(([name, success, retry, failed]) => ({ id: name, label: name, values: { success, retry, failed } })),
      { id: "文件监听", label: "文件监听", values: { success: 64, retry: { state: "unknown" as const, label: "尚未统计" }, failed: 3 } },
    ]} />;
}
```

### 构成占比随时间：占比面积
Source: apps/docs/src/content/chart/demos/14-share-area.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "构成占比随时间：占比面积", titleEn: "Composition share over time: share area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const api = [612, 640, 700, 680, 820, 440, 360];
const scheduled = [200, 260, 240, 220, 260, 150, 140];
const manual = [40, 30, 44, 36, 50, 20, 18];
export default function Demo() {
  return <Chart type="area-share" className="w-full max-w-2xl" label="本周各来源记录数占比" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { api: api[index]!, scheduled: scheduled[index]!, manual: manual[index]! } }))} />;
}
```

### 读准确值：柱上标值
Source: apps/docs/src/content/chart/demos/15-value-labels.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "读准确值：柱上标值", titleEn: "Reading exact values: labels on bars" };
const sources = [["接口推送", 1284], ["定时导入", 912], ["数据库连接", 640], ["手动上传", 155], ["文件监听", 0]] as const;
export default function Demo() {
  return <Chart type="bar" className="w-full max-w-2xl" label="各来源记录数" categoryLabel="来源" valueLabel="记录数" valueLabels
    series={[{ key: "count", label: "记录数" }]}
    rows={sources.map(([name, count]) => ({ id: name, label: name, values: { count } }))} />;
}
```

### 读准确值：横向柱标值
Source: apps/docs/src/content/chart/demos/16-value-labels-horizontal.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "读准确值：横向柱标值", titleEn: "Reading exact values: labels on horizontal bars" };
const sources = [["接入设备", 1284], ["权限与角色", 42], ["同步与导出", 0], ["操作记录", 90512], ["回调地址", 6]] as const;
export default function Demo() {
  return <Chart type="bar-horizontal" className="w-full max-w-2xl" label="各集合记录数" categoryLabel="集合" valueLabel="记录数" valueLabels
    series={[{ key: "records", label: "记录数" }]}
    rows={[...sources].sort((a, b) => b[1] - a[1]).map(([name, records]) => ({ id: name, label: name, values: { records } }))} />;
}
```

### 一眼占比：环形带其余
Source: apps/docs/src/content/chart/demos/17-donut-total.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "一眼占比：环形带其余", titleEn: "At-a-glance share: donut with a remainder" };
export default function Demo() {
  return <Chart type="donut" className="w-full max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数" total={5000}
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />;
}
```

### 切换时间范围
Source: apps/docs/src/content/chart/demos/18-range.tsx
```tsx
import { useState } from "react";
import { Chart } from "@qingye_lab/ui/components/chart";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
export const meta = { title: "切换时间范围", titleEn: "Switching the time range" };
const days = Array.from({ length: 30 }, (_, index) => { const date = new Date(2026, 8, 13 + index); return { id: `d${index}`, label: `${date.getMonth() + 1}/${date.getDate()}`, count: 40 + Math.round(12 * Math.sin(index / 2.3)) - (index % 7 < 2 ? 14 : 0) }; });
export default function Demo() {
  const [range, setRange] = useState<"7" | "30">("7");
  const shown = days.slice(-Number(range));
  return <div className="grid w-full max-w-2xl justify-items-start gap-(--qy-field-group-gap)">
    <SegmentedControl aria-label="时间范围" value={range} onValueChange={value => setRange(value as "7" | "30")}>
      <SegmentedControlItem value="7">近 7 日</SegmentedControlItem>
      <SegmentedControlItem value="30">近 30 日</SegmentedControlItem>
    </SegmentedControl>
    <Chart type="line" className="w-full" label="每日同步次数" categoryLabel="日期" valueLabel="次数"
      series={[{ key: "count", label: "同步次数" }]}
      rows={shown.map(day => ({ id: day.id, label: day.label, values: { count: day.count } }))} />
  </div>;
}
```

### 放在区块里
Source: apps/docs/src/content/chart/demos/19-in-section.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "放在区块里", titleEn: "Inside a section" } satisfies DemoMeta;

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const ok = [42, 48, 45, 51, 58, 31, 28];
const failed = [3, 2, 6, 1, 4, 0, 2];

export default function Demo() {
  return <Section className="w-full max-w-2xl">
    <SectionHeader><SectionTitle level={4} id="chart-section-sync">本周同步</SectionTitle></SectionHeader>
    <Chart framed={false} aria-labelledby="chart-section-sync" type="line" label="本周同步次数" categoryLabel="日期" valueLabel="次数"
      series={[{ key: "ok", label: "成功" }, { key: "failed", label: "失败" }]}
      rows={days.map((day, index) => ({ id: day, label: day, values: { ok: ok[index]!, failed: failed[index]! } }))} />
  </Section>;
}
```
