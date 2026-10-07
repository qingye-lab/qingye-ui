# 候选输入 Combobox

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/combobox
Source: packages/ui/src/components/combobox.tsx
Source SHA-256: 92f985024836565c9306fcd5c21aa194bfd99a04cfde19e84a97ce7fce1e3cfc

筛选候选并确认一个值，查询文字与选择事实分别持有。

## Decision
value 是确认候选，inputValue 是过滤草稿。清空过滤文字继续保留候选，明确清除选择才请求空值；自由文本值用 Autocomplete。

## Notes
- 从当前查询到候选的过滤与空内容必须对应实际数据。
- Popup 的 caller style 最后合并；覆写层级可能改变默认顺序。
- 候选浮层表面与高亮采用既有主题预设，焦点信号在盒内。

## Use and ownership
- 筛选候选并确认一个值，查询文字与选择事实分别持有。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 候选键盘、焦点、非受控查询/确认值
- Application: 候选数据、受控查询/值、错误与提交结果

## Composition
- Field + FieldLabel + Combobox / Input / actions / Popup / List / Item

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字；浮层按可用宽度与高度定位

## Customization
- 每部位 render/ref/ARIA/events，公开原语与共享浮层角色

## Current exports
- Combobox: function; owner combobox; PASS; props: ComboboxProps<Value>
- ComboboxClear: function; owner combobox; PASS; props: ComboboxPrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- ComboboxControl: function; owner combobox; PASS; props: InputGroupProps
- ComboboxEmpty: function; owner combobox; PASS; props: ComboboxPrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>
- ComboboxInput: function; owner combobox; PASS; props: ComboboxPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- ComboboxItem: function; owner combobox; PASS; props: ComboboxPrimitive.Item.Props & React.RefAttributes<HTMLDivElement>
- ComboboxList: function; owner combobox; PASS; props: ComboboxPrimitive.List.Props & React.RefAttributes<HTMLDivElement>
- ComboboxPopup: function; owner combobox; PASS; props: ComboboxPopupProps
- ComboboxPopupProps: type; owner combobox; PASS
- ComboboxPrimitive: reexport; owner combobox; UNVERIFIED
- ComboboxProps: type; owner combobox; PASS
- ComboboxTrigger: function; owner combobox; PASS; props: ComboboxPrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Combobox
公开 Base UI 单值候选上下文；不强加业务选项。
- value / defaultValue / onValueChange: Value | null / Value | null / (value, details) => void. 受控或非受控确认值。details.cancel() 拒绝变更；回调不表示提交或持久化成功。
- inputValue / defaultInputValue / onInputValueChange: string / string / (value, details) => void. 独立过滤文字；不序列化成候选值，也不因清空查询清除确认候选。
- items / itemToStringLabel / itemToStringValue / isItemEqualToValue: Base UI public props. 调用方提供候选、可读名称、表单值与身份比较；对象值须定义有意义的名称与提交表示。
- name / form / required / disabled / readOnly: Base UI Root props. Field 命名与错误连接由原语承担；FormData 只提交确认候选。只读保留提交，禁用排除。
- open / defaultOpen / onOpenChange: Base UI open props. 展开可控；输入、动作、候选项共用一套几何，跟随密度轴。multiple 固定 false。

### ComboboxInput / ComboboxTrigger / ComboboxClear
公开原语复用 Input 原生出口与 Button；事件、ARIA、render 状态与 ref 透传，Field 注册一次。

### ComboboxPopup
候选专属 Portal/Positioner/Popup；positionerProps/container 可调整公开定位，层级消费共享 floating-layer。

### ComboboxList / ComboboxItem / ComboboxEmpty
真实候选集合、可选项与调用方空内容；Item.value 是确认候选。

### ComboboxPrimitive
安装版 Base UI Combobox 命名空间。

## Keyboard
- ArrowDown / ArrowUp: 展开并移动候选高亮，尚未确认时不改变提交值。
- Enter: 请求确认高亮候选。
- Escape / Tab: 退出候选列表，遵守原语焦点与过滤文字恢复规则。

## Source examples
### 确认候选
Source: apps/docs/src/content/combobox/demos/01-choice.tsx
```tsx
import { useState } from "react";
import { Combobox, ComboboxClear, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye/ui/components/combobox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "确认候选", titleEn: "Confirm a candidate" };
const members = ["陈致远", "李一鸣", "王一帆", "赵子纯"];
export default function Demo() {
  const [value, setValue] = useState<string | null>("陈致远");
  return <form className="max-w-xs"><Field name="owner"><FieldLabel>负责人</FieldLabel><Combobox items={members} value={value} onValueChange={setValue}><ComboboxControl><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></ComboboxControl><ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox></Field></form>;
}
```

### 密度与只读
Source: apps/docs/src/content/combobox/demos/02-density.tsx
```tsx
import { Combobox, ComboboxControl, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye/ui/components/combobox";
import { Field, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

const items = ["机柜 A", "机柜 B", "机柜 C"];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Combobox items={items} defaultValue="机柜 A">
              <ComboboxControl><ComboboxInput /><ComboboxTrigger /></ComboboxControl>
              <ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
            </Combobox>
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读候选</FieldLabel><Combobox readOnly items={items} defaultValue="机柜 A"><ComboboxControl><ComboboxInput /><ComboboxTrigger /></ComboboxControl></Combobox></Field>
    </div>
  );
}
```
