# 颜色选择 ColorPicker

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/color-picker
Source: packages/ui/src/components/color-picker.tsx
Source SHA-256: c4204c351dca1bbf44ddcae8f1a5ef2b448a880c4b57f8782c8c1cc61dd9910b

选取用户数据里的颜色：标签颜色、主题配置取值，得到一个 #rrggbb。

## Decision
它只产出用户数据，不改库的主题：色块显示的就是那份数据，别处的颜色仍来自语义 token。值只有 #rrggbb，不含透明度；把它存下来的是应用。

## Notes
- 选中靠勾，不靠颜色；勾色取压在该色块上对比更高的黑或白。
- 色块外缘有一条与输入框同角色的边线，白色或近底色的色块在浅深主题里都有清楚的边界。
- 饱和度/明度面由两个隐藏的 range 承担无障碍，各有名称，aria-valuetext 读出通道与当前 hex。
- 不含透明度：值只有 #rrggbb。

## Use and ownership
- 标签、分类、主题配置里需要用户指定一个颜色
- 候选少且固定时用 ColorSwatchPicker，需要任意取值时用 ColorPicker
- Avoid: 库自身的主题色不要用它改，主题由 token 决定
- Avoid: 需要透明度的场景（不在范围内）
- Avoid: 只是展示颜色时用普通元素，不用单选组
- Library: 取色面、色相、hex 草稿与校验提示、焦点与键盘
- Application: 受控值、预设列表、保存与结果

## Composition
- Field + FieldLabel 命名触发器或色块组；放在 Form 里用 name 提交 #rrggbb；onValueCommit 里保存

## Responsive behavior
- 读填值控件与标记的既有尺寸角色；本批只做桌面检查

## Customization
- 色块边长跟随填值控件高度（密度轴）；颜色数据经 CSS 变量进入样式

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
从预设里选一个颜色，是一个单选组；每个色块是名称明确的单选项。
- swatches: { value: string; label: string }[]. 预设色。value 是 #rrggbb，label 是名称（如「靛蓝」）；缺名称、值格式不对或值重复都会抛错。
- value / defaultValue / onValueChange: string / string / (value, eventDetails) => void. 当前颜色。值不在 swatches 里（例如来自自由取色）时没有色块被选中；输出一律小写。
- aria-label / aria-labelledby: string. 组的名称；放在带 FieldLabel 的 Field 内时可省略，否则缺名称抛错。
- name / disabled / readOnly / required / form: RadioGroup props. 与 RadioGroup 相同，未选择时不提交该字段。

### ColorPicker
自由取色：按钮显示当前颜色与 hex，点开是饱和度与明度面、色相条、hex 输入和可选的预设行。
- value / defaultValue / onValueChange: string / string / (value: string) => void. #rrggbb。传了 value 即受控；defaultValue 省略时为 #000000；格式不对抛错。onValueChange 在拖动中也每次变化都调用。
- onValueCommit: (value: string) => void. 一次操作结束才调用：松开指针、键盘离键、确认 hex、选预设。保存放这里，不放 onValueChange。
- swatches: { value: string; label: string }[]. 预设行，复用 ColorSwatchPicker，规则相同。
- name / form / disabled: string / string / boolean. name 存在时随表单提交 #rrggbb；disabled 时不提交、不可打开。
- aria-label / aria-labelledby: string. 触发器的名称。放在带 FieldLabel 的 Field 内时来自标签，否则缺名称抛错。
- className / style / 其余 button 属性: ComponentProps<"button">. 交给触发按钮。

## Keyboard
- ← / →（面）: 饱和度 −1 / +1；Shift 为 10。Home / End 到饱和度 0 / 100。
- ↑ / ↓（面）: 明度 +1 / −1；Shift 为 10。PageUp / PageDown 明度 ±10。
- ← / → / Shift + 方向键（色相条）: 色相 ±1°；Shift 或 PageUp / PageDown 为 10°。
- Enter / 失焦（hex 输入）: 校验并整理成 #rrggbb；不合法时文字保留并提示格式。
- ← / → / ↑ / ↓（预设）: 移动并选中色块，整组只占一个 Tab 停靠点。

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
