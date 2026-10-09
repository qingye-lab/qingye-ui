# Proportion

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/proportion
Source: packages/ui/src/components/proportion.tsx
Source SHA-256: 9ca09dbc301e445e298b8bd812665f5795f3f07819343b2ee2b7c276243cc2eb

Which parts make up a whole and how much each takes.

## Decision
Length rather than angle carries the share, so there is no pie; it uses the same groove as Meter. Two to five parts take the validated series order, and the remainder is the groove itself. The legend states names, values and percentages as the full text equivalent.

## Use and ownership
- The make-up of a whole should read at a glance.
- Avoid: Use Meter for one part against a limit; use a bar Chart to compare category sizes.
- Library: Segments, gaps, colors and the text equivalent.
- Application: Values, the total and folding rules.

## Composition
- Place in panels or beside readings; the caller supplies the name.

## Responsive behavior
- The bar fills the width; the legend wraps.

## Customization
- Series colors come from chart1..5 without a separate palette.

## Current exports
- Proportion: function; owner proportion; PASS; props: ProportionProps
- ProportionItem: type; owner proportion; PASS
- ProportionProps: type; owner proportion; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Proportion
The whole's name, its parts and an optional total.
- label: string. What the whole is.
- items: readonly { key; label; value }[]. Two to five non-negative parts; fold more into one named part.
- total: number. The whole; defaults to the sum, and any remainder shows as empty groove.
- format: (value: number) => string. Formatting for values in the legend.

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
