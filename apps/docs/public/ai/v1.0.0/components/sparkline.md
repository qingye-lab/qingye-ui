# 行内趋势 Sparkline

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/sparkline
Source: packages/ui/src/components/sparkline.tsx
Source SHA-256: 6bdcb8341745f74716030677ccef202bdb9017cc6a56aaa264d50382e9a0804e

坐在文字行里的小型折线，说明一个读数最近怎样变化。

## Decision
高一材，线用浓墨、当前一点用焦墨，不用色相；未知点断开而不当作零；可访问名称给出起止与最高最低。

## Use and ownership
- 读数旁需要「最近在变好还是变坏」的形状。
- Avoid: 需要读出具体值或比较多个系列时用 Chart。
- Library: 形状、未知点的断开与可访问摘要。
- Application: 数值、时间范围与格式。

## Composition
- 放在 StatValue、表格单元格或正文旁；名称与读数由调用方给出。

## Responsive behavior
- 宽度固定，随文字换行。

## Customization
- 颜色读墨阶，不开放色相。

## Current exports
- Sparkline: function; owner sparkline; PASS; props: SparklineProps
- SparklineProps: type; owner sparkline; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Sparkline
按顺序的数值与它量的是什么。
- label: string. 这条线量的是什么；是可访问名称的一部分。
- values: readonly (number | null)[]. 按顺序的数值；null 表示未知，画成断开。
- format: (value: number) => string. 可访问摘要里的读数格式。
- width: number; default 100. 坐标宽度（px），默认 5 材；高度固定一材。

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
