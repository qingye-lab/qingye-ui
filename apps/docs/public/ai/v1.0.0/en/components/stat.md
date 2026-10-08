# Stat

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/stat
Source: packages/ui/src/components/stat.tsx
Source SHA-256: 6e812b09e8375b417af68edbacc5b10eda7b1747c44b6acb7b1bbf34172af163

Values, units and explanations supplied independently.

## Decision
dl/dt/dd preserve metric relationships; zero remains visible and the application explains unknown and inapplicable values. A change names its reference period and shows direction with an arrow and text; only the application declares good or bad, otherwise it stays in ink.

## Notes
- Definitions, update times and changes are application facts; descriptions are optional.

## Use and ownership
- Identify a metric's name, value, and unit.
- Avoid: Use Table for cross-object comparison; applications with actual data compose trend graphics.
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
- StatState: type; owner stat; PASS
- StatUnit: function; owner stat; PASS; props: StatUnitProps
- StatUnitProps: type; owner stat; PASS
- StatValue: function; owner stat; PASS; props: StatValueProps
- StatValueProps: type; owner stat; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### StatDelta
Change against a reference period (dd).
- value: number. The signed change.
- period: string. The reference period such as "vs last week"; required.
- format: (absolute: number) => string. How the absolute value is shown, such as a percentage.
- sentiment: "good" | "bad". Good or bad as declared by the application; otherwise ink.

### Stat
A dl with required state.
- state: "known" | "unknown" | "not-applicable". An application-owned metric state that generates no replacement value.
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
