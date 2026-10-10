# SearchInput

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/search-input
Source: packages/ui/src/components/search-input.tsx
Source SHA-256: e05e7932ae400b861cb729fd5c535fbcb3822485a20e554741e89e291ed84fe0

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### SearchInput
InputGroup + search icon + Input (type=search) + a clear action.
- value / defaultValue / onChange / onValueChange: InputProps. Controlled and uncontrolled values; clearing updates the value through the same native event path.
- onClear: () => void. Called after clearing; the value change has already been sent through onChange / onValueChange. Clearing does not submit a form.
- clearLabel: string. Name of the clear action, read from the locale by default.
- readOnly / disabled: boolean; default false. No clear action when read only or disabled; disabling also follows Field and a native fieldset.
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
    </Stack>
  );
}
```
