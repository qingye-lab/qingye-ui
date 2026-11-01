# TreeSelect

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/tree-select
Source: packages/ui/src/components/tree-select.tsx
Source SHA-256: c24df0889faa5a44775500312b941d65ad25db540c3cbb8c82f1b30a98def50d

Choose one node, or check several leaves, on a tree inside a popup.

## Decision
Search only hides nodes and never changes the value: multiple mode derives its checks from the full tree. The single value is a node id and a branch can be chosen; the multiple value holds leaf ids only, and a branch's check is a derived display, the same convention as Tree's checkable, so checking one branch is never miscounted as N+1 items. TreeSelect owns the expansion and recomputes it from the chosen nodes on every open, because closing the popup unmounts the Tree.

## Notes
- No async loading: the caller provides all nodes at once. Typing the start of a label jumps to it; turn on searchable to filter by label when candidates are many.
- The trigger is a combobox and the popup a tree (aria-haspopup="tree"). In multiple mode the trigger lists the checked leaves; beyond two it reads "first and N more", and the rest stay visible in the tree.

## Use and ownership
- Candidates that naturally nest and the value is one node or several leaves: departments, organizations, categories.
- Avoid: Use Select for a single level and Combobox when many flat candidates need filtering (use searchable when they nest).
- Avoid: Use Cascader when choosing level by level and the whole path is the value.
- Avoid: Use Tree directly when the tree is itself page content and need not fold into a trigger.
- Library: Focus, expansion, and the uncontrolled value.
- Application: Controlled values, node data, invalid and save facts.

## Composition
- FieldLabel + TreeSelect + FieldDescription + FieldError.

## Responsive behavior
- The popup scrolls with the available height; this batch checked desktop only.

## Customization
- Trigger className, Popover's panel and positioning.

## Current exports
- TreeSelect: function; owner tree-select; PASS; props: TreeSelectProps
- TreeSelectChangeDetails: type; owner tree-select; PASS
- TreeSelectProps: type; owner tree-select; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### TreeSelect
- `aria-describedby?`: `string | undefined`.
- `aria-invalid?`: `"true" | "false" | boolean`.
- `aria-label?`: `string | undefined`.
- `aria-labelledby?`: `string | undefined`.
- `className?`: `string | undefined`.
- `defaultValue?`: `string | null | undefined`.
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `id?`: `string | undefined`.
- `multiple?`: `false | undefined`.
- `name?`: `string | undefined`. 隐藏 input 的名称。单选提交所选 id（未选择提交空字符串）；多选每个已选 id 一条同名值，未选择不提交。
- `nodes`: `readonly TreeNode[]`. 沿用 Tree 的节点：id 全树唯一，label 非空；disabled 的节点不可选。
- `onValueChange?`: `((id: string | null, details: TreeSelectChangeDetails) => void) | undefined`.
- `placeholder?`: `React.ReactNode`.
- `readOnly?`: `boolean`.
- `required?`: `boolean`.
- `searchable?`: `boolean`. 弹层顶部出现搜索输入：按名称筛选（不分大小写），保留命中节点的祖先并展开它们，命中的文字被标出。单选与多选都可用；只搜已知的节点。
- `value?`: `string | null | undefined`. 所选节点的 id（分支也可以被选）；null 是未选择。省略初值不会选第一项。选中即提交并关闭弹层。

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### TreeSelect
Trigger, the Tree inside the popup, and the form value. The trigger shares Select and Cascader's geometry; the popup uses Popover's panel.
- nodes: readonly TreeNode[]. Tree's own nodes: ids are unique across the tree and labels are nonempty; disabled nodes cannot be chosen.
- value / defaultValue / onValueChange: string | null  (multiple: readonly string[]). Single holds the chosen node's id (a branch can be chosen) and null is no selection; choosing commits and closes, and choosing the same node only closes. Multiple holds the checked leaf ids; checking does not close, and the ids in the callback follow the tree's order. The callback's details have Tree's shape; after cancel() nothing is committed (and in single mode the popup stays open).
- multiple: boolean; default false. With true the Tree is checkable: checking a branch checks its enabled leaves, a partial state shows mixed, and disabled leaves keep their state.
- searchable: boolean; default false. A search input appears at the top of the popup and filters by label: matching nodes and their ancestors stay, matching branches open automatically and the matched text is marked in bold; with no match the locale's empty state shows. It applies to single and multiple mode; filtering only hides, so multiple mode's checks and cascade still follow the full tree. The match count is announced through role=status.
- placeholder: ReactNode; default locale.selectPlaceholder. Shown only without selection; cannot replace FieldLabel.
- disabled / readOnly / required: boolean; default false. Read-only keeps the value and never opens the popup; a disabled field is not submitted; required joins native validation and sets aria-required. invalid follows Field.
- name / form: string. Name and owning form of the hidden input. Single submits the chosen id, or an empty string when nothing is chosen; multiple submits one value per chosen id and nothing when empty (required blocks submission).
- aria-label / aria-labelledby / id / className: string. Name of the trigger and of the tree in the popup, and the trigger's styling entry. A missing name throws: use aria-label, aria-labelledby, or place it in a Field with a FieldLabel.

## Keyboard
- Enter / Space / ↓ / ↑: On the trigger, open the popup with focus on the chosen node (the first checked leaf in multiple mode, otherwise the first node) and its ancestors expanded.
- ↑ ↓ ← → / Home / End / Typeahead: As in Tree: move between visible nodes, ← → collapse, expand or move to parent and child, and typing the start of a label jumps to it.
- Enter / Space: Single: choose and close with focus back on the trigger. Multiple: Space checks or unchecks and the popup stays open.
- In search ↓ / Esc: The input sits above the tree: ↓ enters the tree at its entry node; Esc closes and returns to the trigger.
- Esc: Close and return to the trigger, retaining the value.

## Source examples
### 单选
Source: apps/docs/src/content/tree-select/demos/01-single.tsx
```tsx
import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import type { TreeNode } from "@qingye_lab/ui/components/tree";
import { TreeSelect } from "@qingye_lab/ui/components/tree-select";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "单选", titleEn: "Single" };

const departments = (english: boolean): TreeNode[] => [
  { id: "rd", label: english ? "Engineering" : "研发中心", children: [
    { id: "rd.web", label: english ? "Web" : "前端组" },
    { id: "rd.server", label: english ? "Server" : "服务端组" },
    { id: "rd.qa", label: english ? "Quality" : "质量组", disabled: true },
  ] },
  { id: "ops", label: english ? "Operations" : "运营中心", children: [
    { id: "ops.growth", label: english ? "Growth" : "增长组" },
    { id: "ops.support", label: english ? "Support" : "客服组" },
  ] },
  { id: "hr", label: english ? "People" : "人力资源部" },
];

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const [value, setValue] = useState<string | null>("rd.web");
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>{english ? "Department" : "所属部门"}</FieldLabel>
      <TreeSelect nodes={departments(english)} value={value} onValueChange={setValue} />
    </Field>
  );
}
```

### 勾选多选
Source: apps/docs/src/content/tree-select/demos/02-multiple.tsx
```tsx
import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import type { TreeNode } from "@qingye_lab/ui/components/tree";
import { TreeSelect } from "@qingye_lab/ui/components/tree-select";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "勾选多选", titleEn: "Checkable" };

const organizations = (english: boolean): TreeNode[] => [
  { id: "east", label: english ? "East region" : "华东区", children: [
    { id: "east.sh", label: english ? "Shanghai" : "上海分公司" },
    { id: "east.hz", label: english ? "Hangzhou" : "杭州分公司" },
    { id: "east.nj", label: english ? "Nanjing" : "南京分公司" },
  ] },
  { id: "south", label: english ? "South region" : "华南区", children: [
    { id: "south.gz", label: english ? "Guangzhou" : "广州分公司" },
    { id: "south.sz", label: english ? "Shenzhen" : "深圳分公司", disabled: true },
  ] },
  { id: "hq", label: english ? "Headquarters" : "总部" },
];

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const [value, setValue] = useState<string[]>(["east.sh", "east.hz"]);
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>{english ? "Organizations" : "适用组织"}</FieldLabel>
      <TreeSelect multiple nodes={organizations(english)} value={value} onValueChange={setValue} />
    </Field>
  );
}
```

### 搜索
Source: apps/docs/src/content/tree-select/demos/03-searchable.tsx
```tsx
import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { TreeNode } from "@qingye_lab/ui/components/tree";
import { TreeSelect } from "@qingye_lab/ui/components/tree-select";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "搜索", titleEn: "Search" };

const organizations = (english: boolean): TreeNode[] => [
  { id: "east", label: english ? "East region" : "华东区", children: [
    { id: "east.sh", label: english ? "Shanghai" : "上海分公司" },
    { id: "east.hz", label: english ? "Hangzhou" : "杭州分公司" },
    { id: "east.nj", label: english ? "Nanjing" : "南京分公司" },
  ] },
  { id: "south", label: english ? "South region" : "华南区", children: [
    { id: "south.gz", label: english ? "Guangzhou" : "广州分公司" },
    { id: "south.sz", label: english ? "Shenzhen" : "深圳分公司" },
  ] },
  { id: "north", label: english ? "North region" : "华北区", children: [
    { id: "north.bj", label: english ? "Beijing" : "北京分公司" },
    { id: "north.tj", label: english ? "Tianjin" : "天津分公司" },
  ] },
  { id: "hq", label: english ? "Headquarters" : "总部" },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const [single, setSingle] = useState<string | null>(null);
  const [multiple, setMultiple] = useState<string[]>([]);
  const nodes = organizations(english);
  return (
    <Stack className="w-full max-w-xs">
      <Field>
        <FieldLabel>{english ? "Organization" : "所属组织"}</FieldLabel>
        <TreeSelect searchable nodes={nodes} value={single} onValueChange={setSingle} />
      </Field>
      <Field>
        <FieldLabel>{english ? "Organizations" : "适用组织"}</FieldLabel>
        <TreeSelect searchable multiple nodes={nodes} value={multiple} onValueChange={setMultiple} />
      </Field>
    </Stack>
  );
}
```
