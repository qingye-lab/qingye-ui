# Rating

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/rating
Source: packages/ui/src/components/rating.tsx
Source SHA-256: 280d62c431743cb0d2a9bee2a1f0a6897335c9a8fbb35d01d976fee4a78c1ebd

Give an integer score from 1 to max, shown as a row of stars.

## Decision
Rating is a radio group, not a slider: the score is one of a finite set of mutually exclusive integers, and arrow keys choose as they move. Half stars are not offered: raise max for a finer scale instead of introducing fractions. Read-only does not keep radio semantics, since a row of inert radios is noise to a screen reader; it is a conclusion, so it reads as an image carrying the score.

## Notes
- Stars are named "n stars" and the group "Rating", so assistive technology reads "Rating, 3 stars, checked" without relying on colour.
- Hover previews a score for display only; the value does not change before the click.
- Filled and empty stars differ in shape and occupy the same space, so state changes never change the component's outline.

## Use and ownership
- Let a person give a score on a finite scale.
- Show an existing rating (read-only).
- Avoid: Use Slider for continuous values.
- Avoid: Use RadioGroup for two or three mutually exclusive text options.
- Avoid: Use Switch or Checkbox for yes / no.
- Library: Uncontrolled score, hover preview and focus.
- Application: The controlled score, what the rating means and its submission, invalid.

## Composition
- FieldLabel + Rating + FieldDescription + FieldError; the read-only display can sit inline.

## Responsive behavior
- Star size reads the fill-control icon step and follows density; coarse pointers get the touch target; this batch checked desktop only.

## Customization
- className; max; allowClear.

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
Rating with radio-group semantics: each star is a radio and choosing the nth means score n. Read-only, it is an image plus "n / max".
- value / defaultValue: number; default 0. The score: an integer where 0 means unrated, within 0..max; out of range or non-integers throw a RangeError.
- onValueChange: (value: number) => void. Called when the score changes; 0 on clearing.
- max: number; default 5. The highest score and the number of stars; a positive integer.
- allowClear: boolean; default true. Choosing the current score again clears it. Off, a score can be changed but not withdrawn.
- readOnly: boolean; default false. No longer a control: rendered as role="img" (named "Rating 4 of 5") plus the visible "4 / 5".
- disabled: boolean; default false. Inert; not submitted.
- name: string. Native form field name; submits the chosen score and nothing when unrated.
- aria-label / aria-labelledby: string. The group's name, "Rating" by default; in a Field with a FieldLabel the label names it.

## Keyboard
- Tab / Shift+Tab: Enter or leave the whole group; it is one tab stop (the chosen star, or the first when unrated).
- → / ↓ / ← / ↑: Move to the neighbouring star and choose it. Left and right swap in RTL.
- Space: Choose the focused star; clear it when it is the current score and allowClear is on.

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
