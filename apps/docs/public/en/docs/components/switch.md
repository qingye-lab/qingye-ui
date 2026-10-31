# Switch

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/switch
Source: packages/ui/src/components/switch.tsx
Source SHA-256: 9ae3686501e427f7139eb3d69d59eb31a0e6715add243ff1334b0fdfc6412e6a

Immediately change the on/off state of a current setting.

## Decision
Use Switch only when the current setting changes immediately. Consent, pending selections, and irreversible commands use Checkbox or explicit actions and outcome feedback.

## Notes
- Names stay stable across on/off states.
- No partial selection; use Checkbox for multiple or pending selections.
- Applications own asynchronous save waiting, unknown, and failure; thumb animation cannot establish request success.

## Use and ownership
- Binary settings taking effect immediately.
- Avoid: Use Checkbox for pending selections.
- Avoid: Use Button for irreversible commands.
- Avoid: Verify unknown results first.
- Library: Focus, keyboard, and uncontrolled checked state.
- Application: Current settings, request/save outcomes, and invalid facts.

## Composition
- Field + FieldLabel + Switch + FieldDescription / FieldError

## Responsive behavior
- Narrow heights retain +4px and density never shrinks hit areas; this batch checked desktop only.

## Customization
- Theme fills/foregrounds, matching text line heights, and focus widths.

## Current exports
- Switch: function; owner switch; PASS; props: SwitchProps
- SwitchPrimitive: reexport; owner switch; UNVERIFIED
- SwitchProps: type; owner switch; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Switch
- `pending?`: `boolean`. 立即生效的设置已发出请求、结果未到。事实由调用方持有；开关只表示「尚未确认」并挡住再次切换，不启动请求、不推断结果。 抓手停在调用方给的 `checked`（通常是请求的目标值），抓手内出现与 Button loading 同一种等待记号。
- plus 289 inherited (@types/react 273, @base-ui/react 16); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Switch
Keep names stable and use aria-checked for on/off.
- checked / defaultChecked: boolean. Controlled setting or uncontrolled initial value.
- onCheckedChange: (checked, eventDetails) => void. An immediate setting change; the application owns requests and persistence.
- disabled / readOnly: boolean; default false. Disabled excludes tabbing/submission; read-only retains focus/submission without changes.
- pending: boolean; default false. A request is out and the result has not arrived: no further toggling (readOnly), aria-busy, data-pending; the thumb stays at checked and carries the same waiting mark as Button loading.
- aria-invalid: boolean | 'true' | 'false'. Caller or Field declares invalid while retaining the actual on/off state. When on, the track fill becomes the danger fill; when off, the track outline turns danger.
- name / value / uncheckedValue / form: string. Primitive hidden input submission; this does not require waiting for form submission before taking effect.
- render / ref / inputRef / className / style: Base UI composition. Root and hidden input composition; set nativeButton when rendering a button.

### SwitchPrimitive
The complete Base UI Switch namespace, including Root and Thumb.

## Keyboard
- Tab / Shift+Tab: Enter or leave the switch.
- Space: Change the current setting immediately.

## Source examples
### 状态
Source: apps/docs/src/content/switch/demos/01-states.tsx
```tsx
import { useState } from "react";
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Switch } from "@qingye_lab/ui/components/switch";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field orientation="horizontal">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <FieldContent><FieldLabel>显示网格</FieldLabel><span className="text-support">{checked ? "开启" : "关闭"}</span></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch defaultChecked />
        <FieldContent><FieldLabel>显示标尺</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch disabled />
        <FieldContent><FieldLabel>禁用（关）</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch disabled defaultChecked />
        <FieldContent><FieldLabel>禁用（开）</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch readOnly defaultChecked />
        <FieldContent><FieldLabel>只读</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal" invalid>
        <Switch />
        <FieldContent><FieldLabel>无效</FieldLabel><FieldError>请检查此项。</FieldError></FieldContent>
      </Field>
    </div>
  );
}
```

### 跟随标签
Source: apps/docs/src/content/switch/demos/02-labels.tsx
```tsx
import { useId } from "react";
import { Field, FieldContent, FieldLabel } from "@qingye_lab/ui/components/field";
import { Switch } from "@qingye_lab/ui/components/switch";

export const meta = { title: "跟随标签", titleEn: "Follows its label" };

// 开关的轨道高度跟随相邻标签的文字档；密度与容器高度都不改它。
export default function Demo() {
  // 第三行的文字不是 FieldLabel，仍须给开关一个名称：用 aria-labelledby 指向这行字本身。
  const id = useId();
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field orientation="horizontal"><Switch defaultChecked /><FieldContent><FieldLabel>显示网格</FieldLabel></FieldContent></Field>
      <Field orientation="horizontal"><Switch defaultChecked /><FieldContent><FieldLabel className="text-support">跟随紧凑标签</FieldLabel></FieldContent></Field>
      <Field orientation="horizontal"><Switch defaultChecked aria-labelledby={`${id}-reading`} /><FieldContent><span id={`${id}-reading`} className="text-reading">说明性文字，轨道与它同高</span></FieldContent></Field>
    </div>
  );
}
```

### 等待确认
Source: apps/docs/src/content/switch/demos/03-pending.tsx
```tsx
import { Field, FieldContent, FieldLabel } from "@qingye_lab/ui/components/field";
import { Switch } from "@qingye_lab/ui/components/switch";

export const meta = { title: "等待确认", titleEn: "Pending" };

// 抓手停在请求的目标值；结果由应用持有，到达后再去掉 pending。
export default function Demo() {
  return <Field orientation="horizontal"><Switch checked pending /><FieldContent><FieldLabel>自动同步</FieldLabel></FieldContent></Field>;
}
```
