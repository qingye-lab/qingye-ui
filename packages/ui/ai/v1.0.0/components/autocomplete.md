# 建议输入 Autocomplete

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/autocomplete
Source: packages/ui/src/components/autocomplete.tsx
Source SHA-256: e075ba4b147005f24c83b8ff89149f57ca1d815082f1eea296f50110c81117ab

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
- 一套几何，跟随密度轴，紧凑不缩小文字；浮层受可用空间约束

## Customization
- 公开 parts/原语、render/ref/ARIA/events 与共享浮层

## Current exports
- Autocomplete: function; owner autocomplete; PASS; props: AutocompleteProps<Value>
- AutocompleteClear: function; owner autocomplete; PASS; props: AutocompletePrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- AutocompleteControl: function; owner autocomplete; PASS; props: InputGroupProps
- AutocompleteEmpty: function; owner autocomplete; PASS; props: AutocompletePrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>
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
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Autocomplete
Base UI 文本建议上下文，固定 list 模式。
- value / defaultValue / onValueChange: string / string / (value, details) => void. 受控或非受控自由文本；details.cancel() 可拒绝编辑或接受建议请求。
- items / itemToStringValue / filter: readonly Value[] / Base UI public props. 提供平坦建议数组、建议文字与过滤规则；对象建议显式定义文本。分组等高级组合可用 AutocompletePrimitive。
- name / form / required / disabled / readOnly: Base UI Root props. 实际 Input 与 Field 注册一次，FormData 提交自由文本；只读提交、禁用排除。
- open / defaultOpen / onOpenChange: Base UI open props. 展开可控；文本、动作与建议项共用一套几何，跟随密度轴。

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
import { Autocomplete, AutocompleteControl, AutocompleteClear, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye_lab/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "自由文本", titleEn: "Free text" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  const [value, setValue] = useState("");
  return <form><Field name="text"><FieldLabel>文字</FieldLabel><Autocomplete items={items} value={value} onValueChange={setValue}><AutocompleteControl><AutocompleteInput /><AutocompleteClear /><AutocompleteTrigger /></AutocompleteControl><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete><output className="text-support text-muted-foreground">{value || "—"}</output></Field></form>;
}
```

### 密度与只读
Source: apps/docs/src/content/autocomplete/demos/02-density.tsx
```tsx
import { Autocomplete, AutocompleteControl, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye_lab/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

const items = ["3 号楼东侧", "3 号楼西侧", "4 号楼南门"];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Autocomplete items={items} defaultValue="3 号楼东侧">
              <AutocompleteControl><AutocompleteInput /><AutocompleteTrigger /></AutocompleteControl>
              <AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup>
            </Autocomplete>
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读文本</FieldLabel><Autocomplete readOnly items={items} defaultValue="3 号楼东侧"><AutocompleteControl><AutocompleteInput /><AutocompleteTrigger /></AutocompleteControl></Autocomplete></Field>
    </div>
  );
}
```
