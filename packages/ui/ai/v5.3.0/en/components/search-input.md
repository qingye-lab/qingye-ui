# SearchInput

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/search-input
Source: packages/ui/src/components/search-input.tsx
Source SHA-256: 0b4ce4a97d0fd6c0e87c4ba043c42efa071c3e8f54d3d5be21f2a083abaf9af7

Enter a search term and clear it in one step.

## Decision
SearchInput is a composition, not a mode of Input: a search icon, the input, and a clear action sit inside one editing boundary (InputGroup), all public parts. The input only holds the value; clearing is a separate action on the boundary with its own name and focus. It holds the search term only: it sends no request, does not decide when to search, and shows no results.

## Notes
- Replace Input type="search" with SearchInput; Input's clearable / clearLabel / onClear are removed. For a clear action on an ordinary field, compose InputGroup + InputGroupButton.

## Use and ownership
- Entering a search term or filtering a list in place.
- Avoid: Use Input for an ordinary text field; use Autocomplete or Combobox when candidates are offered.
- Avoid: Naming it by placeholder alone: provide FieldLabel or aria-label.
- Library: The shared boundary, the search icon, when the clear action appears and where focus returns, and the first Escape clearing this field.
- Application: What the term means, when to query, and how results, no results and failure are expressed.

## Composition
- Pair with FieldLabel, or name it with aria-label in a toolbar. For other adjunct actions, compose InputGroup + InputGroupInput + InputGroupButton yourself.

## Responsive behavior
- Width follows the container; geometry matches Input and follows the density axis.

## Customization
- className, style, render and ref belong to the real input; controlClassName belongs to the editing boundary; clearLabel renames the clear action.

## Current exports
- SearchInput: function; owner search-input; PASS; props: SearchInputProps
- SearchInputProps: type; owner search-input; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### SearchInput
- `clearLabel?`: `string`. 清空按钮的名称，默认从 locale 读取。
- `controlClassName?`: `string`. 编辑边界的样式入口；className / style / render 始终属于真实输入。
- `loading?`: `boolean`. 搜索正在进行。事实由调用方持有：组件只表示忙碌（搜索图标换成转动的记号、输入标 `aria-busy`、读屏播报「正在搜索」）， 不发请求、不推断完成，也**不阻止继续输入与清空**——查询随键入更换是常态，被挡住反而打断输入。
- `nativeInput?`: `boolean`. 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。
- `onClear?`: `() => void`. 清空之后调用；值的变化仍走 onChange / onValueChange。清空不提交表单。
- `size?`: `number | undefined`. 原生 input.size 的字符宽度含义；与呈现无关，由原生属性承担。
- plus 308 inherited (@types/react 302, @base-ui/react 6); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### SearchInput
InputGroup + search icon + Input (type=search) + a clear action.
- value / defaultValue / onChange / onValueChange: InputProps. Controlled and uncontrolled values; clearing updates the value through the same native event path.
- onClear: () => void. Called after clearing; the value change has already been sent through onChange / onValueChange. Clearing does not submit a form.
- clearLabel: string. Name of the clear action, read from the locale by default.
- loading: boolean; default false. A search is in progress; the application owns that fact. The search icon becomes a spinning mark in the same slot (the boundary does not change size), the input is marked aria-busy, and screen readers hear Searching. Typing and clearing stay available.
- readOnly / disabled: boolean; default false. No clear action when read only or disabled; read-only shows a Read only note in the boundary; disabling also follows Field and a native fieldset.
- className / style / render / ref: InputProps. Applied to the real input.
- controlClassName: string. Applied to the editing boundary, e.g. its width.
- Other InputProps (except type / unstyled): InputProps. placeholder, name, form, aria-* and the rest are forwarded to the input.

## Keyboard
- Tab / Shift+Tab: Move between the input and the clear action.
- Escape: Clear this field when it is nonempty and editable; a later Escape reaches the parent. Composition and caller cancellation preserve the draft.
- Enter / Space: On the clear action: clear, return focus to the input, and do not submit the form.

## Source examples
### 搜索与清空
Source: apps/docs/src/content/search-input/demos/01-search.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { SearchInput } from "@qingye_lab/ui/components/search-input";

export const meta = { title: "搜索与清空", titleEn: "Search and clearing" };

export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>搜索</FieldLabel><SearchInput defaultValue="青野" /></Field>;
}
```

### 就地筛选
Source: apps/docs/src/content/search-input/demos/02-filter.tsx
```tsx
import { Item, ItemContent, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { useState } from "react";

export const meta = { title: "就地筛选", titleEn: "Filter in place" };

const names = ["春季目录", "夏季目录", "秋季目录", "冬季目录"];

export default function Demo() {
  const [query, setQuery] = useState("");
  const matches = names.filter(name => name.includes(query.trim()));
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <SearchInput aria-label="筛选目录" placeholder="筛选目录" value={query} onChange={event => setQuery(event.target.value)} />
      <div>{matches.map(name => <Item key={name}><ItemContent><ItemTitle>{name}</ItemTitle></ItemContent></Item>)}</div>
      {matches.length === 0 && <p className="text-support text-muted-foreground">没有名称包含「{query.trim()}」的目录</p>}
    </Stack>
  );
}
```

### 状态
Source: apps/docs/src/content/search-input/demos/03-states.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { SearchInput } from "@qingye_lab/ui/components/search-input";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <Field disabled><FieldLabel>禁用</FieldLabel><SearchInput defaultValue="青野" /></Field>
      <Field><FieldLabel>只读</FieldLabel><SearchInput readOnly defaultValue="青野" /></Field>
      <Field><FieldLabel>搜索中</FieldLabel><SearchInput loading defaultValue="青野" /></Field>
    </Stack>
  );
}
```
