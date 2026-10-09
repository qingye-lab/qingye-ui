# 构成 Proportion

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/proportion
Source: packages/ui/src/components/proportion.tsx
Source SHA-256: 9ca09dbc301e445e298b8bd812665f5795f3f07819343b2ee2b7c276243cc2eb

一个整体由哪几部分组成，各占多少。

## Decision
用长度而不是角度表达比例，所以不提供饼图；与 Meter 同一条凹槽。两到五个部分按校验过的系列顺序取色，剩余是凹槽本身。图例给出名称、数值与百分比，是完整的文字等价物。

## Use and ownership
- 一个整体的构成需要一眼看出。
- Avoid: 只有一个部分对一个上限时用 Meter；比较各类别的大小用 Chart 柱状。
- Library: 分段、空隙、取色与文字等价物。
- Application: 数值、总量与合并规则。

## Composition
- 放在面板、读数旁；名称由调用方给出。

## Responsive behavior
- 条占满宽度，图例换行。

## Customization
- 系列色来自 chart1..5，不另造调色板。

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
整体的名称、部分与可选总量。
- label: string. 整体是什么。
- items: readonly { key; label; value }[]. 两到五个非负部分；更多时由调用方合并为「其他」。
- total: number. 整体总量；省略时等于各部分之和，大于时剩余显示为空槽。
- format: (value: number) => string. 图例中数值的格式。

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
