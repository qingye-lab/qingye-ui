# 搜索输入 SearchInput

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/search-input
Source: packages/ui/src/components/search-input.tsx
Source SHA-256: e05e7932ae400b861cb729fd5c535fbcb3822485a20e554741e89e291ed84fe0

输入一个搜索词，并能一步清空。

## Decision
搜索输入是组合，不是 Input 的一个模式：编辑边界（InputGroup）里依次放搜索图标、输入、清空动作，三者都是公开部件。输入框只承载值；清空是附在边界上的另一个动作，有自己的名称与焦点。它只持有搜索词，不发请求、不决定何时搜索，也不显示结果。

## Notes
- 此前写作 Input type="search" 的用法改为 SearchInput；Input 的 clearable / clearLabel / onClear 已移除。普通字段需要清空时用 InputGroup + InputGroupButton 组合。

## Use and ownership
- 输入搜索词或就地筛选一个列表。
- Avoid: 普通文本字段用 Input；需要候选项时用 Autocomplete 或 Combobox。
- Avoid: 只靠 placeholder 命名：提供 FieldLabel 或 aria-label。
- Library: 共同边界、搜索图标、清空动作的出现与焦点返回、首个 Escape 清空本字段。
- Application: 搜索词的含义、何时查询、结果、无结果与失败的表达。

## Composition
- 与 FieldLabel 共处，或在工具条里以 aria-label 命名。需要别的附属动作时，用 InputGroup + InputGroupInput + InputGroupButton 自行组合。

## Responsive behavior
- 宽度由所在容器决定；几何与 Input 相同，跟随密度轴。

## Customization
- className、style、render 与 ref 属于真实 input；controlClassName 属于编辑边界；clearLabel 改写清空动作的名称。

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
InputGroup + 搜索图标 + Input（type=search）+ 清空动作。
- value / defaultValue / onChange / onValueChange: InputProps. 受控与非受控值；清空沿同一条原生事件链更新值。
- onClear: () => void. 清空之后调用；值的变化已由 onChange / onValueChange 送出。清空不提交表单。
- clearLabel: string. 清空动作的名称，默认从 locale 读取。
- readOnly / disabled: boolean; default false. 只读与禁用时不出现清空动作；禁用同样服从 Field 与原生 fieldset。
- className / style / render / ref: InputProps. 全部作用于真实 input。
- controlClassName: string. 作用于编辑边界，例如宽度。
- 其余 InputProps（除 type / unstyled）: InputProps. placeholder、name、form、aria-* 等原样透传给输入。

## Keyboard
- Tab / Shift+Tab: 在输入与清空动作之间移动。
- Escape: 非空且可编辑时清空本字段，之后的 Escape 交给外层；输入法组字与调用方取消时保留草稿。
- Enter / Space: 焦点在清空动作上时清空并把焦点还给输入，不提交表单。

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
