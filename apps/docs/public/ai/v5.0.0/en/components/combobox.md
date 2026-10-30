# Combobox

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/combobox
Source: packages/ui/src/components/combobox.tsx
Source SHA-256: 7535b0831f9d85905f4e73b5309215d75ab89edbad35ab9cf44c498b960258d2

Filter candidates and confirm one value or a set, with query text separate from selection.

## Decision
value is the confirmed candidate; inputValue is the filter draft. Emptying the query preserves selection. Explicit Clear requests an empty selection. Use Autocomplete for free text. Use multiple to pick several from many candidates; use CheckboxGroup when few options should all stay visible, and TagInput when values do not come from candidates.

## Notes
- Filtering and empty content must reflect the real candidate data.
- Popup caller style merges last; layer overrides can change the default order.
- Popup surfaces and highlights use existing theme presets with internal focus signals.
- For asynchronous candidates the application owns requests, cancellation, and failure: pass filter={null}, use ComboboxStatus for loading and counts, and ComboboxEmpty for no results (not while loading). An empty ComboboxEmpty uses the built-in "No options", worded and drawn like Select.

## Use and ownership
- Filter candidates and confirm one value or a set, with query text separate from selection.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Candidate keyboard behavior, focus, and uncontrolled query/confirmed value.
- Application: Candidate data, controlled query/value, errors, and submission outcomes.

## Composition
- Field + FieldLabel + Combobox / Input / actions / Popup / List / Item

## Responsive behavior
- One geometry following the density axis; compact tightens the container, never the text; popup positioning uses available width and height.

## Customization
- Per-part render/refs/ARIA/events, public primitives, and shared popup roles.

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
A convenient composition for flat single selection: edit boundary, input, clear, trigger, and popup. Confirmation and query remain independent and can be controlled or uncontrolled. Use the public parts for groups, multiple selection, or a different anatomy.
- items / itemToStringLabel / renderItem: readonly Value[] / (item: Value) => string / (item: Value) => ReactNode. items and itemToStringLabel are required; labels serve both input and filtering. renderItem customizes candidate content. For objects, use the existing itemToStringValue for form identity and isItemEqualToValue for equality.
- emptyContent / loading / clearable: ReactNode / boolean / boolean; default — / false / true. emptyContent is required. loading only presents caller-supplied loading and suppresses no-match text. The application owns requests, cancellation, late responses, and valid candidates. clearable controls the explicit clear-selection action.
- inputProps / controlProps / popupProps: ComboboxInput props / InputGroupProps / ComboboxPopupProps. Forward input naming, ARIA, events, render, and ref, plus control and popup customization. Confirmation, query, form, disabled, and read-only retain Combobox Root props.

### Combobox
A public Base UI candidate context, single-value by default, with caller-provided options.
- multiple: boolean; default false. Confirm a set: value is an array with one FormData entry per value; each selected value becomes an individually removable chip inside the edit boundary.
- value / defaultValue / onValueChange: Value | null / Value | null / (value, details) => void. Controlled or uncontrolled confirmation. details.cancel() rejects changes. A callback does not mean submission or persistence.
- inputValue / defaultInputValue / onInputValueChange: string / string / (value, details) => void. Independent query text. It is not serialized as selection and does not clear confirmation when emptied.
- items / itemToStringLabel / itemToStringValue / isItemEqualToValue: Base UI public props. The caller provides candidates, readable labels, form strings, and identity equality. Define meaningful labels and submission values for objects.
- name / form / required / disabled / readOnly: Base UI Root props. The primitive connects Field naming and errors. FormData submits confirmed selection only. Read-only submits; disabled is excluded.
- open / defaultOpen / onOpenChange: Base UI open props. Opening is controllable. Input, actions, and items share one geometry following the density axis.

### ComboboxInput / ComboboxTrigger / ComboboxClear
Public primitives compose the native Input outlet and Button. Events, ARIA, render state, and refs forward with one Field registration.

### ComboboxControl
One edit boundary shared by input, clear, and trigger, anchoring the popup; with multiple it wraps to hold the chips.

### ComboboxChips / ComboboxChip / ComboboxValue
Selected values for multiple. Chips sits inside Control around the chips and Input; Value provides the selected array to a function child; Chip carries its own remove action and shows only the value when read-only. Geometry matches TagInput tags.
- label (ComboboxChip): string. The object name for the remove action; defaults to children when they are plain text.

### ComboboxPopup
Candidate-specific Portal/Positioner/Popup. positionerProps and container customize positioning; layer order comes from shared floating-layer.

### ComboboxList / ComboboxItem / ComboboxEmpty
Real candidate list, selectable items, and caller-provided empty content. Item.value is a confirmation candidate.

### ComboboxGroup / ComboboxGroupLabel / ComboboxSeparator / ComboboxCollection
Grouped candidates: items use Base UI's group shape ({ value: label, items }); the list renders group by group with ComboboxCollection inside. The label matches SelectGroupLabel and the separator matches MenuSeparator. Labels are not selectable or part of the keyboard sequence. Works with multiple.

### ComboboxStatus
Screen-reader announcements about the list itself: loading says "Loading", count says "N results", or pass children. Put it in ComboboxPopup and keep it mounted; only its content changes. Screen-reader only by default; visible also shows it where Empty sits. A count of 0 stays silent: "no results" belongs to ComboboxEmpty.
- loading / count / visible: boolean / number / boolean. Loading, result count, and whether to also show it; children win over built-in text.

### ComboboxPrimitive
The installed Base UI Combobox namespace.

## Keyboard
- ArrowLeft / ArrowRight / Backspace: Multiple: with an empty draft, move between chips and the input; Backspace or Delete removes the focused chip.
- ArrowDown / ArrowUp: Open and move candidate highlighting without changing the submitted value.
- Enter: Request confirmation of the highlighted candidate.
- Escape / Tab: Leave the list using primitive focus and query restoration rules.

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
