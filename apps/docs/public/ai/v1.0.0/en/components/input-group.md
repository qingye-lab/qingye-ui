# InputGroup

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/input-group
Source: packages/ui/src/components/input-group.tsx
Source SHA-256: b51acf251a0804792370d6cad9330c80faa37a60a64d93842eab229e62334551

Give an input and its markers, units or actions one editing boundary.

## Decision
InputGroupInput uses Input's unstyled outlet. Static addons do not redirect focus; compose Button for actions and keep their own names and states.

## Notes
- Use InputGroupInput nativeInput when FieldControl registers the composition, avoiding duplicate registration.
- Disabling the input does not disable arbitrary addon actions; the application declares each action's real state.

## Use and ownership
- An input shares one editing scope with units, markers, or adjunct actions.
- Avoid: Unrelated actions attached to an input; naming the input through an adjunct or placeholder alone.
- Library: Shared boundary, geometry wiring, and Input's native interaction.
- Application: Input values, adjunct actions, names, and validation facts.

## Composition
- FieldLabel names the input; aria-describedby explicitly associates necessary adjunct explanations. Existing search/password forms use Input directly.

## Responsive behavior
- Input takes remaining width; boundary and inner Input share one geometry following the density axis, while coarse-pointer targets remain separate.

## Customization
- Root styles own the shared boundary. Input className/style/render/refs own the actual input; adjuncts have independent render.

## Current exports
- InputGroup: function; owner input-group; PASS; props: InputGroupProps
- InputGroupAddon: function; owner input-group; PASS; props: InputGroupAddonProps
- InputGroupAddonProps: type; owner input-group; PASS
- InputGroupInput: function; owner input-group; PASS; props: InputGroupInputProps
- InputGroupInputProps: type; owner input-group; PASS
- InputGroupProps: type; owner input-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### InputGroup
A shared editing boundary with no extra field role.
- render / ref / native props: useRender.ComponentProps<div>. Composition props for the common boundary.

### InputGroupInput
Input's unstyled composition with the group's size.
- InputProps (except size / unstyled): InputGroupInputProps. Retains native input props, controlled values, search/password, nativeInput and the actual input ref.

### InputGroupAddon
A static span by default, with no tabIndex, focus redirection or automatic name.
- render / ref / native props: useRender.ComponentProps<span>. A position for units, markers or an explicit Button.

## Keyboard

## Source examples
### 单位与动作
Source: apps/docs/src/content/input-group/demos/01-addon.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye_lab/ui/components/input-group";

export const meta = { title: "单位与动作", titleEn: "Unit and action" };
export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput inputMode="decimal" /><InputGroupAddon>px</InputGroupAddon><InputGroupAddon className="p-0"><Button variant="quiet" className="min-h-0 self-stretch sm:min-h-0">应用</Button></InputGroupAddon></InputGroup></Field>;
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
