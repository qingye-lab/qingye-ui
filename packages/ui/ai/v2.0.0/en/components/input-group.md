# InputGroup

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/input-group
Source: packages/ui/src/components/input-group.tsx
Source SHA-256: 3fdb8d45af25f9092b797792b1bd1130460c3bf2c9b7dab34f3ad2b74ebccd0d

Give an input and its markers, units or actions one editing boundary.

## Decision
InputGroupInput uses Input's unstyled outlet. Static addons do not redirect focus; use InputGroupButton for actions: it shares the outer boundary, draws no frame of its own, and keeps its own name and state. Clearing and password visibility are not built into Input; they are composed here, which is how SearchInput and PasswordInput are built.

## Notes
- Use InputGroupInput nativeInput when FieldControl registers the composition, avoiding duplicate registration.
- Disabling the input does not disable arbitrary addon actions; the application declares each action's real state.

## Use and ownership
- An input shares one editing scope with units, markers, or adjunct actions.
- Avoid: Unrelated actions attached to an input; naming the input through an adjunct or placeholder alone.
- Library: Shared boundary, geometry wiring, and Input's native interaction.
- Application: Input values, adjunct actions, names, and validation facts.

## Composition
- FieldLabel names the input; aria-describedby explicitly associates necessary adjunct explanations. SearchInput and PasswordInput are ready-made compositions for search and passwords.

## Responsive behavior
- Input takes remaining width; boundary and inner Input share one geometry following the density axis, while coarse-pointer targets remain separate.

## Customization
- Root styles own the shared boundary. Input className/style/render/refs own the actual input; adjuncts have independent render.

## Current exports
- InputGroup: function; owner input-group; PASS; props: InputGroupProps
- InputGroupAddon: function; owner input-group; PASS; props: InputGroupAddonProps
- InputGroupAddonProps: type; owner input-group; PASS
- InputGroupButton: function; owner input-group; PASS; props: InputGroupButtonProps
- InputGroupButtonProps: type; owner input-group; PASS
- InputGroupInput: function; owner input-group; PASS; props: InputGroupInputProps
- InputGroupInputProps: type; owner input-group; PASS
- InputGroupProps: type; owner input-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### InputGroup
A shared editing boundary with no extra field role.
- render / ref / native props: useRender.ComponentProps<div>. Composition props for the common boundary.

### InputGroupInput
Input's unstyled composition with the group's size.
- InputProps (except size / unstyled): InputGroupInputProps. Retains native input props, controlled values, nativeInput and the actual input ref.

### InputGroupAddon
A static span by default, with no tabIndex, focus redirection or automatic name.
- render / ref / native props: useRender.ComponentProps<span>. A position for static content: units, prefixes, icons.

### InputGroupButton
An action inside the editing boundary: no frame of its own, filling the inner height; the icon shape is an inner-height square.
- shape: "label" | "icon"; default "label". The icon shape requires aria-label.
- variant: ButtonProps["variant"]; default "quiet". Frameless inside the boundary by default.
- Other ButtonProps: ButtonProps. loading, disabled, onClick, render and the rest behave as on Button.

## Keyboard

## Source examples
### 单位与动作
Source: apps/docs/src/content/input-group/demos/01-addon.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@qingye_lab/ui/components/input-group";

export const meta = { title: "单位与动作", titleEn: "Unit and action" };
export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput inputMode="decimal" /><InputGroupAddon>px</InputGroupAddon><InputGroupButton>应用</InputGroupButton></InputGroup></Field>;
}
```

### 状态
Source: apps/docs/src/content/input-group/demos/02-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "状态", titleEn: "States" };
export default function Demo() {
  return <Stack gap="fields" className="w-full max-w-sm"><Field disabled><FieldLabel>禁用</FieldLabel><InputGroup><InputGroupInput /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field><FieldLabel>只读</FieldLabel><InputGroup><InputGroupInput readOnly defaultValue="0" /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field invalid><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput /><InputGroupAddon>px</InputGroupAddon></InputGroup><FieldError>请输入数值</FieldError></Field></Stack>;
}
```

### 可清空的输入
Source: apps/docs/src/content/input-group/demos/03-clear.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupButton, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

export const meta = { title: "可清空的输入", titleEn: "A clearable input" };

export default function Demo() {
  const [value, setValue] = useState("季度复盘");
  const input = useRef<HTMLInputElement>(null);
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>标题</FieldLabel>
      <InputGroup>
        <InputGroupInput ref={input} value={value} onChange={event => setValue(event.target.value)} />
        {value !== "" && <InputGroupButton shape="icon" aria-label="清空标题" onClick={() => { setValue(""); input.current?.focus(); }}><IconX aria-hidden="true" /></InputGroupButton>}
      </InputGroup>
    </Field>
  );
}
```
