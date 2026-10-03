# 度量 Stat

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/stat
Source: packages/ui/src/components/stat.tsx
Source SHA-256: e1ebba3241f6b53ab8d4ecea5135376ca3be3afe498d118cb43a4c05be9e1f74

数值、单位与说明分别提供。

## Decision
dl/dt/dd 保留度量关系；零值不消失，未知和不适用必由应用说明。没有自动趋势、好坏或业务推断。

## Notes
- 统计口径、更新时间和变化判断属于应用事实；说明可省略。

## Use and ownership
- 需要识别一个度量的名称、值和单位。
- Avoid: 跨对象比较使用 Table；趋势图形由具备真实数据的应用组合。
- Library: 度量名称、值、单位与说明的语义关系。
- Application: 统计口径、数值状态、更新时间与变化事实。

## Composition
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
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
