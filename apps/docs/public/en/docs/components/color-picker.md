# ColorPicker

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/color-picker
Source: packages/ui/src/components/color-picker.tsx
Source SHA-256: c4204c351dca1bbf44ddcae8f1a5ef2b448a880c4b57f8782c8c1cc61dd9910b

Choose a colour that belongs to the user's data, such as a label colour or a theme setting, and get a #rrggbb string.

## Decision
It only produces user data and never changes the library theme: a swatch shows exactly that data, and every other colour still comes from semantic tokens. The value is #rrggbb only, with no transparency; storing it is the application's job.

## Notes
- Selection is shown by a check, not by colour; the check is the black or white with more contrast against that swatch.
- A swatch has a rim with the same role as an input border, so white or ground-coloured swatches keep a clear edge in light and dark themes.
- The saturation and brightness area exposes two named hidden range inputs; aria-valuetext reads the channel and the current hex.
- No transparency: the value is #rrggbb only.

## Use and ownership
- A label, category or theme setting needs a user-specified colour.
- Use ColorSwatchPicker for a small fixed set and ColorPicker for any value.
- Avoid: Do not use it to change the library's own theme; tokens decide that.
- Avoid: Cases that need transparency (out of scope).
- Avoid: Use a plain element when only displaying a colour.
- Library: The area, hue, hex draft and validation message, focus and keyboard.
- Application: Controlled value, preset list, saving and its outcome.

## Composition
- Field + FieldLabel names the trigger or swatch group; name submits #rrggbb in a Form; save in onValueCommit.

## Responsive behavior
- Reads the existing fill-control and marker size roles; this batch checked desktop only.

## Customization
- Swatch edge follows the fill-control height (density axis); colour data enters styles through CSS variables.

## Current exports
- ColorPicker: function; owner color-picker; PASS; props: ColorPickerProps
- ColorPickerProps: type; owner color-picker; PASS
- ColorSwatch: type; owner color-picker; PASS
- ColorSwatchPicker: function; owner color-picker; PASS; props: ColorSwatchPickerProps
- ColorSwatchPickerProps: type; owner color-picker; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ColorPicker
- `defaultValue?`: `string | undefined`. 非受控初值，原生表单 reset 回到它。省略时为 "#000000"。
- `form?`: `string | undefined`.
- `name?`: `string | undefined`.
- `onValueChange?`: `((value: string) => void) | undefined`. 每次变化都调用（拖动中也调用）。
- `onValueCommit?`: `((value: string) => void) | undefined`. 一次操作结束才调用：拖动松手、键盘离键、色值输入确认、选预设。供保存之类不宜逐帧触发的事使用。
- `swatches?`: `readonly ColorSwatch[] | undefined`. 预设色行，复用 ColorSwatchPicker。
- `value?`: `string | undefined`. "#rrggbb"。传了这个属性即受控；输出一律小写。
- plus 283 inherited (@types/react 283); not expanded, see the installed declarations

### ColorSwatchPicker
- `defaultValue?`: `string | undefined`.
- `onValueChange?`: `(value: string, details: Parameters<NonNullable<RadioGroupProps<string | null>["onValueChange"]>>[1]) => void`.
- `swatches`: `readonly ColorSwatch[]`.
- `value?`: `string | undefined`. 当前颜色。不在 swatches 里（例如自由取色得到的值）时，没有色块被选中。传了这个属性即受控。
- plus 283 inherited (@types/react 274, @base-ui/react 9); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ColorSwatchPicker
Choose one colour from presets. It is a radio group and every swatch is a named radio.
- swatches: { value: string; label: string }[]. Preset colours. value is #rrggbb and label is its name; a missing name, a malformed value or a duplicate throws.
- value / defaultValue / onValueChange: string / string / (value, eventDetails) => void. The current colour. A value outside swatches selects nothing. Output is always lowercase.
- aria-label / aria-labelledby: string. The group name. May be omitted inside a Field with a FieldLabel; otherwise a missing name throws.
- name / disabled / readOnly / required / form: RadioGroup props. Same as RadioGroup; nothing is submitted while no swatch is selected.

### ColorPicker
Free choice: a button shows the current colour and its hex; it opens a saturation and brightness area, a hue slider, a hex input and an optional preset row.
- value / defaultValue / onValueChange: string / string / (value: string) => void. #rrggbb. Passing value makes it controlled; defaultValue defaults to #000000; a malformed value throws. onValueChange fires on every change, including during a drag.
- onValueCommit: (value: string) => void. Called when an interaction ends: pointer release, key release, a confirmed hex, a chosen preset. Save here rather than in onValueChange.
- swatches: { value: string; label: string }[]. A preset row using ColorSwatchPicker, with the same rules.
- name / form / disabled: string / string / boolean. With name, #rrggbb is submitted with the form. When disabled it is neither submitted nor openable.
- aria-label / aria-labelledby: string. The trigger name. Inside a Field it comes from the FieldLabel; otherwise a missing name throws.
- className / style / 其余 button 属性: ComponentProps<"button">. Passed to the trigger button.

## Keyboard
- ← / → (area): Saturation −1 / +1; Shift uses 10. Home / End go to saturation 0 / 100.
- ↑ / ↓ (area): Brightness +1 / −1; Shift uses 10. PageUp / PageDown change brightness by 10.
- ← / → / Shift + arrow (hue): Hue ±1°; Shift or PageUp / PageDown uses 10°.
- Enter / blur (hex input): Validate and normalise to #rrggbb. An invalid entry stays in the field with a format message.
- Arrows (presets): Move to and select a swatch; the group takes one tab stop.

## Source examples
### 预设色
Source: apps/docs/src/content/color-picker/demos/01-swatches.tsx
```tsx
import { ColorSwatchPicker } from "@qingye_lab/ui/components/color-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "预设色", titleEn: "Presets" };

export default function Demo() {
  const en = useUILocale().code.startsWith("en");
  return <Field>
    <FieldLabel>{en ? "Label color" : "标签颜色"}</FieldLabel>
    <ColorSwatchPicker
      defaultValue="#007fff"
      swatches={[
        { value: "#e34234", label: en ? "Vermilion" : "朱红" },
        { value: "#ffbf00", label: en ? "Amber" : "琥珀" },
        { value: "#01796f", label: en ? "Pine" : "松绿" },
        { value: "#007fff", label: en ? "Azure" : "天蓝" },
        { value: "#4b0082", label: en ? "Indigo" : "靛蓝" },
        { value: "#8f00ff", label: en ? "Violet" : "紫" },
        { value: "#ffffff", label: en ? "White" : "白" },
        { value: "#1c1c1c", label: en ? "Ink" : "墨" },
      ]}
    />
  </Field>;
}
```

### 自由取色
Source: apps/docs/src/content/color-picker/demos/02-picker.tsx
```tsx
import { useState } from "react";
import { ColorPicker } from "@qingye_lab/ui/components/color-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "自由取色", titleEn: "Free choice" };

export default function Demo() {
  const en = useUILocale().code.startsWith("en");
  const [saved, setSaved] = useState("#007fff");
  return <Field>
    <FieldLabel>{en ? "Theme color" : "主题色"}</FieldLabel>
    <ColorPicker
      className="self-start" defaultValue={saved} onValueCommit={setSaved}
      swatches={[
        { value: "#e34234", label: en ? "Vermilion" : "朱红" },
        { value: "#ffbf00", label: en ? "Amber" : "琥珀" },
        { value: "#01796f", label: en ? "Pine" : "松绿" },
        { value: "#007fff", label: en ? "Azure" : "天蓝" },
        { value: "#4b0082", label: en ? "Indigo" : "靛蓝" },
        { value: "#8f00ff", label: en ? "Violet" : "紫" },
      ]}
    />
  </Field>;
}
```
