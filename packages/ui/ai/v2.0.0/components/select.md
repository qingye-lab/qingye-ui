# 选择器 Select

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/select
Source: packages/ui/src/components/select.tsx
Source SHA-256: f3eedd535ff725a4488564bf2ab329a9a14c8791ab17e1580a8e674af87f9abc

从可收起的候选列表中取一个值。

## Decision
高亮表示当前位置，选取才改变值。未选择不会自动变为第一项；需要并置比较时用 RadioGroup。

## Notes
- FieldLabel 命名触发器，FieldError 关联错误；SelectGroupLabel 命名候选分组。
- null 是未选择，空字符串和 0 可作为候选；原生表单可能把 null 与空字符串都序列化为空。
- 只读保留当前值，禁用项不能选取。
- 自身 Positioner 消费共享 popup 层级，父工作面内候选高于该工作面；positionerProps 保留调用方 style/ref/render。

## Use and ownership
- 已知单值候选，平时只需辨认当前选择
- Avoid: 需要并置比较的少量候选用 RadioGroup
- Avoid: 大量候选需过滤时用 Combobox
- Avoid: 命令用 Menu，视角用 Tabs
- Avoid: 关键原生选择行为用 NativeSelect
- Library: 焦点、展开、高亮、非受控值
- Application: 受控值、候选、invalid、加载/失败/未知与保存事实

## Composition
- FieldLabel + Select + FieldDescription + FieldError；SelectGroup 提供候选分组

## Responsive behavior
- 组件保留 -narrow 与粗指针角色；本批只做桌面检查

## Customization
- 同档文字和控件尺寸、bordered padding、角色颜色、Portal container

## Current exports
- Select: function; owner select; PASS; props: SelectProps<Value>
- SelectGroup: function; owner select; PASS; props: React.ComponentProps<typeof SelectPrimitive.Group>
- SelectGroupLabel: function; owner select; PASS; props: React.ComponentProps<typeof SelectPrimitive.GroupLabel>
- SelectItem: function; owner select; PASS; props: SelectItemProps
- SelectItemProps: type; owner select; PASS
- SelectPopup: function; owner select; PASS; props: SelectPopupProps
- SelectPopupProps: type; owner select; PASS
- SelectPrimitive: reexport; owner select; UNVERIFIED
- SelectProps: type; owner select; PASS
- SelectTrigger: function; owner select; PASS; props: SelectTriggerProps
- SelectTriggerProps: type; owner select; PASS
- SelectValue: function; owner select; PASS; props: SelectValueProps
- SelectValueProps: type; owner select; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Select
单值状态与表单语义。
- value / defaultValue: Value | null. 受控值或真实初值，null 是未选择。省略初值不会选第一项。
- items: Record<string, ReactNode> | {value, label}[] | Group[]. 当前值的名称映射；显式空字符串候选也要提供可读 label。
- onValueChange: (value, eventDetails) => void. 选择变化，可取消；不因高亮移动而改变值。
- name / form / inputRef / autoComplete: Base UI Root props. 保留原语隐藏输入、表单与自动填充入口。
- disabled / readOnly / required: boolean; default false. 交互限制与原生约束；invalid 由 Field 或触发器显式 ARIA 声明。
- open / defaultOpen / onOpenChange: Base UI Root props. 受控或非受控展开，取消返回与选择值分开。
- modal: boolean; default false. 默认允许其余字段交互；可按承载任务显式改变。
- itemToStringLabel / itemToStringValue / isItemEqualToValue: Base UI Root props. 对象候选的名称、序列化与相等关系。

### SelectTrigger
有边框的选择入口，与 Input 同档。
- children: ReactNode. 省略时提供 SelectValue；内含展开图标。
- render / ref / className / style / ARIA: Base UI composition. 保留真实触发器的事件、名称和样式入口。

### SelectValue
真实当前值名称与未选择占位。
- placeholder: ReactNode; default locale.selectPlaceholder. 仅未选择显示；不能替代 FieldLabel。
- children: ReactNode | (value) => ReactNode. 显式值表达优先。

### SelectPopup
Portal、定位、面板与可滚动 List 的共同组合。
- side / align / sideOffset / alignOffset: Base UI positioning props; default "bottom" / "start" / 0. 默认贴锚点，不覆盖触发器；由原语处理空间碰撞。
- alignItemWithTrigger: boolean; default false. 显式选择是否以选中项对齐并覆盖触发器。
- container: HTMLElement | ShadowRoot | RefObject | null. Portal 容器；局部主题、语言或密度需由调用方提供正确继承环境。
- positionerProps: SelectPrimitive.Positioner.Props. 自身公开定位层的 ref/render/事件/样式透传；调用方 style 最后合并。
- finalFocus / render / ref / className / style: Base UI Popup props. 默认取消回到触发器；入退场由 motion.css 拥有。

### SelectItem
值候选；高亮表位置，勾标表选中。
- value / label / disabled: any / string / boolean. 值、类型搜索名称、禁用事实。禁用项可高亮供辨认，但不能选取。
- children / render / ref / className / style: Base UI Item props. 名称内容自动进入 ItemText，选中勾标单独呈现。

### SelectGroup / SelectGroupLabel
语义分组与组名称。

### SelectPrimitive
完整 Base UI Select 原语出口；公共 Select 接口始终为单值。

## Keyboard
- Tab: 进入触发器。
- Enter / Space / ↑ / ↓: 打开候选；展开后方向键移动高亮，Enter/Space 选择。
- Home / End: 展开时移动到首/尾候选。
- 文字键: 类型搜索；展开时高亮匹配项，关闭时原语可直接选择匹配值。
- Esc: 关闭并回到触发器，保留原值。

## Source examples
### 密度
Source: apps/docs/src/content/select/demos/01-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

export const meta = { title: "密度", titleEn: "Density" };

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Select items={options} defaultValue="center">
              <SelectTrigger />
              <SelectPopup>
                {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
              </SelectPopup>
            </Select>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 状态与分组
Source: apps/docs/src/content/select/demos/02-states.tsx
```tsx
import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";

export const meta = { title: "状态与分组", titleEn: "States and groups" };

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];
const states = [
  { id: "unselected", label: "未选择", value: null },
  { id: "selected", label: "已选择", value: "center" },
  { id: "invalid", label: "无效", value: null },
  { id: "readonly", label: "只读", value: "center" },
  { id: "disabled", label: "禁用", value: "center" },
  { id: "disabled-item", label: "禁用项", value: "center" },
];
const values = [{ value: "", label: "空字符串" }, { value: 0, label: "0" }];
const fontGroups = [
  { label: "无衬线", fonts: ["Arial", "Helvetica"] },
  { label: "等宽", fonts: ["Menlo", "Consolas"] },
];
const fonts = fontGroups.flatMap(group => group.fonts.map(font => ({ value: font, label: font })));

export default function Demo() {
  const [requiredValue, setRequiredValue] = useState<string | null>(null);
  return (
    <FieldGroup className="grid w-full grid-cols-3 items-start">
      {states.map(state => {
        const invalid = state.id === "invalid" && requiredValue === null;
        return (
          <Field key={state.id} invalid={invalid} disabled={state.id === "disabled"}>
            <FieldLabel>{state.id === "invalid" && !invalid ? "已选择" : state.label}</FieldLabel>
            <Select
              items={options}
              defaultValue={state.value}
              readOnly={state.id === "readonly"}
              disabled={state.id === "disabled"}
              onValueChange={value => {
                if (state.id === "invalid") setRequiredValue(value);
              }}
            >
              <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
              <SelectPopup>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value} disabled={state.id === "disabled-item" && option.value === "right"}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
            {invalid && <FieldError>请选择对齐方式。</FieldError>}
          </Field>
        );
      })}
      {values.map(option => (
        <Field key={String(option.value)}>
          <FieldLabel>{option.value === "" ? "空值" : "零值"}</FieldLabel>
          <Select<string | number> items={values} defaultValue={option.value}>
            <SelectTrigger />
            <SelectPopup>
              {values.map(item => <SelectItem key={String(item.value)} value={item.value}>{item.label}</SelectItem>)}
            </SelectPopup>
          </Select>
        </Field>
      ))}
      <Field>
        <FieldLabel>字体</FieldLabel>
        <Select items={fonts} defaultValue="Menlo">
          <SelectTrigger />
          <SelectPopup>
            {fontGroups.map(group => (
              <SelectGroup key={group.label}>
                <SelectGroupLabel>{group.label}</SelectGroupLabel>
                {group.fonts.map(font => <SelectItem key={font} value={font}>{font}</SelectItem>)}
              </SelectGroup>
            ))}
          </SelectPopup>
        </Select>
      </Field>
    </FieldGroup>
  );
}
```
