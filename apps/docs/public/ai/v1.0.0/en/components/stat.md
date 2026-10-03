# Stat

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/stat
Source: packages/ui/src/components/stat.tsx
Source SHA-256: e1ebba3241f6b53ab8d4ecea5135376ca3be3afe498d118cb43a4c05be9e1f74

Values, units and explanations supplied independently.

## Decision
dl/dt/dd preserve metric relationships; zero remains visible and the application explains unknown and inapplicable values. No inferred trends or business judgments.

## Notes
- Definitions, update times and changes are application facts; descriptions are optional.

## Use and ownership
- Identify a metric's name, value, and unit.
- Avoid: Use Table for cross-object comparison; applications with actual data compose trend graphics.
- Library: Semantic relationships among metric names, values, units, and explanations.
- Application: Measurement definitions, numeric states, update times, and change facts.

## Composition
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
import { Inline } from "@qingye/ui/components/layout";
import { Stat, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "明确的数值状态", titleEn: "Explicit metric states" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="section" align="start"><Stat state="known"><StatLabel>数量</StatLabel><StatValue>{0}<StatUnit>项</StatUnit></StatValue></Stat><Stat state="unknown"><StatLabel>宽度</StatLabel><StatValue>未知</StatValue></Stat><Stat state="not-applicable"><StatLabel>高度</StatLabel><StatValue>不适用</StatValue></Stat></Inline>;
}
```
