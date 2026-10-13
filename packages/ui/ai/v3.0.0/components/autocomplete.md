# 建议输入 Autocomplete

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/autocomplete
Source: packages/ui/src/components/autocomplete.tsx
Source SHA-256: 3e76b123ade49969db6f359fd879fb1412ed20dcf05c98323b8be0a8238e9c18

编辑自由文本，候选作为可接受的建议。

## Decision
输入文字本身就是值。移动候选高亮不改变文本；确认建议才请求替换，文本无需匹配候选也可提交。

## Notes
- 需要只能确认候选中的一个值时用 Combobox。
- 空集合不代表错误或服务失败；空提示由调用方根据真实情况提供。
- caller 定位 style 最后合并；颜色、圆角、高亮与焦点读取现有主题角色。
- 命令面板不是独立组件：Dialog 里放 open + inline 的 Autocomplete，分组、键盘直达、选中后关闭都由这里的部件组合；快捷键由应用绑定，库不监听全局按键。选 Autocomplete 而不是 Combobox，因为命令是动作而不是要确认保存的值，输入文字没有「已确认候选」要保留。

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
- AutocompleteCollection: const; owner autocomplete; UNVERIFIED
- AutocompleteControl: function; owner autocomplete; PASS; props: InputGroupProps
- AutocompleteEmpty: function; owner autocomplete; PASS; props: AutocompletePrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteGroup: function; owner autocomplete; PASS; props: AutocompletePrimitive.Group.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteGroupLabel: function; owner autocomplete; PASS; props: AutocompletePrimitive.GroupLabel.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteInput: function; owner autocomplete; PASS; props: AutocompletePrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- AutocompleteItem: function; owner autocomplete; PASS; props: AutocompletePrimitive.Item.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteItemGroup: type; owner autocomplete; PASS
- AutocompleteList: function; owner autocomplete; PASS; props: AutocompletePrimitive.List.Props & React.RefAttributes<HTMLDivElement>
- AutocompletePopup: function; owner autocomplete; PASS; props: AutocompletePopupProps
- AutocompletePopupProps: type; owner autocomplete; PASS
- AutocompletePrimitive: reexport; owner autocomplete; UNVERIFIED
- AutocompleteProps: type; owner autocomplete; PASS
- AutocompleteSeparator: function; owner autocomplete; PASS; props: AutocompletePrimitive.Separator.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteStatus: function; owner autocomplete; PASS; props: AutocompleteStatusProps
- AutocompleteStatusProps: type; owner autocomplete; PASS
- AutocompleteTrigger: function; owner autocomplete; PASS; props: AutocompletePrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Autocomplete
- `items?`: `readonly Value[] | readonly AutocompleteItemGroup<Value>[] | undefined`.
- plus 32 inherited (@base-ui/react 32); not expanded, see the installed declarations

### AutocompleteClear
- no props declared by this library
- plus 290 inherited (@types/react 284, @base-ui/react 6); not expanded, see the installed declarations

### AutocompleteCollection
- no props declared by this library
- plus 1 inherited (@base-ui/react 1); not expanded, see the installed declarations

### AutocompleteControl
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### AutocompleteEmpty
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### AutocompleteGroup
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### AutocompleteGroupLabel
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### AutocompleteInput
- no props declared by this library
- plus 308 inherited (@types/react 304, @base-ui/react 4); not expanded, see the installed declarations

### AutocompleteItem
- no props declared by this library
- plus 281 inherited (@types/react 272, @base-ui/react 9); not expanded, see the installed declarations

### AutocompleteList
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

### AutocompletePopup
- `container?`: `AutocompletePrimitive.Portal.Props["container"]`.
- `positionerProps?`: `AutocompletePrimitive.Positioner.Props`.
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### AutocompleteSeparator
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### AutocompleteStatus
- `count?`: `number | undefined`. 结果数：读出内置的「找到 N 项」。0 不出声，「没有结果」归 Empty。
- `loading?`: `boolean`. 加载中：读出内置的「正在加载」。
- `visible?`: `boolean`. 同时给看得见的人看；默认只给读屏。
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### AutocompleteTrigger
- no props declared by this library
- plus 289 inherited (@types/react 284, @base-ui/react 5); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope
- Context InControl: without a provider default-value; provided by AutocompleteControl
- Context ReadOnly: without a provider default-value; provided by Autocomplete

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Autocomplete
Base UI 文本建议上下文，固定 list 模式。
- value / defaultValue / onValueChange: string / string / (value, details) => void. 受控或非受控自由文本；details.cancel() 可拒绝编辑或接受建议请求。
- items / itemToStringValue / filter: readonly Value[] / Base UI public props. 提供平坦建议数组、建议文字与过滤规则；对象建议显式定义文本。分组建议用 { value: 组名, items } 形态，配合 AutocompleteGroup。
- name / form / required / disabled / readOnly: Base UI Root props. 实际 Input 与 Field 注册一次，FormData 提交自由文本；只读提交、禁用排除。
- open / defaultOpen / onOpenChange: Base UI open props. 展开可控；文本、动作与建议项共用一套几何，跟随密度轴。

### AutocompleteInput / AutocompleteTrigger / AutocompleteClear
共享 Input/Button 的真实出口，透传 ref/render/ARIA/events；清除请求空文本。

### AutocompletePopup
公开候选 Portal/Positioner/Popup；container/positionerProps 透传并消费共享浮层层级。

### AutocompleteList / AutocompleteItem / AutocompleteEmpty
建议集合、文字建议与调用方真实空内容。

### AutocompleteGroup / AutocompleteGroupLabel / AutocompleteSeparator / AutocompleteCollection
分组建议，与 Combobox 同一套：items 用 { value: 组名, items }，列表以函数子级逐组渲染，组内用 AutocompleteCollection。画法与 Select、Combobox 的分组同一来源。

### AutocompleteStatus
列表自身状态的读屏播报（loading、count 或 children），与 ComboboxStatus 同一规则：保持挂载、默认只给读屏；「没有结果」归 AutocompleteEmpty。
- loading / count / visible: boolean / number / boolean. 加载中、结果数、是否同时显示。

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

### 命令面板
Source: apps/docs/src/content/autocomplete/demos/03-command-palette.tsx
```tsx
import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteCollection, AutocompleteControl, AutocompleteEmpty, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompleteList } from "@qingye_lab/ui/components/autocomplete";
import { Dialog, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Kbd } from "@qingye_lab/ui/components/kbd";
export const meta = { title: "命令面板", titleEn: "Command palette" };
const commands = [
  { value: "页面", items: ["概览", "设备", "告警", "设置"] },
  { value: "操作", items: ["新建设备", "导出告警", "切换主题"] },
];
export default function Demo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("");
  // 快捷键是应用的事：库不监听全局按键，避免与站点已有的快捷键冲突。
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(value => !value); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  return <Inline gap="actions">
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>搜索 <Kbd>⌘K</Kbd></DialogTrigger>
      <DialogPopup className="w-[min(32rem,100%)]">
        <DialogTitle className="sr-only">命令面板</DialogTitle>
        <Autocomplete open inline items={commands} autoHighlight="always" keepHighlight>
          <div className="min-w-0">
          <AutocompleteControl><AutocompleteInput aria-label="搜索页面与操作" placeholder="搜索页面与操作" /></AutocompleteControl>
          <AutocompleteEmpty>没有匹配项</AutocompleteEmpty>
          <AutocompleteList className="mt-(--qy-field-gap) max-h-72">{(group: (typeof commands)[number]) => <AutocompleteGroup key={group.value} items={group.items}><AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel><AutocompleteCollection>{(item: string) => <AutocompleteItem key={item} value={item} onClick={() => { setLast(item); setOpen(false); }}>{item}</AutocompleteItem>}</AutocompleteCollection></AutocompleteGroup>}</AutocompleteList>
          </div>
        </Autocomplete>
      </DialogPopup>
    </Dialog>
    <output className="text-support text-muted-foreground">{last || "—"}</output>
  </Inline>;
}
```
