# 候选输入 Combobox

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/combobox
Source: packages/ui/src/components/combobox.tsx
Source SHA-256: 8059b34f845c6cf7503c2f98378cf80b515ab64f78b3bbcfc39bd6536745abd0

筛选候选并确认一个或一组值，查询文字与选择事实分别持有。

## Decision
value 是确认候选，inputValue 是过滤草稿。清空过滤文字继续保留候选，明确清除选择才请求空值；自由文本值用 Autocomplete。候选很多且要选几个时用 multiple；候选少而需要一眼看全用 CheckboxGroup，值不来自候选用 TagInput。

## Notes
- 从当前查询到候选的过滤与空内容必须对应实际数据。
- Popup 的 caller style 最后合并；覆写层级可能改变默认顺序。
- 候选浮层表面与高亮采用既有主题预设，焦点信号在盒内。
- 异步候选由应用持有请求、取消与失败；传 filter={null} 关闭内置过滤，用 ComboboxStatus 说明加载与结果数，用 ComboboxEmpty 说明没有结果（加载期间不要显示它）。

## Use and ownership
- 筛选候选并确认一个或一组值，查询文字与选择事实分别持有。
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
- Combobox: function; owner combobox; PASS; props: ComboboxProps<Value, Many>
- ComboboxChip: function; owner combobox; PASS; props: ComboboxChipProps
- ComboboxChipProps: type; owner combobox; PASS
- ComboboxChips: function; owner combobox; PASS; props: ComboboxPrimitive.Chips.Props & React.RefAttributes<HTMLDivElement>
- ComboboxClear: function; owner combobox; PASS; props: ComboboxPrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- ComboboxCollection: const; owner combobox; UNVERIFIED
- ComboboxControl: function; owner combobox; PASS; props: InputGroupProps
- ComboboxEmpty: function; owner combobox; PASS; props: ComboboxPrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>
- ComboboxGroup: function; owner combobox; PASS; props: ComboboxPrimitive.Group.Props & React.RefAttributes<HTMLDivElement>
- ComboboxGroupLabel: function; owner combobox; PASS; props: ComboboxPrimitive.GroupLabel.Props & React.RefAttributes<HTMLDivElement>
- ComboboxInput: function; owner combobox; PASS; props: ComboboxPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- ComboboxItem: function; owner combobox; PASS; props: ComboboxPrimitive.Item.Props & React.RefAttributes<HTMLDivElement>
- ComboboxList: function; owner combobox; PASS; props: ComboboxPrimitive.List.Props & React.RefAttributes<HTMLDivElement>
- ComboboxPopup: function; owner combobox; PASS; props: ComboboxPopupProps
- ComboboxPopupProps: type; owner combobox; PASS
- ComboboxPrimitive: reexport; owner combobox; UNVERIFIED
- ComboboxProps: type; owner combobox; PASS
- ComboboxSelect: function; owner combobox; PASS; props: ComboboxSelectProps<Value>
- ComboboxSelectProps: type; owner combobox; PASS
- ComboboxSeparator: function; owner combobox; PASS; props: ComboboxPrimitive.Separator.Props & React.RefAttributes<HTMLDivElement>
- ComboboxStatus: function; owner combobox; PASS; props: ComboboxStatusProps
- ComboboxStatusProps: type; owner combobox; PASS
- ComboboxTrigger: function; owner combobox; PASS; props: ComboboxPrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>
- ComboboxValue: const; owner combobox; UNVERIFIED

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Combobox
- no props declared by this library
- plus 38 inherited (@base-ui/react 38); not expanded, see the installed declarations

### ComboboxChip
- `label?`: `string`. 移除动作的对象名；children 是纯文字时取 children。
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ComboboxChips
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ComboboxClear
- no props declared by this library
- plus 290 inherited (@types/react 284, @base-ui/react 6); not expanded, see the installed declarations

### ComboboxCollection
- no props declared by this library
- plus 1 inherited (@base-ui/react 1); not expanded, see the installed declarations

### ComboboxControl
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ComboboxEmpty
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ComboboxGroup
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### ComboboxGroupLabel
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ComboboxInput
- no props declared by this library
- plus 308 inherited (@types/react 304, @base-ui/react 4); not expanded, see the installed declarations

### ComboboxItem
- no props declared by this library
- plus 281 inherited (@types/react 272, @base-ui/react 9); not expanded, see the installed declarations

### ComboboxList
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

### ComboboxPopup
- `container?`: `ComboboxPrimitive.Portal.Props["container"]`.
- `positionerProps?`: `ComboboxPrimitive.Positioner.Props`.
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### ComboboxSelect
- `clearable?`: `boolean`.
- `controlProps?`: `InputGroupProps | undefined`.
- `emptyContent`: `React.ReactNode`. 当前查询已完成且没有候选时的内容，由应用说明查询对象。
- `inputProps?`: `React.ComponentProps<typeof ComboboxInput> | undefined`.
- `items`: `readonly Value[]`. 平铺候选；分组、多选或自定义解剖使用 Combobox 的公开部件。
- `itemToStringLabel`: `(item: Value) => string`. 输入框、过滤与候选共用的可读名称；富候选另用 renderItem。
- `loading?`: `boolean`. 只表达调用方的请求事实，不发请求、不推断失败。
- `popupProps?`: `ComboboxPopupProps | undefined`.
- `renderItem?`: `((item: Value) => React.ReactNode) | undefined`.
- plus 34 inherited (@base-ui/react 34); not expanded, see the installed declarations

### ComboboxSeparator
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### ComboboxStatus
- `count?`: `number | undefined`. 结果数：读出内置的「找到 N 项」。0 不出声，「没有结果」归 Empty。
- `loading?`: `boolean`. 加载中：读出内置的「正在加载」。
- `visible?`: `boolean`. 同时给看得见的人看；默认只给读屏。
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ComboboxTrigger
- no props declared by this library
- plus 289 inherited (@types/react 284, @base-ui/react 5); not expanded, see the installed declarations

### ComboboxValue
- no props declared by this library
- plus 2 inherited (@base-ui/react 2); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope
- Context InControl: without a provider default-value; provided by ComboboxControl
- Context Multiple: without a provider default-value; provided by Combobox
- Context ReadOnly: without a provider default-value; provided by Combobox

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ComboboxSelect
平铺单选的便捷组合：编辑边界、输入、清除、展开与候选面；确认值与查询仍独立，可受控或非受控。分组、多选或不同解剖继续用公开部件。
- items / itemToStringLabel / renderItem: readonly Value[] / (item: Value) => string / (item: Value) => ReactNode. items 和 itemToStringLabel 必填，名称同时用于输入与过滤；renderItem 可丰富候选呈现。对象提交身份用既有 itemToStringValue，比较用 isItemEqualToValue。
- emptyContent / loading / clearable: ReactNode / boolean / boolean; default — / false / true. emptyContent 必填；loading 只显示调用方的加载事实，此时不声称无匹配。请求、取消、迟到回包与有效候选由应用持有。clearable 控制是否提供明确清除选择的动作。
- inputProps / controlProps / popupProps: ComboboxInput props / InputGroupProps / ComboboxPopupProps. 分别透传输入命名、ARIA、事件、render、ref，编辑边界与浮层定制。确认值、查询、表单、禁用及只读沿用 Combobox Root 属性。

### Combobox
公开 Base UI 候选上下文，默认单值；不强加业务选项。
- multiple: boolean; default false. 确认一组值：value 为数组，FormData 每个值一条；已选值在编辑边界内成为可单独移除的项。
- value / defaultValue / onValueChange: Value | null / Value | null / (value, details) => void. 受控或非受控确认值。details.cancel() 拒绝变更；回调不表示提交或持久化成功。
- inputValue / defaultInputValue / onInputValueChange: string / string / (value, details) => void. 独立过滤文字；不序列化成候选值，也不因清空查询清除确认候选。
- items / itemToStringLabel / itemToStringValue / isItemEqualToValue: Base UI public props. 调用方提供候选、可读名称、表单值与身份比较；对象值须定义有意义的名称与提交表示。
- name / form / required / disabled / readOnly: Base UI Root props. Field 命名与错误连接由原语承担；FormData 只提交确认候选。只读保留提交，禁用排除。
- open / defaultOpen / onOpenChange: Base UI open props. 展开可控；输入、动作、候选项共用一套几何，跟随密度轴。

### ComboboxInput / ComboboxTrigger / ComboboxClear
公开原语复用 Input 原生出口与 Button；事件、ARIA、render 状态与 ref 透传，Field 注册一次。

### ComboboxControl
输入、清除与展开共用的一条编辑边界，候选面以它为锚点；多选时可换行，装下已选项。

### ComboboxChips / ComboboxChip / ComboboxValue
多选的已选项。Chips 放在 Control 内，包住各项与 Input；Value 以函数子级给出已选数组；Chip 自带移除动作，只读时只显示值。几何与 TagInput 的标签相同。
- label (ComboboxChip): string. 移除动作的对象名；children 是纯文字时取 children。

### ComboboxPopup
候选专属 Portal/Positioner/Popup；positionerProps/container 可调整公开定位，层级消费共享 floating-layer。

### ComboboxList / ComboboxItem / ComboboxEmpty
真实候选集合、可选项与调用方空内容；Item.value 是确认候选。

### ComboboxGroup / ComboboxGroupLabel / ComboboxSeparator / ComboboxCollection
分组候选：items 用 Base UI 的分组形态（{ value: 组名, items }），列表以函数子级逐组渲染，组内用 ComboboxCollection。组名画法与 SelectGroupLabel、分隔线与 MenuSeparator 同一来源；组名不可选、不入键盘序列。多选下同样成立。

### ComboboxStatus
列表自身状态的读屏播报：loading 读「正在加载」，count 读「找到 N 项」，也可直接给 children。放进 ComboboxPopup 并保持挂载，变的是内容。默认只给读屏；visible 同时显示在 Empty 的位置。count 为 0 不出声：「没有结果」归 ComboboxEmpty，不重复播报。
- loading / count / visible: boolean / number / boolean. 加载中、结果数、是否同时显示；children 优先于内置文案。

### ComboboxPrimitive
安装版 Base UI Combobox 命名空间。

## Keyboard
- ArrowLeft / ArrowRight / Backspace: 多选：草稿为空时在已选项与输入之间移动；Backspace 或 Delete 移除聚焦的项。
- ArrowDown / ArrowUp: 展开并移动候选高亮，尚未确认时不改变提交值。
- Enter: 请求确认高亮候选。
- Escape / Tab: 退出候选列表，遵守原语焦点与过滤文字恢复规则。

## Source examples
### 确认候选
Source: apps/docs/src/content/combobox/demos/01-choice.tsx
```tsx
import { useState } from "react";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "确认候选", titleEn: "Confirm a candidate" };
const members = ["陈致远", "李一鸣", "王一帆", "赵子纯"];
export default function Demo() {
  const [value, setValue] = useState<string | null>("陈致远");
  return <form className="max-w-xs"><Field name="owner"><FieldLabel>负责人</FieldLabel>
    <ComboboxSelect items={members} itemToStringLabel={member => member} value={value} onValueChange={setValue} emptyContent="没有匹配的成员" />
  </Field></form>;
}
```

### 密度、只读与禁用
Source: apps/docs/src/content/combobox/demos/02-density.tsx
```tsx
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度、只读与禁用", titleEn: "Density, read-only, and disabled" };

const items = ["机柜 A", "机柜 B", "机柜 C"];

export default function Demo() {
  return (
    <div className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <ComboboxSelect items={items} itemToStringLabel={item => item} defaultValue="机柜 A" emptyContent="没有匹配的机柜" />
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读候选</FieldLabel><ComboboxSelect readOnly items={items} itemToStringLabel={item => item} defaultValue="机柜 A" emptyContent="没有匹配的机柜" /></Field>
      <Field><FieldLabel>禁用候选</FieldLabel><ComboboxSelect disabled items={items} itemToStringLabel={item => item} defaultValue="机柜 A" emptyContent="没有匹配的机柜" /></Field>
    </div>
  );
}
```

### 确认多个候选
Source: apps/docs/src/content/combobox/demos/03-multiple.tsx
```tsx
import { useState } from "react";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "确认多个候选", titleEn: "Confirm several candidates" };
const members = ["陈致远", "李一鸣", "王一帆", "赵子纯", "周知行", "吴清和"];
export default function Demo() {
  const [value, setValue] = useState<string[]>(["陈致远", "王一帆"]);
  return <form className="w-full max-w-xs"><Field name="reviewers"><FieldLabel>评审人</FieldLabel><Combobox multiple items={members} value={value} onValueChange={setValue}>
    <ComboboxControl>
      <ComboboxChips><ComboboxValue>{(selected: string[]) => selected.map(member => <ComboboxChip key={member}>{member}</ComboboxChip>)}</ComboboxValue><ComboboxInput /></ComboboxChips>
      <ComboboxTrigger />
    </ComboboxControl>
    <ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
  </Combobox></Field></form>;
}
```

### 分组候选
Source: apps/docs/src/content/combobox/demos/04-groups.tsx
```tsx
import { useState } from "react";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxClear, ComboboxCollection, ComboboxControl, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue } from "@qingye_lab/ui/components/combobox";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "分组候选", titleEn: "Grouped candidates" };
const teams = [
  { value: "设计", items: ["陈致远", "李一鸣", "王一帆"] },
  { value: "工程", items: ["赵子纯", "周知行", "吴清和"] },
];
function Groups() {
  return <ComboboxList>{(group: (typeof teams)[number]) => <ComboboxGroup key={group.value} items={group.items}><ComboboxGroupLabel>{group.value}</ComboboxGroupLabel><ComboboxCollection>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxCollection></ComboboxGroup>}</ComboboxList>;
}
export default function Demo() {
  const [owner, setOwner] = useState<string | null>("李一鸣");
  const [reviewers, setReviewers] = useState<string[]>(["陈致远", "周知行"]);
  return <form className="w-full"><FieldGroup className="grid grid-cols-2 items-start">
    <Field name="owner"><FieldLabel>负责人</FieldLabel><Combobox items={teams} value={owner} onValueChange={setOwner}><ComboboxControl><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></ComboboxControl><ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><Groups /></ComboboxPopup></Combobox></Field>
    <Field name="reviewers"><FieldLabel>评审人</FieldLabel><Combobox multiple items={teams} value={reviewers} onValueChange={setReviewers}><ComboboxControl><ComboboxChips><ComboboxValue>{(selected: string[]) => selected.map(member => <ComboboxChip key={member}>{member}</ComboboxChip>)}</ComboboxValue><ComboboxInput /></ComboboxChips><ComboboxTrigger /></ComboboxControl><ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><Groups /></ComboboxPopup></Combobox></Field>
  </FieldGroup></form>;
}
```

### 异步候选
Source: apps/docs/src/content/combobox/demos/05-async.tsx
```tsx
import { useEffect, useRef, useState } from "react";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "异步候选", titleEn: "Asynchronous candidates" };
const directory = ["3 号楼东侧", "3 号楼西侧", "4 号楼南门", "4 号楼北门", "5 号楼大堂", "东区车库", "西区车库"];
// 模拟一次查询；真实的请求、取消与失败由应用持有。
function search(query: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    const timer = setTimeout(() => resolve(directory.filter(place => place.includes(query.trim()))), 600);
    signal.addEventListener("abort", () => { clearTimeout(timer); reject(signal.reason); }, { once: true });
  });
}
type SearchResult = { query: string; status: "ready"; items: string[] } | { query: string; status: "error" };
export default function Demo({ searchPlaces = search }: { searchPlaces?: typeof search }) {
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const generation = useRef(0);
  useEffect(() => {
    const controller = new AbortController();
    const request = ++generation.current;
    setResult(null);
    // 取消是资源回收；代次检查另外阻止忽略 AbortSignal 的迟到回包覆盖新查询。
    searchPlaces(query, controller.signal).then(items => {
      if (!controller.signal.aborted && request === generation.current) setResult({ query, status: "ready", items });
    }, () => {
      if (!controller.signal.aborted && request === generation.current) setResult({ query, status: "error" });
    });
    return () => controller.abort();
  }, [query, searchPlaces]);
  // 查询改变后，同一帧就停止展示上一次查询的候选；确认值仍由 value 独立保留。
  const current = result?.query === query ? result : null;
  const loading = current === null;
  const results = current?.status === "ready" ? current.items : [];
  return <form className="max-w-xs"><Field name="place"><FieldLabel>位置</FieldLabel>
    <ComboboxSelect items={results} itemToStringLabel={place => place} filter={null}
      value={value} onValueChange={setValue} inputValue={query} onInputValueChange={next => { if (next !== query) { setResult(null); setQuery(next); } }}
      loading={loading} emptyContent={current?.status === "error" ? "查询失败，请修改搜索后重试" : "没有匹配的位置"} />
  </Field></form>;
}
```
