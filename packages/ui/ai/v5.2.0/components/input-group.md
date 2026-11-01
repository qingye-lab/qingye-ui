# 输入组合 InputGroup

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/input-group
Source: packages/ui/src/components/input-group.tsx
Source SHA-256: 76c0479a8ae9237614a739ef522f54922af7646711cea7da0e1abc7ac9519260

让输入与标记、单位或附属动作共用编辑边界。

## Decision
InputGroupInput 复用 Input 的 unstyled 出口。静态附件不抢焦点；需要动作时用 InputGroupButton，它与输入共用同一条外边界、自己不画框，并保留动作自己的名称与状态。清空、显示密码这类动作不内置在输入框里，都由这里组合；SearchInput 与 PasswordInput 就是这样搭出来的。

## Notes
- 多个数值成员并置时（如区间），每个输入各自有可访问名称（aria-label），组的整体名称由外层 group 的 aria-labelledby 给出；分隔符用 InputGroupText，它对读屏是普通文字而非名称。
- FieldControl 注册组合时传 InputGroupInput nativeInput，避免重复注册。
- 禁用输入不意味着禁用任意附属动作；应用应声明每个动作的真实状态。

## Use and ownership
- 输入与单位、标记或附属动作属于同一编辑范围。
- Avoid: 把无关动作附在输入上；只靠附件或 Placeholder 命名输入。
- Library: 共同边界、几何接线及 Input 的原生交互。
- Application: 输入值、附件动作、名称及校验事实。

## Composition
- FieldLabel 命名输入；附件的必要说明由 aria-describedby 显式关联。搜索与密码已有现成组合 SearchInput、PasswordInput。

## Responsive behavior
- 输入占剩余宽度；边界与内部 Input 一套几何，跟随密度轴，紧凑不缩小文字，粗指针目标单独保持。

## Customization
- root 样式属于共同边界，Input 的 className/style/render/ref 属于实际输入；附件有独立 render。

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
共同编辑边界，不自动建立另一个字段角色。
- loading: boolean; default false. 组内内容正在取回或校验的事实：行尾出现与 Button 同一个忙碌标记，根节点标 aria-busy，并以礼貌的实时区域播报 locale 的「正在加载」。输入不被禁用；组件不发请求。
- render / ref / 原生属性: useRender.ComponentProps<div>. 共同边界组合入口。

### InputGroupTextarea / InputGroupNumberField / InputGroupSelectTrigger
Textarea、NumberField、SelectTrigger 的 unstyled 组合：成员保留原生语义与几何，边框与焦点、悬停、无效、禁用、只读的状态由组统一承担。
- TextareaProps / NumberFieldProps / SelectTriggerProps（除 unstyled）: InputGroupTextareaProps / InputGroupNumberFieldProps / InputGroupSelectTriggerProps. 与独立使用时相同。数值成员内部用 NumberFieldGroup unstyled；选择成员的宽度随候选名称，需要占满剩余宽度时传 className="flex-1"。

### InputGroupInput
Input 的 unstyled 组合，尺寸来自组。
- InputProps（除 size / unstyled）: InputGroupInputProps. 保留原生输入、受控值、nativeInput 与实际输入 ref。

### InputGroupAddon
默认静态 span；不添加 tabIndex、聚焦处理或自动名称。
- align: "inline-start" | "inline-end" | "block-start" | "block-end". 附件相对成员的位置。省略时按 DOM 顺序在行内排列（与此前一致）；inline-* 把附件固定在行首/行尾；block-* 独占一行，置于成员之上/之下，高度不小于边界内高，用于多行成员的页眉与页脚。
- render / ref / 原生属性: useRender.ComponentProps<span>. 单位、前缀、图标等静态内容的承载位。

### InputGroupText
附件内的静态文字（单位、分隔、计数）：只承担文字样式，不抢焦点。
- render / ref / 原生属性: useRender.ComponentProps<span>. 文字承载位。

### InputGroupButton
编辑边界内的动作：不画自己的框，铺满边界内高；图标形为内高见方。
- shape: "label" | "icon"; default "label". 图标形需要 aria-label。
- variant: ButtonProps["variant"]; default "quiet". 边界内默认无框。
- 其余 ButtonProps: ButtonProps. loading、disabled、onClick、render 等与 Button 相同。

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
