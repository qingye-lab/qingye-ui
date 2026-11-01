# 评分 Rating

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/rating
Source: packages/ui/src/components/rating.tsx
Source SHA-256: a7cd9c1e28e860b80f120cc6e726424c6e186faf661a004c9bd2f823fc0b444d

在 1 到 max 之间给出一个整数分值，用一排星表示。

## Decision
评分是单选组，不是滑块：分值是有限个互斥的整数，方向键移动即选中。半星没有提供——要更细的刻度就加大 max，而不是引入小数。只读时不保留单选语义，因为一串不能操作的 radio 对读屏是噪音；它是一个结论，所以读成一幅带分值的图。

## Notes
- 星的名称是「n 星」，组的名称是「评分」；读屏读到的是「评分，3 星，已选中」，不依赖颜色。
- 悬停时预览分值，只影响显示；点击前不改变值。
- 满星与空星靠形状区分，占位相同，状态变化不改变组件外形。

## Use and ownership
- 让人对一个对象打出有限档位的分
- 展示一个已有的评分结果（只读）
- Avoid: 连续的数值用 Slider
- Avoid: 两三个互斥的文字选项用 RadioGroup
- Avoid: 是 / 否的判断用 Switch 或 Checkbox
- Library: 非受控分值、悬停预览、焦点
- Application: 受控分值、评分的含义与提交、invalid

## Composition
- FieldLabel + Rating + FieldDescription + FieldError；只读展示可直接放在行内

## Responsive behavior
- 星的尺寸读填值控件的图标档，随密度；粗指针下命中区扩到触屏目标；本批只做桌面检查

## Customization
- className；max；allowClear

## Current exports
- Rating: function; owner rating; PASS; props: RatingProps
- RatingProps: type; owner rating; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Rating
- `allowClear?`: `boolean`. 再点一次当前分值就清除（回到 0）。默认开启；关闭后一旦评过分只能改不能撤。
- `defaultValue?`: `number`.
- `max?`: `number`. 最高分，也是星的个数；正整数，默认 5。
- `onValueChange?`: `(value: number) => void`.
- `value?`: `number`. 受控的分值，0 表示未评分；整数，范围 0..max。
- plus 282 inherited (@types/react 274, @base-ui/react 8); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Rating
单选组语义的评分：每颗星是一个 radio，选中第 n 颗即分值 n。只读时是一幅图加「n / max」。
- value / defaultValue: number; default 0. 分值，整数，0 表示未评分；范围 0..max，越界或非整数会抛 RangeError。
- onValueChange: (value: number) => void. 分值改变时调用；清除时为 0。
- max: number; default 5. 最高分，也是星的个数；正整数。
- allowClear: boolean; default true. 再选当前分值即清除。关闭后评过分只能改不能撤。
- readOnly: boolean; default false. 不再是控件：渲染为 role="img"（名称「评分 4 / 5」）加可见的「4 / 5」。
- disabled: boolean; default false. 不可操作；不提交。
- name: string. 原生表单字段名；提交所选分值，未评分时不提交。
- aria-label / aria-labelledby: string. 组的名称，默认「评分」；放进带 FieldLabel 的 Field 时由标签命名。

## Keyboard
- Tab / Shift+Tab: 进入或离开整组；组内只有一个停靠点（已选的星，未评分时是第一颗）。
- → / ↓ / ← / ↑: 移到相邻的星并选中它。RTL 下左右方向相反。
- Space: 选中当前的星；它已是当前分值且 allowClear 时清除。

## Source examples
### 评分
Source: apps/docs/src/content/rating/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Rating } from "@qingye_lab/ui/components/rating";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "评分", titleEn: "Score" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const [value, setValue] = useState(3);
  return <Field name="score">
    <FieldLabel>{en ? "Quality" : "质量"}</FieldLabel>
    <Rating value={value} onValueChange={setValue} />
    <output className="text-support text-muted-foreground" aria-live="polite">{value} / 5</output>
  </Field>;
}
```

### 状态
Source: apps/docs/src/content/rating/demos/02-states.tsx
```tsx
import { Rating } from "@qingye_lab/ui/components/rating";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  return <div className="flex flex-col gap-(--qy-space-3)">
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">{en ? "Read-only" : "只读"}</span><Rating readOnly value={4} /></div>
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">{en ? "Disabled" : "禁用"}</span><Rating disabled defaultValue={2} /></div>
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">max = 10</span><Rating max={10} defaultValue={7} /></div>
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">{en ? "No clearing" : "不可清除"}</span><Rating allowClear={false} defaultValue={3} /></div>
  </div>;
}
```
