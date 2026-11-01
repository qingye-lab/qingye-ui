# Field

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/field
Source: packages/ui/src/components/field.tsx
Source SHA-256: 480ba69e05c63a550feab21b961e9593ff298bb612405f18de0a84d4f5724b65

Connect one value's name, control, description, and caller-supplied errors.

## Decision
Supply invalid and error content separately. Field connects names and errors without validating or inferring submission results.

## Notes
- Field excludes validate, validationMode, validationDebounceTime, and actionsRef. Pass results from application validation; use the full FieldPrimitive composition for primitive-managed validation.
- FieldError renders nothing without supplied content. Standalone content does not associate with another control.
- Unregistered self-named controls need explicit aria-labelledby and aria-describedby. FieldTitle does not supply those connections.
- Import Fieldset / FieldsetLegend from components/fieldset. FieldSet / FieldLegend aliases have been removed.
- Styles consume field-gap, field-group-gap, and text profiles. Their numerical values are centralized presets.
- A Field builds one labelable scope: every control in it receives the same id and the same label. Radio and SegmentedControlItem open their own scope inside a Field, so they need no FieldItem; an item already wrapped in FieldItem is not wrapped again, so the FieldLabel beside it still works. Compositions that use FieldPrimitive.Item directly are not detected; do not nest another scope.

## Use and ownership
- A value needs a persistent name, necessary explanation, or in-place error.
- Avoid: Placeholders instead of names, Toast instead of field errors, or timeouts presented as format errors.
- Library: Accessible name/description/error associations; focus, touched state, and disabled propagation.
- Application: Values, rules, invalid facts, error content, drafts, and delivery outcomes.

## Composition
- Input registers automatically; FieldControl registers native controls. Fieldset names a shared scope; FieldGroup organizes spacing only.

## Responsive behavior
- Long names/descriptions wrap, horizontal content columns shrink, and field roles determine spacing.

## Customization
- External classes merge last; native props, state styling callbacks, refs, and render forward. FieldTitle does not register as a label.

## Current exports
- Field: function; owner field; PASS; props: FieldProps
- FieldContent: function; owner field; PASS; props: useRender.ComponentProps<"div">
- FieldControl: const; owner field; PASS
- FieldDescription: function; owner field; PASS; props: React.ComponentProps<typeof FieldPrimitive.Description>
- FieldError: function; owner field; PASS; props: FieldErrorProps
- FieldErrorProps: type; owner field; PASS
- FieldGroup: function; owner field; PASS; props: useRender.ComponentProps<"div">
- FieldItem: function; owner field; PASS; props: React.ComponentProps<typeof FieldPrimitive.Item>
- FieldLabel: function; owner field; PASS; props: FieldLabelProps
- FieldLabelProps: type; owner field; PASS
- FieldOrientation: type; owner field; PASS
- FieldPrimitive: reexport; owner field; UNVERIFIED
- FieldProps: type; owner field; PASS
- FieldSeparator: function; owner field; PASS; props: useRender.ComponentProps<"div"> & Pick<SeparatorProps, "decorative">
- FieldTitle: function; owner field; PASS; props: useRender.ComponentProps<"div">
- FieldValidity: const; owner field; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Field
- `orientation?`: `"horizontal" | "vertical"`.
- `validating?`: `boolean`. 应用持有的异步校验正在进行。为 true 时：根部 `data-validating` 与 `aria-busy`，错误位置显示「正在校验」， 本字段内的 FieldError 不显示、控件不标无效——校验进行中，上一次的结果已不可信。结束与结论仍由应用传入（invalid、错误内容）。
- plus 283 inherited (@types/react 275, @base-ui/react 8); not expanded, see the installed declarations

### FieldContent
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### FieldControl
- no props declared by this library
- plus 310 inherited (@types/react 305, @base-ui/react 5); not expanded, see the installed declarations

### FieldDescription
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### FieldError
- `errors?`: `ReadonlyArray<{ message?: string | undefined } | undefined>`.
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### FieldGroup
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### FieldItem
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### FieldLabel
- `requirement?`: `"required" | "optional"`. 必填 / 选填标记。`"required"` 只画 `*`（aria-hidden）；必填语义由控件自己的 `required` 向读屏表达， 所以调用方必须同时给控件 `required`，否则标记只是视觉。`"optional"` 的「选填」是可见文字，计入可访问名称。
- plus 281 inherited (@types/react 277, @base-ui/react 4); not expanded, see the installed declarations

### FieldSeparator
- `decorative?`: `boolean`. 已有文字/结构表达分界时，线条仅作装饰。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### FieldTitle
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### FieldValidity
- no props declared by this library
- plus 1 inherited (@base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FieldValidating: without a provider default-value; provided by Field
- Context InField: without a provider default-value; provided by Field
- Context InFieldItem: without a provider default-value; provided by Field, FieldItem, OptionScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Field
Shared Base UI Field.Root context. Full automatic-validation APIs remain on FieldPrimitive.
- orientation: "vertical" | "horizontal"; default "vertical". Vertical editing or a horizontal option; associations stay intact.
- invalid: boolean; default false. Declared by the caller. Native constraints, blur, and error content do not infer it.
- validating: boolean; default false. An application-owned async validation is running: root data-validating and aria-busy, a validating status in the error position, FieldError in this field is hidden, and the control is not marked invalid (invalid is held until it ends).
- disabled: boolean; default false. Disables registered controls; disabled values are omitted from native submission.
- name / dirty / touched: Base UI Field.Root props. Field name and caller-managed editing facts.
- className / style / render / ref: Base UI Field.Root props. Applied to the field root; styles support state functions.

### FieldLabel
Requires a Field or FieldPrimitive.Root context and names a registered control; supports explicit htmlFor and primitive nativeLabel/render. For a standalone label, use Label from components/label.
- requirement: "required" | "optional". required adds an aria-hidden * after the name and the caller must also set required on the control; optional shows a visible optional note that is part of the accessible name.

### FieldDescription
Requires a Field or FieldPrimitive.Root context to register supporting facts in aria-describedby. For standalone help, give native text an id and reference it explicitly from the control.

### FieldError
Shows caller-supplied errors and registers in aria-describedby when visible.
- children: ReactNode. Explicit content takes precedence; no content means no browser or Form error is generated.
- errors: ReadonlyArray<{ message?: string } | undefined>. Skips empty entries, deduplicates, and lists multiple messages.
- match: boolean | keyof ValidityState; default true. Primitive filtering interface; false hides the message. The caller supplies content and invalid separately.

### FieldTitle
A plain fact heading for self-named controls or facts without input; it is not a label.

### FieldContent
The name and description column of a horizontal field.

### FieldGroup
Spacing between fields, without group semantics.

### FieldSeparator
A boundary between field groups; flanking lines are decorative when text is supplied.

### FieldItem
Scopes a particular control and label within one Field. A Field carries one control; give each additional control (for example an exact-entry NumberField beside a Slider) its own FieldItem.

### FieldControl / FieldValidity / FieldPrimitive
Direct primitive outlets for registration, state reading, and the full API.

## Keyboard
- Tab / Shift+Tab: Follow document order; activating an associated label focuses or toggles the control.

## Source examples
### 标签与说明
Source: apps/docs/src/content/field/demos/01-default.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "标签与说明", titleEn: "Label and description" };

export default function Demo() {
  return <Field className="w-full max-w-xs"><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" maxLength={20} /><FieldDescription>最多 20 个字。</FieldDescription></Field>;
}
```

### 校验
Source: apps/docs/src/content/field/demos/02-validation.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "校验", titleEn: "Validation" };

export default function Demo() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>();
  return (
    <form noValidate className="flex w-full max-w-xs flex-col gap-(--qy-field-group-gap)" onSubmit={(event) => {
      event.preventDefault();
      const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
      setError(input.validity.valueMissing ? "请填写邮箱。" : input.validity.typeMismatch ? "邮箱地址不完整。" : undefined);
    }}>
      <Field invalid={Boolean(error)}><FieldLabel>邮箱</FieldLabel><Input name="email" required type="email" value={value} onValueChange={setValue} autoComplete="email" /><FieldError>{error}</FieldError></Field>
      <Button className="self-start" type="submit">检查</Button>
    </form>
  );
}
```

### 横向组合
Source: apps/docs/src/content/field/demos/03-horizontal.tsx
```tsx
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "横向组合", titleEn: "Horizontal composition" };

export default function Demo() {
  return <Field orientation="horizontal" className="w-full max-w-md"><Checkbox defaultChecked /><FieldContent><FieldLabel>附加备注</FieldLabel><FieldDescription>可选。</FieldDescription></FieldContent></Field>;
}
```

### 字段组
Source: apps/docs/src/content/field/demos/04-group.tsx
```tsx
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@qingye_lab/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye_lab/ui/components/fieldset";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "字段组", titleEn: "Field groups" };

export default function Demo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Fieldset><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input /></Field></Fieldset>
      <FieldSeparator>备注</FieldSeparator>
      <Field><FieldLabel>补充内容</FieldLabel><Input /></Field>
    </FieldGroup>
  );
}
```

### 标题与自命名控件
Source: apps/docs/src/content/field/demos/05-title.tsx
```tsx
import { useId } from "react";
import { Field, FieldDescription, FieldGroup, FieldTitle } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "标题与自命名控件", titleEn: "Title and self-named control" };

export default function Demo() {
  const titleId = useId();
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field><FieldTitle id={titleId}>设备名称</FieldTitle><Input aria-labelledby={titleId} defaultValue="青野" /></Field>
      <Field><FieldTitle>备注</FieldTitle><FieldDescription>未填写。</FieldDescription></Field>
    </FieldGroup>
  );
}
```

### 错误列表
Source: apps/docs/src/content/field/demos/06-errors.tsx
```tsx
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
export const meta = { title: "错误列表", titleEn: "Error list" };
export default function Demo() {
  const [value, setValue] = useState("2026");
  const errors = [value.length < 8 ? {message: "至少 8 位"} : undefined, /\d/.test(value) ? undefined : {message: "至少包含 1 个数字"}, /[A-Za-z]/.test(value) ? undefined : {message: "至少包含 1 个字母"}];
  return <Field className="w-full max-w-xs" invalid={errors.some(Boolean)}><FieldLabel>设备管理密码</FieldLabel><Input value={value} onValueChange={setValue} /><FieldError errors={errors} /></Field>;
}
```

### 禁用
Source: apps/docs/src/content/field/demos/07-disabled.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "禁用", titleEn: "Disabled" };

export default function Demo() {
  return <Field className="w-full max-w-xs" disabled><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" /></Field>;
}
```

### 必填与选填
Source: apps/docs/src/content/field/demos/08-requirement.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "必填与选填", titleEn: "Required and optional" };

export default function Demo() {
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field><FieldLabel requirement="required">设备名称</FieldLabel><Input required /></Field>
      <Field><FieldLabel requirement="optional">备注</FieldLabel><Input /></Field>
    </FieldGroup>
  );
}
```

### 校验中
Source: apps/docs/src/content/field/demos/09-validating.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "校验中", titleEn: "Validating" };

// 校验进行中旧的错误不显示；结论由应用在结束后传入。
export default function Demo() {
  return <Field className="w-full max-w-xs" validating invalid><FieldLabel>用户名</FieldLabel><Input defaultValue="qingye" /><FieldError>用户名已被占用</FieldError></Field>;
}
```
