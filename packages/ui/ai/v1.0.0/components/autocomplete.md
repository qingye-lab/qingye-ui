# 建议输入 Autocomplete

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/autocomplete
Source: packages/ui/src/components/autocomplete.tsx
Source SHA-256: 3c23403e6ca6bd38e4444fa4aedc84b16dd40398820232819fac1b49d8c1f4ff

编辑自由文本，候选作为可接受的建议。

## Decision
输入文字本身就是值。移动候选高亮不改变文本；确认建议才请求替换，文本无需匹配候选也可提交。

## Notes
- 需要只能确认候选中的一个值时用 Combobox。
- 空集合不代表错误或服务失败；空提示由调用方根据真实情况提供。
- caller 定位 style 最后合并；颜色、圆角、高亮与焦点读取现有主题角色。

## Use and ownership
- 编辑自由文本，候选作为可接受的建议。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 建议高亮、焦点、非受控文本
- Application: 受控文本、建议数据、错误与提交结果

## Composition
- Field + FieldLabel + Autocomplete / Input / actions / Popup / List / Item

## Responsive behavior
- 五档同名文字与控制几何，浮层受可用空间约束

## Customization
- 公开 parts/原语、render/ref/ARIA/events 与共享浮层

## Current exports
- Autocomplete: function; owner autocomplete; PASS; props: AutocompleteProps<Value>
- AutocompleteClear: function; owner autocomplete; PASS; props: AutocompletePrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- AutocompleteEmpty: const; owner autocomplete; UNVERIFIED
- AutocompleteInput: function; owner autocomplete; PASS; props: AutocompletePrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- AutocompleteItem: function; owner autocomplete; PASS; props: AutocompletePrimitive.Item.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteList: function; owner autocomplete; PASS; props: AutocompletePrimitive.List.Props & React.RefAttributes<HTMLDivElement>
- AutocompletePopup: function; owner autocomplete; PASS; props: AutocompletePopupProps
- AutocompletePopupProps: type; owner autocomplete; PASS
- AutocompletePrimitive: reexport; owner autocomplete; UNVERIFIED
- AutocompleteProps: type; owner autocomplete; PASS
- AutocompleteTrigger: function; owner autocomplete; PASS; props: AutocompletePrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Autocomplete
Base UI 文本建议上下文，固定 list 模式。
- value / defaultValue / onValueChange: string / string / (value, details) => void. 受控或非受控自由文本；details.cancel() 可拒绝编辑或接受建议请求。
- items / itemToStringValue / filter: readonly Value[] / Base UI public props. 提供平坦建议数组、建议文字与过滤规则；对象建议显式定义文本。分组等高级组合可用 AutocompletePrimitive。
- name / form / required / disabled / readOnly: Base UI Root props. 实际 Input 与 Field 注册一次，FormData 提交自由文本；只读提交、禁用排除。
- open / defaultOpen / onOpenChange / size: Base UI open props / 'xs' | 'sm' | 'md' | 'lg' | 'xl'; default size: 'md'. 展开可控；文本、动作与建议项共享五档尺寸。

### AutocompleteInput / AutocompleteTrigger / AutocompleteClear
共享 Input/Button 的真实出口，透传 ref/render/ARIA/events；清除请求空文本。

### AutocompletePopup
公开候选 Portal/Positioner/Popup；container/positionerProps 透传并消费共享浮层层级。

### AutocompleteList / AutocompleteItem / AutocompleteEmpty
建议集合、文字建议与调用方真实空内容。

### AutocompletePrimitive
安装版 Base UI Autocomplete 命名空间。

## Keyboard
- ArrowDown / ArrowUp: 高亮建议，输入文字与 FormData 保持当前文本。
- Enter: 请求接受高亮建议的文字。
- Escape / Tab: 退出列表，输入仍可编辑与提交。

## Source examples
### 自由文本
Source: apps/docs/src/content/autocomplete/demos/01-text.tsx
```tsx
import { useState } from "react";
import { Autocomplete, AutocompleteClear, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "自由文本", titleEn: "Free text" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  const [value, setValue] = useState("");
  return <form><Field name="text"><FieldLabel>文字</FieldLabel><Autocomplete items={items} value={value} onValueChange={setValue}><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteClear /><AutocompleteTrigger /></div><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete><output className="text-support text-muted-foreground">{value || "—"}</output></Field></form>;
}
```

### 五档与只读
Source: apps/docs/src/content/autocomplete/demos/02-sizes.tsx
```tsx
import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "五档与只读", titleEn: "Five sizes and read-only" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><Autocomplete size={size} items={items} defaultValue="青"><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteTrigger /></div><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete></Field>)}<Field><FieldLabel>只读文本</FieldLabel><Autocomplete readOnly items={items} defaultValue="自由文本"><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteTrigger /></div></Autocomplete></Field></div>;
}
```
