# 度量 Stat

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/stat
Source: packages/ui/src/components/stat.tsx
Source SHA-256: 7885ec5af69af08427069c47a31e9cb2a01dee3416d18289f3d995356e281b0d

数值、单位与说明分别提供。

## Decision
dl/dt/dd 保留度量关系；零值不消失，未知和不适用必由应用说明。变化量必须说明参照期，方向由箭头与文字表达；好坏只由应用声明，未声明时用墨色。

## Notes
- 统计口径、更新时间和变化判断属于应用事实；说明可省略。

## Use and ownership
- 需要识别一个度量的名称、值和单位。
- Avoid: 跨对象比较使用 Table；趋势图形由具备真实数据的应用组合。
- Library: 度量名称、值、单位与说明的语义关系。
- Application: 统计口径、数值状态、更新时间与变化事实。

## Composition
- StatDelta：与参照期相比的变化量（dd）。
- Stat：dl，状态必填。
- StatLabel / StatValue / StatDescription：dt / dd / dd。
- StatUnit：StatValue 中的 span。

## Responsive behavior
- 数值与单位可换行，未知状态不缩为零。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- Stat: function; owner stat; PASS; props: StatProps
- StatDelta: function; owner stat; PASS; props: StatDeltaProps
- StatDeltaProps: type; owner stat; PASS
- StatDescription: function; owner stat; PASS; props: StatDescriptionProps
- StatDescriptionProps: type; owner stat; PASS
- StatLabel: function; owner stat; PASS; props: StatLabelProps
- StatLabelProps: type; owner stat; PASS
- StatProps: type; owner stat; PASS
- StatState: type; owner stat; PASS
- StatUnit: function; owner stat; PASS; props: StatUnitProps
- StatUnitProps: type; owner stat; PASS
- StatValue: function; owner stat; PASS; props: StatValueProps
- StatValueProps: type; owner stat; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### StatDelta
与参照期相比的变化量（dd）。
- value: number. 带符号的变化量。
- period: string. 参照期，例如「较上周」；必填。
- format: (absolute: number) => string. 绝对值的显示，例如百分比。
- sentiment: "good" | "bad". 应用声明的好坏；不声明时用墨色。

### Stat
dl，状态必填。
- state: "known" | "unknown" | "not-applicable". 应用确认的度量状态，不产生替代数值。
- render / ref / native props: useRender.ComponentProps<dl>. 传入标题和值；属性属于实际 dl。

### StatLabel / StatValue / StatDescription
dt / dd / dd。
- children / render / ref / native props: useRender.ComponentProps<dt | dd>. 值可为数字或状态文字，0 原样保留。

### StatUnit
StatValue 中的 span。
- children / render / native props: useRender.ComponentProps<span>. 单位由应用提供，不猜测量纲。

## Keyboard

## Source examples
### 明确的数值状态
Source: apps/docs/src/content/stat/demos/01-facts.tsx
```tsx
import { Inline } from "@qingye/ui/components/layout";
import { Stat, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "明确的数值状态", titleEn: "Explicit metric states" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="section" align="start"><Stat state="known"><StatLabel>数量</StatLabel><StatValue>{0}<StatUnit>项</StatUnit></StatValue></Stat><Stat state="unknown"><StatLabel>宽度</StatLabel><StatValue>未知</StatValue></Stat><Stat state="not-applicable"><StatLabel>高度</StatLabel><StatValue>不适用</StatValue></Stat></Inline>;
}
```

### 变化量与趋势
Source: apps/docs/src/content/stat/demos/02-delta.tsx
```tsx
import { Inline } from "@qingye/ui/components/layout";
import { Sparkline } from "@qingye/ui/components/sparkline";
import { Stat, StatDelta, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";
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
