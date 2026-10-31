# 选择器 Select

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/select
Source: packages/ui/src/components/select.tsx
Source SHA-256: b3e18fa576f40383fd77be798ea019d7739657d559ffb2d518f6b4de961d3f8b

从可收起的候选列表中取一个值。

## Decision
高亮表示当前位置，选取才改变值。未选择不会自动变为第一项；需要并置比较时用 RadioGroup。

## Notes
- FieldLabel 命名触发器，FieldError 关联错误；SelectGroupLabel 命名候选分组。
- null 是未选择，空字符串（""）和 0 都是合法的候选值。选了值为 "" 的候选，触发器显示它的 label，不显示占位，data-placeholder 也不出现；null 才显示占位。用 "" 表示「不限」「无」这类真实选项时，要在 items 里给它可读的 label。注意原生表单会把 null 与 "" 都序列化为空字符串，服务端需要区分时用别的值，或在应用侧另存选择与否。
- 只读保留当前值并在触发器上给出「只读」说明，禁用项不能选取。
- 触发器默认不拉满容器；要拉满时给 SelectTrigger className="w-full"。没有 items 时无法预知候选名称，宽度只随当前显示的内容。
- 候选来自请求时：用 loading 表示请求中，用 error 放入失败说明与重试动作；没有子项且二者皆无才显示「没有可选项」。
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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Select
- `error?`: `React.ReactNode`. 取候选失败时由应用提供的内容（说明与重试动作）；候选面以 role="alert" 摆放，组件不推断失败、不写原因。
- `loading?`: `boolean`. 应用正在取候选这一事实：触发器与候选面标 aria-busy，候选面显示等待记号与「正在加载」。组件不发请求、不推断结果。
- plus 23 inherited (@base-ui/react 23); not expanded, see the installed declarations

### SelectGroup
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### SelectGroupLabel
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### SelectItem
- no props declared by this library
- plus 281 inherited (@types/react 273, @base-ui/react 8); not expanded, see the installed declarations

### SelectPopup
- `emptyContent?`: `React.ReactNode`. 没有子项时的说法；省略时用内置的「没有可选项」。应用若要说明查询对象，在这里给出。
- `positionerProps?`: `SelectPrimitive.Positioner.Props`.
- plus 285 inherited (@types/react 274, @base-ui/react 11); not expanded, see the installed declarations

### SelectTrigger
- no props declared by this library
- plus 289 inherited (@types/react 283, @base-ui/react 6); not expanded, see the installed declarations

### SelectValue
- no props declared by this library
- plus 279 inherited (@types/react 274, @base-ui/react 5); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context EmptyValueLabel: without a provider nullable; provided by Select
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope
- Context ItemLabels: without a provider default-value; provided by Select
- Context SourceState: without a provider default-value; provided by Select

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Select
单值状态与表单语义。
- value / defaultValue: Value | null. 受控值或真实初值，null 是未选择。省略初值不会选第一项。
- items: Record<string, ReactNode> | {value, label}[] | Group[]. 值到名称的映射；显式空字符串候选也要提供可读 label。触发器宽度由其中最长的名称决定，选另一项时不会伸缩。
- onValueChange: (value, eventDetails) => void. 选择变化，可取消；不因高亮移动而改变值。
- name / form / inputRef / autoComplete: Base UI Root props. 保留原语隐藏输入、表单与自动填充入口。
- disabled / readOnly / required: boolean; default false. 交互限制与原生约束；invalid 由 Field 或触发器显式 ARIA 声明。
- open / defaultOpen / onOpenChange: Base UI Root props. 受控或非受控展开，取消返回与选择值分开。
- loading: boolean; default false. 应用正在取候选的事实：触发器与列表标 aria-busy，候选面显示等待记号与「正在加载」，不显示「没有可选项」。组件不发请求。
- error: ReactNode. 取候选失败时由应用给出的内容，可含说明与重试动作；候选面以 role="alert" 摆放。组件不推断失败，也不写原因。
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
- emptyContent: ReactNode; default locale.selectEmpty. 没有子项时的说法；候选来自查询时，说明查询对象。加载与失败时不显示。
- alignItemWithTrigger: boolean; default false. 显式选择是否以选中项对齐并覆盖触发器。
- container: HTMLElement | ShadowRoot | RefObject | null. Portal 容器；局部主题、语言或密度需由调用方提供正确继承环境。
- positionerProps: SelectPrimitive.Positioner.Props. 自身公开定位层的 ref/render/事件/样式透传；调用方 style 最后合并。
- finalFocus / render / ref / className / style: Base UI Popup props. 默认取消回到触发器；入退场由 motion.css 拥有。

### SelectItem
值候选；高亮表位置，勾标表选中。
- value / label / disabled: any / string / boolean. 值、类型搜索名称、禁用事实。禁用项可高亮供辨认，但不能选取。
- children / render / ref / className / style: Base UI Item props. 名称内容自动进入 ItemText，选中勾标单独呈现。

### SelectGroup / SelectGroupLabel
语义分组与组名称；组名画法与 ComboboxGroupLabel、AutocompleteGroupLabel 同一来源。

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

### 候选的来源
Source: apps/docs/src/content/select/demos/03-source.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

export const meta = { title: "候选的来源", titleEn: "Where candidates come from" };

type Source = "ready" | "loading" | "failed" | "none";
const sources: { id: Source; label: string }[] = [
  { id: "ready", label: "有候选" },
  { id: "loading", label: "加载中" },
  { id: "failed", label: "取得失败" },
  { id: "none", label: "没有候选" },
];
const regions = [{ value: "cn", label: "中国大陆" }, { value: "hk", label: "中国香港" }, { value: "sg", label: "新加坡" }];

export default function Demo() {
  const [retried, setRetried] = useState(0);
  return (
    <div className="grid w-full grid-cols-4 items-start gap-(--qy-space-4)">
      {sources.map(source => (
        <Field key={source.id}>
          <FieldLabel>{source.label}</FieldLabel>
          <Select
            items={source.id === "ready" ? regions : []}
            loading={source.id === "loading"}
            error={source.id === "failed" ? <><span>区域列表没有取到。</span><Button size="sm" variant="quiet" onClick={() => setRetried(count => count + 1)}>重试{retried > 0 ? `（${retried}）` : ""}</Button></> : undefined}
          >
            <SelectTrigger />
            <SelectPopup>
              {source.id === "ready" && regions.map(region => <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>)}
            </SelectPopup>
          </Select>
        </Field>
      ))}
    </div>
  );
}
```
