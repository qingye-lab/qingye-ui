# CheckboxGroup

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/checkbox-group
Source: packages/ui/src/components/checkbox-group.tsx
Source SHA-256: fe0248cc06c34c992d2211ae1c9fe08d3e9c7b8c9183375af4b2de25c4f813f0

Connect checkboxes to one collection and shared scope.

## Decision
CheckboxGroup owns a collection value. allValues defines the parent action's scope and must change with the actual candidate set.

## Notes
- Field.name or each Checkbox.name determines the form field; repeated names submit multiple values.
- FieldItem/FieldLabel belong inside Field; native labels also work outside a group.
- Read-only limits an item; disabled limits the group. An empty collection does not imply invalid.

## Use and ownership
- Several candidates can be selected together.
- A parent checkbox controls an explicit complete collection.
- Avoid: Use layout components when only arranging content.
- Avoid: Use RadioGroup for mutually exclusive candidates.
- Avoid: Use Switch for settings.
- Library: Uncontrolled collection, focus, keyboard, and parent mixed state.
- Application: Controlled collection, allValues, candidates, invalid facts, and submission.

## Composition
- FieldTitle names the group; FieldItem + Checkbox + FieldLabel name an item; FieldDescription/FieldError refer to the same collection.

## Responsive behavior
- Uses Checkbox dimensions and touch targets; this batch did not run browser geometry acceptance.

## Customization
- field-gap within the group; each Checkbox exposes size and styling.

## Current exports
- CheckboxGroup: function; owner checkbox-group; PASS; props: CheckboxGroupProps
- CheckboxGroupPrimitive: reexport; owner checkbox-group; UNVERIFIED
- CheckboxGroupProps: type; owner checkbox-group; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### CheckboxGroup
- no props declared by this library
- plus 283 inherited (@types/react 275, @base-ui/react 8); not expanded, see the installed declarations

### CheckboxGroupPrimitive
- no props declared by this library
- plus 283 inherited (@types/react 275, @base-ui/react 8); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### CheckboxGroup
Collection state beyond checkbox layout.
- value / defaultValue: string[]. Controlled or initial collection; an empty array means no selected items. Checkbox.value identifies members.
- onValueChange: (value: string[], details) => void. Supplies the changed collection; details.cancel() cancels this change.
- allValues: string[]. The complete scope used with a parent Checkbox for all/none/mixed. Supplied by the caller rather than inferred from business data.
- disabled: boolean; default false. Actually disables group checkboxes; per-item readOnly belongs on Checkbox.
- aria-labelledby / aria-label: string. A shared name, optionally referencing FieldTitle or FieldsetLegend.
- render / ref / className / style: Base UI composition. Forward root/native props and events; styles support primitive state callbacks.

### CheckboxGroupPrimitive
The public Base UI collection primitive.

## Keyboard
- Tab / Shift+Tab: Reach available checkboxes individually.
- Space: Add/remove the current item; the parent operates on the complete allValues scope.

## Source examples
### 集合
Source: apps/docs/src/content/checkbox-group/demos/01-selection.tsx
```tsx
import { useId, useState } from "react";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";

export const meta = { title: "集合", titleEn: "Collection" };
const options = [{ value: "alpha", label: "甲" }, { value: "beta", label: "乙" }, { value: "gamma", label: "丙" }];

export default function Demo() {
  const id = useId(); const [value, setValue] = useState(["alpha"]);
  return <Field name="choices"><FieldTitle id={id}>可选项</FieldTitle>
    <CheckboxGroup aria-labelledby={id} value={value} onValueChange={setValue} allValues={options.map(option => option.value)}>
      <FieldItem><Checkbox parent /><FieldLabel>全部</FieldLabel></FieldItem>
      {options.map(option => <FieldItem key={option.value}><Checkbox value={option.value} /><FieldLabel>{option.label}</FieldLabel></FieldItem>)}
    </CheckboxGroup>
    <output className="text-support text-foreground" aria-live="polite">{value.length} 项</output>
  </Field>;
}
```

### 状态
Source: apps/docs/src/content/checkbox-group/demos/02-states.tsx
```tsx
import { useId } from "react";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldError, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";

export const meta = { title: "状态", titleEn: "States" };
export default function Demo() {
  const id = useId();
  return <FieldGroup className="grid sm:grid-cols-3">
    <Field><FieldTitle id={`${id}-disabled`}>禁用集合</FieldTitle><CheckboxGroup disabled defaultValue={["alpha"]} aria-labelledby={`${id}-disabled`}><FieldItem><Checkbox value="alpha" /><FieldLabel>设备离线</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>同步失败</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field><FieldTitle id={`${id}-readonly`}>只读项</FieldTitle><CheckboxGroup defaultValue={["alpha"]} aria-labelledby={`${id}-readonly`}><FieldItem><Checkbox readOnly value="alpha" /><FieldLabel>设备离线</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>同步失败</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field invalid><FieldTitle id={`${id}-invalid`}>受限范围</FieldTitle><CheckboxGroup aria-labelledby={`${id}-invalid`}><FieldItem><Checkbox value="alpha" /><FieldLabel>设备离线</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>同步失败</FieldLabel></FieldItem></CheckboxGroup><FieldError>至少选择一项</FieldError></Field>
  </FieldGroup>;
}
```

### 穿梭：分配权限
Source: apps/docs/src/content/checkbox-group/demos/03-transfer.tsx
```tsx
import * as React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "穿梭：分配权限", titleEn: "Transfer: assigning permissions" };

const permissions = (en: boolean) => [
  { id: "view", label: en ? "View records" : "查看记录" },
  { id: "edit", label: en ? "Edit records" : "编辑记录" },
  { id: "export", label: en ? "Export records" : "导出记录" },
  { id: "invite", label: en ? "Invite members" : "邀请成员" },
  { id: "remove", label: en ? "Remove members" : "移除成员" },
  { id: "webhook", label: en ? "Manage webhooks" : "管理回调地址" },
  { id: "token", label: en ? "Create access tokens" : "创建访问令牌" },
  { id: "billing", label: en ? "View billing" : "查看账单" },
];
type Item = ReturnType<typeof permissions>[number];

/** 一侧的列表：名称（FieldTitle）、计数（作为描述）、搜索过滤、全选 + 逐项复选。
 * 全选只作用于「当前可见」的项（allValues = 可见项）：被过滤掉的项不会被一键带走。 */
function Side({ title, items, checked, onCheckedChange, en }: { title: string; items: readonly Item[]; checked: string[]; onCheckedChange: (ids: string[]) => void; en: boolean }) {
  const id = React.useId(); const [query, setQuery] = React.useState("");
  const visible = items.filter(item => item.label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const visibleIds = visible.map(item => item.id); const picked = checked.filter(key => visibleIds.includes(key));
  return <Field className="min-w-0">
    <div className="flex items-baseline justify-between gap-(--qy-field-gap)">
      <FieldTitle id={`${id}-title`}>{title}</FieldTitle>
      <span id={`${id}-count`} className="text-support text-muted-foreground tabular-nums">{en ? `${picked.length} of ${visible.length} selected` : `已选 ${picked.length} / ${visible.length}`}</span>
    </div>
    <SearchInput aria-label={en ? `Filter ${title.toLowerCase()}` : `筛选${title}`} value={query} onChange={event => setQuery(event.target.value)} />
    <CheckboxGroup aria-labelledby={`${id}-title`} aria-describedby={`${id}-count`} value={picked} onValueChange={ids => onCheckedChange([...checked.filter(key => !visibleIds.includes(key)), ...ids])} allValues={visibleIds}
      className="max-h-64 overflow-y-auto rounded-control border border-border p-(--qy-panel-padding-sm)">
      {visible.length === 0 ? <p className="m-0 text-support text-muted-foreground">{items.length === 0 ? (en ? "Nothing here" : "没有条目") : (en ? "No match" : "没有匹配项")}</p> : <>
        <FieldItem><Checkbox parent/><FieldLabel>{en ? "Select all" : "全选"}</FieldLabel></FieldItem>
        {visible.map(item => <FieldItem key={item.id}><Checkbox value={item.id} /><FieldLabel>{item.label}</FieldLabel></FieldItem>)}
      </>}
    </CheckboxGroup>
  </Field>;
}

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const all = React.useMemo(() => permissions(en), [en]);
  const [assigned, setAssigned] = React.useState<string[]>(["view"]);
  const [pickedLeft, setPickedLeft] = React.useState<string[]>([]);
  const [pickedRight, setPickedRight] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState("");
  const left = all.filter(item => !assigned.includes(item.id)); const right = all.filter(item => assigned.includes(item.id));
  // 搜索过滤藏起来的已勾选项不属于「当前所选」：只移动勾选且仍在列表里的项。
  const movableLeft = pickedLeft.filter(key => left.some(item => item.id === key));
  const movableRight = pickedRight.filter(key => right.some(item => item.id === key));
  const add = () => { if (!movableLeft.length) return; setAssigned([...assigned, ...movableLeft]); setPickedLeft([]); setStatus(en ? `Added ${movableLeft.length}; assigned ${assigned.length + movableLeft.length}` : `已添加 ${movableLeft.length} 项，已分配共 ${assigned.length + movableLeft.length} 项`); };
  const remove = () => { if (!movableRight.length) return; setAssigned(assigned.filter(key => !movableRight.includes(key))); setPickedRight([]); setStatus(en ? `Removed ${movableRight.length}; assigned ${assigned.length - movableRight.length}` : `已移除 ${movableRight.length} 项，已分配共 ${assigned.length - movableRight.length} 项`); };
  // 无可移动项时用 aria-disabled 而非 disabled：点完最后一批后焦点仍留在这颗按钮上，不掉到页面顶部。
  return <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-(--qy-action-gap)">
    <Side title={en ? "Available" : "可分配"} items={left} checked={pickedLeft} onCheckedChange={setPickedLeft} en={en} />
    <div className="flex flex-col gap-(--qy-action-gap)">
      <Button variant="bordered" shape="icon" aria-disabled={movableLeft.length === 0} aria-label={en ? "Add selected to assigned" : "添加所选到已分配"} onClick={add}><IconChevronRight aria-hidden="true" className="rtl:rotate-180" /></Button>
      <Button variant="bordered" shape="icon" aria-disabled={movableRight.length === 0} aria-label={en ? "Remove selected from assigned" : "从已分配移除所选"} onClick={remove}><IconChevronLeft aria-hidden="true" className="rtl:rotate-180" /></Button>
    </div>
    <Side title={en ? "Assigned" : "已分配"} items={right} checked={pickedRight} onCheckedChange={setPickedRight} en={en} />
    <div role="status" className="sr-only">{status}</div>
  </div>;
}
```
