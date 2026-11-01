# 树形选择 TreeSelect

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/tree-select
Source: packages/ui/src/components/tree-select.tsx
Source SHA-256: c24df0889faa5a44775500312b941d65ad25db540c3cbb8c82f1b30a98def50d

在弹层里的树上选一个节点，或勾选若干叶子。

## Decision
单选的值是节点 id，分支也可以被选；多选的值只含叶子 id，分支的勾选是派生显示，与 Tree 的 checkable 同一约定，所以「勾一个分支」不会被多计成 N+1 项。搜索只隐藏节点，不改变值：多选的勾选状态仍从完整的树派生。展开状态由 TreeSelect 持有并在每次打开时按已选节点重算，因为弹层关闭会卸载 Tree。

## Notes
- 不做异步加载：节点由调用方一次给全。默认键入标签开头可跳转；候选多时开 searchable 按标签过滤。
- 触发器是 combobox，弹出的是 tree（aria-haspopup="tree"）。多选时触发器列出已选叶子的名称，超过两项写成「首项及其余 N 项」，其余仍在树里可见。

## Use and ownership
- 候选天然成层、值是其中某个节点或若干叶子：部门、组织、类目
- Avoid: 只有一层候选用 Select，候选很多需过滤用 Combobox（候选成层时用 searchable）
- Avoid: 沿一条路径逐级选择、要把整条路径作为值时用 Cascader
- Avoid: 树本身就是页面内容、不需要收进触发器时直接用 Tree
- Library: 焦点、展开状态、未受控值
- Application: 受控值、节点数据、invalid 与保存事实

## Composition
- FieldLabel + TreeSelect + FieldDescription + FieldError

## Responsive behavior
- 弹层跟随可用高度滚动；本批只做桌面检查

## Customization
- 触发器 className、Popover 的面板与定位

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
触发器、弹层里的 Tree 与表单值。触发器与 Select、Cascader 同一套几何；弹层用 Popover 的面板。
- nodes: readonly TreeNode[]. 沿用 Tree 的节点：id 全树唯一、label 非空；disabled 的节点不可选。
- value / defaultValue / onValueChange: string | null  (multiple: readonly string[]). 单选是所选节点的 id（分支也可被选），null 是未选择；选中即提交并关闭，重选同一节点只关闭。多选是已勾选的叶子 id，勾选不关闭，回调里的 ids 按树的顺序。回调的 details 与 Tree 同形，cancel() 后不提交（单选时弹层也保持打开）。
- multiple: boolean; default false. 为 true 时使用 Tree 的 checkable：勾选分支会勾上它启用的叶子，部分勾选显示 mixed，禁用的叶子保持原状。
- searchable: boolean; default false. 弹层顶部出现搜索输入，按标签过滤：保留匹配的节点及其祖先，匹配的分支自动展开，匹配的文字加粗标出；无匹配时显示 locale 的空状态。单选与多选都适用，过滤只隐藏，多选的勾选与级联仍按完整的树。匹配数通过 role=status 播报。
- placeholder: ReactNode; default locale.selectPlaceholder. 仅未选择时显示；不能替代 FieldLabel。
- disabled / readOnly / required: boolean; default false. 只读保留当前值且不打开弹层；禁用的字段不提交；required 参与原生校验并标 aria-required。invalid 跟随 Field。
- name / form: string. 隐藏输入的名称与所属表单。单选提交所选 id，未选择提交空字符串；多选每个已选 id 一条同名值，未选择不提交（required 时拦下提交）。
- aria-label / aria-labelledby / id / className: string. 触发器与弹层里树的名称、触发器的样式入口。没有名称会抛错：用 aria-label、aria-labelledby，或放进带 FieldLabel 的 Field。

## Keyboard
- Enter / Space / ↓ / ↑: 在触发器上打开弹层，焦点落在已选节点（多选是第一个已勾选的叶子，都没有则是第一个节点），其祖先已展开。
- ↑ ↓ ← → / Home / End / 字首: 同 Tree：在可见节点间移动，← → 收起、展开或进出父子，键入标签开头跳转。
- Enter / Space: 单选：选中并关闭，焦点回触发器。多选：Space 勾选或取消勾选，弹层保持打开。
- 搜索中 ↓ / Esc: 输入框在树之上：↓ 进入树的入口节点；Esc 关闭并回到触发器。
- Esc: 关闭并回到触发器，保留原值。

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
