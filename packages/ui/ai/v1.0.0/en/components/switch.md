# Switch

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/switch
Source: packages/ui/src/components/switch.tsx
Source SHA-256: 703471aef9cb0db0fcc831071e07e2039c5cc11e6b685d336bca4cc8e623ec62

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
- SwitchSize: type; owner switch; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Switch
Keep names stable and use aria-checked for on/off.
- checked / defaultChecked: boolean. Controlled setting or uncontrolled initial value.
- onCheckedChange: (checked, eventDetails) => void. An immediate setting change; the application owns requests and persistence.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Matching text line height determines track height; width is twice that height.
- disabled / readOnly: boolean; default false. Disabled excludes tabbing/submission; read-only retains focus/submission without changes.
- aria-invalid: boolean | 'true' | 'false'. Caller or Field declares invalid while retaining the actual on/off state.
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
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

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

### 尺寸
Source: apps/docs/src/content/switch/demos/02-sizes.tsx
```tsx
import { Field, FieldContent, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "尺寸", titleEn: "Sizes" };

export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Field key={size} orientation="horizontal">
          <Switch size={size} />
          <FieldContent><FieldLabel>{size}</FieldLabel></FieldContent>
        </Field>
      ))}
    </div>
  );
}
```
