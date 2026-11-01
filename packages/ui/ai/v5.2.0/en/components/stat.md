# Stat

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/stat
Source: packages/ui/src/components/stat.tsx
Source SHA-256: 18ad0566f1f59726fcbb26b52e66937630be8699bf086134f2e623b70c57eaab

Values, units and explanations supplied independently.

## Decision
dl/dt/dd preserve metric relationships; zero remains visible and the application explains unknown and inapplicable values. A change names its reference period and shows direction with an arrow and text; only the application declares good or bad, otherwise it stays in ink.

## Notes
- Definitions, update times and changes are application facts; descriptions are optional.
- An unknown or not-applicable reading steps back to medium ink with no hue and keeps its size; the application supplies the words, and it is never drawn as 0. Without a number to compare there is no change to show.

## Use and ownership
- Identify a metric's name, value, and unit.
- Use size="lg" for overview readings at the top of a page: only the reading itself is sized by its position.
- Avoid: Use Table for cross-object comparison; applications with actual data compose trend graphics.
- Avoid: Give one row of readings the same size; there are no 36 or 28 steps.
- Library: Semantic relationships among metric names, values, units, and explanations.
- Application: Measurement definitions, numeric states, update times, and change facts.

## Composition
- StatDelta: Change against a reference period (dd).
- Stat: A dl with required state.
- StatLabel / StatValue / StatDescription: dt / dd / dd parts.
- StatUnit: A span inside StatValue.

## Responsive behavior
- Values/units wrap; unknown never shrinks to zero.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- Stat: function; owner stat; PASS; props: StatProps
- StatDelta: function; owner stat; PASS; props: StatDeltaProps
- StatDeltaProps: type; owner stat; PASS
- StatDescription: function; owner stat; PASS; props: StatDescriptionProps
- StatDescriptionProps: type; owner stat; PASS
- StatLabel: function; owner stat; PASS; props: StatLabelProps
- StatLabelProps: type; owner stat; PASS
- StatProps: type; owner stat; PASS
- StatSize: type; owner stat; PASS
- StatState: type; owner stat; PASS
- StatUnit: function; owner stat; PASS; props: StatUnitProps
- StatUnitProps: type; owner stat; PASS
- StatValue: function; owner stat; PASS; props: StatValueProps
- StatValueProps: type; owner stat; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Stat
- `size?`: `"md" | "lg"`. 读数的尺寸档。只有读数本身按它在页面上的位置选大小（概览顶部的数字用 lg）；标签、单位、说明与变化量的字号不随它变（屋有大小，人无大小）。
- `state`: `"unknown" | "not-applicable" | "known"`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### StatDelta
- `format?`: `(absolute: number) => string`. 变化量的绝对值怎样显示，例如百分比。
- `period`: `string`. 参照期，例如「较上周」。没有参照期的变化量无法解读。
- `sentiment?`: `"good" | "bad"`. 这次变化是好是坏，只有应用知道（随类赋彩）：不声明时用墨色，方向由箭头与文字表达。
- `value`: `number`. 与参照期相比的变化量，带符号。
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

### StatDescription
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### StatLabel
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### StatUnit
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### StatValue
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context StatContext: without a provider default-value; provided by Stat

## Curated API
Written descriptions; the list above is the type-resolved fact.

### StatDelta
Change against a reference period (dd).
- value: number. The signed change.
- period: string. The reference period such as "vs last week"; required.
- format: (absolute: number) => string. How the absolute value is shown, such as a percentage.
- sentiment: "good" | "bad". Good or bad as declared by the application; otherwise ink.

### Stat
A dl with required state.
- state: "known" | "unknown" | "not-applicable". An application-owned metric state that generates no replacement value. An unknown or not-applicable reading steps back to medium ink and is recorded as data-state on StatValue.
- size: "md" | "lg"; default "md". The reading's size step, recorded as data-size on the root. lg raises StatValue to 32/40 (md is 24/28) for overview readings at the top of a page; the label, unit, description and change keep their size.
- render / ref / native props: useRender.ComponentProps<dl>. Supply labels and values; props reach the actual dl.

### StatLabel / StatValue / StatDescription
dt / dd / dd parts.
- children / render / ref / native props: useRender.ComponentProps<dt | dd>. Values may be numbers or state text; zero is preserved.

### StatUnit
A span inside StatValue.
- children / render / native props: useRender.ComponentProps<span>. The caller supplies units; the component infers no dimension.

## Keyboard

## Source examples
### 明确的数值状态
Source: apps/docs/src/content/stat/demos/01-facts.tsx
```tsx
import { Inline } from "@qingye_lab/ui/components/layout";
import { Stat, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "明确的数值状态", titleEn: "Explicit metric states" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="section" align="start"><Stat state="known"><StatLabel>数量</StatLabel><StatValue>{0}<StatUnit>项</StatUnit></StatValue></Stat><Stat state="unknown"><StatLabel>宽度</StatLabel><StatValue>未知</StatValue></Stat><Stat state="not-applicable"><StatLabel>高度</StatLabel><StatValue>不适用</StatValue></Stat></Inline>;
}
```

### 变化量与趋势
Source: apps/docs/src/content/stat/demos/02-delta.tsx
```tsx
import { Inline } from "@qingye_lab/ui/components/layout";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { Stat, StatDelta, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "变化量与趋势", titleEn: "Change and trend" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="section" align="start">
    <Stat state="known"><StatLabel>本周同步</StatLabel><StatValue>1,284<StatUnit>次</StatUnit></StatValue><StatDelta value={12.4} period="较上周" format={n => `${n}%`} /><dd className="m-0"><Sparkline label="近 8 周同步次数" values={[980, 1010, 1102, 1080, 1150, 1120, 1142, 1284]} /></dd></Stat>
    <Stat state="known"><StatLabel>失败</StatLabel><StatValue>18<StatUnit>次</StatUnit></StatValue><StatDelta value={6} period="较上周" sentiment="bad" /></Stat>
    <Stat state="known"><StatLabel>平均延迟</StatLabel><StatValue>140<StatUnit>毫秒</StatUnit></StatValue><StatDelta value={-22} period="较上周" sentiment="good" format={n => `${n} 毫秒`} /></Stat>
  </Inline>;
}
```

### 概览读数
Source: apps/docs/src/content/stat/demos/03-size.tsx
```tsx
import { Inline } from "@qingye_lab/ui/components/layout";
import { Stat, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "概览读数", titleEn: "Overview readings" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="section" align="start">
    <Stat state="known" size="lg"><StatLabel>在线设备</StatLabel><StatValue>128<StatUnit>台</StatUnit></StatValue><StatDescription>共 140 台</StatDescription></Stat>
    <Stat state="known" size="lg"><StatLabel>待处理</StatLabel><StatValue>3<StatUnit>项</StatUnit></StatValue><StatDescription>最早一项等了 2 小时</StatDescription></Stat>
    <Stat state="known" size="lg"><StatLabel>本周完成</StatLabel><StatValue>46<StatUnit>单</StatUnit></StatValue><StatDescription>较上周多 5 单</StatDescription></Stat>
    <Stat state="known" size="lg"><StatLabel>平均响应</StatLabel><StatValue>1.8<StatUnit>秒</StatUnit></StatValue><StatDescription>近 7 天</StatDescription></Stat>
  </Inline>;
}
```
