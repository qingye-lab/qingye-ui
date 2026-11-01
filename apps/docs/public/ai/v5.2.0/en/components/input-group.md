# InputGroup

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/input-group
Source: packages/ui/src/components/input-group.tsx
Source SHA-256: 530458e9b34572eef1cbb53633a7868f51f2c3434c6e0af3830647c262013a2f

Give an input and its markers, units or actions one editing boundary.

## Decision
InputGroupInput uses Input's unstyled outlet. Static addons do not redirect focus; use InputGroupButton for actions: it shares the outer boundary, draws no frame of its own, and keeps its own name and state. Clearing and password visibility are not built into Input; they are composed here, which is how SearchInput and PasswordInput are built.

## Notes
- When several number members sit side by side (a range), each input has its own accessible name (aria-label) and the outer group supplies the collective name through aria-labelledby; the separator is an InputGroupText, plain text to assistive technology rather than a name.
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
- InputGroupNumberField: function; owner input-group; PASS; props: InputGroupNumberFieldProps
- InputGroupNumberFieldProps: type; owner input-group; PASS
- InputGroupProps: type; owner input-group; PASS
- InputGroupSelectTrigger: function; owner input-group; PASS; props: InputGroupSelectTriggerProps
- InputGroupSelectTriggerProps: type; owner input-group; PASS
- InputGroupText: function; owner input-group; PASS; props: useRender.ComponentProps<"span">
- InputGroupTextarea: function; owner input-group; PASS; props: InputGroupTextareaProps
- InputGroupTextareaProps: type; owner input-group; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### InputGroup
- `loading?`: `boolean`. 等待：边界末端出现忙碌标记，根上写 `aria-busy`，并向读屏播报「正在加载」。 与 Button、Select 的 `loading` 同名同义：只说明「这个控件在等」，不替换输入、不禁用输入。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### InputGroupAddon
- `align?`: `"inline-start" | "inline-end" | "block-start" | "block-end"`. 附件在边界里的位置。省略时按 DOM 顺序排布（既有行为）； `inline-start` / `inline-end` 固定在行首 / 行尾；`block-start` / `block-end` 独占一整行，在全部成员之上 / 之下。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### InputGroupButton
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### InputGroupInput
- `controlClassName?`: `string`. 编辑边界的样式入口；className / style / render 始终属于真实输入。
- `nativeInput?`: `boolean`. 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。
- plus 309 inherited (@types/react 303, @base-ui/react 6); not expanded, see the installed declarations

### InputGroupNumberField
- no props declared by this library
- plus 296 inherited (@types/react 273, @base-ui/react 23); not expanded, see the installed declarations

### InputGroupSelectTrigger
- no props declared by this library
- plus 289 inherited (@types/react 283, @base-ui/react 6); not expanded, see the installed declarations

### InputGroupText
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### InputGroupTextarea
- `controlClassName?`: `string`. 外层容器的样式入口；className / style / render 始终属于真实的 textarea。
- plus 296 inherited (@types/react 292, @base-ui/react 4); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### InputGroup
A shared editing boundary with no extra field role.
- loading: boolean; default false. The fact that content in the group is being fetched or validated: the same busy mark as Button appears at the inline end, the root is marked aria-busy, and the locale's loading text is announced through a polite live region. Inputs stay enabled; the component sends no request.
- render / ref / native props: useRender.ComponentProps<div>. Composition props for the common boundary.

### InputGroupTextarea / InputGroupNumberField / InputGroupSelectTrigger
Unstyled compositions of Textarea, NumberField and SelectTrigger: members keep their native semantics and geometry while the group draws the border and the focus, hover, invalid, disabled and read-only states.
- TextareaProps / NumberFieldProps / SelectTriggerProps (except unstyled): InputGroupTextareaProps / InputGroupNumberFieldProps / InputGroupSelectTriggerProps. Same as standalone use. A number member holds NumberFieldGroup unstyled; a select member's width follows its candidate names, pass className="flex-1" to fill the remaining width.

### InputGroupInput
Input's unstyled composition with the group's size.
- InputProps (except size / unstyled): InputGroupInputProps. Retains native input props, controlled values, nativeInput and the actual input ref.

### InputGroupAddon
A static span by default, with no tabIndex, focus redirection or automatic name.
- align: "inline-start" | "inline-end" | "block-start" | "block-end". Where the addon sits relative to the members. Omitted, it follows DOM order inline (unchanged); inline-* pins it to the line start/end; block-* takes a full row above/below the members with at least the inner height, for headers and footers of multiline members.
- render / ref / native props: useRender.ComponentProps<span>. A position for static content: units, prefixes, icons.

### InputGroupText
Static text inside an addon (unit, separator, count): carries text styling only and never takes focus.
- render / ref / native props: useRender.ComponentProps<span>. Carrier for the text.

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

### 附件的位置
Source: apps/docs/src/content/input-group/demos/04-align.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@qingye_lab/ui/components/input-group";
import { IconMail } from "@tabler/icons-react";
import { useState } from "react";

export const meta = { title: "附件的位置", titleEn: "Addon placement" };

export default function Demo() {
  const [note, setNote] = useState("");
  return (
    <div className="grid w-full max-w-md gap-(--qy-field-group-gap)">
      <Field>
        <FieldLabel>邮箱</FieldLabel>
        <InputGroup>
          <InputGroupInput type="email" />
          <InputGroupAddon align="inline-start"><IconMail aria-hidden="true" /></InputGroupAddon>
          <InputGroupAddon align="inline-end"><InputGroupText>@qingye.dev</InputGroupText></InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>备注</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="block-start"><InputGroupText>给审阅人的话</InputGroupText></InputGroupAddon>
          <InputGroupTextarea rows={3} value={note} maxLength={200} onChange={event => setNote(event.target.value)} />
          <InputGroupAddon align="block-end"><InputGroupText>{note.length} / 200</InputGroupText></InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
```

### 选择与数值成员
Source: apps/docs/src/content/input-group/demos/05-members.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupNumberField, InputGroupSelectTrigger, InputGroupText } from "@qingye_lab/ui/components/input-group";
import { NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { Select, SelectItem, SelectPopup } from "@qingye_lab/ui/components/select";

export const meta = { title: "选择与数值成员", titleEn: "Select and number members" };

const currencies = [{ value: "cny", label: "人民币" }, { value: "usd", label: "美元" }, { value: "eur", label: "欧元" }];

export default function Demo() {
  return (
    <div className="grid w-full max-w-md gap-(--qy-field-group-gap)">
      <Field name="amount">
        <FieldLabel>金额</FieldLabel>
        <InputGroup>
          <Select name="currency" items={currencies} defaultValue="cny">
            <InputGroupSelectTrigger aria-label="币种" />
            <SelectPopup>{currencies.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
          </Select>
          <InputGroupInput inputMode="decimal" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>数量</FieldLabel>
        <InputGroup>
          <InputGroupNumberField name="quantity" defaultValue={2} min={0} max={99}>
            <NumberFieldGroup unstyled><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
          </InputGroupNumberField>
          <InputGroupAddon><InputGroupText>件</InputGroupText></InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
```

### 等待
Source: apps/docs/src/content/input-group/demos/06-loading.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { useEffect, useState } from "react";

export const meta = { title: "等待", titleEn: "Waiting" };

export default function Demo() {
  const [query, setQuery] = useState("青叶");
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    if (!searching) return;
    const timer = window.setTimeout(() => setSearching(false), 1600);
    return () => window.clearTimeout(timer);
  }, [searching]);
  return (
    <div className="flex w-full max-w-md items-end gap-(--qy-space-3)">
      <Field className="flex-1">
        <FieldLabel>项目</FieldLabel>
        <InputGroup loading={searching}>
          <InputGroupInput value={query} onChange={event => setQuery(event.target.value)} />
        </InputGroup>
      </Field>
      <Button variant="bordered" onClick={() => setSearching(true)} disabled={searching}>查找</Button>
    </div>
  );
}
```

### 数值区间
Source: apps/docs/src/content/input-group/demos/07-range.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupNumberField, InputGroupText } from "@qingye_lab/ui/components/input-group";
import { NumberFieldGroup, NumberFieldInput } from "@qingye_lab/ui/components/number-field";

export const meta = { title: "数值区间", titleEn: "Number range" };

export default function Demo() {
  return (
    <Field className="w-full max-w-sm" name="price" role="group" aria-labelledby="price-range-label">
      <FieldLabel id="price-range-label" nativeLabel={false} render={<span />}>价格</FieldLabel>
      <InputGroup>
        <InputGroupNumberField name="priceMin" defaultValue={100} min={0}>
          <NumberFieldGroup unstyled><NumberFieldInput aria-label="最低价" /></NumberFieldGroup>
        </InputGroupNumberField>
        <InputGroupAddon><InputGroupText>至</InputGroupText></InputGroupAddon>
        <InputGroupNumberField name="priceMax" defaultValue={500} min={0}>
          <NumberFieldGroup unstyled><NumberFieldInput aria-label="最高价" /></NumberFieldGroup>
        </InputGroupNumberField>
      </InputGroup>
    </Field>
  );
}
```
