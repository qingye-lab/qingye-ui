# Cascader

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/cascader
Source: packages/ui/src/components/cascader.tsx
Source SHA-256: 9ceda3ccbb6f291761c0eee3440aa2c4be159331c7e39243f22e02022a424915

Choose one value along a root-to-leaf path, with each level's candidates in its own column.

## Decision
What is chosen is a path, not the last node: leaves with the same name (a "city district" in different provinces) are told apart by their path, so the value, the form and the callback all use the path. Whether a branch can be submitted is decided by selectParent, not by whether it has children; loading and failure are facts the component sees for itself and are never taken for "no children".

## Notes
- The trigger text is the complete path, truncated with an ellipsis when long; the full text stays in the DOM so assistive technology reads all of it.
- A mouse click on a parent only expands it; with selectParent the parent also becomes the value and the popup stays open so you can continue downward. On the keyboard these are two keys: Enter submits and closes, → expands.
- Focus is real DOM focus (roving tabindex). Each column is a listbox named by its parent; the first column takes the trigger's name. Search results are the exception: focus stays in the input and aria-activedescendant points at the result.
- aria-haspopup and aria-expanded on an option mean "has a next column" and "the next column is open".
- Candidates share Select's text size and height. Column width follows content with a lower bound derived from padding, trailing marker and minimum text area; the popup scrolls horizontally when columns are many.

## Use and ownership
- Candidates that naturally nest and where a value at some level is wanted: regions, categories, organizations.
- Avoid: Use Select for a single level and Combobox when many candidates need filtering.
- Avoid: Use Tree's checkable form for choosing several paths.
- Avoid: Use RadioGroup for a few candidates that need side-by-side comparison.
- Library: Focus, open columns, the search draft, uncontrolled value, and the cache and retry of async results.
- Application: Controlled values, candidate data, the actual loadChildren request, invalid and save facts.

## Composition
- FieldLabel + Cascader + FieldDescription + FieldError.

## Responsive behavior
- The popup scrolls horizontally when columns are many instead of overflowing the viewport; this batch checked desktop only.

## Customization
- Trigger className, Popover's panel and positioning.

## Current exports
- Cascader: function; owner cascader; PASS; props: CascaderProps
- CascaderOption: type; owner cascader; PASS
- CascaderProps: type; owner cascader; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Cascader
- `aria-describedby?`: `string | undefined`.
- `aria-invalid?`: `"true" | "false" | boolean`.
- `aria-label?`: `string | undefined`.
- `aria-labelledby?`: `string | undefined`.
- `className?`: `string | undefined`.
- `defaultValue?`: `string[] | null | undefined`.
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `id?`: `string | undefined`.
- `loadChildren?`: `((option: CascaderOption) => Promise<CascaderOption[]>) | undefined`. 展开一个没有 children 的非叶子节点时调用；失败（reject）显示可重试的错误。
- `name?`: `string | undefined`. 隐藏 input 的名称；提交值是路径各段用 "/" 连接，未选择提交空字符串。
- `onValueChange?`: `((path: string[] | null, options: CascaderOption[]) => void) | undefined`. 提交了新的路径时调用；第二个参数是路径上各节点的候选对象（尚未取到的节点缺省）。
- `options`: `readonly CascaderOption[]`. 第一列的候选；子项在 children 里，或由 loadChildren 按需取来。
- `placeholder?`: `React.ReactNode`.
- `readOnly?`: `boolean`.
- `required?`: `boolean`.
- `searchable?`: `boolean`. 弹层顶部出现搜索输入；输入后改为一列扁平的匹配路径（只搜已知的节点，未加载的分支不在其中）。
- `selectParent?`: `boolean`. 默认只有叶子可提交；true 时任意层级都可以提交。
- `value?`: `string[] | null | undefined`. 从根到所选节点的路径；null 是未选择。省略初值不会选第一项。

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Cascader
Trigger, column-wise candidate popup and form value. The trigger shares Select's geometry; the popup uses Popover's panel.
- options: CascaderOption[]. Candidates of the first column. A node is { value, label, disabled?, children?, isLeaf? }; values are unique under one parent. A node with children is a branch, otherwise a leaf (unless loadChildren is set).
- value / defaultValue: string[] | null. The path from the root to the chosen node; null is no selection, and omitting an initial value does not choose the first item. A path segment that is not loaded yet falls back to its value in the trigger.
- onValueChange: (path: string[] | null, options: CascaderOption[]) => void. Called when a new path is submitted; the second argument is the nodes on the path. Submitting the same path does not call it.
- selectParent: boolean; default false. Only leaves submit by default; with true any level can submit (Ant Design's changeOnSelect).
- loadChildren: (option: CascaderOption) => Promise<CascaderOption[]>. Called when a node with neither children nor isLeaf is expanded. While waiting the column shows "Loading"; a rejection shows "Failed to load" with a retry; an empty result makes the node a leaf. Results are cached by path and not requested twice.
- searchable: boolean; default false. A search input appears at the top of the popup; with input the columns give way to one flat list of matching paths joined by the locale separator. Only known nodes are searched, so unloaded branches are not included.
- placeholder: ReactNode; default locale.selectPlaceholder. Shown only without selection; cannot replace FieldLabel.
- disabled / readOnly / required: boolean; default false. Read-only keeps the value and never opens the popup; a disabled field is not submitted; required joins native validation and sets aria-required. invalid follows Field.
- name / form: string. Name and owning form of the hidden input. The submitted value is the path segments joined with "/", such as "zj/hz/xh"; an empty string when nothing is selected. Values should therefore not contain "/".
- aria-label / aria-labelledby / id / className: string. Name and styling entries of the trigger. A missing name throws: use aria-label, aria-labelledby, or place it in a Field with a FieldLabel.

## Keyboard
- Enter / Space / ↓ / ↑: On the trigger, open the popup with focus on the last item of the current path (the first item when empty).
- ↓ / ↑ / Home / End: Move within the current column. Focus is the position: columns deeper than it close when focus leaves their item.
- → (← in RTL): With children, expand and enter the first item of the next column; while loading, enter once loading finishes.
- ← (→ in RTL): Return to the parent in the previous column and close this one.
- Enter / Space: On a submittable item, submit and close with focus back on the trigger; on a branch that cannot be submitted, enter the next column.
- Typing: Jump by first letter within the column; fast consecutive typing matches by prefix.
- Esc: Close and return to the trigger, retaining the original value.
- In search ↓ / ↑ / Enter: Focus stays in the input; arrows move the highlight over matching paths and Enter submits. With an empty query ↓ enters the columns.

## Source examples
### 地区
Source: apps/docs/src/content/cascader/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "地区", titleEn: "Regions" };

const zh: CascaderOption[] = [
  { value: "zj", label: "浙江", children: [
    { value: "hz", label: "杭州", children: [{ value: "xh", label: "西湖区" }, { value: "bj", label: "滨江区", disabled: true }, { value: "yh", label: "余杭区" }] },
    { value: "nb", label: "宁波", children: [{ value: "hs", label: "海曙区" }, { value: "jb", label: "江北区" }] },
  ] },
  { value: "js", label: "江苏", children: [
    { value: "nj", label: "南京", children: [{ value: "gl", label: "鼓楼区" }, { value: "xw", label: "玄武区" }] },
    { value: "sz", label: "苏州", children: [{ value: "gs", label: "姑苏区" }] },
  ] },
  { value: "bj", label: "北京", children: [{ value: "bj-city", label: "北京市", children: [{ value: "dc", label: "东城区" }, { value: "xc", label: "西城区" }] }] },
];
const en: CascaderOption[] = [
  { value: "zj", label: "Zhejiang", children: [
    { value: "hz", label: "Hangzhou", children: [{ value: "xh", label: "Xihu" }, { value: "bj", label: "Binjiang", disabled: true }, { value: "yh", label: "Yuhang" }] },
    { value: "nb", label: "Ningbo", children: [{ value: "hs", label: "Haishu" }, { value: "jb", label: "Jiangbei" }] },
  ] },
  { value: "js", label: "Jiangsu", children: [
    { value: "nj", label: "Nanjing", children: [{ value: "gl", label: "Gulou" }, { value: "xw", label: "Xuanwu" }] },
    { value: "sz", label: "Suzhou", children: [{ value: "gs", label: "Gusu" }] },
  ] },
  { value: "bj", label: "Beijing", children: [{ value: "bj-city", label: "Beijing", children: [{ value: "dc", label: "Dongcheng" }, { value: "xc", label: "Xicheng" }] }] },
];

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const options = english ? en : zh;
  const [leaf, setLeaf] = useState<string[] | null>(["zj", "hz", "xh"]);
  const [any, setAny] = useState<string[] | null>(null);
  return (
    <div className="grid w-full grid-cols-2 items-start gap-(--qy-space-4)">
      <Field>
        <FieldLabel>{english ? "Leaf only" : "只选到叶子"}</FieldLabel>
        <Cascader options={options} value={leaf} onValueChange={setLeaf} />
      </Field>
      <Field>
        <FieldLabel>{english ? "Any level" : "任意一级"}</FieldLabel>
        <Cascader options={options} selectParent value={any} onValueChange={setAny} />
      </Field>
    </div>
  );
}
```

### 按需加载
Source: apps/docs/src/content/cascader/demos/02-async.tsx
```tsx
import { useRef } from "react";
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "按需加载", titleEn: "Load on demand" };

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const failed = useRef(false);
  const roots: CascaderOption[] = english
    ? [{ value: "zj", label: "Zhejiang" }, { value: "js", label: "Jiangsu" }, { value: "xz", label: "Tibet", isLeaf: true }]
    : [{ value: "zj", label: "浙江" }, { value: "js", label: "江苏" }, { value: "xz", label: "西藏", isLeaf: true }];
  const cities: Record<string, CascaderOption[]> = english
    ? { zj: [{ value: "hz", label: "Hangzhou", isLeaf: true }, { value: "nb", label: "Ningbo", isLeaf: true }], js: [{ value: "nj", label: "Nanjing", isLeaf: true }, { value: "sz", label: "Suzhou", isLeaf: true }] }
    : { zj: [{ value: "hz", label: "杭州", isLeaf: true }, { value: "nb", label: "宁波", isLeaf: true }], js: [{ value: "nj", label: "南京", isLeaf: true }, { value: "sz", label: "苏州", isLeaf: true }] };
  return (
    <Field>
      <FieldLabel>{english ? "Region" : "地区"}</FieldLabel>
      <Cascader
        options={roots}
        loadChildren={async option => {
          await delay(700);
          // 江苏第一次取不到，重试后成功。
          if (option.value === "js" && !failed.current) { failed.current = true; throw new Error("offline"); }
          return cities[option.value] ?? [];
        }}
      />
    </Field>
  );
}
```

### 搜索路径
Source: apps/docs/src/content/cascader/demos/03-search.tsx
```tsx
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "搜索路径", titleEn: "Search paths" };

const zh: CascaderOption[] = [
  { value: "home", label: "家居", children: [
    { value: "furniture", label: "家具", children: [{ value: "sofa", label: "沙发" }, { value: "table", label: "餐桌" }, { value: "bed", label: "床" }] },
    { value: "lighting", label: "灯具", children: [{ value: "desk-lamp", label: "台灯" }, { value: "ceiling", label: "吸顶灯" }] },
  ] },
  { value: "digital", label: "数码", children: [
    { value: "phone", label: "手机", children: [{ value: "case", label: "手机壳" }, { value: "charger", label: "充电器" }] },
    { value: "audio", label: "音频", children: [{ value: "headphone", label: "耳机" }, { value: "speaker", label: "音箱" }] },
  ] },
  { value: "books", label: "图书", children: [{ value: "fiction", label: "文学", children: [{ value: "novel", label: "小说" }, { value: "poetry", label: "诗歌" }] }] },
];
const en: CascaderOption[] = [
  { value: "home", label: "Home", children: [
    { value: "furniture", label: "Furniture", children: [{ value: "sofa", label: "Sofas" }, { value: "table", label: "Dining tables" }, { value: "bed", label: "Beds" }] },
    { value: "lighting", label: "Lighting", children: [{ value: "desk-lamp", label: "Desk lamps" }, { value: "ceiling", label: "Ceiling lights" }] },
  ] },
  { value: "digital", label: "Digital", children: [
    { value: "phone", label: "Phones", children: [{ value: "case", label: "Cases" }, { value: "charger", label: "Chargers" }] },
    { value: "audio", label: "Audio", children: [{ value: "headphone", label: "Headphones" }, { value: "speaker", label: "Speakers" }] },
  ] },
  { value: "books", label: "Books", children: [{ value: "fiction", label: "Fiction", children: [{ value: "novel", label: "Novels" }, { value: "poetry", label: "Poetry" }] }] },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  return (
    <Field>
      <FieldLabel>{english ? "Category" : "类目"}</FieldLabel>
      <Cascader options={english ? en : zh} searchable name="category" />
    </Field>
  );
}
```
